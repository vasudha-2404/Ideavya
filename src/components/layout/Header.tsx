import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X, History, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Tracks', path: '/tracks' },
  { label: 'Schedule', path: '/schedule' },
  { label: 'Team', path: '/team' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-950/90 backdrop-blur-lg border-b border-white/10 shadow-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo (Left side) */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-all duration-200 group-hover:scale-110">
              <Zap size={18} className="text-white" fill="white" />
            </div>
            <div className="leading-tight">
              <span className="font-display font-bold text-white text-sm tracking-wide block">IDEAVYA</span>
              <span className="font-display font-semibold text-brand-400 text-xs tracking-widest block">2026</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-brand-400 bg-brand-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/payment/history"
              id="header-history-link"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === '/payment/history'
                  ? 'text-brand-400 bg-brand-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              title="My Payments"
            >
              <History size={15} />
              <span className="hidden lg:inline">My Payments</span>
            </Link>
            <Link to="/register" id="header-register-btn" className="btn-primary text-sm py-2.5">
              Register Now
            </Link>

            {/* Pathvision Logo on the Right */}
            <div className="flex items-center pl-3 border-l border-white/10" title="Industry Partner: Pathvision">
              <a
                href="https://www.mits.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg px-2.5 py-1 shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center"
              >
                <img
                  src="/pathvision-logo.png"
                  alt="Pathvision"
                  className="h-6 w-auto object-contain"
                />
              </a>
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2.5 md:hidden">
            <div className="bg-white rounded-lg px-2 py-0.5 shadow-sm">
              <img
                src="/pathvision-logo.png"
                alt="Pathvision"
                className="h-5 w-auto object-contain"
              />
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-xl border-t border-white/10 px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-brand-400 bg-brand-500/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-white/10 mt-2 pt-2 space-y-1">
            <Link
              to="/payment/history"
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <History size={15} />
              My Payments
            </Link>
            <Link
              to="/admin/payments?admin=true"
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors"
            >
              <ShieldCheck size={15} />
              Admin
            </Link>
          </div>
          <Link to="/register" className="btn-primary text-sm mt-2 justify-center">
            Register Now
          </Link>
        </div>
      )}
    </header>
  );
}
