// ============================================================
// Supabase Edge Function: verify-payment
// Verifies Razorpay HMAC-SHA256 signature server-side
// POST /functions/v1/verify-payment
// Body: { order_id, payment_id, signature, registration_id }
// ============================================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from 'https://deno.land/std@0.168.0/crypto/mod.ts'
import { encode as hexEncode } from 'https://deno.land/std@0.168.0/encoding/hex.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function hmacSha256(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const msgData = encoder.encode(message)

  const cryptoKey = await crypto.subtle.importKey(
    'raw', keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgData)
  return new TextDecoder().decode(hexEncode(new Uint8Array(signature)))
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const body = await req.json()
    const { order_id, payment_id, signature, registration_id } = body

    if (!order_id || !payment_id || !signature || !registration_id) {
      return new Response(
        JSON.stringify({ error: 'Missing fields: order_id, payment_id, signature, registration_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ── Idempotency: check if already verified ────────────────
    const { data: existingTxn } = await supabase
      .from('payment_transactions')
      .select('id, status')
      .eq('razorpay_payment_id', payment_id)
      .maybeSingle()

    if (existingTxn?.status === 'success') {
      return new Response(
        JSON.stringify({ success: true, already_verified: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ── HMAC-SHA256 signature verification ────────────────────
    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET')!
    const message = `${order_id}|${payment_id}`
    const expectedSignature = await hmacSha256(keySecret, message)

    if (expectedSignature !== signature) {
      console.error('[verify-payment] Signature mismatch', { expected: expectedSignature, received: signature })

      // Record failed verification
      await supabase.from('payment_transactions').insert({
        registration_id,
        razorpay_order_id: order_id,
        razorpay_payment_id: payment_id,
        razorpay_signature: signature,
        amount: 0,
        currency: 'INR',
        status: 'failed',
        failure_reason: 'Signature verification failed',
      })

      return new Response(
        JSON.stringify({ error: 'Payment verification failed. Signature mismatch.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ── Fetch order amount from DB ────────────────────────────
    const { data: order, error: orderErr } = await supabase
      .from('payment_orders')
      .select('amount, currency, id')
      .eq('razorpay_order_id', order_id)
      .single()

    if (orderErr || !order) {
      throw new Error(`Order not found in DB: ${order_id}`)
    }

    // ── Fetch payment method from Razorpay API ────────────────
    let paymentMethod = 'unknown'
    try {
      const rzpKeyId = Deno.env.get('RAZORPAY_KEY_ID')!
      const rzpKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET')!
      const paymentRes = await fetch(`https://api.razorpay.com/v1/payments/${payment_id}`, {
        headers: { 'Authorization': `Basic ${btoa(`${rzpKeyId}:${rzpKeySecret}`)}` },
      })
      if (paymentRes.ok) {
        const paymentData = await paymentRes.json()
        paymentMethod = paymentData.method ?? 'unknown'
      }
    } catch {
      // Non-critical — continue without method info
    }

    // ── Update order status ───────────────────────────────────
    await supabase
      .from('payment_orders')
      .update({ status: 'paid', updated_at: new Date().toISOString() })
      .eq('razorpay_order_id', order_id)

    // ── Insert verified transaction ───────────────────────────
    const { error: txnErr } = await supabase
      .from('payment_transactions')
      .insert({
        registration_id,
        payment_order_id: order.id,
        razorpay_order_id: order_id,
        razorpay_payment_id: payment_id,
        razorpay_signature: signature,
        amount: order.amount,
        currency: order.currency,
        status: 'success',
        method: paymentMethod,
        verified_at: new Date().toISOString(),
      })

    if (txnErr) throw new Error(`Transaction record failed: ${txnErr.message}`)

    return new Response(
      JSON.stringify({ success: true, payment_id, amount: order.amount }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('[verify-payment]', message)
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
