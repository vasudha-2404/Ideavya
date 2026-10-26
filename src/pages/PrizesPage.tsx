import { Trophy, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const mainPrizes = [
  {
    place: '1st Place',
    emoji: '🥇',
    amount: '₹6,000',
    subtitle: 'Grand Winner',
    perks: ['Cash Prize ₹6,000', 'Winner Trophy & Official Certificate', 'Incubation Support at MITS', 'Direct Mentorship from Pathvision', 'Special Commendation & Media Feature'],
    color: 'from-yellow-500/20 to-amber-500/20',
    border: 'border-yellow-500/40',
    glow: 'shadow-yellow-500/20',
    badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    iconColor: 'text-yellow-400',
    scale: 'md:scale-110 z-10',
  },
  {
    place: '2nd Place',
    emoji: '🥈',
    amount: '₹4,000',
    subtitle: 'First Runner Up',
    perks: ['Cash Prize ₹4,000', 'Runner-up Trophy & Official Certificate', 'Industry Mentorship Sessions', 'Project Showcase on MITS & Pathvision Portal'],
    color: 'from-gray-500/20 to-slate-500/20',
    border: 'border-gray-400/30',
    glow: 'shadow-gray-400/10',
    badge: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    iconColor: 'text-gray-300',
    scale: '',
  },
  {
    place: '3rd Place',
    emoji: '🥉',
    amount: '₹2,500',
    subtitle: 'Second Runner Up',
    perks: ['Cash Prize ₹2,500', 'Merit Certificate & Trophy', 'Innovation Guidance Kit', 'Networking & Internship Referrals'],
    color: 'from-orange-800/20 to-amber-900/20',
    border: 'border-orange-700/30',
    glow: 'shadow-orange-700/10',
    badge: 'bg-orange-800/20 text-orange-300 border-orange-700/30',
    iconColor: 'text-orange-400',
    scale: '',
  },
];

const themeBadges = [
  'Artificial Intelligence & Machine Learning',
  'Smart Infrastructure & Industrial Applications',
  'Mobility, Automotive Technology, and Transportation',
  'Renewable Energy & Environmental Sustainability',
  'Social Innovation & Entrepreneurship',
];

export default function PrizesPage() {
  return (
    <main className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="relative py-24 px-4 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-brand-600/30 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-sm font-medium mb-6">
            <Trophy size={13} className="text-yellow-400" /> Official Awards
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-black text-white leading-tight mb-5">
            Total Prize Pool: <span className="gradient-text">₹12,500</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Compete across all five themes at MITS Deemed to be University Campus. Cash prizes, trophies, and official recognition.
          </p>
        </div>
      </section>

      {/* Main prizes */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-title mb-3">Grand <span className="gradient-text">Winners</span></h2>
            <p className="section-subtitle">Top three winning teams of IDEAVYA 2026.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-end">
            {[mainPrizes[1], mainPrizes[0], mainPrizes[2]].map((prize) => (
              <div
                key={prize.place}
                className={`glass-card p-8 bg-gradient-to-br ${prize.color} border ${prize.border} shadow-xl ${prize.glow} ${prize.scale} transition-all duration-300 text-center`}
              >
                <div className="text-5xl mb-3">{prize.emoji}</div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-4 ${prize.badge}`}>{prize.place}</span>
                <div className={`font-display text-4xl font-black mb-1 ${prize.iconColor}`}>{prize.amount}</div>
                <div className="text-gray-400 text-sm mb-6">{prize.subtitle}</div>
                <ul className="space-y-2.5 text-left">
                  {prize.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-gray-300 text-sm">
                      <CheckCircle size={13} className={`mt-0.5 shrink-0 ${prize.iconColor}`} />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Themes Eligible */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-6">Eligible Innovation Themes</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {themeBadges.map((theme) => (
              <span key={theme} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-200 text-sm font-medium">
                {theme}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto glass-card p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-brand-500/5 pointer-events-none" />
          <div className="relative z-10">
            <div className="text-4xl mb-4">🏆</div>
            <h2 className="font-display text-3xl font-bold text-white mb-3">Aim for the Top</h2>
            <p className="text-gray-400 mb-7 text-sm">Register your team before early bird slots close. Per team registration: ₹150 Early Bird / ₹200 Standard.</p>
            <Link to="/register" className="btn-primary text-base px-10 py-4">
              Register Your Team <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
