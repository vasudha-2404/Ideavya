import { Users, Target, Lightbulb, Award, Globe, Heart, Zap, ArrowRight, Star, Code2, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { value: '10 & 11', label: 'November 2026', icon: Zap },
  { value: '2 – 4', label: 'Members Per Team', icon: Users },
  { value: '₹12,500', label: 'Total Prize Pool', icon: Award },
  { value: 'MITS', label: 'Deemed to be University', icon: Star },
];

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description:
      'We believe every great product starts with a bold idea. IDEAVYA is built to turn those ideas into reality — no experience required.',
    color: 'from-violet-500/20 to-purple-500/20',
    border: 'border-violet-500/30',
    iconBg: 'bg-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description:
      'We\'re more than a hackathon. We\'re a growing ecosystem of students, founders, engineers, and dreamers who lift each other up.',
    color: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/30',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: Globe,
    title: 'Real-World Impact',
    description:
      'Our tracks are centered around problems that actually matter — climate, health, education, and the decentralized web of tomorrow.',
    color: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/30',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Heart,
    title: 'Inclusive by Design',
    description:
      'Whether you\'re a first-year student or a seasoned developer, IDEAVYA welcomes everyone. Diversity of thought is our superpower.',
    color: 'from-rose-500/20 to-pink-500/20',
    border: 'border-rose-500/30',
    iconBg: 'bg-rose-500/20',
    iconColor: 'text-rose-400',
  },
];

const tracks = [
  { icon: Lightbulb, label: 'Artificial Intelligence and Machine Learning', color: 'text-violet-400' },
  { icon: Globe,     label: 'Smart Infrastructure and Industrial Applications', color: 'text-blue-400' },
  { icon: Rocket,    label: 'Mobility, Automotive Technology, and Transportation', color: 'text-amber-400' },
  { icon: Heart,     label: 'Renewable Energy and Environmental Sustainability', color: 'text-emerald-400' },
  { icon: Code2,     label: 'Social Innovation and Entrepreneurship', color: 'text-rose-400' },
];

// ─── Sections ────────────────────────────────────────────────────────────────

function HeroBanner() {
  return (
    <section className="relative py-28 px-4 bg-hero-gradient overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-brand-600/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow animation-delay-400" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-300 text-sm font-medium mb-6">
          <Target size={13} className="text-brand-400" />
          Our Story
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-black text-white leading-tight mb-6">
          About <span className="gradient-text">IDEAVYA</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          IDEAVYA 2026 is organized by <strong>Madanapalle Institute of Technology &amp; Science (MITS)</strong> in association with <strong>Pathvision</strong>.
          An innovation challenge designed to turn real-world challenges into real solutions across five breakthrough domains.
        </p>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="py-16 px-4 bg-gray-950 border-b border-white/5">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ value, label, icon: Icon }) => (
          <div key={label} className="glass-card p-6 text-center hover:border-brand-500/30 transition-colors">
            <Icon size={22} className="text-brand-400 mx-auto mb-3" />
            <div className="font-display text-4xl font-black text-white mb-1">{value}</div>
            <div className="text-gray-400 text-sm">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="py-24 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <span className="text-brand-400 font-semibold text-sm tracking-widest uppercase mb-3 block">
            Our Mission
          </span>
          <h2 className="section-title mb-5">
            Turning Ideas into <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-gray-400 leading-relaxed mb-5">
            IDEAVYA was born out of frustration — brilliant students full of ideas but without
            a platform to bring them to life. We created the hackathon we always wished existed:
            one that's welcoming, well-mentored, and meaningful.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            Every year, teams walk in with rough sketches and walk out with working prototypes,
            industry connections, and in many cases — the seed of a startup. Our goal is simple:
            give you the runway to launch.
          </p>
          <Link to="/register" className="btn-primary">
            Join the Movement <ArrowRight size={16} />
          </Link>
        </div>

        {/* Visual card */}
        <div className="glass-card p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-purple-500/5 to-accent-500/10 pointer-events-none" />
          <div className="relative z-10 space-y-5">
            {tracks.map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className={color} />
                </div>
                <span className="text-white font-medium">{label}</span>
              </div>
            ))}
            <div className="mt-2 text-center text-gray-500 text-xs">+ Open Innovation track</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className="py-24 px-4 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent-400 font-semibold text-sm tracking-widest uppercase mb-3 block">
            What We Stand For
          </span>
          <h2 className="section-title mb-4">
            Our <span className="gradient-text">Core Values</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Everything we do at IDEAVYA is guided by four principles that keep us honest,
            inclusive, and impactful.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className={`glass-card p-7 bg-gradient-to-br ${v.color} border ${v.border} hover:scale-105 transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-xl ${v.iconBg} flex items-center justify-center mb-5`}>
                <v.icon size={22} className={v.iconColor} />
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-3">{v.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="py-24 px-4 bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-12 md:p-16 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-purple-500/5 to-accent-500/10 pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center mx-auto mb-6">
              <Rocket size={28} className="text-brand-400" />
            </div>
            <h2 className="section-title mb-4">
              Ready to <span className="gradient-text">Build?</span>
            </h2>
            <p className="section-subtitle max-w-xl mx-auto mb-10">
              Don't just read about it — be part of it. Register for IDEAVYA 2026
              and make something the world hasn't seen yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary text-base px-10 py-4">
                Register Now <ArrowRight size={18} />
              </Link>
              <Link to="/tracks" className="btn-outline text-base px-10 py-4">
                Explore Tracks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main>
      <HeroBanner />
      <StatsBar />
      <MissionSection />
      <ValuesSection />
      <CTABanner />
    </main>
  );
}
