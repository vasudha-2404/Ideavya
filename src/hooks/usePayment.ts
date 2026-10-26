import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { loadRazorpayScript, openRazorpayCheckout } from '../lib/razorpay';
import type {
  RegistrationFormData,
  PaymentFlowState,
  CreateOrderResponse,
  VerifyPaymentResponse,
} from '../types/payment';

export function usePayment() {
  const navigate = useNavigate();
  const [flowState, setFlowState] = useState<PaymentFlowState>({ status: 'idle' });

  const updateState = (partial: Partial<PaymentFlowState>) =>
    setFlowState(prev => ({ ...prev, ...partial }));

  const initiatePayment = useCallback(async (formData: RegistrationFormData) => {
    try {
      setFlowState({ status: 'creating_order' });

      if (!isSupabaseConfigured) {
        throw new Error(
          'Supabase is not configured. Copy .env.example to .env.local and add your credentials.'
        );
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      // Get auth token if logged in, fall back to anon key
      let authHeader = `Bearer ${supabaseAnonKey}`;
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          authHeader = `Bearer ${session.access_token}`;
        }
      }

      // ── Step 1: Create order (server-side) ─────────────────
      const createRes = await fetch(`${supabaseUrl}/functions/v1/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
          'apikey': supabaseAnonKey,
        },
        body: JSON.stringify(formData),
      });

      const createData: CreateOrderResponse & { error?: string } = await createRes.json();

      if (!createRes.ok || createData.error) {
        throw new Error(createData.error ?? 'Failed to create payment order');
      }

      updateState({ registrationId: createData.registration_id });

      // ── Step 2: Free registration ───────────────────────────
      if (createData.free) {
        setFlowState({
          status: 'success',
          registrationId: createData.registration_id,
          amount: 0,
          currency: 'INR',
          isFree: true,
        });
        navigate('/payment/success', {
          state: { registrationId: createData.registration_id, isFree: true, formData },
        });
        return;
      }

      // ── Step 3: Load Razorpay script ────────────────────────
      setFlowState(prev => ({ ...prev, status: 'opening_checkout', orderId: createData.order_id }));

      const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!razorpayKeyId || razorpayKeyId.length < 10) {
        throw new Error('Razorpay Key ID is not configured. Set VITE_RAZORPAY_KEY_ID in .env.local');
      }

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        throw new Error('Failed to load Razorpay Checkout. Check your internet connection.');
      }

      // ── Step 4: Open Razorpay checkout modal ────────────────
      let paymentResponse;
      try {
        paymentResponse = await openRazorpayCheckout({
          key: razorpayKeyId,
          amount: createData.amount,
          currency: createData.currency,
          name: createData.event_name,
          description: `Registration Fee — ${formData.track}`,
          order_id: createData.order_id,
          prefill: {
            name: formData.full_name,
            email: formData.email,
            contact: formData.phone,
          },
          notes: {
            registration_id: createData.registration_id,
            college: formData.college,
            track: formData.track,
          },
          theme: { color: '#6366f1' },
        });
      } catch (err) {
        if (err instanceof Error && err.message === 'dismissed') {
          setFlowState(prev => ({ ...prev, status: 'cancelled' }));
          navigate('/payment/failure', {
            state: {
              reason: 'cancelled',
              orderId: createData.order_id,
              registrationId: createData.registration_id,
              formData,
            },
          });
          return;
        }
        throw err;
      }

      // ── Step 5: Verify payment signature (server-side) ──────
      setFlowState(prev => ({
        ...prev,
        status: 'verifying',
        paymentId: paymentResponse.razorpay_payment_id,
      }));

      const verifyRes = await fetch(`${supabaseUrl}/functions/v1/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
          'apikey': supabaseAnonKey,
        },
        body: JSON.stringify({
          order_id: paymentResponse.razorpay_order_id,
          payment_id: paymentResponse.razorpay_payment_id,
          signature: paymentResponse.razorpay_signature,
          registration_id: createData.registration_id,
        }),
      });

      const verifyData: VerifyPaymentResponse = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success) {
        throw new Error(verifyData.error ?? 'Payment verification failed');
      }

      // ── Step 6: Navigate to success ─────────────────────────
      setFlowState({
        status: 'success',
        registrationId: createData.registration_id,
        orderId: createData.order_id,
        paymentId: paymentResponse.razorpay_payment_id,
        amount: createData.amount,
        currency: createData.currency,
      });

      navigate('/payment/success', {
        state: {
          registrationId: createData.registration_id,
          paymentId: paymentResponse.razorpay_payment_id,
          orderId: createData.order_id,
          amount: createData.amount,
          currency: createData.currency,
          formData,
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      console.error('[usePayment]', message);
      setFlowState(prev => ({ ...prev, status: 'error', error: message }));
    }
  }, [navigate]);

  const reset = useCallback(() => {
    setFlowState({ status: 'idle' });
  }, []);

  return { flowState, initiatePayment, reset };
}
