import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useIdeathon } from '../../context/IdeathonContext';
import type { SubmissionStatus, UserRole } from '../../types/ideathon';
import {
  ShieldCheck, Users, Layers, Award,
  Search, CheckCircle2, AlertTriangle, Trash2, Plus,
  Download, ExternalLink, Filter, Send
} from 'lucide-react';

const STATUS_OPTIONS: { label: string; value: SubmissionStatus }[] = [
  { label: 'Submitted', value: 'submitted' },
  { label: 'Screening (Level 1)', value: 'screening' },
  { label: 'Bootcamp & Mentorship', value: 'bootcamp' },
  { label: 'Level 2 (Prototype)', value: 'level_2' },
  { label: 'Semi-Finale (Nov 10)', value: 'semi_finale' },
  { label: 'Grand Finale (Nov 11)', value: 'grand_finale' },
  { label: 'Winner Podium', value: 'winner' },
  { label: 'Rejected', value: 'rejected' },
];

export default function AdminPortalPage() {
  const { user, switchRole } = useAuth();
  const {
    teams,
    submissions,
    announcements,
    updateSubmissionStatus,
    addAnnouncement,
    deleteAnnouncement,
  } = useIdeathon();

  const [activeTab, setActiveTab] = useState<'submissions' | 'teams' | 'announcements' | 'fees'>('submissions');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);

  // New Announcement form state
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [newAnnPriority, setNewAnnPriority] = useState<'low' | 'medium' | 'high'>('medium');

  // Stats
  const totalTeams = teams.length;
  const totalParticipants = teams.reduce((acc, t) => acc + t.members.length, 0);
  const interdisciplinaryTeams = teams.filter((t) => {
    const depts = new Set(t.members.map((m) => m.department));
    return depts.size >= 2;
  }).length;
  const totalSubmissions = submissions.length;

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnContent.trim()) return;
    addAnnouncement({
      title: newAnnTitle.trim(),
      message: newAnnContent.trim(),
      category: 'general',
      priority: newAnnPriority,
      author: user?.name || 'Hackathon Admin',
    });
    setNewAnnTitle('');
    setNewAnnContent('');
  };

  const handleExportCSV = () => {
    const rows = [
      ['Team ID', 'Team Code', 'Team Name', 'Theme', 'Member Name', 'Member Email', 'Department', 'College', 'Role'],
    ];

    teams.forEach((t) => {
      t.members.forEach((m) => {
        rows.push([
          t.id,
          t.code,
          `"${t.name}"`,
          `"${t.theme}"`,
          `"${m.name}"`,
          `"${m.email}"`,
          `"${m.department}"`,
          `"${m.college}"`,
          m.role,
        ]);
      });
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ideavya_2026_participants_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.theme.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedSubmission = submissions.find((s) => s.id === selectedSubmissionId);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Demo Bar */}
      <div className="mb-6 p-3 rounded-xl bg-gray-900/90 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Role: <strong className="text-white uppercase tracking-wider">{user?.role || 'Guest'}</strong> ({user?.name})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 mr-1 hidden sm:inline">Switch view:</span>
          {(['participant', 'judge', 'admin'] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => switchRole(r)}
              className={`px-2.5 py-1 rounded-lg border capitalize transition-all ${
                user?.role === r
                  ? 'bg-brand-500/20 border-brand-500 text-brand-300 font-semibold'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
          <Link to="/dashboard" className="ml-2 text-brand-400 hover:underline">
            Participant Hub &rarr;
          </Link>
        </div>
      </div>

      {/* Header Banner */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-r from-gray-900 via-gray-900 to-emerald-950/40 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
            <ShieldCheck size={14} className="text-emerald-400" />
            Central Hackathon Operations
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            IDEAVYA 2026 Admin Portal
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Organized by MITS Deemed to be University in association with Pathvision Innovations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-sm"
          >
            <Download size={14} className="text-emerald-400" />
            Export CSV Callset
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-5 rounded-2xl border border-white/10 bg-gray-900/60">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Teams</span>
            <Users size={16} className="text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white">{totalTeams}</div>
          <span className="text-[11px] text-emerald-400">
            {interdisciplinaryTeams} Interdisciplinary verified
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 bg-gray-900/60">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Participants</span>
            <Users size={16} className="text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{totalParticipants}</div>
          <span className="text-[11px] text-gray-400">
            ~{(totalParticipants / (totalTeams || 1)).toFixed(1)} members / team
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 bg-gray-900/60">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Proposals</span>
            <Layers size={16} className="text-brand-400" />
          </div>
          <div className="text-2xl font-bold text-white">{totalSubmissions}</div>
          <span className="text-[11px] text-brand-300">
            {submissions.filter((s) => s.status !== 'rejected').length} Active in Pipeline
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 bg-gray-900/60">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Prize Pool</span>
            <Award size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">₹12,500</div>
          <span className="text-[11px] text-amber-300">1st ₹6k &bull; 2nd ₹4k &bull; 3rd ₹2.5k</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-6 space-x-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('submissions')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'submissions'
              ? 'text-white border-b-2 border-emerald-400 font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Proposals & Submissions ({submissions.length})
        </button>
        <button
          onClick={() => setActiveTab('teams')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'teams'
              ? 'text-white border-b-2 border-emerald-400 font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Teams & Participants ({teams.length})
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'announcements'
              ? 'text-white border-b-2 border-emerald-400 font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Announcements Broadcast ({announcements.length})
        </button>
        <button
          onClick={() => setActiveTab('fees')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'fees'
              ? 'text-white border-b-2 border-emerald-400 font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Registration Pass & Fees
        </button>
      </div>

      {/* Tab 1: Submissions */}
      {activeTab === 'submissions' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, team name, or theme..."
                className="w-full bg-gray-900 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={14} className="text-gray-400 shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All Statuses</option>
                {STATUS_OPTIONS.map((st) => (
                  <option key={st.value} value={st.value}>{st.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submissions Table / Cards */}
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden bg-gray-900/60">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-white/5 uppercase text-gray-400 text-[10px] tracking-wider border-b border-white/10">
                  <tr>
                    <th className="px-4 py-3.5">Submission & Team</th>
                    <th className="px-4 py-3.5">Theme</th>
                    <th className="px-4 py-3.5">Submitted</th>
                    <th className="px-4 py-3.5">Judge Score</th>
                    <th className="px-4 py-3.5">Stage Status</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredSubmissions.map((sub) => {
                    const avgScore = sub.scores && sub.scores.length > 0
                      ? sub.scores[0].total
                      : null;

                    return (
                      <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="font-semibold text-white text-sm">{sub.title}</div>
                          <div className="text-[11px] text-gray-400 mt-0.5">Team: {sub.teamName}</div>
                        </td>
                        <td className="px-4 py-3.5 max-w-xs">
                          <span className="text-[11px] text-brand-300 block truncate" title={sub.theme}>
                            {sub.theme}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-gray-400 text-[11px]">
                          {new Date(sub.submittedAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3.5">
                          {avgScore !== null ? (
                            <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                              {avgScore} / 100
                            </span>
                          ) : (
                            <span className="text-gray-500 italic text-[11px]">Unscored</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <select
                            value={sub.status}
                            onChange={(e) => updateSubmissionStatus(sub.id, e.target.value as SubmissionStatus)}
                            className="bg-gray-950 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white capitalize focus:outline-none focus:border-emerald-500 cursor-pointer"
                          >
                            {STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <button
                            onClick={() => setSelectedSubmissionId(sub.id)}
                            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                          >
                            Inspect &rarr;
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Teams & Participants */}
      {activeTab === 'teams' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teams.map((t) => {
              const depts = [...new Set(t.members.map((m) => m.department))];
              const isCompliant = depts.length >= 2;

              return (
                <div key={t.id} className="glass-card p-5 rounded-2xl border border-white/10 bg-gray-900/60 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white">{t.name}</h3>
                        <span className="text-xs font-mono bg-white/5 border border-white/10 text-cyan-300 px-2 py-0.5 rounded">
                          {t.code}
                        </span>
                      </div>
                      <p className="text-xs text-brand-300 mt-1">{t.theme}</p>
                    </div>

                    {isCompliant ? (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                        <CheckCircle2 size={12} /> Valid Multidisciplinary
                      </span>
                    ) : (
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                        <AlertTriangle size={12} /> Single Dept
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Members ({t.members.length} / 4)
                    </span>
                    {t.members.map((m, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-white/5">
                        <div className="truncate mr-2">
                          <span className="text-white font-medium">{m.name}</span>
                          <span className="text-gray-400 block text-[11px] truncate">{m.department}</span>
                        </div>
                        <span className="text-[10px] capitalize text-gray-400 shrink-0 font-mono">
                          {m.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Announcements */}
      {activeTab === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create announcement */}
          <div className="lg:col-span-1 glass-card p-6 rounded-2xl border border-white/10 bg-gray-900/60">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Plus size={16} className="text-emerald-400" />
              Broadcast New Announcement
            </h3>
            <form onSubmit={handleCreateAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  placeholder="e.g. Prototype Submission Deadline Extended"
                  className="w-full bg-gray-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Broadcast Message</label>
                <textarea
                  required
                  rows={4}
                  value={newAnnContent}
                  onChange={(e) => setNewAnnContent(e.target.value)}
                  placeholder="Provide all crucial updates, room allocations, mentor slots..."
                  className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Priority</label>
                <select
                  value={newAnnPriority}
                  onChange={(e) => setNewAnnPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className="w-full bg-gray-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority (Urgent)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-xs py-2.5 justify-center flex items-center gap-2"
              >
                <Send size={14} />
                Publish to All Teams
              </button>
            </form>
          </div>

          {/* List of active broadcasts */}
          <div className="lg:col-span-2 space-y-3">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="glass-card p-5 rounded-2xl border border-white/10 bg-gray-900/60 flex items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white text-sm">{ann.title}</span>
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
                  <p className="text-xs text-gray-300 leading-relaxed">{ann.message}</p>
                  <span className="text-[10px] text-gray-500 mt-2 block">
                    Posted by {ann.author} &bull; {new Date(ann.createdAt).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => deleteAnnouncement(ann.id)}
                  className="p-2 text-gray-500 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"
                  title="Delete Announcement"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Registration Pass & Fees */}
      {activeTab === 'fees' && (
        <div className="glass-card p-6 rounded-3xl border border-white/10 bg-gray-900/60 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-lg font-bold text-white">Event Registration Pass Configuration</h2>
              <p className="text-xs text-gray-400">Team registration fees as specified in official poster</p>
            </div>
            <Link
              to="/admin/payments?admin=true"
              className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-2"
            >
              Open Live Payment Transactions <ExternalLink size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Tier 1 &bull; Early Bird
              </span>
              <div className="text-3xl font-display font-bold text-white">₹150 <span className="text-xs text-gray-400 font-normal">/ Team</span></div>
              <p className="text-xs text-gray-300">
                Applicable for early registrations. Includes complete mentor access, Level 1 evaluation, and official participation e-certificates.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
                Tier 2 &bull; Standard Pass
              </span>
              <div className="text-3xl font-display font-bold text-white">₹200 <span className="text-xs text-gray-400 font-normal">/ Team</span></div>
              <p className="text-xs text-gray-300">
                Standard team entry fee for IDEAVYA 2026. Covers 2 to 4 members. Valid across all 5 innovation themes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Inspection Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-2xl bg-gray-900 border border-white/15 rounded-3xl p-6 md:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-brand-400 font-semibold">{selectedSubmission.theme}</span>
                <h2 className="text-xl font-bold text-white mt-1">{selectedSubmission.title}</h2>
                <p className="text-xs text-gray-400">Team: {selectedSubmission.teamName}</p>
              </div>
              <button
                onClick={() => setSelectedSubmissionId(null)}
                className="text-gray-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">Problem Statement</h4>
              <p className="text-xs text-gray-400 bg-white/5 p-3 rounded-xl leading-relaxed">
                {selectedSubmission.problemStatement}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">Proposed Solution & Abstract</h4>
              <p className="text-xs text-gray-400 bg-white/5 p-3 rounded-xl leading-relaxed">
                {selectedSubmission.solutionAbstract}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Tech Stack Tags</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedSubmission.techStack.map((t, idx) => (
                  <span key={idx} className="text-xs bg-brand-500/15 text-brand-300 px-2.5 py-0.5 rounded-md border border-brand-500/25">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {selectedSubmission.scores && selectedSubmission.scores.length > 0 && (
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
                  Judge Score: {selectedSubmission.scores[0].total} / 100
                </h4>
                <p className="text-xs text-gray-300 italic">
                  "{selectedSubmission.scores[0].feedback}"
                </p>
              </div>
            )}

            <div className="flex justify-end pt-3 border-t border-white/10">
              <button
                onClick={() => setSelectedSubmissionId(null)}
                className="btn-primary text-xs py-2 px-5"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
