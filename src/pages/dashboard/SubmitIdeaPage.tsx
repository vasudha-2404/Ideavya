import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useIdeathon } from '../../context/IdeathonContext';
import type { InnovationTheme } from '../../types/ideathon';
import {
  UploadCloud, FileText, CheckCircle2, AlertCircle, ArrowLeft,
  X, Check, Sparkles, Send, Tag, Lightbulb
} from 'lucide-react';

const THEMES: InnovationTheme[] = [
  'Artificial Intelligence and Machine Learning',
  'Smart Infrastructure and Industrial Applications',
  'Mobility, Automotive Technology, and Transportation',
  'Renewable Energy and Environmental Sustainability',
  'Social Innovation and Entrepreneurship',
];

const SUGGESTED_TAGS = [
  'Python', 'TensorFlow', 'PyTorch', 'Computer Vision', 'IoT',
  'Arduino', 'Raspberry Pi', 'React', 'Node.js', 'FastAPI',
  'Robotics', 'ROS', 'Solar Tech', 'Clean Energy', 'SolidWorks', 'LoRaWAN'
];

export default function SubmitIdeaPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getUserTeam, submitIdea } = useIdeathon();

  const team = user ? getUserTeam(user.teamId) : undefined;

  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState<InnovationTheme>(team?.theme || THEMES[0]);
  const [problemStatement, setProblemStatement] = useState('');
  const [abstract, setAbstract] = useState('');
  const [expectedImpact, setExpectedImpact] = useState('');
  const [techTags, setTechTags] = useState<string[]>(['Python', 'IoT']);
  const [tagInput, setTagInput] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [documentUrl, setDocumentUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!user || !team) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center">
        <div className="text-center glass-card p-8 max-w-md w-full border border-white/10 rounded-2xl">
          <AlertCircle size={40} className="text-amber-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white mb-2">Team Required</h2>
          <p className="text-gray-400 text-sm mb-6">
            You must create or join a team before you can submit an idea.
          </p>
          <Link to="/dashboard" className="btn-primary justify-center w-full">
            Return to Team Hub
          </Link>
        </div>
      </div>
    );
  }

  const handleAddTag = (tagToAdd: string) => {
    const trimmed = tagToAdd.trim();
    if (trimmed && !techTags.includes(trimmed)) {
      setTechTags([...techTags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTechTags(techTags.filter((t) => t !== tagToRemove));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploadProgress(10);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev === null || prev >= 100) {
            clearInterval(interval);
            setDocumentUrl(`https://ideavya.mits.ac.in/uploads/${file.name}`);
            return 100;
          }
          return prev + 30;
        });
      }, 150);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !problemStatement.trim() || !abstract.trim()) {
      setError('Please provide title, problem statement, and solution abstract.');
      return;
    }

    if (techTags.length === 0) {
      setError('Please include at least one tech stack tag.');
      return;
    }

    setIsSubmitting(true);

    try {
      submitIdea({
        teamId: team.id,
        teamName: team.name,
        leaderName: user.name,
        leaderEmail: user.email,
        title,
        theme,
        problemStatement,
        solutionAbstract: abstract,
        expectedImpact: expectedImpact || 'High potential for multidisciplinary innovation and scalable regional adoption.',
        techStack: techTags,
        documentUrl: documentUrl || 'https://ideavya.mits.ac.in/docs/idea-pitch-deck.pdf',
        documentName: fileName || 'idea-pitch-deck.pdf',
      });

      setSubmittedSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch {
      setError('Failed to submit idea. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedSuccess) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center">
        <div className="glass-card p-8 rounded-3xl border border-white/10 text-center max-w-md w-full bg-gray-900/90 shadow-2xl animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">
            Idea Submitted Successfully!
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed mb-6">
            Your project <strong>"{title}"</strong> has been recorded for Team <strong>{team.name}</strong>. It is now awaiting Level 1 abstract screening.
          </p>
          <div className="text-xs text-brand-400 flex items-center justify-center gap-1 font-semibold">
            Redirecting to dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back button */}
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-300 text-xs font-semibold mb-3">
          <Sparkles size={14} className="text-brand-400" />
          IDEAVYA 2026 Submission Portal
        </div>
        <h1 className="text-3xl font-display font-bold text-white tracking-tight">
          Submit Innovation Proposal
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Submitting on behalf of <strong>{team.name}</strong> ({team.members.length} members).
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
          <AlertCircle size={18} className="shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 bg-gray-900/80 backdrop-blur-xl space-y-6">
          {/* Project Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AI-Powered Precision Crop Irrigation & Yield Forecasting System"
              className="w-full bg-gray-950/70 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>

          {/* Innovation Theme */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
              Select Innovation Theme *
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as InnovationTheme)}
              className="w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            >
              {THEMES.map((t) => (
                <option key={t} value={t} className="bg-gray-900 text-white">
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Problem Statement */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                Problem Statement *
              </label>
              <span className="text-[11px] text-gray-500">
                {problemStatement.length} / 1000 characters
              </span>
            </div>
            <textarea
              required
              rows={4}
              maxLength={1000}
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              placeholder="Clearly articulate the specific real-world problem, target users/communities affected, and why existing solutions are inadequate."
              className="w-full bg-gray-950/70 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 resize-none leading-relaxed"
            />
          </div>

          {/* Solution & Abstract */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                Proposed Solution & Executive Abstract *
              </label>
              <span className="text-[11px] text-gray-500">
                {abstract.length} / 1500 characters
              </span>
            </div>
            <textarea
              required
              rows={5}
              maxLength={1500}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="Describe your technical architecture, workflow, uniqueness, and how your team will deliver a working prototype by November 10-11."
              className="w-full bg-gray-950/70 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 resize-none leading-relaxed"
            />
          </div>

          {/* Expected Impact */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
              Expected Impact & Feasibility
            </label>
            <textarea
              rows={3}
              value={expectedImpact}
              onChange={(e) => setExpectedImpact(e.target.value)}
              placeholder="Highlight potential economic, social, or environmental benefits, feasibility of execution, and market potential."
              className="w-full bg-gray-950/70 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 resize-none leading-relaxed"
            />
          </div>

          {/* Tech Stack Chips */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
              Technologies & Tools (Tech Stack) *
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {techTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-medium"
                >
                  <Tag size={12} />
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-400 ml-1"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag(tagInput);
                  }
                }}
                placeholder="Type technology and press Enter or Add"
                className="flex-1 bg-gray-950/70 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-500"
              />
              <button
                type="button"
                onClick={() => handleAddTag(tagInput)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
              >
                Add
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] text-gray-500">Quick add:</span>
              {SUGGESTED_TAGS.slice(0, 8).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => handleAddTag(st)}
                  className="text-[11px] bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white px-2 py-0.5 rounded transition-colors"
                >
                  + {st}
                </button>
              ))}
            </div>
          </div>

          {/* Document Upload Simulator */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
              Pitch Deck or Specification Document (PDF / PPTX / ZIP)
            </label>
            <div className="relative border-2 border-dashed border-white/15 hover:border-brand-500/50 rounded-2xl p-6 text-center transition-colors bg-white/[0.02]">
              <input
                type="file"
                accept=".pdf,.pptx,.ppt,.zip"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center">
                <UploadCloud size={32} className="text-brand-400 mb-2" />
                <p className="text-xs font-semibold text-white">
                  {fileName ? fileName : 'Click to select or drag and drop your proposal pitch deck'}
                </p>
                <p className="text-[11px] text-gray-500 mt-1">PDF, PPTX or ZIP (Maximum 25 MB)</p>
              </div>
            </div>

            {/* Upload progress */}
            {uploadProgress !== null && (
              <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-gray-300 flex items-center gap-1.5">
                    <FileText size={14} className="text-brand-400" />
                    {fileName}
                  </span>
                  <span className="text-brand-400 font-semibold">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-brand-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                {uploadProgress === 100 && (
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1.5">
                    <Check size={12} /> Ready for submission
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Interdisciplinary Check Notice */}
          <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-start gap-3">
            <Lightbulb size={20} className="text-brand-400 shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed">
              <strong className="text-white">Review Tip: </strong>
              Proposals are evaluated across four official criteria: Innovation (25%), Technical Feasibility (25%), Real-world Impact (25%), and Multidisciplinary Execution (25%).
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl text-xs text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary py-3 px-8 text-xs font-semibold flex items-center gap-2 shadow-lg shadow-brand-500/25"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Innovation Proposal'}
              <Send size={14} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
