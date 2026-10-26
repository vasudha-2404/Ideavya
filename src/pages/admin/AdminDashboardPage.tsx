import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ShieldCheck, TrendingUp, CheckCircle, XCircle, Clock,
  Search, Download, RefreshCcw, AlertCircle, Loader2, Ban, Gift
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import PaymentStatusBadge from '../../components/payment/PaymentStatusBadge';
import type { PaymentTransaction, Registration, AdminFilter } from '../../types/payment';

interface AdminRecord {
  transaction: PaymentTransaction;
  registration: Registration;
}

const FILTERS: { key: AdminFilter; label: string; icon: typeof CheckCircle }[] = [
  { key: 'all',       label: 'All',        icon: TrendingUp },
  { key: 'success',   label: 'Successful', icon: CheckCircle },
  { key: 'free',      label: 'Free',       icon: Gift },
  { key: 'pending',   label: 'Pending',    icon: Clock },
  { key: 'failed',    label: 'Failed',     icon: XCircle },
  { key: 'cancelled', label: 'Cancelled',  icon: Ban },
];

function formatAmount(amount: number, currency: string): string {
  if (amount === 0) return '₹0';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount / 100);
}

export default function AdminDashboardPage() {
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get('admin') === 'true';

  const [records, setRecords] = useState<AdminRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<AdminFilter>('all');
  const [search, setSearch] = useState('');
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const configured = isSupabaseConfigured;

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!supabase) { setError('Supabase not configured'); setLoading(false); return; }
      const { data: transactions, error: txnErr } = await supabase
        .from('payment_transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (txnErr) throw txnErr;

      const regIds = [...new Set((transactions ?? []).map(t => t.registration_id))];

      let registrations: Registration[] = [];
      if (regIds.length > 0) {
        const { data: regs, error: regErr } = await supabase!
          .from('registrations')
          .select('*')
          .in('id', regIds);
        if (regErr) throw regErr;
        registrations = regs as Registration[];
      }

      const combined: AdminRecord[] = (transactions ?? []).map(txn => ({
        transaction: txn as PaymentTransaction,
        registration: registrations.find(r => r.id === txn.registration_id) ?? {
          id: txn.registration_id,
          full_name: 'Unknown',
          email: '—',
          phone: '—',
          college: '—',
          track: '—',
          participant_type: 'individual',
          created_at: txn.created_at,
        } as Registration,
      }));

      setRecords(combined);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin && configured) fetchRecords();
  }, [isAdmin, configured]);

  // Stats
  const totalCollected = records
    .filter(r => r.transaction.status === 'success')
    .reduce((sum, r) => sum + r.transaction.amount, 0);

  const counts = records.reduce((acc, r) => {
    acc[r.transaction.status] = (acc[r.transaction.status] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Filter + search
  const filtered = records.filter(r => {
    const matchesFilter = filter === 'all' || r.transaction.status === filter;
    const q = search.toLowerCase();
    const matchesSearch = !q ||
      r.registration.full_name.toLowerCase().includes(q) ||
      r.registration.email.toLowerCase().includes(q) ||
      r.registration.college.toLowerCase().includes(q) ||
      (r.transaction.razorpay_payment_id ?? '').toLowerCase().includes(q) ||
      (r.transaction.razorpay_order_id ?? '').toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const exportCSV = () => {
    const rows = [
      ['Name', 'Email', 'College', 'Team', 'Track', 'Amount', 'Status', 'Payment ID', 'Order ID', 'Method', 'Date'],
      ...filtered.map(r => [
        r.registration.full_name,
        r.registration.email,
        r.registration.college,
        r.registration.team_name ?? '',
        r.registration.track,
        r.transaction.amount === 0 ? 'FREE' : (r.transaction.amount / 100).toFixed(2),
        r.transaction.status,
        r.transaction.razorpay_payment_id ?? '',
        r.transaction.razorpay_order_id ?? '',
        r.transaction.method ?? '',
        new Date(r.transaction.created_at).toLocaleString('en-IN'),
      ]),
    ];
    const csv = rows.map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IDEAVYA-payments-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center glass-card p-10 max-w-md w-full">
          <ShieldCheck size={40} className="text-red-400 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-400 text-sm">
            Add <code className="text-brand-400 font-mono">?admin=true</code> to the URL to access this dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
              <ShieldCheck size={18} className="text-brand-400" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-500 text-sm">
                {lastRefresh ? `Last updated: ${lastRefresh.toLocaleTimeString('en-IN')}` : 'Payment records'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              id="admin-refresh-btn"
              onClick={fetchRecords}
              disabled={loading}
              className="btn-outline text-sm px-4 py-2"
            >
              <RefreshCcw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              id="admin-export-btn"
              onClick={exportCSV}
              disabled={filtered.length === 0}
              className="btn-primary text-sm px-4 py-2"
            >
              <Download size={14} />
              Export CSV
            </button>
          </div>
        </div>

        {!configured && (
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm mb-6">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span><strong>Test Mode —</strong> Supabase not configured. Configure <code className="font-mono text-xs">.env.local</code> to see real data.</span>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Collected', value: formatAmount(totalCollected, 'INR'), color: 'text-brand-400', bg: 'bg-brand-500/10 border-brand-500/20' },
            { label: 'Successful', value: counts.success ?? 0, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
            { label: 'Free', value: counts.free ?? 0, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
            { label: 'Failed', value: counts.failed ?? 0, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
            { label: 'Pending/Cancelled', value: (counts.pending ?? 0) + (counts.cancelled ?? 0), color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
          ].map(stat => (
            <div key={stat.label} className={`glass-card p-4 border ${stat.bg}`}>
              <div className={`font-display text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map(f => (
              <button
                key={f.key}
                id={`filter-${f.key}`}
                onClick={() => setFilter(f.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === f.key
                    ? 'bg-brand-500/20 border border-brand-500/40 text-brand-300'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <f.icon size={12} />
                {f.label}
                <span className="text-gray-600 ml-0.5">
                  ({f.key === 'all' ? records.length : (counts[f.key] ?? 0)})
                </span>
              </button>
            ))}
          </div>
          <div className="relative sm:ml-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="admin-search-input"
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search name, email, payment ID…"
              className="pl-8 pr-4 py-1.5 w-full sm:w-64 rounded-lg bg-white/5 border border-white/15 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-500/50"
            />
          </div>
        </div>

        {/* Table */}
        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 size={24} className="text-brand-400 animate-spin" />
          </div>
        )}

        {error && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            <AlertCircle size={16} className="shrink-0 mt-0.5" /> {error}
          </div>
        )}

        {!loading && !error && (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/3">
                    {['Participant', 'College / Track', 'Amount', 'Status', 'Method', 'Payment ID', 'Date'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                        No records found{search ? ` for "${search}"` : ''}.
                      </td>
                    </tr>
                  ) : (
                    filtered.map(({ transaction: txn, registration: reg }) => (
                      <tr key={txn.id} className="hover:bg-white/3 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-white whitespace-nowrap">{reg.full_name}</div>
                          <div className="text-gray-500 text-xs">{reg.email}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-gray-300 text-xs whitespace-nowrap">{reg.college}</div>
                          <div className="text-gray-500 text-xs">{reg.track}</div>
                        </td>
                        <td className="px-4 py-3 font-medium text-white whitespace-nowrap">
                          {txn.status === 'free' ? <span className="text-emerald-400">FREE</span> : formatAmount(txn.amount, txn.currency)}
                        </td>
                        <td className="px-4 py-3">
                          <PaymentStatusBadge status={txn.status} size="sm" />
                        </td>
                        <td className="px-4 py-3 text-gray-400 capitalize">{txn.method ?? '—'}</td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-xs text-gray-500">
                            {txn.razorpay_payment_id ? txn.razorpay_payment_id.slice(0, 18) + '…' : '—'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                          {new Date(txn.created_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {filtered.length > 0 && (
              <div className="px-4 py-3 border-t border-white/10 text-gray-500 text-xs">
                Showing {filtered.length} of {records.length} records
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
