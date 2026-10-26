import { useLocation, Link, useNavigate } from 'react-router-dom';
import { XCircle, RefreshCcw, Home, HeadphonesIcon, AlertTriangle } from 'lucide-react';
import { loadRazorpayScript, openRazorpayCheckout } from '../lib/razorpay';
import { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface FailureState {
  reason?: 'cancelled' | 'failed' | 'verification_failed' | string;
  orderId?: string;
  registrationId?: string;
  error?: string;
  formData?: {
    full_name: string;
    email: string;
    phone: string;
    track: string;
  };
}

export default function PaymentFailurePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const s = (state as FailureState) ?? {};
  const [retrying, setRetrying] = useState(false);
  const [retryError, setRetryError] = useState<string | null>(null);

  const isCancelled = s.reason === 'cancelled';

  const handleRetry = async () => {
    if (!s.orderId || !s.registrationId || !isSupabaseConfigured || !supabase) {
      navigate('/register');
      return;
    }

    setRetrying(true);
    setRetryError(null);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co') {
        throw new Error('Payment gateway not configured.');
      }

      // Fetch order details from DB
      const { data: order, error: orderErr } = await supabase!
        .from('payment_orders')
        .select('razorpay_order_id, amount, currency')
        .eq('registration_id', s.registrationId)
        .single();

      if (orderErr || !order) throw new Error('Could not retrieve order details for retry.');

      const { data: { session } } = await supabase!.auth.getSession();
      const authHeader = session?.access_token
        ? `Bearer ${session.access_token}`
        : `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`;

      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error('Failed to load Razorpay. Check your internet connection.');

      let paymentResponse;
      try {
        paymentResponse = await openRazorpayCheckout({
          key: razorpayKeyId,
          amount: order.amount,
          currency: order.currency,
          name: 'IDEAVYA 2026',
          description: `Registration — ${s.formData?.track ?? 'Hackathon'}`,
          order_id: order.razorpay_order_id,
          prefill: {
            name: s.formData?.full_name,
            email: s.formData?.email,
            contact: s.formData?.phone,
          },
          theme: { color: '#6366f1' },
        });
      } catch (err) {
        if (err instanceof Error && err.message === 'dismissed') {
          setRetryError('Payment cancelled again. Try again when ready.');
          setRetrying(false);
          return;
        }
        throw err;
      }

      // Verify the retry payment
      const verifyRes = await fetch(`${supabaseUrl}/functions/v1/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          order_id: paymentResponse.razorpay_order_id,
          payment_id: paymentResponse.razorpay_payment_id,
          signature: paymentResponse.razorpay_signature,
          registration_id: s.registrationId,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.success) throw new Error(verifyData.error ?? 'Verification failed');

      navigate('/payment/success', {
        state: {
          registrationId: s.registrationId,
          paymentId: paymentResponse.razorpay_payment_id,
          orderId: paymentResponse.razorpay_order_id,
          amount: order.amount,
          currency: order.currency,
          formData: s.formData,
        },
      });
    } catch (err) {
      setRetryError(err instanceof Error ? err.message : 'Retry failed. Please try again.');
      setRetrying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-16 px-4">
      <div className="max-w-md mx-auto text-center">

        {/* Icon */}
        <div className="relative inline-flex mb-8">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 ${
            isCancelled
              ? 'bg-yellow-500/20 border-yellow-500/40'
              : 'bg-red-500/20 border-red-500/40'
          }`}>
            {isCancelled
              ? <AlertTriangle size={36} className="text-yellow-400" />
              : <XCircle size={36} className="text-red-400" />
            }
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-display text-4xl font-bold text-white mb-3">
          {isCancelled ? 'Payment Cancelled' : 'Payment Failed'}
        </h1>
        <p className="text-gray-400 mb-2">
          {isCancelled
            ? 'You closed the payment window before completing the transaction.'
            : 'Something went wrong during the payment process.'
          }
        </p>

        {(s.error || retryError) && (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6 mt-4">
            {retryError ?? s.error}
          </p>
        )}

        {/* Order info */}
        {s.orderId && (
          <div className="glass-card p-4 mb-8 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Order ID</span>
              <span className="text-gray-300 font-mono text-xs">{s.orderId}</span>
            </div>
            {s.formData?.full_name && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Participant</span>
                <span className="text-gray-300">{s.formData.full_name}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span className={isCancelled ? 'text-yellow-400' : 'text-red-400'}>
                {isCancelled ? 'Cancelled' : 'Failed'}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {s.orderId ? (
            <button
              id="retry-payment-btn"
              onClick={handleRetry}
              disabled={retrying}
              className="btn-primary justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {retrying ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Opening payment…
                </span>
              ) : (
                <>
                  <RefreshCcw size={16} />
                  {isCancelled ? 'Complete Payment' : 'Retry Payment'}
                </>
              )}
            </button>
          ) : (
            <Link to="/register" id="re-register-btn" className="btn-primary justify-center py-3.5">
              <RefreshCcw size={16} />
              Try Again
            </Link>
          )}

          <Link to="/" id="failure-home-btn" className="btn-outline justify-center">
            <Home size={16} />
            Back to Home
          </Link>

          <a
            href="mailto:support@IDEAVYA.io"
            id="contact-support-btn"
            className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-300 text-sm transition-colors py-2"
          >
            <HeadphonesIcon size={14} />
            Contact support
          </a>
        </div>

        <p className="text-gray-600 text-xs mt-8">
          No money has been deducted from your account for failed transactions.
          Contact your bank if you see an unexpected charge.
        </p>
      </div>
    </div>
  );
}
