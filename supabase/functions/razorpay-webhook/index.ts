// ============================================================
// Supabase Edge Function: razorpay-webhook
// Handles Razorpay webhook events for payment reconciliation
// POST /functions/v1/razorpay-webhook
// Razorpay sends: X-Razorpay-Signature header + JSON body
// ============================================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from 'https://deno.land/std@0.168.0/crypto/mod.ts'
import { encode as hexEncode } from 'https://deno.land/std@0.168.0/encoding/hex.ts'

async function hmacSha256(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const msgData = encoder.encode(message)
  const cryptoKey = await crypto.subtle.importKey(
    'raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, msgData)
  return new TextDecoder().decode(hexEncode(new Uint8Array(sig)))
}

serve(async (req: Request) => {
  try {
    const webhookSecret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET')!
    const rawBody = await req.text()
    const receivedSig = req.headers.get('X-Razorpay-Signature') ?? ''

    // ── Verify webhook signature ──────────────────────────────
    const expectedSig = await hmacSha256(webhookSecret, rawBody)
    if (expectedSig !== receivedSig) {
      console.error('[webhook] Signature mismatch')
      return new Response(JSON.stringify({ error: 'Invalid webhook signature' }), { status: 400 })
    }

    const payload = JSON.parse(rawBody)
    const eventType: string = payload.event
    const entity = payload.payload?.payment?.entity ?? payload.payload?.order?.entity ?? {}

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // ── Log the webhook event ─────────────────────────────────
    await supabase.from('webhook_events').insert({
      event_type: eventType,
      payload,
      processed: false,
    })

    // ── Handle events ─────────────────────────────────────────
    if (eventType === 'payment.captured' || eventType === 'order.paid') {
      const orderId = entity.order_id ?? payload.payload?.order?.entity?.id
      const paymentId = entity.id

      if (!orderId || !paymentId) {
        return new Response(JSON.stringify({ ok: true, skipped: 'no ids' }), { status: 200 })
      }

      // Check if already recorded as success
      const { data: existingTxn } = await supabase
        .from('payment_transactions')
        .select('id, status')
        .eq('razorpay_payment_id', paymentId)
        .maybeSingle()

      if (existingTxn?.status === 'success') {
        await supabase
          .from('webhook_events')
          .update({ processed: true })
          .eq('event_type', eventType)
          .order('created_at', { ascending: false })
          .limit(1)
        return new Response(JSON.stringify({ ok: true, idempotent: true }), { status: 200 })
      }

      // Reconcile: find the order and registration
      const { data: order } = await supabase
        .from('payment_orders')
        .select('id, registration_id, amount, currency')
        .eq('razorpay_order_id', orderId)
        .maybeSingle()

      if (order) {
        await supabase
          .from('payment_orders')
          .update({ status: 'paid', updated_at: new Date().toISOString() })
          .eq('razorpay_order_id', orderId)

        await supabase.from('payment_transactions').upsert(
          {
            registration_id: order.registration_id,
            payment_order_id: order.id,
            razorpay_order_id: orderId,
            razorpay_payment_id: paymentId,
            amount: order.amount,
            currency: order.currency,
            status: 'success',
            method: entity.method ?? 'unknown',
            verified_at: new Date().toISOString(),
          },
          { onConflict: 'razorpay_payment_id' }
        )
      }
    } else if (eventType === 'payment.failed') {
      const orderId = entity.order_id
      const paymentId = entity.id
      const errorDescription = entity.error_description ?? 'Payment failed'

      if (orderId) {
        await supabase
          .from('payment_orders')
          .update({ status: 'failed', updated_at: new Date().toISOString() })
          .eq('razorpay_order_id', orderId)

        const { data: order } = await supabase
          .from('payment_orders')
          .select('id, registration_id, amount, currency')
          .eq('razorpay_order_id', orderId)
          .maybeSingle()

        if (order) {
          await supabase.from('payment_transactions').upsert(
            {
              registration_id: order.registration_id,
              payment_order_id: order.id,
              razorpay_order_id: orderId,
              razorpay_payment_id: paymentId,
              amount: order.amount,
              currency: order.currency,
              status: 'failed',
              failure_reason: errorDescription,
            },
            { onConflict: 'razorpay_payment_id' }
          )
        }
      }
    }

    // Mark webhook as processed
    await supabase
      .from('webhook_events')
      .update({ processed: true })
      .eq('event_type', eventType)
      .order('created_at', { ascending: false })
      .limit(1)

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('[razorpay-webhook]', message)
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
})
