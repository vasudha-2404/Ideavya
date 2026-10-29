import { Link } from 'react-router-dom';
import { ArrowRight, CreditCard, Shield, Zap, Check, Clock } from 'lucide-react';
import { useEventConfig } from '../../hooks/useEventConfig';

export default function RegistrationFeeCard() {
  const { loading } = useEventConfig();

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tier Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Early Bird Tier - Blue & White */}
        <div className="glass-card relative overflow-hidden p-6 sm:p-8 border-blue-400/40 bg-gradient-to-b from-blue-600/15 via-midnight-850/70 to-midnight-950/90 flex flex-col justify-between group hover:border-blue-300 transition-all duration-300 shadow-xl shadow-blue-950/30">
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-200 border border-blue-400/40 shadow-sm">
              <Zap size={12} className="text-blue-300" /> Early Bird Pass
            </span>
          </div>

          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-400/40 flex items-center justify-center mb-6 text-blue-200 shadow-md shadow-blue-600/20">
              <Zap size={22} className="text-blue-300" />
            </div>

            <h3 className="font-display font-bold text-white text-xl sm:text-2xl mb-1">Early Bird Registration</h3>
            <p className="text-slate-300 text-xs mb-6 flex items-center gap-1.5">
              <Clock size={13} className="text-blue-400" /> Limited time slot for early applicant teams
            </p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300 drop-shadow-[0_2px_15px_rgba(59,130,246,0.4)]">₹150</span>
              <span className="text-blue-200 font-semibold text-sm">/ Per Team</span>
            </div>

            <div className="border-t border-white/10 pt-6 mb-8">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">What's included:</div>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-blue-300" />
                  </div>
                  <span>Complete team entry (Up to 4 members)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-blue-300" />
                  </div>
                  <span>48-hour hackathon access &amp; workspace</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-blue-300" />
                  </div>
                  <span>1-on-1 industry mentor guidance</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-blue-300" />
                  </div>
                  <span>Certificate of Participation &amp; Swag pack</span>
                </li>
              </ul>
            </div>
          </div>

          <Link
            to="/register"
            className="btn-primary w-full justify-center text-white font-semibold py-3.5 shadow-lg shadow-blue-600/30"
          >
            Claim Early Bird (₹150) <ArrowRight size={16} />
          </Link>
        </div>

        {/* Standard Tier - Pure White & Royal Navy */}
        <div className="glass-card relative overflow-hidden p-6 sm:p-8 border-white/20 bg-gradient-to-b from-white/[0.06] via-midnight-850/70 to-midnight-950/90 flex flex-col justify-between group hover:border-blue-400/50 transition-all duration-300 shadow-xl shadow-blue-950/20">
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
              Standard Pass
            </span>
          </div>

          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 text-white shadow-md">
              <CreditCard size={22} className="text-blue-300" />
            </div>

            <h3 className="font-display font-bold text-white text-xl sm:text-2xl mb-1">Standard Registration</h3>
            <p className="text-slate-400 text-xs mb-6">Regular admission for teams</p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200 drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">₹200</span>
              <span className="text-slate-300 font-semibold text-sm">/ Per Team</span>
            </div>

            <div className="border-t border-white/10 pt-6 mb-8">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">What's included:</div>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-blue-300" />
                  </div>
                  <span>Complete team entry (Up to 4 members)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-blue-300" />
                  </div>
                  <span>48-hour hackathon access &amp; judging</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-blue-300" />
                  </div>
                  <span>Technical workshops &amp; expo entry</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-blue-300" />
                  </div>
                  <span>Certificate of Participation &amp; event swag</span>
                </li>
              </ul>
            </div>
          </div>

          <Link
            to="/register"
            className="btn-outline w-full justify-center text-white font-semibold py-3.5 border-white/30 hover:border-blue-300 hover:bg-blue-600/20"
          >
            Get Standard Pass (₹200) <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Guarantee & Rule Note */}
      <div className="mt-6 p-4 rounded-xl glass-card border-blue-400/30 flex items-center gap-3 text-xs text-slate-300">
        <Shield size={16} className="text-blue-400 shrink-0" />
        <span>
          <strong className="text-white">Fixed Fee Per Team:</strong> Both passes cover the complete registered team (2 to 4 members). No individual per-head payment required.
        </span>
      </div>
    </div>
  );
}
