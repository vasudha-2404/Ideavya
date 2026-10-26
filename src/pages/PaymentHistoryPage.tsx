import { useState } from 'react';
import { Link } from 'react-router-dom';
import { History, AlertCircle, Loader2, Download, RefreshCcw, Receipt } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import PaymentStatusBadge from '../components/payment/PaymentStatusBadge';
import ReceiptCard from '../components/payment/ReceiptCard';
import type { PaymentTransaction, Registration, TransactionStatus } from '../types/payment';

interface Record {
  transaction: PaymentTransaction;
  registration: Registration;
}

function formatAmount(amount: number, currency: string, status: TransactionStatus): string {
  if (status === 'free' || amount === 0) return 'FREE';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount / 100);
}

export default function PaymentHistoryPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  const configured = isSupabaseConfigured;

  const fetchHistory = async (emailAddr: string) => {
    setLoading(true);
    setError(null);
    try {
      if (!supabase) throw new Error('Supabase not configured');
      const { data: registrations, error: regErr } = await supabase
        .from('registrations')
        .select('id, full_name, email, college, team_name, track, participant_type, created_at')
        .eq('email', emailAddr.toLowerCase().trim());

      if (regErr) throw regErr;
      if (!registrations?.length) {
        setRecords([]);
        setLoading(false);
        return;
      }

      const regIds = registrations.map(r => r.id);

      const { data: transactions, error: txnErr } = await supabase!
        .from('payment_transactions')
        .select('*')
        .in('registration_id', regIds)
        .order('created_at', { ascending: false });

      if (txnErr) throw txnErr;

      const combined: Record[] = (transactions ?? []).map(txn => ({
        transaction: txn as PaymentTransaction,
        registration: registrations.find(r => r.id === txn.registration_id)! as Registration,
      }));

      setRecords(combined);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load payment history');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Enter a valid email address');
      return;
    }
    setSubmitted(true);
    fetchHistory(email);
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
            <History size={18} className="text-brand-400" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Payment History</h1>
            <p className="text-gray-500 text-sm">View and download your payment receipts</p>
          </div>
        </div>

        {!configured && (
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm mb-6">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span><strong>Test Mode —</strong> Supabase not configured. Real data unavailable.</span>
          </div>
        )}

        {/* Receipt modal */}
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedRecord(null)}>
            <div onClick={e => e.stopPropagation()} className="w-full max-w-lg">
              <ReceiptCard
                data={{
                  eventName: 'IDEAVYA 2026',
                  participantName: selectedRecord.registration.full_name,
                  email: selectedRecord.registration.email,
                  college: selectedRecord.registration.college,
                  team: selectedRecord.registration.team_name,
                  track: selectedRecord.registration.track,
                  amount: selectedRecord.transaction.amount,
                  currency: selectedRecord.transaction.currency,
                  paymentId: selectedRecord.transaction.razorpay_payment_id,
                  orderId: selectedRecord.transaction.razorpay_order_id,
                  status: selectedRecord.transaction.status,
                  date: selectedRecord.transaction.created_at,
                  isFree: selectedRecord.transaction.status === 'free',
                }}
                showDownload
              />
              <button
                onClick={() => setSelectedRecord(null)}
                className="mt-3 w-full text-center text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                ✕ Close
              </button>
            </div>
          </div>
        )}

        {/* Email lookup form */}
        {!submitted && (
          <form onSubmit={handleSubmit} className="glass-card p-6 mb-6">
            <p className="text-gray-400 text-sm mb-4">Enter your registered email to view your payment history.</p>
            <div className="flex gap-3">
              <input
                id="history-email-input"
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(null); }}
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20"
              />
              <button id="history-search-btn" type="submit" className="btn-primary text-sm px-5 py-2.5">
                Search
              </button>
            </div>
            {error && <p className="mt-2 text-xs text-red-400 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
          </form>
        )}

        {/* Results */}
        {submitted && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm">Results for <span className="text-white font-medium">{email}</span></p>
              <button
                onClick={() => { setSubmitted(false); setRecords([]); setEmail(''); }}
                className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                <RefreshCcw size={13} /> Search again
              </button>
            </div>

            {loading && (
              <div className="flex justify-center py-12">
                <Loader2 size={24} className="text-brand-400 animate-spin" />
              </div>
            )}

            {!loading && error && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                <AlertCircle size={16} className="shrink-0 mt-0.5" /> {error}
              </div>
            )}

            {!loading && !error && records.length === 0 && (
              <div className="glass-card p-10 text-center">
                <Receipt size={32} className="text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No payment records found for this email.</p>
                <Link to="/register" className="btn-outline text-sm mt-4 inline-flex">Register Now</Link>
              </div>
            )}

            {!loading && records.length > 0 && (
              <div className="space-y-3">
                {records.map(({ transaction: txn, registration: reg }) => (
                  <div key={txn.id} className="glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/20 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white text-sm">{reg.full_name}</span>
                        <PaymentStatusBadge status={txn.status} size="sm" />
                      </div>
                      <p className="text-gray-500 text-xs truncate">{reg.track} · {reg.college}</p>
                      {txn.razorpay_payment_id && (
                        <p className="text-gray-600 text-xs font-mono mt-1">{txn.razorpay_payment_id}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <div className="font-display font-bold text-white">{formatAmount(txn.amount, txn.currency, txn.status)}</div>
                        <div className="text-gray-500 text-xs">{new Date(txn.created_at).toLocaleDateString('en-IN')}</div>
                      </div>
                      {(txn.status === 'success' || txn.status === 'free') && (
                        <button
                          id={`view-receipt-${txn.id}`}
                          onClick={() => setSelectedRecord({ transaction: txn, registration: reg })}
                          className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                          title="View Receipt"
                        >
                          <Download size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
