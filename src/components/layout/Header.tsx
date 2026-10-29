import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X, Shield, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Tracks', path: '/tracks' },
  { label: 'Schedule', path: '/schedule' },
  { label: 'Prizes', path: '/prizes' },
  { label: 'Dashboard', path: '/dashboard' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

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
          ? 'bg-midnight-950/90 backdrop-blur-xl border-b border-blue-500/20 shadow-2xl shadow-blue-950/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo (Left side) - Royal Blue & White */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:shadow-blue-400/50 transition-all duration-200 group-hover:scale-110 border border-white/30">
              <Zap size={18} className="text-white" fill="white" />
            </div>
            <div className="leading-tight">
              <span className="font-display font-extrabold text-white text-sm tracking-wide block">IDEAVYA</span>
              <span className="font-display font-semibold text-blue-300 text-xs tracking-widest block">2026</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-white bg-blue-600/20 border border-blue-400/30 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Role-specific quick links */}
            {user?.role === 'judge' && (
              <Link
                to="/judge"
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  location.pathname === '/judge'
                    ? 'text-white bg-blue-600/25 border border-blue-400/40'
                    : 'text-blue-300 hover:bg-blue-500/10'
                }`}
              >
                <Shield size={13} />
                Judge Portal
              </Link>
            )}

            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  location.pathname === '/admin'
                    ? 'text-white bg-blue-600/25 border border-blue-400/40'
                    : 'text-blue-300 hover:bg-blue-500/10'
                }`}
              >
                <ShieldCheck size={13} />
                Admin Portal
              </Link>
            )}
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 hover:bg-white/10 transition-colors"
                title="Switch Role or Account"
              >
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="font-medium text-white max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-white/10 rounded text-slate-300">
                  {user.role}
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2"
              >
                Sign In
              </Link>
            )}

            <Link to="/register" id="header-register-btn" className="btn-primary text-xs py-2 px-4 shadow-md shadow-blue-600/30">
              Register Now
            </Link>

            {/* Pathvision Logo on the Right */}
            <div className="flex items-center pl-3 border-l border-white/10" title="Industry Partner: Pathvision Innovations">
              <a
                href="https://www.mits.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-85 transition-opacity"
              >
                <div className="h-8 px-2 rounded-lg bg-white/95 flex items-center justify-center border border-white/30 shadow-sm">
                  <img
                    src="/pathvision-logo.png"
                    alt="Pathvision Innovations"
                    className="h-5 w-auto object-contain"
                  />
                </div>
              </a>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <Link to="/register" className="btn-primary text-xs py-1.5 px-3">
              Register
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-midnight-950/95 border-b border-blue-500/20 px-4 pt-2 pb-6 space-y-2 backdrop-blur-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-white bg-blue-600/20 border border-blue-400/30'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-blue-300 hover:bg-white/5 transition-colors"
            >
              <LayoutDashboard size={15} />
              Participant Portal
            </Link>
          )}
          {user?.role === 'judge' && (
            <Link
              to="/judge"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600/20 transition-colors"
            >
              <Shield size={15} />
              Judge Portal
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600/20 transition-colors"
            >
              <ShieldCheck size={15} />
              Admin Portal
            </Link>
          )}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            {user ? (
              <span className="text-xs text-slate-400">Signed in as <strong className="text-white">{user.name}</strong></span>
            ) : (
              <Link to="/login" className="text-xs text-slate-300 hover:text-white">Sign In</Link>
            )}
            <Link to="/register" className="btn-primary text-xs py-1.5 px-3">Register Team</Link>
          </div>
        </div>
      )}
    </header>
  );
}
