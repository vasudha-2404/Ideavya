import { Link } from 'react-router-dom';
import {
  Zap, Trophy, Users, Calendar, ArrowRight,
  Cpu, Building2, Car, Leaf, HeartHandshake, ChevronDown,
  MapPin, CheckCircle2, Layers, Award, Target, Compass, QrCode
} from 'lucide-react';
import RegistrationFeeCard from '../components/payment/RegistrationFeeCard';
import RegistrationQRCodeCard from '../components/payment/RegistrationQRCodeCard';
import EventCountdown from '../components/home/EventCountdown';
import HomePrizesSection from '../components/home/HomePrizesSection';
import SponsorsSection from '../components/home/SponsorsSection';
import HomeFAQSection from '../components/home/HomeFAQSection';

// ─── Data from Official Poster (Approved Blue & White Theme) ─────────────────

const highlightCards = [
  {
    icon: Calendar,
    title: 'EVENT DATE',
    value: '10 & 11',
    subtitle: 'November 2026',
    color: 'from-blue-600/20 via-midnight-800/70 to-midnight-900/90',
    border: 'border-blue-400/35',
    iconColor: 'text-blue-300',
  },
  {
    icon: MapPin,
    title: 'VENUE',
    value: 'MITS Campus',
    subtitle: 'Deemed to be University',
    color: 'from-blue-700/20 via-midnight-800/70 to-midnight-900/90',
    border: 'border-blue-400/35',
    iconColor: 'text-blue-200',
  },
  {
    icon: Trophy,
    title: 'TOTAL PRIZE POOL',
    value: '₹12,500',
    subtitle: 'Cash Prizes & Certificates',
    color: 'from-blue-500/20 via-midnight-800/70 to-midnight-900/90',
    border: 'border-blue-300/40',
    iconColor: 'text-blue-200',
  },
  {
    icon: Users,
    title: 'TEAM SIZE',
    value: '2 – 4',
    subtitle: 'Members Per Team',
    color: 'from-blue-600/20 via-midnight-800/70 to-midnight-900/90',
    border: 'border-blue-400/35',
    iconColor: 'text-blue-300',
  },
  {
    icon: Layers,
    title: 'INTERDISCIPLINARY',
    value: 'Mandatory',
    subtitle: 'At least two departments',
    color: 'from-white/10 via-midnight-800/70 to-midnight-900/90',
    border: 'border-white/25',
    iconColor: 'text-white',
  },
  {
    icon: Award,
    title: 'REGISTRATION FEE',
    value: '₹150 / ₹200',
    subtitle: 'Early Bird / Standard (Per team)',
    color: 'from-blue-600/20 via-midnight-800/70 to-midnight-900/90',
    border: 'border-blue-400/35',
    iconColor: 'text-blue-300',
  },
];

const themes = [
  {
    icon: Cpu,
    title: 'Artificial Intelligence and Machine Learning',
    description: 'Neural systems, predictive modeling, autonomous intelligence, and edge AI tackling complex problem spaces.',
    color: 'from-blue-600/15 via-midnight-800/60 to-midnight-900/90',
    border: 'border-blue-400/30',
    iconColor: 'text-blue-300',
    badge: 'Theme 01',
  },
  {
    icon: Building2,
    title: 'Smart Infrastructure and Industrial Applications',
    description: 'Smart cities, IIoT, industrial automation, structural health monitoring, and next-generation logistics.',
    color: 'from-blue-700/15 via-midnight-800/60 to-midnight-900/90',
    border: 'border-blue-400/30',
    iconColor: 'text-blue-300',
    badge: 'Theme 02',
  },
  {
    icon: Car,
    title: 'Mobility, Automotive Technology, and Transportation',
    description: 'Electric vehicles, autonomous driving systems, connected transport, fleet management, and traffic optimization.',
    color: 'from-blue-600/15 via-midnight-800/60 to-midnight-900/90',
    border: 'border-blue-400/30',
    iconColor: 'text-blue-300',
    badge: 'Theme 03',
  },
  {
    icon: Leaf,
    title: 'Renewable Energy and Environmental Sustainability',
    description: 'Clean energy generation, microgrids, carbon capture, waste management, and environmental monitoring tech.',
    color: 'from-blue-700/15 via-midnight-800/60 to-midnight-900/90',
    border: 'border-blue-400/30',
    iconColor: 'text-blue-300',
    badge: 'Theme 04',
  },
  {
    icon: HeartHandshake,
    title: 'Social Innovation and Entrepreneurship',
    description: 'Impact ventures, community welfare, inclusive digital services, accessible education, and scalable social goods.',
    color: 'from-blue-600/15 via-midnight-800/60 to-midnight-900/90',
    border: 'border-blue-400/30',
    iconColor: 'text-blue-300',
    badge: 'Theme 05',
  },
];

