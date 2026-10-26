import { Trophy, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const mainPrizes = [
  {
    place: '1st Place',
    emoji: '🥇',
    amount: '₹6,000',
    subtitle: 'Grand Champion',
    badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    color: 'from-yellow-500/20 via-amber-500/10 to-transparent',
    border: 'border-yellow-500/40 shadow-yellow-500/10',
    perks: ['Cash Prize ₹6,000', 'Winner Trophy & Gold Certificate', 'Incubation Support at MITS Cell', 'Direct Mentorship from Pathvision'],
    scale: 'md:scale-105 z-10',
  },
  {
    place: '2nd Place',
    emoji: '🥈',
    amount: '₹4,000',
    subtitle: 'First Runner Up',
    badge: 'bg-slate-400/20 text-slate-200 border-slate-400/40',
    color: 'from-slate-500/20 via-gray-500/10 to-transparent',
    border: 'border-slate-400/30 shadow-slate-500/10',
    perks: ['Cash Prize ₹4,000', 'Silver Certificate & Trophy', 'Industry Mentorship Sessions', 'Feature on MITS Innovation Portal'],
    scale: '',
  },
  {
    place: '3rd Place',
    emoji: '🥉',
    amount: '₹2,500',
    subtitle: 'Second Runner Up',
    badge: 'bg-amber-700/20 text-amber-300 border-amber-700/40',
    color: 'from-amber-700/20 via-orange-900/10 to-transparent',
    border: 'border-amber-700/30 shadow-amber-700/10',
    perks: ['Cash Prize ₹2,500', 'Bronze Certificate & Trophy', 'Innovation Guidance Kit', 'Internship & Networking Referrals'],
    scale: '',
  },
];

export default function HomePrizesSection() {
  return (
    <section id="prizes" className="py-24 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-yellow-400 font-semibold text-sm tracking-widest uppercase mb-3 block flex items-center justify-center gap-1.5">
            <Trophy size={14} /> Rewards &amp; Recognition
          </span>
          <h2 className="section-title mb-4">
            Total Prize Pool: <span className="gradient-text">₹12,500</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Honoring breakthrough student solutions with cash awards, prestigious trophies, and incubation support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-end mb-12">
          {/* Re-ordered to 2nd, 1st, 3rd for podium effect on desktop */}
          {[mainPrizes[1], mainPrizes[0], mainPrizes[2]].map((prize) => (
            <div
              key={prize.place}
              className={`glass-card p-8 bg-gradient-to-b ${prize.color} border ${prize.border} ${prize.scale} shadow-xl text-center flex flex-col justify-between transition-all duration-300 hover:scale-[1.03]`}
            >
              <div>
                <div className="text-5xl mb-3">{prize.emoji}</div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-4 ${prize.badge}`}>
                  {prize.place}
                </span>
                <div className="font-display text-4xl font-black text-white mb-1">{prize.amount}</div>
                <div className="text-gray-400 text-sm mb-6">{prize.subtitle}</div>
                <ul className="space-y-2.5 text-left text-xs text-gray-300">
                  {prize.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-yellow-400 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/prizes" className="btn-outline text-sm px-8 py-3.5">
            View Complete Awards &amp; Perks <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
