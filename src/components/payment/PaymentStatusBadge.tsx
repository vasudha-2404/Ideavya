import type { TransactionStatus } from '../../types/payment';
import { CheckCircle, XCircle, Clock, Ban, Gift } from 'lucide-react';

interface Props {
  status: TransactionStatus;
  size?: 'sm' | 'md' | 'lg';
}

const CONFIG: Record<TransactionStatus, {
  label: string;
  icon: typeof CheckCircle;
  className: string;
}> = {
  success:   { label: 'Successful',  icon: CheckCircle, className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  failed:    { label: 'Failed',      icon: XCircle,     className: 'bg-red-500/15 text-red-400 border-red-500/30' },
  pending:   { label: 'Pending',     icon: Clock,       className: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30' },
  cancelled: { label: 'Cancelled',   icon: Ban,         className: 'bg-gray-500/15 text-gray-400 border-gray-500/30' },
  free:      { label: 'Free',        icon: Gift,        className: 'bg-brand-500/15 text-brand-400 border-brand-500/30' },
};

export default function PaymentStatusBadge({ status, size = 'md' }: Props) {
  const { label, icon: Icon, className } = CONFIG[status] ?? CONFIG.pending;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-3 py-1 gap-1.5',
    lg: 'text-base px-4 py-1.5 gap-2',
  }[size];

  const iconSize = { sm: 12, md: 14, lg: 16 }[size];

  return (
    <span className={`inline-flex items-center rounded-full border font-semibold ${className} ${sizeClasses}`}>
      <Icon size={iconSize} />
      {label}
    </span>
  );
}