const competitionStages = [
  {
    step: 'Level 1',
    title: 'Online Idea Submission',
    mode: 'Online Mode',
    color: 'border-blue-400/30 bg-blue-600/10 text-blue-200',
    badge: 'bg-blue-600/20 text-white border border-blue-400/40',
    desc: 'Submit problem statement, target audience, technical approach, and preliminary feasibility study.',
  },
  {
    step: 'Bootcamp',
    title: 'Innovation Bootcamp',
    mode: 'Online Sessions',
    color: 'border-white/20 bg-white/5 text-white',
    badge: 'bg-white/10 text-white border border-white/20',
    desc: 'Expert architecture clinics, system design sessions, and pitch deck fine-tuning with Pathvision mentors.',
  },
  {
    step: 'Level 2',
    title: 'Prototype Evaluation',
    mode: 'Online Screening',
    color: 'border-blue-400/30 bg-blue-600/10 text-blue-200',
    badge: 'bg-blue-600/20 text-white border border-blue-400/40',
    desc: 'Rigorous jury evaluation on technical architecture, originality, social impact, and viability.',
  },
  {
    step: 'Semi-Finale',
    title: 'Campus Pitching Rounds',
    mode: 'Day 1 — 10 Nov 2026',
    color: 'border-blue-400/35 bg-blue-500/10 text-blue-100',
    badge: 'bg-blue-500/20 text-white border border-blue-400/40',
    desc: 'On-campus pitching, live prototype demos, and jury interrogation at MITS Campus.',
  },
  {
    step: 'Grand Finale',
    title: 'Grand Finale & Award Ceremony',
    mode: 'Day 2 — 11 Nov 2026',
    color: 'border-white/30 bg-white/10 text-white',
    badge: 'bg-white/20 text-white border border-white/30',
    desc: 'Top finalist showdown, keynote sessions, and prize distribution (₹12,500 Prize Pool).',
  },
];

