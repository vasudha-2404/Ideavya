import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useIdeathon } from '../../context/IdeathonContext';
import type { IdeaSubmission, JudgeScore, UserRole } from '../../types/ideathon';
import { Shield, Award, CheckCircle2 } from 'lucide-react';

export default function JudgePortalPage() {
  const { user, switchRole } = useAuth();
  const { submissions, evaluateSubmission } = useIdeathon();

  const [activeTab, setActiveTab] = useState<'evaluate' | 'leaderboard'>('evaluate');
  const [selectedSub, setSelectedSub] = useState<IdeaSubmission | null>(null);

  // Scoring form state
  const [innovation, setInnovation] = useState<number>(20);
  const [feasibility, setFeasibility] = useState<number>(20);
  const [impact, setImpact] = useState<number>(20);
  const [presentation, setPresentation] = useState<number>(20);
  const [feedback, setFeedback] = useState<string>('');
  const [submittedFeedback, setSubmittedFeedback] = useState<boolean>(false);

  const totalScore = innovation + feasibility + impact + presentation;

  const handleOpenEvaluation = (sub: IdeaSubmission) => {
    setSelectedSub(sub);
    setSubmittedFeedback(false);
    if (sub.scores && sub.scores.length > 0) {
      const existing = sub.scores[0];
      setInnovation(existing.innovation);
      setFeasibility(existing.feasibility);
      setImpact(existing.impact);
      setPresentation(existing.presentation);
      setFeedback(existing.feedback);
    } else {
      setInnovation(20);
      setFeasibility(20);
      setImpact(20);
      setPresentation(20);
      setFeedback('');
    }
  };

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;

    const judgeScore: JudgeScore = {
      judgeId: user?.id || 'judge_demo',
      judgeName: user?.name || 'Pathvision Evaluator',
      innovation,
      feasibility,
      impact,
      presentation,
      total: totalScore,
      feedback,
      submittedAt: new Date().toISOString(),
    };

    evaluateSubmission(selectedSub.id, judgeScore);
    setSubmittedFeedback(true);
    setTimeout(() => {
      setSelectedSub(null);
      setSubmittedFeedback(false);
    }, 1500);
  };

  // Leaderboard ranking
  const rankedSubmissions = [...submissions]
    .filter((s) => s.scores && s.scores.length > 0)
    .sort((a, b) => (b.scores?.[0]?.total || 0) - (a.scores?.[0]?.total || 0));

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Demo Bar */}
      <div className="mb-6 p-3 rounded-xl bg-gray-900/90 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span>Active Role: <strong className="text-white uppercase tracking-wider">{user?.role || 'Judge'}</strong> ({user?.name})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 mr-1 hidden sm:inline">Switch view:</span>
          {(['participant', 'judge', 'admin'] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => switchRole(r)}
              className={`px-2.5 py-1 rounded-lg border capitalize transition-all ${
                user?.role === r
                  ? 'bg-purple-500/20 border-purple-500 text-purple-300 font-semibold'
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
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-r from-gray-900 via-gray-900 to-purple-950/40 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
            <Shield size={14} className="text-purple-400" />
            Evaluation & Mentorship Jury Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            IDEAVYA 2026 Judge Portal
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Industry jury evaluation in association with <strong>Pathvision Innovations</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white rounded-xl p-2.5 px-4 shadow-lg flex items-center justify-center">
            <img src="/pathvision-logo.png" alt="Pathvision Innovations" className="h-7 w-auto object-contain" />
          </div>
        </div>
      </div>

      {/* Criteria Breakdown Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'Innovation & Novelty', pts: '25 Pts', desc: 'Originality, creative edge & IP potential' },
          { title: 'Feasibility & Tech', pts: '25 Pts', desc: 'Architecture, technical depth & execution' },
          { title: 'Real-World Impact', pts: '25 Pts', desc: 'Community relevance, sustainability & scale' },
          { title: 'Multidisciplinary Pitch', pts: '25 Pts', desc: 'Cross-department synergy & presentation' },
        ].map((c, idx) => (
          <div key={idx} className="glass-card p-4 rounded-2xl border border-white/10 bg-gray-900/60">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-white">{c.title}</span>
              <span className="text-xs font-bold text-purple-400">{c.pts}</span>
            </div>
            <p className="text-[11px] text-gray-400">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-6 space-x-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('evaluate')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'evaluate'
              ? 'text-white border-b-2 border-purple-400 font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Assigned Proposals ({submissions.length})
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'leaderboard'
              ? 'text-white border-b-2 border-purple-400 font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Grand Leaderboard & Rankings ({rankedSubmissions.length})
        </button>
      </div>

      {/* Tab 1: Evaluate Submissions */}
      {activeTab === 'evaluate' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {submissions.map((sub) => {
            const hasScored = sub.scores && sub.scores.length > 0;
            const score = hasScored ? sub.scores![0].total : null;

            return (
              <div
                key={sub.id}
                className="glass-card p-6 rounded-3xl border border-white/10 bg-gray-900/70 space-y-4 hover:border-purple-500/30 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs text-brand-300 font-medium">{sub.theme}</span>
                    {hasScored ? (
                      <span className="text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 size={13} /> {score} / 100
                      </span>
                    ) : (
                      <span className="text-xs bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2.5 py-1 rounded-full">
                        Pending Evaluation
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white">{sub.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                    {sub.solutionAbstract}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {sub.techStack.map((t, idx) => (
                      <span key={idx} className="text-[11px] bg-white/5 border border-white/5 text-gray-300 px-2 py-0.5 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Team: <strong className="text-white">{sub.teamName}</strong></span>
                  <button
                    onClick={() => handleOpenEvaluation(sub)}
                    className="btn-primary py-2 px-4 text-xs font-semibold flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500"
                  >
                    <Award size={14} />
                    {hasScored ? 'Update Score' : 'Score Proposal'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {rankedSubmissions.slice(0, 3).map((item, idx) => {
              const medals = ['🥇 1st Place (₹6,000)', '🥈 2nd Place (₹4,000)', '🥉 3rd Place (₹2,500)'];
              const borders = ['border-amber-400/50 bg-amber-500/5', 'border-gray-300/40 bg-gray-400/5', 'border-amber-700/50 bg-amber-700/5'];

              return (
                <div
                  key={item.id}
                  className={`glass-card p-6 rounded-3xl border ${borders[idx]} text-center space-y-3 relative overflow-hidden`}
                >
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">
                    {medals[idx]}
                  </span>
                  <div className="text-3xl font-display font-extrabold text-white">
                    {item.scores![0].total} <span className="text-xs text-gray-400 font-normal">/ 100</span>
                  </div>
                  <h4 className="text-base font-bold text-white truncate">{item.title}</h4>
                  <p className="text-xs text-gray-400">Team: {item.teamName}</p>
                </div>
              );
            })}
          </div>

          {/* Full Table */}
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden bg-gray-900/60">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-white/5 uppercase text-gray-400 text-[10px] tracking-wider border-b border-white/10">
                  <tr>
                    <th className="px-4 py-3.5">Rank</th>
                    <th className="px-4 py-3.5">Project & Team</th>
                    <th className="px-4 py-3.5">Theme</th>
                    <th className="px-4 py-3.5 text-center">Innovation (25)</th>
                    <th className="px-4 py-3.5 text-center">Feasibility (25)</th>
                    <th className="px-4 py-3.5 text-center">Impact (25)</th>
                    <th className="px-4 py-3.5 text-center">Pitch (25)</th>
                    <th className="px-4 py-3.5 text-right font-bold text-white">Total / 100</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {rankedSubmissions.map((sub, idx) => {
                    const sc = sub.scores![0];
                    return (
                      <tr key={sub.id} className="hover:bg-white/[0.02]">
                        <td className="px-4 py-3.5 font-bold text-white">
                          {idx === 0 ? '🥇 #1' : idx === 1 ? '🥈 #2' : idx === 2 ? '🥉 #3' : `#${idx + 1}`}
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="font-semibold text-white">{sub.title}</div>
                          <div className="text-[11px] text-gray-400">Team: {sub.teamName}</div>
                        </td>
                        <td className="px-4 py-3.5 text-gray-400 max-w-xs truncate">{sub.theme}</td>
                        <td className="px-4 py-3.5 text-center font-mono">{sc.innovation}</td>
                        <td className="px-4 py-3.5 text-center font-mono">{sc.feasibility}</td>
                        <td className="px-4 py-3.5 text-center font-mono">{sc.impact}</td>
                        <td className="px-4 py-3.5 text-center font-mono">{sc.presentation}</td>
                        <td className="px-4 py-3.5 text-right font-bold text-purple-300 text-sm">
                          {sc.total}
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

      {/* Interactive Scoring Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-2xl bg-gray-900 border border-white/15 rounded-3xl p-6 md:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-purple-400 font-semibold">{selectedSub.theme}</span>
                <h2 className="text-xl font-bold text-white mt-1">{selectedSub.title}</h2>
                <p className="text-xs text-gray-400">Team: {selectedSub.teamName}</p>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="text-gray-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {submittedFeedback ? (
              <div className="p-8 text-center bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                <CheckCircle2 size={40} className="text-emerald-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">Score Recorded!</h3>
                <p className="text-xs text-gray-300">Total score: {totalScore} / 100 has been synchronized.</p>
              </div>
            ) : (
              <form onSubmit={handleSaveScore} className="space-y-6">
                {/* Sliders */}
                <div className="space-y-4 bg-white/5 p-5 rounded-2xl border border-white/5">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-white mb-1">
                      <span>Innovation & Uniqueness</span>
                      <span className="text-purple-400 font-mono text-sm">{innovation} / 25</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={25}
                      value={innovation}
                      onChange={(e) => setInnovation(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-white mb-1">
                      <span>Technical Feasibility & Architecture</span>
                      <span className="text-purple-400 font-mono text-sm">{feasibility} / 25</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={25}
                      value={feasibility}
                      onChange={(e) => setFeasibility(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-white mb-1">
                      <span>Real-World Impact & Scale</span>
                      <span className="text-purple-400 font-mono text-sm">{impact} / 25</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={25}
                      value={impact}
                      onChange={(e) => setImpact(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-white mb-1">
                      <span>Presentation & Multidisciplinary Execution</span>
                      <span className="text-purple-400 font-mono text-sm">{presentation} / 25</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={25}
                      value={presentation}
                      onChange={(e) => setPresentation(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                      Calculated Total Score
                    </span>
                    <span className="text-2xl font-bold text-purple-400 font-mono">
                      {totalScore} <span className="text-xs text-gray-400 font-normal">/ 100</span>
                    </span>
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                    Jury Feedback & Technical Guidance
                  </label>
                  <textarea
                    rows={3}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide constructive feedback on what the team did well and how they can improve before Grand Finale..."
                    className="w-full bg-gray-950 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSub(null)}
                    className="px-4 py-2 text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary py-2.5 px-6 text-xs font-semibold bg-purple-600 hover:bg-purple-500"
                  >
                    Save & Submit Evaluation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
