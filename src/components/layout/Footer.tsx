import { Link } from 'react-router-dom';
import { Zap, ArrowUpRight } from 'lucide-react';

// ─── Custom Brand Icons for Google, Chrome & Mail ────────────────────────────

function GoogleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
    </svg>
  );
}

function ChromeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9.5" fill="#4285F4" />
      <path d="M12 2.5a9.5 9.5 0 0 1 8.23 4.75H12v-4.75z" fill="#EA4335" />
      <path d="M20.23 7.25A9.5 9.5 0 0 1 16.75 20.25L12 12h8.23z" fill="#FBBC05" />
      <path d="M12 12l4.75 8.25A9.5 9.5 0 0 1 3.77 16.75L12 12z" fill="#34A853" />
      <circle cx="12" cy="12" r="4" fill="#ffffff" />
      <circle cx="12" cy="12" r="2.8" fill="#1a73e8" />
    </svg>
  );
}

function MailIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const footerLinks = {
  Event: [
    { label: 'About', path: '/about' },
    { label: 'Themes', path: '/tracks' },
    { label: 'Schedule', path: '/schedule' },
    { label: 'Prizes', path: '/prizes' },
  ],
  Participate: [
    { label: 'Register Team', path: '/register' },
    { label: 'Guidelines', path: '/tracks' },
    { label: 'FAQs', path: '/faqs' },
    { label: 'Contact', path: '/contact' },
  ],
};

const socials = [
  {
    icon: GoogleIcon,
    label: 'Google',
    href: 'https://www.google.com/search?q=Madanapalle+Institute+of+Technology+and+Science+IDEAVYA',
    desc: 'Search on Google',
  },
  {
    icon: ChromeIcon,
    label: 'Chrome / Web',
    href: 'https://www.mits.ac.in',
    desc: 'Official Website on Chrome',
  },
  {
    icon: MailIcon,
    label: 'Google Mail',
    href: 'mailto:contact@mits.ac.in',
    desc: 'Email Us',
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 w-fit group">
              <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-110 transition-transform">
                <Zap size={18} className="text-white" fill="white" />
              </div>
              <div className="leading-tight">
                <span className="font-display font-bold text-white text-sm tracking-wide block">IDEAVYA</span>
                <span className="font-display font-semibold text-brand-400 text-xs tracking-widest block">2026</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-3">
              Turn real-world challenges into real solutions. Organized by MITS Deemed to be University.
            </p>

            {/* In Association with Pathvision Innovations (Text only) */}
            <div className="mb-6 text-xs text-gray-400">
              In Association with <span className="font-semibold text-brand-300 tracking-wide">Pathvision Innovations</span>
            </div>

            {/* Google, Chrome, Mail Buttons */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href, desc }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={desc}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/15 hover:border-white/30 hover:scale-110 transition-all duration-200 shadow-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white text-sm tracking-wide mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-brand-400 text-sm transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} IDEAVYA 2026 · MITS Deemed to be University. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Pathvision Innovations &amp; MITS Innovation Initiative
          </p>
        </div>
      </div>
    </footer>
  );
}
