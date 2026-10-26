import { Cpu, Building2, Car, Leaf, HeartHandshake, ArrowRight, CheckCircle, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const tracks = [
  {
    icon: Cpu,
    title: 'Artificial Intelligence and Machine Learning',
    tag: 'Theme 01',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    color: 'from-blue-500/20 to-indigo-500/20',
    border: 'border-blue-500/40',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    description:
      'Build intelligent systems, neural networks, predictive models, autonomous agents, and generative AI solutions that tackle complex industry and scientific challenges.',
    problems: [
      'Autonomous diagnostic tools and clinical predictive intelligence',
      'Computer vision for precision agriculture & automated inspection',
      'Multimodal generative models for local language preservation',
    ],
    tools: ['Python', 'PyTorch', 'TensorFlow', 'HuggingFace', 'LangChain', 'FastAPI'],
  },
  {
    icon: Building2,
    title: 'Smart Infrastructure and Industrial Applications',
    tag: 'Theme 02',
    tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    color: 'from-purple-500/20 to-indigo-500/20',
    border: 'border-purple-500/40',
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-400',
    description:
      'Engineer future-ready cities, connected transportation systems, Industrial IoT automation, predictive machinery maintenance, and resilient urban infrastructure.',
    problems: [
      'Real-time traffic decongestion and emergency corridor routing',
      'Industrial sensor analytics for machinery fault prediction',
      'Decentralized structural health monitoring for bridges & buildings',
    ],
    tools: ['IoT / ESP32', 'MQTT', 'Node.js', 'React', 'Docker', 'Time-series DB'],
  },
  {
    icon: Car,
    title: 'Mobility, Automotive Technology, and Transportation',
    tag: 'Theme 03',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    color: 'from-amber-500/20 to-orange-500/20',
    border: 'border-amber-500/40',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
    description:
      'Pioneer electric vehicle technology, autonomous driving systems, connected transport, intelligent logistics, fleet management, and smart transit infrastructure.',
    problems: [
      'EV battery lifecycle management & charging station network balancing',
      'V2X (Vehicle-to-Everything) collision avoidance algorithms',
      'Public transport crowd density forecasting and route adaptation',
    ],
    tools: ['Embedded Systems', 'CAN Bus', 'ROS', 'Python', 'Computer Vision', 'IoT'],
  },
  {
    icon: Leaf,
    title: 'Renewable Energy and Environmental Sustainability',
    tag: 'Theme 04',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    color: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/40',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    description:
      'Pioneer clean energy technologies, carbon accounting, smart microgrid management, circular recycling systems, and ecological protection mechanisms.',
    problems: [
      'Microgrid balance optimization & localized solar distribution',
      'AI-based waste segregation and circular economy supply chains',
      'Air & water contamination telemetry with actionable mitigation alerts',
    ],
    tools: ['Python', 'Embedded C', 'GIS / Map APIs', 'Cloud IoT', 'React Native'],
  },
  {
    icon: HeartHandshake,
    title: 'Social Innovation and Entrepreneurship',
    tag: 'Theme 05',
    tagColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    color: 'from-rose-500/20 to-pink-500/20',
    border: 'border-rose-500/40',
    iconBg: 'bg-rose-500/20',
    iconColor: 'text-rose-400',
    description:
      'Build human-centric digital services, civic empowerment tools, inclusive financial access systems, and sustainable entrepreneurial ventures that scale positive change.',
    problems: [
      'Micro-entrepreneurship enablement for underserved communities',
      'Transparent supply chain traceability for ethical fair-trade goods',
      'Accessible telemedicine and essential civic service dispatch for rural areas',
    ],
    tools: ['Full-Stack Web', 'Flutter', 'Supabase', 'Payment APIs', 'PostgreSQL'],
  },
];

export default function TracksPage() {
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
            <Lightbulb size={13} className="text-brand-400" /> Innovation Tracks
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-black text-white leading-tight mb-5">
            Choose Your <span className="gradient-text">Domain</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Six curated tracks covering the most pressing problems of our time.
            Pick the one that fires you up — then build something that matters.
          </p>
        </div>
      </section>

      {/* Track cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {tracks.map((track) => (
            <div
              key={track.title}
              className={`glass-card p-8 bg-gradient-to-br ${track.color} border ${track.border} hover:scale-[1.01] transition-all duration-300`}
            >
              <div className="grid md:grid-cols-3 gap-8">
                {/* Left */}
                <div className="md:col-span-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${track.iconBg} flex items-center justify-center shrink-0`}>
                      <track.icon size={26} className={track.iconColor} />
                    </div>
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${track.tagColor} mb-2`}>
                        {track.tag}
                      </span>
                      <h3 className="font-display font-bold text-white text-xl leading-tight">{track.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{track.description}</p>
                </div>

                {/* Middle — problem statements */}
                <div>
                  <h4 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                    <CheckCircle size={14} className="text-brand-400" /> Sample Problem Statements
                  </h4>
                  <ul className="space-y-3">
                    {track.problems.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-gray-400 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right — tools */}
                <div>
                  <h4 className="text-white font-semibold text-sm mb-4">Suggested Tech Stack</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {track.tools.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 text-sm font-semibold transition-colors group"
                  >
                    Register for this track
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
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
            <h2 className="font-display text-3xl font-bold text-white mb-3">Found your track?</h2>
            <p className="text-gray-400 mb-7">Register now and lock in your spot before seats fill up.</p>
            <Link to="/register" className="btn-primary text-base px-10 py-4">
              Register Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
