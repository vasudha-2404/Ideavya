import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X, Shield, LayoutDashboard, UserCheck, ShieldCheck } from 'lucide-react';
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
          ? 'bg-midnight-950/85 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-950/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo (Left side) */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-400/50 transition-all duration-200 group-hover:scale-110 border border-white/20">
              <Zap size={18} className="text-white" fill="white" />
            </div>
            <div className="leading-tight">
              <span className="font-display font-extrabold text-white text-sm tracking-wide block">IDEAVYA</span>
              <span className="font-display font-semibold text-cyan-300 text-xs tracking-widest block">2026</span>
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
                    ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-400/20 shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
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
                    ? 'text-purple-300 bg-purple-500/20 border border-purple-400/30'
                    : 'text-purple-400 hover:bg-purple-500/10'
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
                    ? 'text-emerald-300 bg-emerald-500/20 border border-emerald-400/30'
                    : 'text-emerald-400 hover:bg-emerald-500/10'
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
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 transition-colors"
                title="Switch Role or Account"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-medium text-white max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-white/10 rounded text-gray-400">
                  {user.role}
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-xs font-semibold text-gray-300 hover:text-white px-3 py-2"
              >
                Sign In
              </Link>
            )}

            <Link to="/register" id="header-register-btn" className="btn-primary text-xs py-2 px-4 shadow-md shadow-cyan-500/25">
              Register Now
            </Link>

            {/* Pathvision Logo on the Right */}
            <div className="flex items-center pl-3 border-l border-white/10" title="Industry Partner: Pathvision Innovations">
              <a
                href="https://www.mits.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg px-2.5 py-1 shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center"
              >
                <img
                  src="/pathvision-logo.png"
                  alt="Pathvision Innovations"
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
                alt="Pathvision Innovations"
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
        <div className="md:hidden bg-midnight-950/95 backdrop-blur-2xl border-t border-cyan-500/20 px-4 py-4 flex flex-col gap-1 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-white/10 mt-2 pt-2 space-y-1">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <LayoutDashboard size={15} />
              Participant Dashboard
            </Link>
            <Link
              to="/judge"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-purple-400 hover:bg-white/5 transition-colors"
            >
              <Shield size={15} />
              Judge Portal
            </Link>
            <Link
              to="/admin"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-emerald-400 hover:bg-white/5 transition-colors"
            >
              <ShieldCheck size={15} />
              Admin Portal
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <UserCheck size={15} />
              Login / Switch Role
            </Link>
          </div>

          <Link to="/register" className="btn-primary text-sm mt-3 justify-center">
            Register Now
          </Link>
        </div>
      )}
    </header>
  );
}
