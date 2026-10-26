import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useIdeathon } from '../../context/IdeathonContext';
import type { InnovationTheme, UserRole } from '../../types/ideathon';
import {
  Users, Sparkles, CheckCircle2, Clock, AlertTriangle,
  Copy, Check, Plus, LogIn, ExternalLink, Award, FileText,
  Layers, Bell, ShieldCheck, ChevronRight
} from 'lucide-react';

const THEMES: InnovationTheme[] = [
  'Artificial Intelligence and Machine Learning',
  'Smart Infrastructure and Industrial Applications',
  'Mobility, Automotive Technology, and Transportation',
  'Renewable Energy and Environmental Sustainability',
  'Social Innovation and Entrepreneurship',
];

export default function ParticipantDashboardPage() {
  const { user, switchRole } = useAuth();
  const { getUserTeam, getTeamSubmission, createTeam, joinTeam, announcements } = useIdeathon();

  const [copiedCode, setCopiedCode] = useState(false);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showJoinTeam, setShowJoinTeam] = useState(false);

  // Create Team State
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamTheme, setNewTeamTheme] = useState<InnovationTheme>(THEMES[0]);

  // Join Team State
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [joinError, setJoinError] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center">
        <div className="text-center glass-card p-8 max-w-md w-full border border-white/10 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-2">Access Restricted</h2>
          <p className="text-gray-400 text-sm mb-6">Please log in to access the Participant Dashboard.</p>
          <Link to="/login" className="btn-primary justify-center w-full">
            Log In Now
          </Link>
        </div>
      </div>
    );
  }

  const team = getUserTeam(user.teamId);
  const submission = getTeamSubmission(user.teamId);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCreateTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;
    createTeam(
      newTeamName,
      newTeamTheme,
      user.name,
      user.email,
      user.department,
      user.college,
      user.id
    );
    setShowCreateTeam(false);
    setNewTeamName('');
  };

  const handleJoinTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinError(null);
    if (!joinCodeInput.trim()) return;

    const result = joinTeam(
      joinCodeInput.trim().toUpperCase(),
      user.id,
      user.name,
      user.email,
      user.department,
      user.college
    );

    if (result.success) {
      setShowJoinTeam(false);
      setJoinCodeInput('');
    } else {
      setJoinError(result.message);
    }
  };

  // Interdisciplinary computation
  const memberDepts = team ? [...new Set(team.members.map((m) => m.department))] : [];
  const isInterdisciplinary = memberDepts.length >= 2;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Demo Bar */}
      <div className="mb-6 p-3 rounded-xl bg-gray-900/90 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Role: <strong className="text-white uppercase tracking-wider">{user.role}</strong> ({user.name})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 mr-1 hidden sm:inline">Switch view:</span>
          {(['participant', 'judge', 'admin'] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => switchRole(r)}
              className={`px-2.5 py-1 rounded-lg border capitalize transition-all ${
                user.role === r
                  ? 'bg-brand-500/20 border-brand-500 text-brand-300 font-semibold'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
          {user.role === 'admin' && (
            <Link to="/admin" className="ml-2 text-brand-400 hover:underline flex items-center gap-1">
              Admin Portal <ChevronRight size={12} />
            </Link>
          )}
          {user.role === 'judge' && (
            <Link to="/judge" className="ml-2 text-purple-400 hover:underline flex items-center gap-1">
              Judge Portal <ChevronRight size={12} />
            </Link>
          )}
        </div>
      </div>

      {/* Hero Welcome */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-brand-950/40 mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-brand-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-300 text-xs font-semibold mb-3">
              <Sparkles size={13} className="text-brand-400" />
              IDEAVYA 2026 Innovator Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Hello, {user.name}
            </h1>
            <p className="text-gray-400 text-sm mt-1 max-w-xl">
              {user.department} &bull; {user.college}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/payment"
              className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all flex items-center gap-2"
            >
              <Award size={14} className="text-brand-400" />
              Registration Pass
            </Link>
            {team && !submission && (
              <Link
                to="/dashboard/submit"
                className="btn-primary text-xs py-2.5 flex items-center gap-2 shadow-lg shadow-brand-500/20"
              >
                <Plus size={14} />
                Submit Idea
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Team Hub (2 Cols wide on desktop) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Team Hub Section */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 bg-gray-900/70">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                  <Users size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">My Innovation Team</h2>
                  <p className="text-xs text-gray-400">Team Size: 2–4 members across &ge;2 departments</p>
                </div>
              </div>

              {team && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(team.code)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-cyan-300 hover:bg-white/10 transition-colors"
                    title="Click to copy team code"
                  >
                    <span>{team.code}</span>
                    {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              )}
            </div>

            {/* Team details or create/join buttons */}
            {team ? (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">Team Name</span>
                    <span className="text-lg font-bold text-white">{team.name}</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">Selected Theme</span>
                    <span className="text-xs font-medium text-brand-300">{team.theme}</span>
                  </div>
                </div>

                {/* Interdisciplinary Compliance Alert */}
                {isInterdisciplinary ? (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3 text-emerald-300 text-xs">
                    <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
                    <div>
                      <strong className="text-emerald-200">Interdisciplinary Requirement Fulfilled! </strong>
                      Your team represents {memberDepts.length} distinct departments ({memberDepts.join(', ')}).
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-300 text-xs">
                    <AlertTriangle size={18} className="shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <strong className="text-amber-200">Action Required: Interdisciplinary Mandate. </strong>
                      All team members are currently from the same department. Invite at least one student from another department using your team code <strong>{team.code}</strong>.
                    </div>
                  </div>
                )}

                {/* Members list */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                    Team Members ({team.members.length} / 4)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {team.members.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-white truncate">{m.name}</span>
                            {m.role === 'leader' ? (
                              <span className="text-[10px] bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded-md border border-brand-500/30 font-medium">
                                Leader
                              </span>
                            ) : (
                              <span className="text-[10px] bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded-md">
                                Member
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 truncate mt-0.5">{m.department}</p>
                          <p className="text-[11px] text-gray-500 truncate">{m.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {team.members.length < 4 && (
                  <div className="p-4 rounded-2xl bg-brand-500/5 border border-brand-500/15 flex items-center justify-between text-xs text-gray-300">
                    <span>Need more teammates? Share team code <code className="bg-white/10 px-2 py-0.5 rounded text-white font-mono">{team.code}</code></span>
                    <button
                      onClick={() => handleCopyCode(team.code)}
                      className="text-brand-400 font-semibold hover:underline"
                    >
                      {copiedCode ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-brand-500/10 text-brand-400 flex items-center justify-center mx-auto mb-4">
                  <Users size={32} />
                </div>
                <h3 className="text-base font-bold text-white mb-1">You are not in a team yet</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
                  To submit an idea for IDEAVYA 2026, create a new team as a leader or join an existing team using a 8-character team code.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => { setShowCreateTeam(true); setShowJoinTeam(false); }}
                    className="btn-primary text-xs py-2.5 px-4 flex items-center gap-2"
                  >
                    <Plus size={15} />
                    Create New Team
                  </button>
                  <button
                    onClick={() => { setShowJoinTeam(true); setShowCreateTeam(false); }}
                    className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all flex items-center gap-2"
                  >
                    <LogIn size={15} />
                    Join Existing Team
                  </button>
                </div>

                {/* Create Team Form Modal / Inline */}
                {showCreateTeam && (
                  <form onSubmit={handleCreateTeamSubmit} className="mt-6 text-left p-5 rounded-2xl bg-gray-950/80 border border-white/10 space-y-4 max-w-md mx-auto">
                    <h4 className="text-sm font-bold text-white">Create Your Innovation Team</h4>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Team Name</label>
                      <input
                        type="text"
                        required
                        value={newTeamName}
                        onChange={(e) => setNewTeamName(e.target.value)}
                        placeholder="e.g. QuantumInnovators"
                        className="w-full bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Innovation Theme</label>
                      <select
                        value={newTeamTheme}
                        onChange={(e) => setNewTeamTheme(e.target.value as InnovationTheme)}
                        className="w-full bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        {THEMES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowCreateTeam(false)}
                        className="px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary text-xs py-1.5 px-4">
                        Confirm Creation
                      </button>
                    </div>
                  </form>
                )}

                {/* Join Team Form */}
                {showJoinTeam && (
                  <form onSubmit={handleJoinTeamSubmit} className="mt-6 text-left p-5 rounded-2xl bg-gray-950/80 border border-white/10 space-y-4 max-w-md mx-auto">
                    <h4 className="text-sm font-bold text-white">Enter Team Invitation Code</h4>
                    {joinError && (
                      <p className="text-xs text-red-400 bg-red-500/10 p-2 rounded-lg">{joinError}</p>
                    )}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">8-Digit Team Code</label>
                      <input
                        type="text"
                        required
                        value={joinCodeInput}
                        onChange={(e) => setJoinCodeInput(e.target.value)}
                        placeholder="e.g. IDEA-8841"
                        className="w-full bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono uppercase"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowJoinTeam(false)}
                        className="px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary text-xs py-1.5 px-4">
                        Join Team
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Submission Status Section */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 bg-gray-900/70">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                  <Layers size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Idea Submission Tracker</h2>
                  <p className="text-xs text-gray-400">Competition Stage & Mentorship Progress</p>
                </div>
              </div>

              {submission && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold capitalize bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  {submission.status.replace('_', ' ')}
                </span>
              )}
            </div>

            {submission ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{submission.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs bg-white/5 border border-white/10 text-gray-300 px-2.5 py-0.5 rounded-full">
                      {submission.theme}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={12} />
                      Submitted {new Date(submission.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">Abstract Summary</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{submission.solutionAbstract}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {submission.techStack.map((tech, i) => (
                        <span key={i} className="text-[11px] bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded-md border border-cyan-500/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {submission.documentUrl && (
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-gray-400 flex items-center gap-1.5">
                        <FileText size={14} className="text-brand-400" />
                        Uploaded Pitch Deck & Specification
                      </span>
                      <a
                        href={submission.documentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-400 font-semibold hover:underline flex items-center gap-1"
                      >
                        Preview Document <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </div>

                {/* Stepper Pipeline */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                    Evaluation Journey
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {[
                      { step: 1, title: 'Screening', subtitle: 'Level 1 (Online)', done: true },
                      { step: 2, title: 'Bootcamp', subtitle: 'Mentorship', done: ['bootcamp', 'level_2', 'semi_finale', 'grand_finale', 'winner'].includes(submission.status) },
                      { step: 3, title: 'Prototype', subtitle: 'Level 2 Review', done: ['level_2', 'semi_finale', 'grand_finale', 'winner'].includes(submission.status) },
                      { step: 4, title: 'Semi-Finale', subtitle: '10 Nov 2026', done: ['semi_finale', 'grand_finale', 'winner'].includes(submission.status) },
                      { step: 5, title: 'Grand Finale', subtitle: '11 Nov 2026', done: ['grand_finale', 'winner'].includes(submission.status) },
                    ].map((st) => (
                      <div
                        key={st.step}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          st.done
                            ? 'bg-brand-500/10 border-brand-500/40 text-brand-300'
                            : 'bg-white/5 border-white/5 text-gray-500'
                        }`}
                      >
                        <div className="w-6 h-6 rounded-full mx-auto flex items-center justify-center text-xs font-bold mb-1.5 bg-white/10">
                          {st.done ? '✓' : st.step}
                        </div>
                        <div className="font-semibold text-xs text-white">{st.title}</div>
                        <div className="text-[10px] text-gray-400">{st.subtitle}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Judge Scores if available */}
                {submission.scores && submission.scores.length > 0 && (
                  <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Award size={18} className="text-purple-400" />
                        <h4 className="font-bold text-white text-sm">Judge Evaluation Score</h4>
                      </div>
                      <span className="text-lg font-bold text-purple-300">
                        {submission.scores[0].total} / 100
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-3 text-center">
                      <div className="bg-white/5 p-2 rounded-lg">
                        <span className="text-gray-400 block text-[10px]">Innovation (25)</span>
                        <strong className="text-white">{submission.scores[0].innovation}</strong>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg">
                        <span className="text-gray-400 block text-[10px]">Feasibility (25)</span>
                        <strong className="text-white">{submission.scores[0].feasibility}</strong>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg">
                        <span className="text-gray-400 block text-[10px]">Impact (25)</span>
                        <strong className="text-white">{submission.scores[0].impact}</strong>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg">
                        <span className="text-gray-400 block text-[10px]">Presentation (25)</span>
                        <strong className="text-white">{submission.scores[0].presentation}</strong>
                      </div>
                    </div>

                    {submission.scores[0].feedback && (
                      <div className="text-xs text-gray-300 bg-gray-900/60 p-3 rounded-xl border border-white/5">
                        <strong className="text-purple-300 block mb-1">Mentor / Evaluator Feedback:</strong>
                        "{submission.scores[0].feedback}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-4">
                  <FileText size={32} />
                </div>
                <h3 className="text-base font-bold text-white mb-1">No idea submitted yet</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
                  {team
                    ? 'Your team is ready. Prepare your problem statement, solution abstract, and pitch deck to submit.'
                    : 'Create or join a team first before submitting your innovation idea.'}
                </p>

                {team ? (
                  <Link to="/dashboard/submit" className="btn-primary text-xs py-2.5 px-6 inline-flex items-center gap-2">
                    <Plus size={15} />
                    Submit Your Innovation Idea
                  </Link>
                ) : (
                  <span className="text-xs text-gray-500 italic">Form a team above to unlock idea submission.</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Profile Summary & Announcements */}
        <div className="space-y-6">
          {/* User Profile Card */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 bg-gray-900/70">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 flex items-center justify-between">
              <span>My Innovator Profile</span>
              <ShieldCheck size={14} className="text-brand-400" />
            </h3>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-500 to-cyan-500 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-brand-500/20">
                {user.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{user.name}</h4>
                <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                <p className="text-[11px] text-brand-400 font-mono mt-0.5">{user.id}</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs border-t border-white/10 pt-4 text-gray-300">
              <div>
                <span className="text-gray-500 block text-[11px]">College</span>
                <span className="font-medium text-white">{user.college}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Department</span>
                <span className="font-medium text-white">{user.department}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Email</span>
                <span className="font-medium text-white">{user.email}</span>
              </div>
              {user.phone && (
                <div>
                  <span className="text-gray-500 block text-[11px]">Phone</span>
                  <span className="font-medium text-white">{user.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Announcements Feed */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 bg-gray-900/70">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Event Broadcasts</h3>
              </div>
              <span className="text-[11px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 font-medium">
                Live
              </span>
            </div>

            <div className="space-y-3">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">{ann.title}</span>
                    <span
                      className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                        ann.priority === 'high'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {ann.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{ann.message}</p>
                  <span className="text-[10px] text-gray-500 block">
                    {new Date(ann.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
