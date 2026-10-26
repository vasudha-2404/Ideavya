import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard, ShieldCheck, CheckCircle2,
  Clock, Sparkles, History, ArrowRight
} from 'lucide-react';
import RegistrationFeeCard from '../../components/payment/RegistrationFeeCard';

export default function PaymentPage() {
  const [selectedTier, setSelectedTier] = useState<'early' | 'standard'>('early');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoMsg, setPromoMsg] = useState<string | null>(null);

  const basePrice = selectedTier === 'early' ? 150 : 200;
  const finalPrice = Math.max(0, basePrice - promoDiscount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'MITSINNOVATE' || promoCode.trim().toUpperCase() === 'PATHVISION') {
      setPromoDiscount(50);
      setPromoMsg('Discount of ₹50 applied successfully!');
    } else {
      setPromoDiscount(0);
      setPromoMsg('Invalid promo code. Use MITSINNOVATE or PATHVISION for test discount.');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-300 text-xs font-semibold mb-3">
          <Sparkles size={14} className="text-brand-400" />
          IDEAVYA 2026 Registration Pass
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          Team Registration & Pass
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          One flat fee covers your entire team (2 to 4 members) across both days (10 & 11 November 2026).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tier Cards (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Early Bird */}
            <div
              onClick={() => setSelectedTier('early')}
              className={`cursor-pointer glass-card p-6 rounded-3xl border transition-all ${
                selectedTier === 'early'
                  ? 'border-emerald-500/60 bg-emerald-500/10 ring-1 ring-emerald-500/40'
                  : 'border-white/10 bg-gray-900/60 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Early Bird Pass
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                  Save ₹50
                </span>
              </div>
              <div className="text-3xl font-display font-extrabold text-white mb-2">
                ₹150 <span className="text-xs text-gray-400 font-normal">/ Team</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Exclusive early entry pricing for innovative student squads.
              </p>
              <ul className="text-xs text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  Full team entry (2–4 members)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  Mentorship from Pathvision leaders
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  Official e-certificates & food coupons
                </li>
              </ul>
            </div>

            {/* Standard Tier */}
            <div
              onClick={() => setSelectedTier('standard')}
              className={`cursor-pointer glass-card p-6 rounded-3xl border transition-all ${
                selectedTier === 'standard'
                  ? 'border-brand-500/60 bg-brand-500/10 ring-1 ring-brand-500/40'
                  : 'border-white/10 bg-gray-900/60 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                  Standard Pass
                </span>
                <span className="text-[10px] bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded-full font-semibold">
                  Regular
                </span>
              </div>
              <div className="text-3xl font-display font-extrabold text-white mb-2">
                ₹200 <span className="text-xs text-gray-400 font-normal">/ Team</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Standard team entry fee for IDEAVYA 2026.
              </p>
              <ul className="text-xs text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-brand-400 shrink-0" />
                  Full team entry (2–4 members)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-brand-400 shrink-0" />
                  Level 1, 2 and Finale eligibility
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-brand-400 shrink-0" />
                  ₹12,500 Prize Pool access
                </li>
              </ul>
            </div>
          </div>

          {/* Pricing Info Banner */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 bg-gray-900/60 flex items-start gap-4">
            <Clock size={20} className="text-cyan-400 shrink-0 mt-1" />
            <div className="text-xs text-gray-300 leading-relaxed">
              <strong className="text-white block mb-0.5">Important Note on Fees: </strong>
              The registration fee is per team (NOT per individual). Each team only pays once. Payments are processed securely via official Razorpay gateway with verifiable cryptographic signatures.
            </div>
          </div>

          <RegistrationFeeCard />
        </div>

        {/* Checkout Summary (Right Col) */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-white/10 bg-gray-900/80 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-3 border-b border-white/10 flex items-center justify-between">
              <span>Checkout Summary</span>
              <CreditCard size={16} className="text-brand-400" />
            </h3>

            <div className="space-y-3 text-xs text-gray-300 mb-6">
              <div className="flex justify-between">
                <span>Selected Tier:</span>
                <span className="font-semibold text-white capitalize">{selectedTier} Pass</span>
              </div>
              <div className="flex justify-between">
                <span>Base Team Fee:</span>
                <span className="font-semibold text-white">₹{basePrice}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon Discount:</span>
                  <span>-₹{promoDiscount}</span>
                </div>
              )}
              <div className="pt-3 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                <span>Total Payable:</span>
                <span className="text-xl text-brand-300 font-mono">₹{finalPrice}</span>
              </div>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="mb-6 space-y-2">
              <label className="block text-[11px] font-semibold text-gray-400 uppercase">
                Promo or Partner Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="e.g. MITSINNOVATE"
                  className="flex-1 bg-gray-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase font-mono placeholder-gray-600 focus:outline-none focus:border-brand-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
                >
                  Apply
                </button>
              </div>
              {promoMsg && (
                <p className={`text-[11px] ${promoDiscount > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {promoMsg}
                </p>
              )}
            </form>

            {/* Checkout Action */}
            <Link
              to="/register"
              className="w-full btn-primary py-3 justify-center text-xs font-semibold flex items-center gap-2 shadow-lg shadow-brand-500/25"
            >
              Proceed to Registration & Pay
              <ArrowRight size={14} />
            </Link>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>256-bit Encrypted Checkout</span>
            </div>

            {/* Link to previous payments */}
            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <Link
                to="/payment/history"
                className="text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <History size={13} />
                View Past Receipts & History
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
