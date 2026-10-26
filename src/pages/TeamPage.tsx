import { Mail, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const coreTeam = [
  {
    name: 'Aanya Sharma',
    role: 'Lead Organizer',
    bio: 'Final-year CSE student, TEDx speaker, and startup founder. Aanya started IDEAVYA to build the hackathon culture she always wished existed.',
    emoji: '👩‍💻',
    track: 'AI & ML',
    college: 'IIT Bangalore',
    social: '#',
  },
  {
    name: 'Rohan Mehta',
    role: 'Technical Lead',
    bio: 'Full-stack developer and open-source contributor with 3 hackathon wins. Rohan ensures our tech platform runs flawlessly for every participant.',
    emoji: '🧑‍💻',
    track: 'Web3',
    college: 'BITS Pilani',
    social: '#',
  },
  {
    name: 'Priya Nair',
    role: 'Partnerships Head',
    bio: 'Marketing strategist and community builder. Priya brings in the sponsors, mentors, and industry partners that make IDEAVYA special.',
    emoji: '👩‍🎨',
    track: 'HealthTech',
    college: 'NITK Surathkal',
    social: '#',
  },
  {
    name: 'Arjun Das',
    role: 'Community Manager',
    bio: 'Passionate about inclusive tech communities. Arjun manages our Discord, social media, and participant engagement across all channels.',
    emoji: '🧑‍🎤',
    track: 'CleanTech',
    college: 'VIT Vellore',
    social: '#',
  },
  {
    name: 'Sneha Kulkarni',
    role: 'Design Lead',
    bio: 'UI/UX designer and motion graphics artist. Sneha crafted the visual identity of IDEAVYA from the logo to every pixel on this site.',
    emoji: '🎨',
    track: 'EdTech',
    college: 'Symbiosis Pune',
    social: '#',
  },
  {
    name: 'Karan Singh',
    role: 'Finance & Operations',
    bio: 'MBA student and logistics wizard. Karan handles everything from budgets to venue coordination to ensuring everyone is fed and caffeinated.',
    emoji: '🧑‍💼',
    track: 'Open Innovation',
    college: 'IIM Ahmedabad',
    social: '#',
  },
];

const mentors = [
  { name: 'Dr. Meera Iyer',   role: 'AI Research Scientist', org: 'Google DeepMind',      emoji: '🔬', track: 'AI & ML'   },
  { name: 'Vikram Nair',       role: 'Blockchain Architect',  org: 'Polygon Labs',          emoji: '⛓️', track: 'Web3'      },
  { name: 'Dr. Anita Rao',     role: 'HealthTech Advisor',    org: 'Apollo Hospitals',      emoji: '🏥', track: 'HealthTech'},
  { name: 'Suresh Patel',      role: 'CleanTech Founder',     org: 'GreenGrid Energy',       emoji: '🌱', track: 'CleanTech' },
  { name: 'Priyanka Joshi',    role: 'EdTech Product Head',   org: 'BYJU\'s',               emoji: '📚', track: 'EdTech'    },
  { name: 'Rahul Verma',       role: 'VC Partner',            org: 'Sequoia Capital India', emoji: '💰', track: 'All Tracks'},
  { name: 'Nidhi Aggarwal',    role: 'Startup Ecosystem Lead',org: 'Nasscom',               emoji: '🚀', track: 'All Tracks'},
  { name: 'Aditya Kumar',      role: 'Full Stack Architect',  org: 'Atlassian',             emoji: '💻', track: 'All Tracks'},
];

const trackColors: Record<string, string> = {
  'AI & ML':    'bg-violet-500/20 text-violet-300',
  'Web3':       'bg-blue-500/20 text-blue-300',
  'HealthTech': 'bg-emerald-500/20 text-emerald-300',
  'CleanTech':  'bg-orange-500/20 text-orange-300',
  'EdTech':     'bg-pink-500/20 text-pink-300',
  'Open Innovation': 'bg-gray-500/20 text-gray-300',
  'All Tracks': 'bg-brand-500/20 text-brand-300',
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="relative py-24 px-4 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-brand-600/30 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow animation-delay-400" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-300 text-sm font-medium mb-6">
            <Globe size={13} className="text-brand-400" /> Our People
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-black text-white leading-tight mb-5">
            The <span className="gradient-text">Dreamers</span> Behind IDEAVYA
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            A passionate team of students, builders, and community champions — united by one goal: to create the hackathon we always wished existed.
          </p>
        </div>
      </section>

      {/* Core Team */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-brand-400 font-semibold text-sm tracking-widest uppercase mb-3 block">Core Team</span>
            <h2 className="section-title mb-3">Meet the <span className="gradient-text">Organizers</span></h2>
            <p className="section-subtitle max-w-xl mx-auto">Six passionate individuals who put in thousands of hours to make IDEAVYA possible.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreTeam.map((member) => (
              <div key={member.name} className="glass-card p-7 hover:border-brand-500/30 hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl shrink-0">
                    {member.emoji}
                  </div>
                  <div>
                    <div className="font-display font-bold text-white text-lg leading-tight">{member.name}</div>
                    <div className="text-brand-400 text-sm font-semibold">{member.role}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{member.college}</div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${trackColors[member.track]}`}>{member.track}</span>
                  <a href={member.social} className="text-gray-500 hover:text-brand-400 transition-colors">
                    <Mail size={15} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-accent-400 font-semibold text-sm tracking-widest uppercase mb-3 block">Industry Experts</span>
            <h2 className="section-title mb-3">Our <span className="gradient-text">Mentors</span></h2>
            <p className="section-subtitle max-w-xl mx-auto">World-class practitioners from top companies who'll guide you through the hackathon journey.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mentors.map((mentor) => (
              <div key={mentor.name} className="glass-card p-6 text-center hover:border-brand-500/30 hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-3">{mentor.emoji}</div>
                <div className="font-display font-bold text-white text-base mb-0.5 leading-tight">{mentor.name}</div>
                <div className="text-brand-400 text-xs font-medium mb-1">{mentor.role}</div>
                <div className="text-gray-500 text-xs mb-3">{mentor.org}</div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${trackColors[mentor.track]}`}>{mentor.track}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the team CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto glass-card p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-purple-500/5 pointer-events-none" />
          <div className="relative z-10">
            <div className="text-4xl mb-4">🤝</div>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Want to volunteer?</h2>
            <p className="text-gray-400 mb-7 text-sm">We're always looking for passionate volunteers to join the IDEAVYA family. Get in touch!</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="btn-primary px-8 py-3">
                Get Involved <ArrowRight size={16} />
              </Link>
              <Link to="/register" className="btn-outline px-8 py-3">
                Register as Participant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
