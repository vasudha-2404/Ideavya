import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Gift, History, Home } from 'lucide-react';
import ReceiptCard from '../components/payment/ReceiptCard';

interface SuccessState {
  registrationId?: string;
  paymentId?: string;
  orderId?: string;
  amount?: number;
  currency?: string;
  isFree?: boolean;
  formData?: {
    full_name: string;
    email: string;
    college: string;
    team_name?: string;
    track: string;
  };
}

export default function PaymentSuccessPage() {
  const { state } = useLocation();
  const s = (state as SuccessState) ?? {};

  const receiptData = {
    eventName: 'IDEAVYA 2026',
    participantName: s.formData?.full_name ?? 'Participant',
    email: s.formData?.email ?? '—',
    college: s.formData?.college ?? '—',
    team: s.formData?.team_name,
    track: s.formData?.track ?? '—',
    amount: s.amount ?? 0,
    currency: s.currency ?? 'INR',
    paymentId: s.paymentId,
    orderId: s.orderId,
    status: (s.isFree ? 'free' : 'success') as 'free' | 'success',
    date: new Date().toISOString(),
    isFree: s.isFree,
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-16 px-4">
      <div className="max-w-lg mx-auto">
        {/* Success header */}
        <div className="text-center mb-10">
          <div className="relative inline-flex mb-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center">
              {s.isFree
                ? <Gift size={36} className="text-emerald-400" />
                : <CheckCircle size={36} className="text-emerald-400" />
              }
            </div>
            {/* Ripple rings */}
            <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-ping" />
          </div>

          <h1 className="font-display text-4xl font-bold text-white mb-3">
            {s.isFree ? '🎉 You\'re Registered!' : '🎉 Payment Successful!'}
          </h1>
          <p className="text-gray-400">
            {s.isFree
              ? 'Your spot is confirmed. Welcome to IDEAVYA 2026!'
              : 'Your payment has been verified and your spot is confirmed.'
            }
          </p>

          {s.paymentId && (
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
              <CheckCircle size={13} />
              Payment ID: <span className="font-mono text-xs">{s.paymentId}</span>
            </div>
          )}
        </div>

        {/* Receipt */}
        <ReceiptCard data={receiptData} showDownload />

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Link to="/payment/history" id="view-history-btn" className="btn-outline flex-1 justify-center text-sm">
            <History size={15} />
            My Payments
          </Link>
          <Link to="/" id="go-home-btn" className="btn-primary flex-1 justify-center text-sm">
            <Home size={15} />
            Go Home
          </Link>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          A confirmation email will be sent shortly. Check your spam folder if you don't see it.
        </p>
      </div>
    </div>
  );
}
