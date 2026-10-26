import { Link } from 'react-router-dom';
import {
  Zap, Trophy, Users, Calendar, ArrowRight,
  Cpu, Building2, Car, Leaf, HeartHandshake, ChevronDown,
  MapPin, CheckCircle2, Layers, Award, Sparkles, Target, Compass
} from 'lucide-react';
import RegistrationFeeCard from '../components/payment/RegistrationFeeCard';
import EventCountdown from '../components/home/EventCountdown';
import HomePrizesSection from '../components/home/HomePrizesSection';
import SponsorsSection from '../components/home/SponsorsSection';
import HomeFAQSection from '../components/home/HomeFAQSection';

// ─── Data from Official Poster ───────────────────────────────────────────────

const highlightCards = [
  {
    icon: Calendar,
    title: 'EVENT DATE',
    value: '10 & 11',
    subtitle: 'November 2026',
    color: 'from-blue-500/20 to-indigo-500/20',
    border: 'border-blue-500/40',
    iconColor: 'text-blue-400',
  },
  {
    icon: MapPin,
    title: 'VENUE',
    value: 'MITS Campus',
    subtitle: 'Deemed to be University',
    color: 'from-rose-500/20 to-red-500/20',
    border: 'border-rose-500/40',
    iconColor: 'text-rose-400',
  },
  {
    icon: Trophy,
    title: 'TOTAL PRIZE POOL',
    value: '₹12,500',
    subtitle: 'Cash Prizes & Certificates',
    color: 'from-amber-500/20 to-yellow-500/20',
    border: 'border-amber-500/40',
    iconColor: 'text-amber-400',
  },
  {
    icon: Users,
    title: 'TEAM SIZE',
    value: '2 – 4',
    subtitle: 'Members Per Team',
    color: 'from-violet-500/20 to-purple-500/20',
    border: 'border-violet-500/40',
    iconColor: 'text-violet-400',
  },
  {
    icon: Layers,
    title: 'INTERDISCIPLINARY',
    value: 'Mandatory',
    subtitle: 'At least two departments',
    color: 'from-cyan-500/20 to-teal-500/20',
    border: 'border-cyan-500/40',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Award,
    title: 'REGISTRATION FEE',
    value: '₹150 / ₹200',
    subtitle: 'Early Bird / Standard (Per team)',
    color: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/40',
    iconColor: 'text-emerald-400',
  },
];

const themes = [
  {
    icon: Cpu,
    title: 'Artificial Intelligence and Machine Learning',
    description: 'Neural systems, predictive modeling, autonomous intelligence, and edge AI tackling complex problem spaces.',
    color: 'from-blue-600/20 to-cyan-600/20',
    border: 'border-blue-500/40',
    iconColor: 'text-blue-400',
    badge: 'Theme 01',
  },
  {
    icon: Building2,
    title: 'Smart Infrastructure and Industrial Applications',
    description: 'Smart cities, IIoT, industrial automation, structural health monitoring, and next-generation logistics.',
    color: 'from-purple-600/20 to-indigo-600/20',
    border: 'border-purple-500/40',
    iconColor: 'text-purple-400',
    badge: 'Theme 02',
  },
  {
    icon: Car,
    title: 'Mobility, Automotive Technology, and Transportation',
    description: 'Electric vehicles, autonomous driving systems, connected transport, fleet management, and traffic optimization.',
    color: 'from-amber-600/20 to-orange-600/20',
    border: 'border-amber-500/40',
    iconColor: 'text-amber-400',
    badge: 'Theme 03',
  },
  {
    icon: Leaf,
    title: 'Renewable Energy and Environmental Sustainability',
    description: 'Clean energy generation, microgrids, carbon capture, waste management, and environmental monitoring tech.',
    color: 'from-emerald-600/20 to-teal-600/20',
    border: 'border-emerald-500/40',
    iconColor: 'text-emerald-400',
    badge: 'Theme 04',
  },
  {
    icon: HeartHandshake,
    title: 'Social Innovation and Entrepreneurship',
    description: 'Impact ventures, community welfare, inclusive digital services, accessible education, and scalable social goods.',
    color: 'from-rose-600/20 to-pink-600/20',
    border: 'border-rose-500/40',
    iconColor: 'text-rose-400',
    badge: 'Theme 05',
  },
];

