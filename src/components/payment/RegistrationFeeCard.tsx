import { Link } from 'react-router-dom';
import { ArrowRight, CreditCard, Shield, Zap, Sparkles, Check, Clock } from 'lucide-react';
import { useEventConfig } from '../../hooks/useEventConfig';

export default function RegistrationFeeCard() {
  const { loading } = useEventConfig();

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tier Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Early Bird Tier */}
        <div className="glass-card relative overflow-hidden p-8 border-emerald-500/40 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent flex flex-col justify-between">
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
              <Sparkles size={12} /> Early Bird Offer
            </span>
          </div>

          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6">
              <Zap size={22} className="text-emerald-400" />
            </div>

            <h3 className="font-display font-bold text-white text-xl mb-1">Early Bird Registration</h3>
            <p className="text-gray-400 text-xs mb-6 flex items-center gap-1.5">
              <Clock size={13} className="text-emerald-400" /> Limited time slot for early teams
            </p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display text-5xl font-black text-white">₹150</span>
              <span className="text-emerald-400 font-semibold text-sm">/ Per Team</span>
            </div>

            <div className="border-t border-white/10 pt-6 mb-8">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">What's included:</div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-emerald-400" />
                  </div>
                  Complete team entry (Up to 4 members)
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-emerald-400" />
                  </div>
                  48-hour hackathon access & workspace
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-emerald-400" />
                  </div>
                  1-on-1 industry mentor guidance
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-emerald-400" />
                  </div>
                  Certificate of Participation & Swag pack
                </li>
              </ul>
            </div>
          </div>

          <Link
            to="/register"
            className="btn-primary w-full justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 shadow-lg shadow-emerald-600/30"
          >
            Claim Early Bird (₹150) <ArrowRight size={16} />
          </Link>
        </div>

        {/* Standard Tier */}
        <div className="glass-card relative overflow-hidden p-8 border-brand-500/40 bg-gradient-to-b from-brand-500/10 via-transparent to-transparent flex flex-col justify-between">
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/40">
              Standard Pass
            </span>
          </div>

          <div>
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center mb-6">
              <CreditCard size={22} className="text-brand-400" />
            </div>

            <h3 className="font-display font-bold text-white text-xl mb-1">Standard Registration</h3>
            <p className="text-gray-400 text-xs mb-6">Regular admission for teams</p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display text-5xl font-black text-white">₹200</span>
              <span className="text-brand-400 font-semibold text-sm">/ Per Team</span>
            </div>

            <div className="border-t border-white/10 pt-6 mb-8">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">What's included:</div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-brand-400" />
                  </div>
                  Complete team entry (Up to 4 members)
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-brand-400" />
                  </div>
                  48-hour hackathon access & judging
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-brand-400" />
                  </div>
                  Technical workshops & expo entry
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-brand-400" />
                  </div>
                  Certificate of Participation & event swag
                </li>
              </ul>
            </div>
          </div>

          <Link
            to="/register"
            className="btn-primary w-full justify-center text-white font-semibold py-3.5"
          >
            Register Standard (₹200) <ArrowRight size={16} />
          </Link>
        </div>

      </div>

      {/* Security note */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <Shield size={13} className="text-brand-400" /> 100% Secure Razorpay Checkout
        </span>
        <span>•</span>
        <span>Per Team Fee covers all team members</span>
        <span>•</span>
        <span>Instant Confirmation & Receipt</span>
      </div>
    </div>
  );
}
