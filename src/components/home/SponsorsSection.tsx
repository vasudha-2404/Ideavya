import { ExternalLink, Sparkles, Building, ShieldCheck } from 'lucide-react';

const partners = [
  {
    category: 'Organizing University',
    name: 'Madanapalle Institute of Technology & Science',
    sub: 'Deemed to be University under section 3 of UGC Act, 1956',
    role: 'Host Campus & Academic Partner',
    url: 'https://www.mits.ac.in',
    badge: 'Organized By',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
  {
    category: 'Industry Partner',
    name: 'Pathvision Innovations',
    sub: 'Applied AI & Autonomous Systems Research',
    role: 'Mentorship, Technology & Jury Partner',
    url: 'https://www.mits.ac.in',
    badge: 'In Association With',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    hasLogo: true,
  },
  {
    category: 'Incubation & Startup Cell',
    name: 'MITS Centre for Innovation & Incubation (MCII)',
    sub: 'Seed Funding, Mentorship & Patent Support',
    role: 'Incubation Pathway',
    url: 'https://www.mits.ac.in',
    badge: 'Ecosystem Partner',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
  {
    category: 'Technical Chapter',
    name: 'Institution’s Innovation Council (IIC)',
    sub: 'Ministry of Education Initiative',
    role: 'National Innovation Facilitation',
    url: 'https://www.mits.ac.in',
    badge: 'Knowledge Partner',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
];

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="py-24 px-4 bg-gray-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-400 font-semibold text-sm tracking-widest uppercase mb-3 block flex items-center justify-center gap-1.5">
            <Sparkles size={14} /> Ecosystem &amp; Partners
          </span>
          <h2 className="section-title mb-4">
            Backed by <span className="gradient-text">Excellence</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            IDEAVYA 2026 brings together academic leadership, industry practitioners, and startup incubation ecosystems to guide your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="glass-card p-6 flex flex-col justify-between hover:border-brand-500/40 hover:scale-[1.02] transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${partner.badgeColor}`}>
                    {partner.badge}
                  </span>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 group-hover:text-brand-400 transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>

                {partner.hasLogo ? (
                  <div className="mb-4 bg-white rounded-xl p-2.5 w-fit shadow-md flex items-center justify-center">
                    <img
                      src="/pathvision-logo.png"
                      alt={partner.name}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-brand-400">
                    <Building size={20} />
                  </div>
                )}

                <h3 className="font-display font-bold text-white text-base mb-1.5 leading-snug">
                  {partner.name}
                </h3>
                <p className="text-gray-400 text-xs mb-3 leading-relaxed">
                  {partner.sub}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-brand-300 font-medium">
                <ShieldCheck size={13} className="text-emerald-400" />
                {partner.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
