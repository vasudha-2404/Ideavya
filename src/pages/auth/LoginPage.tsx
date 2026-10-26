import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types/ideathon';
import { Shield, Sparkles, UserCheck, ArrowRight, Lock, Mail, CheckCircle2, Info } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('participant');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleQuickLogin = async (role: UserRole) => {
    setIsLoading(true);
    setError(null);
    try {
      await login('', role);
      if (role === 'admin') navigate('/admin');
      else if (role === 'judge') navigate('/judge');
      else navigate('/dashboard');
    } catch {
      setError('Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide your email address.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await login(email, selectedRole);
      if (selectedRole === 'admin') navigate('/admin');
      else if (selectedRole === 'judge') navigate('/judge');
      else navigate('/dashboard');
    } catch {
      setError('Invalid login credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-3">
            <Sparkles size={14} className="text-brand-400" />
            IDEAVYA 2026 Portal Access
          </div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Access your team hub, evaluate submissions, or manage the hackathon.
          </p>
        </div>

        {/* Quick Demo Login Cards */}
        <div className="glass-card p-5 mb-6 border border-white/10 rounded-2xl bg-gray-900/60 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              One-Click Demo Roles
            </span>
            <span className="text-[11px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
              Instant Access
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleRoleQuickLogin('participant')}
              disabled={isLoading}
              className="flex flex-col items-center text-center p-3 rounded-xl bg-white/5 hover:bg-brand-500/20 hover:border-brand-500/40 border border-white/5 transition-all text-xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <UserCheck size={16} />
              </div>
              <span className="font-semibold text-white">Participant</span>
              <span className="text-[10px] text-gray-400">Team Hub</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleQuickLogin('judge')}
              disabled={isLoading}
              className="flex flex-col items-center text-center p-3 rounded-xl bg-white/5 hover:bg-purple-500/20 hover:border-purple-500/40 border border-white/5 transition-all text-xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Shield size={16} />
              </div>
              <span className="font-semibold text-white">Judge</span>
              <span className="text-[10px] text-gray-400">Evaluations</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleQuickLogin('admin')}
              disabled={isLoading}
              className="flex flex-col items-center text-center p-3 rounded-xl bg-white/5 hover:bg-emerald-500/20 hover:border-emerald-500/40 border border-white/5 transition-all text-xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={16} />
              </div>
              <span className="font-semibold text-white">Admin</span>
              <span className="text-[10px] text-gray-400">All Portal</span>
            </button>
          </div>
        </div>

        {/* Standard Login Form */}
        <div className="glass-card p-6 border border-white/10 rounded-2xl bg-gray-900/70 backdrop-blur-xl shadow-2xl">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <Info size={16} className="shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['participant', 'judge', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`py-2 text-xs font-medium rounded-lg border capitalize transition-all ${
                      selectedRole === r
                        ? 'bg-brand-500/20 border-brand-500 text-brand-300 font-semibold'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. aarav.sharma@mits.ac.in"
                  className="w-full bg-gray-950/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between items-center">
                <span>Password</span>
                <span className="text-[11px] text-brand-400 hover:underline cursor-pointer">
                  Forgot?
                </span>
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-gray-950/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 justify-center text-sm font-semibold flex items-center gap-2 mt-2 shadow-lg shadow-brand-500/25"
            >
              {isLoading ? 'Signing In...' : 'Sign In to Portal'}
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-center text-xs text-gray-400">
            Don't have an account yet?{' '}
            <Link to="/auth/register" className="text-brand-400 font-semibold hover:underline">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
