import { Link } from 'react-router-dom';
import { ArrowRight, CreditCard, Shield, Zap, Check, Clock } from 'lucide-react';
import { useEventConfig } from '../../hooks/useEventConfig';

export default function RegistrationFeeCard() {
  const { loading } = useEventConfig();

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tier Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Early Bird Tier */}
        <div className="glass-card relative overflow-hidden p-6 sm:p-8 border-cyan-400/30 bg-gradient-to-b from-cyan-500/10 via-midnight-850/60 to-midnight-950/80 flex flex-col justify-between group hover:border-cyan-400/60 transition-all duration-300">
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shadow-sm">
              <Zap size={12} className="text-cyan-400" /> Early Bird Pass
            </span>
          </div>

          <div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center mb-6 text-cyan-300 shadow-md shadow-cyan-500/20">
              <Zap size={22} className="text-cyan-400" />
            </div>

            <h3 className="font-display font-bold text-white text-xl sm:text-2xl mb-1">Early Bird Registration</h3>
            <p className="text-gray-400 text-xs mb-6 flex items-center gap-1.5">
              <Clock size={13} className="text-cyan-400" /> Limited time slot for early applicant teams
            </p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display text-4xl sm:text-5xl font-black text-white text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 drop-shadow-[0_2px_15px_rgba(34,211,238,0.3)]">₹150</span>
              <span className="text-cyan-300 font-semibold text-sm">/ Per Team</span>
            </div>

            <div className="border-t border-white/10 pt-6 mb-8">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">What's included:</div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-cyan-400" />
                  </div>
                  <span>Complete team entry (Up to 4 members)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-cyan-400" />
                  </div>
                  <span>48-hour hackathon access &amp; workspace</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-cyan-400" />
                  </div>
                  <span>1-on-1 industry mentor guidance</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-cyan-400" />
                  </div>
                  <span>Certificate of Participation &amp; Swag pack</span>
                </li>
              </ul>
            </div>
          </div>

          <Link
            to="/register"
            className="btn-primary w-full justify-center text-white font-semibold py-3.5 shadow-lg shadow-cyan-500/25"
          >
            Claim Early Bird (₹150) <ArrowRight size={16} />
          </Link>
        </div>

        {/* Standard Tier */}
        <div className="glass-card relative overflow-hidden p-6 sm:p-8 border-purple-400/30 bg-gradient-to-b from-purple-500/10 via-midnight-850/60 to-midnight-950/80 flex flex-col justify-between group hover:border-purple-400/60 transition-all duration-300">
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30">
              Standard Pass
            </span>
          </div>

          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-400/30 flex items-center justify-center mb-6 text-purple-300 shadow-md shadow-purple-500/20">
              <CreditCard size={22} className="text-purple-400" />
            </div>

            <h3 className="font-display font-bold text-white text-xl sm:text-2xl mb-1">Standard Registration</h3>
            <p className="text-gray-400 text-xs mb-6">Regular admission for teams</p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display text-4xl sm:text-5xl font-black text-white text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-300 drop-shadow-[0_2px_15px_rgba(168,85,247,0.3)]">₹200</span>
              <span className="text-purple-300 font-semibold text-sm">/ Per Team</span>
            </div>

            <div className="border-t border-white/10 pt-6 mb-8">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">What's included:</div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-purple-400" />
                  </div>
                  <span>Complete team entry (Up to 4 members)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-purple-400" />
                  </div>
                  <span>48-hour hackathon access &amp; judging</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-purple-400" />
                  </div>
                  <span>Technical workshops &amp; expo entry</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-purple-400" />
                  </div>
                  <span>Certificate of Participation &amp; event swag</span>
                </li>
              </ul>
            </div>
          </div>

          <Link
            to="/register"
            className="btn-outline w-full justify-center text-cyan-300 font-semibold py-3.5 border-purple-400/40 hover:bg-purple-500/20 hover:text-white"
          >
            Register Standard (₹200) <ArrowRight size={16} />
          </Link>
        </div>

      </div>

      {/* Security note */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1.5 text-cyan-300/80">
          <Shield size={13} className="text-cyan-400" /> 100% Secure Checkout
        </span>
        <span className="text-gray-600">•</span>
        <span>Per Team Fee covers all 2 to 4 members</span>
        <span className="text-gray-600">•</span>
        <span>Instant Confirmation &amp; Verifiable Receipt</span>
      </div>
    </div>
  );
}