// ─── Hero Section ────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-20">
      {/* Background Blue & White Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="moonlight-orb top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[650px] bg-blue-600/20" />
        <div className="moonlight-orb top-[25%] left-[5%] w-[550px] h-[550px] bg-blue-700/15" />
        <div className="moonlight-orb top-[30%] right-[5%] w-[550px] h-[550px] bg-blue-500/15" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(59,130,246,0.6) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            backgroundPosition: '0 0, 24px 24px',
          }}
        />
      </div>

      {/* Institutional Banner */}
      <div className="animate-fade-up relative z-10 mb-6 text-center max-w-4xl">
        <div className="inline-flex flex-wrap items-center justify-center gap-3.5 px-6 py-2.5 rounded-2xl bg-white/[0.07] border border-blue-400/35 backdrop-blur-xl shadow-xl shadow-blue-950/50">
          <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>Organized by</span>
            <span className="font-bold text-white tracking-wide">MITS Deemed to be University</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-200 font-medium">In Association with</span>
            <span className="text-xs font-bold text-blue-300 tracking-wide">Pathvision Innovations</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 mt-2 tracking-wider uppercase">
          Madanapalle Institute of Technology &amp; Science · UGC Autonomous Research Institution
        </p>
      </div>

      {/* Date & Venue Badge */}
      <div className="animate-fade-up animation-delay-200 relative z-10 mb-5">
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600/15 border border-blue-400/40 text-blue-100 text-xs sm:text-sm font-semibold shadow-lg shadow-blue-950/50 backdrop-blur-md">
          <Zap size={14} className="text-blue-300" fill="currentColor" />
          10 &amp; 11 November 2026 · MITS Deemed to be University Campus
        </span>
      </div>

      {/* Visually Striking Event Title - Approved Blue & White */}
      <div className="animate-fade-up animation-delay-200 relative z-10 text-center max-w-5xl my-2">
        <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.8)]">
          <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent drop-shadow-[0_2px_25px_rgba(255,255,255,0.3)]">
            IDEA
          </span>
          <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(37,99,235,0.5)]">
            VYA
          </span>
          <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mt-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-400 drop-shadow-[0_0_45px_rgba(59,130,246,0.5)]">
            2026
          </span>
        </h1>
      </div>

      {/* Tagline */}
      <div className="animate-fade-up animation-delay-300 relative z-10 mt-4 inline-block px-7 py-2 rounded-full bg-blue-600/15 border border-blue-400/35 backdrop-blur-md shadow-md">
        <p className="font-display text-lg sm:text-2xl font-bold text-white tracking-wide text-center">
          Your Idea. Your Innovation.
        </p>
      </div>

      {/* Slogan */}
      <p className="animate-fade-up animation-delay-400 relative z-10 mt-3 font-display text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300 text-center max-w-2xl">
        Turn Real-World Challenges into Real Solutions
      </p>

      {/* Live Event Countdown */}
      <div className="animate-fade-up animation-delay-400 relative z-10 w-full mt-2">
        <EventCountdown />
      </div>

      {/* Registration Fee Highlight Banner */}
      <div className="animate-fade-up animation-delay-500 relative z-10 inline-flex flex-wrap items-center justify-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white/[0.07] border border-blue-400/30 backdrop-blur-md shadow-lg shadow-blue-950/40 text-center">
        <span className="text-white font-semibold text-sm">Registration Fee:</span>
        <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-200 border border-blue-400/40 text-xs font-bold">
          ₹150 Early Bird
        </span>
        <span className="text-slate-400 text-xs">and</span>
        <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold">
          ₹200 Standard
        </span>
        <span className="text-slate-300 text-xs font-medium">(Per Team · 2 to 4 Members)</span>
      </div>

      {/* Action Buttons with Fast Registration Direct Access */}
      <div className="animate-fade-up animation-delay-600 relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
        <Link to="/register" className="btn-primary text-base px-8 py-4 shadow-xl shadow-blue-600/30">
          Register Your Team <ArrowRight size={18} />
        </Link>
        <a
          href="#registration"
          className="btn-outline text-base px-7 py-4 flex items-center gap-2 text-white hover:text-blue-200"
        >
          <QrCode size={18} className="text-blue-300" />
          Scan to Register (QR)
        </a>
        <Link to="/dashboard/submit" className="btn-outline text-base px-7 py-4 text-white border-white/20 hover:bg-white/10">
          Submit Idea <Compass size={18} />
        </Link>
        <a href="#themes" className="px-6 py-4 rounded-xl text-slate-300 hover:text-white transition-colors text-sm font-medium">
          Explore Themes
        </a>
      </div>

      {/* Poster Highlights Grid */}
      <div className="animate-fade-up animation-delay-800 relative z-10 mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 w-full max-w-6xl">
        {highlightCards.map((card) => (
          <div
            key={card.title}
            className={`glass-card p-4 text-center bg-gradient-to-br ${card.color} border ${card.border} hover:scale-105 transition-all duration-300`}
          >
            <card.icon size={20} className={`${card.iconColor} mx-auto mb-2`} />
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{card.title}</div>
            <div className="font-display text-xl font-black text-white">{card.value}</div>
            <div className="text-slate-300 text-xs mt-0.5">{card.subtitle}</div>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <a
        href="#about-brief"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-400 hover:text-white transition-colors animate-bounce"
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
    <section id="about-brief" className="py-24 px-4 relative border-t border-white/10">
      <div className="moonlight-orb top-1/3 left-[-5%] w-[450px] h-[450px] bg-blue-600/15" />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <span className="text-blue-300 font-semibold text-sm tracking-widest uppercase mb-3 flex items-center gap-1.5">
            <Target size={14} /> Mission &amp; Purpose
          </span>
          <h2 className="section-title mb-6">
            Where Ideas Collide with <span className="gradient-text">Innovation</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed mb-4">
            <strong>IDEAVYA 2026</strong> is the flagship national innovation challenge organized by{' '}
            <span className="text-white font-semibold">Madanapalle Institute of Technology &amp; Science (MITS)</span> in
            association with <span className="text-blue-300 font-semibold">Pathvision Innovations</span>.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Unlike standard coding marathons, IDEAVYA is explicitly built on an{' '}
            <strong className="text-white">Interdisciplinary Mandate</strong>: every team must represent at least two
            distinct engineering or management departments. Complex societal challenges cannot be solved inside a
            single silo.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/about" className="btn-primary text-sm px-6 py-3">
              Read Our Full Story <ArrowRight size={15} />
            </Link>
            <Link to="/schedule" className="btn-outline text-sm px-6 py-3">
              Event Schedule
            </Link>
          </div>
        </div>

        {/* Feature highlight card */}
        <div className="glass-card p-8 border-blue-400/30 bg-gradient-to-br from-white/[0.08] via-midnight-850/70 to-midnight-950/90 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-400/40 flex items-center justify-center mb-6 text-white shadow-md shadow-blue-600/20">
            <Award size={24} className="text-blue-300" />
          </div>
          <h3 className="font-display font-bold text-white text-xl sm:text-2xl mb-3">Why IDEAVYA Matters</h3>
          <ul className="space-y-3.5 text-sm text-slate-300 mb-6">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <span><strong>Interdisciplinary Mandate:</strong> Solve problems by uniting multiple engineering disciplines.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <span><strong>Direct Industry Mentorship:</strong> 1-on-1 architecture clinics from Pathvision practitioners.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <span><strong>MITS Incubation Pathway:</strong> Direct fast-track incubation support for standout prototypes.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <span><strong>Cash Pool &amp; Trophies:</strong> ₹12,500 prize pool awarded live on MITS Campus.</span>
            </li>
          </ul>
          <div className="p-3.5 rounded-xl bg-blue-600/15 border border-blue-400/30 text-xs text-blue-200 font-medium">
            ⚡ Semi-Finale &amp; Grand Finale: 10 &amp; 11 November 2026 @ MITS Campus
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Themes Section ──────────────────────────────────────────────────────────

function ThemesSection() {
  return (
    <section id="themes" className="py-24 px-4 relative scroll-mt-16">
      <div className="moonlight-orb top-1/2 right-[-5%] w-[500px] h-[500px] bg-blue-600/15" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-blue-300 font-semibold text-sm tracking-widest uppercase mb-3 block">Problem Tracks</span>
          <h2 className="section-title mb-4">Five Pillars of <span className="gradient-text">Innovation</span></h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Choose a theme aligned with your team's multidisciplinary strengths and engineer impactful solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <div
              key={theme.title}
              className={`glass-card p-6 border ${theme.border} bg-gradient-to-br ${theme.color} flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 group`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <theme.icon size={24} className={theme.iconColor} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/20">
                    {theme.badge}
                  </span>
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2 leading-snug">{theme.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{theme.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Team Size: 2–4 Members</span>
                <Link to="/register" className="text-xs font-semibold text-blue-300 hover:text-white flex items-center gap-1">
                  Register <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}

          {/* Track Guide & Problem Statements */}
          <div className="glass-card p-6 border-blue-400/30 hover:border-blue-300 bg-white/[0.04] flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-400/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Compass size={24} className="text-blue-300" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-600/20 text-blue-200 border border-blue-400/30">
                  Track Guide
                </span>
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2 leading-snug">
                Problem Statements &amp; Rubrics
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Review sample problem statements, recommended technology stacks, and judging criteria across all 5 themes.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">All 5 Themes</span>
              <Link to="/tracks" className="text-xs font-semibold text-blue-300 hover:text-white flex items-center gap-1">
                Explore Tracks <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Interdisciplinary note banner */}
        <div className="mt-8 p-5 rounded-2xl bg-blue-600/15 border border-blue-400/35 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md shadow-lg shadow-blue-950/40">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <span className="font-semibold text-white text-sm">Interdisciplinary Rule: </span>
              <span className="text-slate-300 text-xs">Each team must comprise 2 to 4 members representing at least two distinct departments. Single-department teams are not permitted.</span>
            </div>
          </div>
          <div className="shrink-0 w-full sm:w-auto">
            <Link to="/register" className="btn-primary w-full justify-center text-xs py-3">
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
    <section className="py-24 px-4 relative border-t border-white/10">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-blue-300 font-semibold text-sm tracking-widest uppercase mb-3 block">Roadmap</span>
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
              className={`glass-card p-5 border ${stage.color} relative overflow-hidden flex flex-col justify-between hover:scale-105 transition-all duration-300 shadow-lg`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${stage.badge}`}>
                    {stage.step}
                  </span>
                  <span className="text-blue-300 font-mono text-xs">0{idx + 1}</span>
                </div>
                <h3 className="font-display font-bold text-white text-base mb-1">{stage.title}</h3>
                <div className="text-xs font-semibold text-blue-200 mb-3">{stage.mode}</div>
                <p className="text-slate-300 text-xs leading-relaxed">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Registration Section (Easy to Find, Approved Blue & White Glass) ────────

function RegistrationFeeSection() {
  return (
    <section id="registration" className="py-24 px-4 relative scroll-mt-20 border-t border-white/10">
      <span id="pricing" className="absolute -top-24" aria-hidden="true" />
      
      {/* Background Ambient Radial Glow */}
      <div className="moonlight-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-blue-600/15" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/15 border border-blue-400/40 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-sm backdrop-blur-md">
            <QrCode size={13} className="text-blue-300" />
            <span>Registration &amp; Entry Portal</span>
          </div>
          <h2 className="section-title mb-4">
            Registration &amp; <span className="gradient-text">Team Passes</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Scan the QR code to register instantly on mobile, or choose an official team pass (2 to 4 members with mandatory interdisciplinary participation).
          </p>
        </div>

        {/* Side-by-side Glass Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Scan to Register Card */}
          <div className="lg:col-span-5 flex">
            <RegistrationQRCodeCard className="w-full h-full shadow-2xl shadow-blue-950/60" />
          </div>

          {/* Pricing Pass Tier Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <RegistrationFeeCard />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="py-24 px-4 relative border-t border-white/10">
      <div className="moonlight-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/15" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="glass-card p-12 md:p-16 relative overflow-hidden border-blue-400/35 shadow-2xl shadow-blue-950/50">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-midnight-850/40 to-white/[0.04] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="section-title mb-4">
              Turn Challenges into <span className="gradient-text">Solutions</span>
            </h2>
            <p className="section-subtitle max-w-xl mx-auto mb-8">
              Compete for the ₹12,500 prize pool, gain direct industry mentorship from Pathvision, and showcase your innovation at MITS Campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary text-base px-10 py-4 shadow-xl shadow-blue-600/30">
                Register Your Team (From ₹150) <ArrowRight size={18} />
              </Link>
              <a href="#registration" className="btn-outline text-base px-10 py-4 flex items-center justify-center gap-2">
                <QrCode size={18} className="text-blue-300" />
                Scan QR Code
              </a>
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
    <main className="bg-midnight-950 text-white selection:bg-blue-600/40 selection:text-white">
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