const competitionStages = [
  {
    step: 'Level 1',
    title: 'Online Idea Submission & Screening',
    mode: 'Online Mode',
    color: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
    badge: 'bg-blue-500/20 text-blue-300',
    desc: 'Submit your initial problem statement, proposed solution, and interdisciplinary team roster.',
  },
  {
    step: 'Bootcamp',
    title: 'Innovation Bootcamp',
    mode: 'Online Mentorship',
    color: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    badge: 'bg-amber-500/20 text-amber-300',
    desc: 'Mentorship sessions with domain experts to refine and mature your technical solution.',
  },
  {
    step: 'Level 2',
    title: 'Refined Idea Submission & Evaluation',
    mode: 'Screening Round',
    color: 'border-orange-500/40 bg-orange-500/10 text-orange-300',
    badge: 'bg-orange-500/20 text-orange-300',
    desc: 'Detailed architecture, prototype documentation, and feasibility evaluation by jury.',
  },
  {
    step: 'Semi-Finale',
    title: 'Semi-Finale Presentation',
    mode: 'Day 1 — 10 Nov 2026',
    color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    badge: 'bg-emerald-500/20 text-emerald-300',
    desc: 'On-campus pitching, live prototype demos, and jury interrogation at MITS Campus.',
  },
  {
    step: 'Grand Finale',
    title: 'Grand Finale & Award Ceremony',
    mode: 'Day 2 — 11 Nov 2026',
    color: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
    badge: 'bg-rose-500/20 text-rose-300',
    desc: 'Top finalist showdown, keynote sessions, and prize distribution (₹12,500 Prize Pool).',
  },
];

