// ============================================================
// Supabase Edge Function: create-order
// Creates a Razorpay order server-side and saves to DB
// POST /functions/v1/create-order
// Body: { registration_id, full_name, email, phone, college, team_name, track }
// ============================================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const body = await req.json()
    const { full_name, email, phone, college, team_name, track, participant_type } = body

    // ── Validate required fields ──────────────────────────────
    if (!full_name || !email || !phone || !college || !track) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: full_name, email, phone, college, track' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ── Fetch event config ────────────────────────────────────
    const { data: configRows, error: configErr } = await supabase
      .from('event_config')
      .select('key, value')
      .in('key', ['registration_fee', 'currency', 'event_name', 'registration_open', 'razorpay_enabled'])

    if (configErr) throw new Error(`Config fetch failed: ${configErr.message}`)

    const config: Record<string, string> = {}
    configRows?.forEach(r => { config[r.key] = r.value })

    if (config.registration_open !== 'true') {
      return new Response(
        JSON.stringify({ error: 'Registrations are currently closed.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const fee = parseInt(config.registration_fee ?? '0')   // in paise
    const currency = config.currency ?? 'INR'
    const isFree = fee === 0

    // ── Upsert registration ───────────────────────────────────
    const { data: registration, error: regErr } = await supabase
      .from('registrations')
      .upsert(
        { full_name, email, phone, college, team_name, track, participant_type: participant_type ?? 'individual' },
        { onConflict: 'email', ignoreDuplicates: false }
      )
      .select('id')
      .single()

    if (regErr) throw new Error(`Registration failed: ${regErr.message}`)
    const registrationId = registration.id

    // ── Free registration — skip Razorpay ─────────────────────
    if (isFree) {
      // Insert a free payment transaction directly
      const { error: txnErr } = await supabase
        .from('payment_transactions')
        .upsert(
          {
            registration_id: registrationId,
            amount: 0,
            currency,
            status: 'free',
            verified_at: new Date().toISOString(),
          },
          { onConflict: 'registration_id' }
        )

      if (txnErr) throw new Error(`Free txn record failed: ${txnErr.message}`)

      return new Response(
        JSON.stringify({ free: true, registration_id: registrationId }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ── Check for existing order (idempotency) ────────────────
    const { data: existingOrder } = await supabase
      .from('payment_orders')
      .select('razorpay_order_id, amount, status')
      .eq('registration_id', registrationId)
      .maybeSingle()

    if (existingOrder && existingOrder.status === 'paid') {
      return new Response(
        JSON.stringify({ error: 'Payment already completed for this registration.' }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // If a valid pending order exists, return it (allow retry)
    if (existingOrder && ['created', 'attempted'].includes(existingOrder.status)) {
      return new Response(
        JSON.stringify({
          order_id: existingOrder.razorpay_order_id,
          amount: existingOrder.amount,
          currency,
          registration_id: registrationId,
          key_id: Deno.env.get('RAZORPAY_KEY_ID'),
          event_name: config.event_name,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ── Create Razorpay order ─────────────────────────────────
    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID')!
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET')!
    const receipt = `rcpt_${registrationId.slice(0, 8)}_${Date.now()}`

    const razorpayRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${razorpayKeyId}:${razorpayKeySecret}`)}`,
      },
      body: JSON.stringify({ amount: fee, currency, receipt }),
    })

    if (!razorpayRes.ok) {
      const errBody = await razorpayRes.text()
      throw new Error(`Razorpay order creation failed: ${errBody}`)
    }

    const rzpOrder = await razorpayRes.json()

    // ── Save order to DB ──────────────────────────────────────
    const { error: orderErr } = await supabase
      .from('payment_orders')
      .upsert(
        {
          registration_id: registrationId,
          razorpay_order_id: rzpOrder.id,
          amount: fee,
          currency,
          receipt,
          status: 'created',
        },
        { onConflict: 'registration_id' }
      )

    if (orderErr) throw new Error(`Order DB save failed: ${orderErr.message}`)

    return new Response(
      JSON.stringify({
        order_id: rzpOrder.id,
        amount: fee,
        currency,
        registration_id: registrationId,
        key_id: razorpayKeyId,
        event_name: config.event_name,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('[create-order]', message)
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
