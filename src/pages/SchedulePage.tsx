import { Calendar, Clock, MapPin, Users, Zap, Coffee, Trophy, Mic, Code2, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const competitionRounds = [
  {
    phase: 'Stage 01',
    name: 'Level 1: Online Idea Submission & Screening',
    mode: 'Online Submission',
    badgeColor: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
    dot: 'bg-blue-400',
    events: [
      { time: 'Initial Phase', title: 'Portal Registration & Team Formation', icon: Users, type: 'info', desc: 'Register interdisciplinary teams (2–4 members from at least two departments).' },
      { time: 'Deadline', title: 'Executive Summary & Problem Statement Upload', icon: Code2, type: 'milestone', desc: 'Submit your solution concept mapped to one of the five official innovation themes.' },
      { time: 'Review', title: 'Level 1 Screening & Shortlisting', icon: Trophy, type: 'session', desc: 'Panel reviews feasibility, novelty, and interdisciplinary alignment.' },
    ],
  },
  {
    phase: 'Stage 02',
    name: 'Innovation Bootcamp (Online)',
    mode: 'Virtual Mentorship',
    badgeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    dot: 'bg-amber-400',
    events: [
      { time: 'Session 1', title: 'Orientation & Technical Deep-Dive', icon: Mic, type: 'workshop', desc: 'Industry mentors conduct masterclasses across all 5 themes.' },
      { time: 'Session 2', title: '1-on-1 Mentorship & Architecture Clinic', icon: Users, type: 'mentor', desc: 'Mentors critique system designs and refine implementation strategies.' },
    ],
  },
  {
    phase: 'Stage 03',
    name: 'Level 2: Refined Idea Submission & Evaluation',
    mode: 'Online Evaluation',
    badgeColor: 'border-orange-500/40 bg-orange-500/10 text-orange-300',
    dot: 'bg-orange-400',
    events: [
      { time: 'Submission', title: 'Detailed Proposal & Prototype Plan Submission', icon: Code2, type: 'milestone', desc: 'Teams submit refined designs incorporating mentor feedback.' },
      { time: 'Announcement', title: 'Finalist Shortlist for MITS Campus Rounds', icon: Zap, type: 'award', desc: 'Selected teams are invited to MITS Deemed to be University Campus.' },
    ],
  },
  {
    phase: 'Stage 04',
    name: 'Semi-Finale — Day 1',
    mode: '10 November 2026 · MITS Campus',
    badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    dot: 'bg-emerald-400',
    events: [
      { time: '09:00 AM', title: 'Inauguration & Registration Verification', icon: Mic, type: 'session', desc: 'Opening ceremony with MITS leadership and Pathvision partners.' },
      { time: '10:30 AM', title: 'Semi-Finale Pitch Presentations', icon: Zap, type: 'milestone', desc: 'Teams pitch to domain juries in parallel breakout tracks.' },
      { time: '01:00 PM', title: 'Networking Lunch', icon: Coffee, type: 'break', desc: 'Lunch and informal interaction with jury and fellow innovators.' },
      { time: '02:30 PM', title: 'Live Prototype Showcase & Q&A', icon: Code2, type: 'session', desc: 'Hands-on demonstration and jury interrogation.' },
      { time: '05:30 PM', title: 'Announcement of Grand Finalists', icon: Trophy, type: 'award', desc: 'Top finalist teams advance to the Grand Finale showdown.' },
    ],
  },
  {
    phase: 'Stage 05',
    name: 'Grand Finale & Award Ceremony — Day 2',
    mode: '11 November 2026 · MITS Campus',
    badgeColor: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
    dot: 'bg-rose-400',
    events: [
      { time: '09:30 AM', title: 'Grand Finale Showcase', icon: Zap, type: 'milestone', desc: 'Top finalist teams present to the grand jury.' },
      { time: '01:00 PM', title: 'Lunch & Deliberation', icon: Coffee, type: 'break', desc: 'Jury finalizes results for all categories.' },
      { time: '03:00 PM', title: 'Keynote & Industry Insights', icon: Mic, type: 'session', desc: 'Special addresses by MITS dignitaries and Pathvision leaders.' },
      { time: '04:30 PM', title: '🏆 Prize Distribution & Valedictory (₹12,500 Pool)', icon: Trophy, type: 'award', desc: 'Presentation of trophies, certificates, and cash prizes.' },
      { time: '05:30 PM', title: 'Group Photo & Event Wrap-up', icon: Sparkles, type: 'social', desc: 'Celebrating the changemakers of IDEAVYA 2026.' },
    ],
  },
];

const typeStyles: Record<string, string> = {
  milestone: 'bg-brand-500/20 border-brand-500/40 text-brand-300',
  session:   'bg-purple-500/20 border-purple-500/40 text-purple-300',
  workshop:  'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
  mentor:    'bg-blue-500/20 border-blue-500/40 text-blue-300',
  break:     'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  social:    'bg-pink-500/10 border-pink-500/20 text-pink-400',
  award:     'bg-amber-500/20 border-amber-500/40 text-amber-300',
  info:      'bg-white/5 border-white/10 text-gray-300',
};

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="relative py-24 px-4 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-brand-600/30 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-300 text-sm font-medium mb-6">
            <Calendar size={13} className="text-brand-400" /> Event Timeline
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-black text-white leading-tight mb-5">
            Competition <span className="gradient-text">Format &amp; Schedule</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            From online screening and bootcamp to the on-campus Semi-Finale and Grand Finale at MITS.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-brand-400" /> 10 &amp; 11 November 2026</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-brand-400" /> MITS Deemed to be University CAMPUS</span>
            <span className="flex items-center gap-1.5"><Trophy size={14} className="text-brand-400" /> ₹12,500 Prize Pool</span>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          {competitionRounds.map((round) => (
            <div key={round.phase}>
              {/* Round header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                  <span className="font-display font-black text-xs text-brand-300">{round.phase.slice(-2)}</span>
                </div>
                <div>
                  <div className="font-display font-bold text-xl text-white">{round.name}</div>
                  <div className="text-gray-400 text-sm flex items-center gap-1.5">
                    <Clock size={12} className="text-brand-400" /> {round.mode}
                  </div>
                </div>
              </div>

              {/* Events */}
              <div className="relative ml-6 border-l-2 border-white/10 space-y-0">
                {round.events.map((event, idx) => (
                  <div key={idx} className="relative pl-8 pb-6">
                    <div className={`absolute left-0 top-2 w-3 h-3 rounded-full border-2 border-gray-950 ${round.dot} -translate-x-[7px]`} />
                    <div className={`glass-card p-4 border ${typeStyles[event.type]}`}>
                      <div className="flex items-start gap-3">
                        <event.icon size={15} className="mt-0.5 shrink-0 opacity-70" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-white font-semibold text-sm">{event.title}</span>
                            <span className="text-xs opacity-60 font-mono">{event.time}</span>
                          </div>
                          {event.desc && <p className="text-xs opacity-70 mt-1 leading-relaxed">{event.desc}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-2xl mx-auto glass-card p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-purple-500/5 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl font-bold text-white mb-3">Be Part of IDEAVYA 2026</h2>
            <p className="text-gray-400 mb-7 text-sm">Form your interdisciplinary team (2–4 members) and register before slots fill up.</p>
            <Link to="/register" className="btn-primary text-base px-10 py-4">
              Register Your Team <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