// ─── Hero Section ────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-hero-gradient px-4 pt-28 pb-16">
      {/* Background glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow animation-delay-400" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Institutional Banner */}
      <div className="animate-fade-up relative z-10 mb-6 text-center max-w-4xl">
        <div className="inline-flex flex-wrap items-center justify-center gap-3.5 px-6 py-2.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-1.5 text-xs text-gray-200 font-medium">
            <span>Organized by</span>
            <span className="font-bold text-white tracking-wide">MITS Deemed to be University</span>
          </div>
          <span className="text-gray-500">•</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-200 font-medium">In Association with</span>
            <span className="text-xs font-bold text-cyan-300 tracking-wide">Pathvision Innovations</span>
          </div>
        </div>
        <p className="text-[11px] text-gray-400 mt-2 tracking-wide">
          MADANAPALLE INSTITUTE OF TECHNOLOGY &amp; SCIENCE (Deemed to be University under section 3 of UGC Act, 1956)
        </p>
      </div>

      {/* Date & Venue Badge (From Poster) */}
      <div className="animate-fade-up animation-delay-200 relative z-10 mb-4">
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-300 text-sm font-semibold shadow-lg shadow-brand-500/20">
          <Zap size={14} className="text-brand-400" fill="currentColor" />
          10 &amp; 11 November 2026 · MITS Deemed to be University CAMPUS
        </span>
      </div>

      {/* Event Title */}
      <h1 className="animate-fade-up animation-delay-200 relative z-10 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-center text-white leading-none tracking-tight max-w-5xl">
        <span className="gradient-text">IDEAVYA</span>{' '}2026
      </h1>

      {/* Tagline */}
      <div className="animate-fade-up animation-delay-300 relative z-10 mt-3 inline-block px-6 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/30">
        <p className="font-display text-lg md:text-2xl font-bold text-yellow-300 tracking-wide text-center">
          Your Idea. Your Innovation.
        </p>
      </div>

      {/* Slogan */}
      <p className="animate-fade-up animation-delay-400 relative z-10 mt-4 font-display text-sm md:text-base font-bold uppercase tracking-widest text-cyan-400 text-center max-w-2xl">
        Turn Real-World Challenges into Real Solutions
      </p>

      {/* Live Event Countdown */}
      <div className="animate-fade-up animation-delay-400 relative z-10 w-full">
        <EventCountdown />
      </div>

      {/* Registration Fee Highlight Banner */}
      <div className="animate-fade-up animation-delay-500 relative z-10 inline-flex flex-wrap items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-lg shadow-brand-500/10 text-center">
        <span className="text-brand-300 font-semibold text-sm">Registration Fee:</span>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
          ₹150 Early Bird
        </span>
        <span className="text-gray-400 text-xs">and</span>
        <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/40 text-xs font-bold">
          ₹200 Standard
        </span>
        <span className="text-gray-300 text-xs font-medium">(Per Team)</span>
      </div>

      {/* CTAs */}
      <div className="animate-fade-up animation-delay-600 relative z-10 mt-8 flex flex-col sm:flex-row gap-4">
        <Link to="/register" className="btn-primary text-base px-8 py-4 shadow-xl shadow-brand-500/25">
          Register Your Team <ArrowRight size={18} />
        </Link>
        <Link to="/dashboard/submit" className="btn-outline text-base px-8 py-4 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10">
          Submit Idea <Compass size={18} />
        </Link>
        <a href="#themes" className="btn-outline text-base px-8 py-4">
          Explore Themes
        </a>
      </div>

      {/* Poster Highlights Grid */}
      <div className="animate-fade-up animation-delay-800 relative z-10 mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-6xl">
        {highlightCards.map((card) => (
          <div
            key={card.title}
            className={`glass-card p-4 text-center bg-gradient-to-br ${card.color} border ${card.border} hover:scale-105 transition-all duration-300`}
          >
            <card.icon size={20} className={`${card.iconColor} mx-auto mb-2`} />
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{card.title}</div>
            <div className="font-display text-xl font-black text-white">{card.value}</div>
            <div className="text-gray-300 text-xs mt-0.5">{card.subtitle}</div>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <a
        href="#about-brief"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 hover:text-gray-300 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}

// ─── About Section Preview ───────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about-brief" className="py-24 px-4 bg-gray-950 border-t border-white/5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-brand-400 font-semibold text-sm tracking-widest uppercase mb-3 block flex items-center gap-1.5">
            <Target size={14} /> Mission &amp; Purpose
          </span>
          <h2 className="section-title mb-6">
            Where Ideas Collide with <span className="gradient-text">Innovation</span>
          </h2>
          <p className="text-gray-300 text-base leading-relaxed mb-4">
            <strong>IDEAVYA 2026</strong> is the flagship national innovation challenge organized by{' '}
            <span className="text-white font-semibold">Madanapalle Institute of Technology &amp; Science (MITS)</span> in
            association with <span className="text-cyan-300 font-semibold">Pathvision Innovations</span>.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Designed to bridge the gap between classroom engineering theory and tangible societal impact, IDEAVYA mandates
            interdisciplinary teamwork. Student squads integrate computer science, electronics, mechanical, and civil disciplines
            to engineer scalable solutions for India and the world.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="glass-card p-4 border-brand-500/20">
              <div className="font-display text-2xl font-black text-white">48+ Hours</div>
              <div className="text-xs text-gray-400 mt-1">Intensive Mentorship &amp; Hackathon</div>
            </div>
            <div className="glass-card p-4 border-cyan-500/20">
              <div className="font-display text-2xl font-black text-white">5 Domains</div>
              <div className="text-xs text-gray-400 mt-1">High-Impact Innovation Themes</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about" className="btn-primary text-sm px-6 py-3">
              Read Our Full Story <ArrowRight size={15} />
            </Link>
            <Link to="/schedule" className="btn-outline text-sm px-6 py-3">
              Event Schedule
            </Link>
          </div>
        </div>

        {/* Feature highlight card */}
        <div className="glass-card p-8 border-brand-500/30 bg-gradient-to-br from-brand-500/10 via-purple-500/5 to-cyan-500/10 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/20 flex items-center justify-center mb-6 text-brand-300">
            <Sparkles size={24} />
          </div>
          <h3 className="font-display font-bold text-white text-xl mb-3">Why IDEAVYA Matters</h3>
          <ul className="space-y-3.5 text-sm text-gray-300 mb-6">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Interdisciplinary Mandate:</strong> Solve problems by uniting multiple engineering disciplines.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Direct Industry Mentorship:</strong> 1-on-1 architecture clinics from Pathvision practitioners.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>MITS Incubation Pathway:</strong> Direct fast-track incubation support for standout prototypes.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Cash Pool &amp; Trophies:</strong> ₹12,500 prize pool awarded live on MITS Campus.</span>
            </li>
          </ul>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-cyan-300">
            ⚡ Semi-Finale &amp; Grand Finale: 10 &amp; 11 November 2026 @ MITS Campus
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Innovation Themes Section ───────────────────────────────────────────────

function ThemesSection() {
  return (
    <section id="themes" className="py-24 px-4 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-400 font-semibold text-sm tracking-widest uppercase mb-3 block">Official Tracks</span>
          <h2 className="section-title mb-4">Innovation <span className="gradient-text">Themes</span></h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Choose your domain. Teams must be interdisciplinary (minimum of two distinct academic departments).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <div
              key={theme.title}
              className={`glass-card p-7 bg-gradient-to-br ${theme.color} border ${theme.border} hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <theme.icon size={24} className={theme.iconColor} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-white/15">
                    {theme.badge}
                  </span>
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2 leading-snug">{theme.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{theme.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">Team Size: 2–4 Members</span>
                <Link to="/register" className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1">
                  Register <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}

          {/* Guidelines Box */}
          <div className="glass-card p-7 border-brand-500/40 bg-brand-500/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-500/20 flex items-center justify-center mb-5">
                <Sparkles size={24} className="text-brand-400" />
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">Important Guidelines</h3>
              <ul className="space-y-2.5 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-brand-400 shrink-0 mt-0.5" />
                  <span><strong>Team Size:</strong> 2 to 4 members.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-brand-400 shrink-0 mt-0.5" />
                  <span><strong>Interdisciplinary:</strong> Mandatory representation from at least two departments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-brand-400 shrink-0 mt-0.5" />
                  <span><strong>Venue:</strong> MITS Deemed to be University Campus (10 &amp; 11 Nov 2026).</span>
                </li>
              </ul>
            </div>
            <Link to="/register" className="btn-primary w-full justify-center text-xs py-3 mt-6">
              Start Team Registration <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Competition Format Section ──────────────────────────────────────────────

function CompetitionFormatSection() {
  return (
    <section className="py-24 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent-400 font-semibold text-sm tracking-widest uppercase mb-3 block">Roadmap</span>
          <h2 className="section-title mb-4">Competition <span className="gradient-text">Format</span></h2>
          <p className="section-subtitle max-w-xl mx-auto">
            From initial screening to the on-campus Grand Finale at MITS.
          </p>
        </div>

        {/* 5 Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {competitionStages.map((stage, idx) => (
            <div
              key={stage.step}
              className={`glass-card p-5 border ${stage.color} relative overflow-hidden flex flex-col justify-between hover:scale-105 transition-all duration-300`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${stage.badge}`}>
                    {stage.step}
                  </span>
                  <span className="text-gray-500 font-mono text-xs">0{idx + 1}</span>
                </div>
                <h3 className="font-display font-bold text-white text-base mb-1">{stage.title}</h3>
                <div className="text-xs font-semibold text-brand-300 mb-3">{stage.mode}</div>
                <p className="text-gray-400 text-xs leading-relaxed">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Section ─────────────────────────────────────────────────────────

function RegistrationFeeSection() {
  return (
    <section id="pricing" className="py-24 px-4 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-brand-400 font-semibold text-sm tracking-widest uppercase mb-3 block">Registration</span>
          <h2 className="section-title mb-4">Registration <span className="gradient-text">Fee</span></h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Per Team Registration (2 to 4 members) with mandatory interdisciplinary participation.
          </p>
        </div>
        <RegistrationFeeCard />
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="py-24 px-4 bg-gray-950">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-card p-12 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-purple-500/5 to-accent-500/10 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="section-title mb-4">
              Turn Challenges into <span className="gradient-text">Solutions</span>
            </h2>
            <p className="section-subtitle max-w-xl mx-auto mb-8">
              Compete for the ₹12,500 prize pool, gain direct industry mentorship, and showcase your innovation at MITS Campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary text-base px-10 py-4 shadow-xl">
                Register Your Team (From ₹150) <ArrowRight size={18} />
              </Link>
              <Link to="/tracks" className="btn-outline text-base px-10 py-4">
                View All Themes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ThemesSection />
      <CompetitionFormatSection />
      <HomePrizesSection />
      <RegistrationFeeSection />
      <SponsorsSection />
      <HomeFAQSection />
      <CTASection />
    </main>
  );
}
