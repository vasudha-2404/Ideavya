import { CheckCircle, Download, Calendar, User, Mail, School, Users, CreditCard, Gift } from 'lucide-react';

export interface ReceiptData {
  eventName?: string;
  participantName: string;
  email: string;
  college: string;
  team?: string;
  track: string;
  amount: number;
  currency: string;
  paymentId?: string;
  orderId?: string;
  status: string;
  date: string;
  isFree?: boolean;
}

interface ReceiptCardProps {
  data: ReceiptData;
  showDownload?: boolean;
  onDownload?: () => void;
}

function formatAmount(amount: number, currency: string, isFree?: boolean): string {
  if (isFree || amount === 0) return 'FREE';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount / 100);
}

function Row({ label, value, icon: Icon }: { label: string; value: string; icon: typeof User }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
      <Icon size={14} className="text-brand-400 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-gray-500 text-xs mb-0.5">{label}</div>
        <div className="text-white text-sm font-medium truncate">{value}</div>
      </div>
    </div>
  );
}

export default function ReceiptCard({ data, showDownload, onDownload }: ReceiptCardProps) {
  const isFree = data.isFree || data.status === 'free' || data.amount === 0;
  const formattedDate = new Date(data.date).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
      return;
    }
    window.print();
  };

  return (
    <div className="glass-card overflow-hidden border-emerald-500/20">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-emerald-500/10 to-brand-500/10 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle size={20} className="text-emerald-400" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-sm tracking-wide">
                {data.eventName ?? 'IDEAVYA 2026'}
              </div>
              <div className="text-emerald-400 text-xs font-semibold">Payment Receipt</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-display font-black text-2xl text-white">
              {formatAmount(data.amount, data.currency, isFree)}
            </div>
            <div className="text-gray-500 text-xs">{data.currency}</div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 space-y-0">
        <Row label="Participant" value={data.participantName} icon={User} />
        <Row label="Email" value={data.email} icon={Mail} />
        <Row label="Institution" value={data.college} icon={School} />
        <Row label="Track" value={data.track} icon={CheckCircle} />
        <Row
          label="Participation Type"
          value={data.team ? `Team — ${data.team}` : 'Individual'}
          icon={Users}
        />
        <Row label="Date & Time" value={formattedDate} icon={Calendar} />
        {!isFree && data.paymentId && (
          <Row label="Payment ID" value={data.paymentId} icon={CreditCard} />
        )}
        {!isFree && data.orderId && (
          <Row label="Order ID" value={data.orderId} icon={CreditCard} />
        )}
        {isFree && (
          <Row label="Payment Mode" value="Free Registration" icon={Gift} />
        )}
      </div>

      {/* Footer */}
      {showDownload && (
        <div className="px-5 pb-5">
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 text-sm font-medium transition-all"
          >
            <Download size={14} /> Download Receipt
          </button>
        </div>
      )}
    </div>
  );
}
