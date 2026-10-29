import { useState } from 'react';
import { ArrowRight, User, Mail, Phone, School, Users, Loader2, AlertCircle, ChevronDown } from 'lucide-react';
import { usePayment } from '../hooks/usePayment';
import { useEventConfig } from '../hooks/useEventConfig';
import RegistrationQRCodeCard from '../components/payment/RegistrationQRCodeCard';
import type { RegistrationFormData, ParticipantType } from '../types/payment';

const TRACKS = [
  'Artificial Intelligence and Machine Learning',
  'Smart Infrastructure and Industrial Applications',
  'Mobility, Automotive Technology, and Transportation',
  'Renewable Energy and Environmental Sustainability',
  'Social Innovation and Entrepreneurship',
];

const INITIAL_FORM: RegistrationFormData = {
  full_name: '',
  email: '',
  phone: '',
  college: '',
  team_name: '',
  track: '',
  participant_type: 'team',
};

type FieldError = Partial<Record<keyof RegistrationFormData, string>>;

function validate(form: RegistrationFormData): FieldError {
  const errors: FieldError = {};
  if (!form.full_name.trim()) errors.full_name = 'Full name is required';
  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'Enter a valid email address';
  if (!form.phone.match(/^[6-9]\d{9}$/)) errors.phone = 'Enter a valid 10-digit Indian mobile number';
  if (!form.college.trim()) errors.college = 'College / Institution is required';
  if (!form.track) errors.track = 'Please select a track';
  if (form.participant_type === 'team' && !form.team_name.trim()) errors.team_name = 'Team name is required';
  return errors;
}

interface InputProps {
  id: string;
  label: string;
  icon: typeof User;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

function FormInput({ id, label, icon: Icon, type = 'text', value, onChange, error, placeholder, required }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-midnight-900/60 border text-slate-100 placeholder-slate-500 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/40 ${
            error ? 'border-red-500/60' : 'border-white/10 hover:border-cyan-500/30 focus:border-cyan-400/60'
          }`}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    </div>
  );
}

export default function RegisterPage() {
  const [form, setForm] = useState<RegistrationFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldError>({});
  const [touched, setTouched] = useState(false);
  const { flowState, initiatePayment } = usePayment();
  const { configured } = useEventConfig();

  const isProcessing = ['registering', 'creating_order', 'opening_checkout', 'verifying'].includes(flowState.status);

  const setField = <K extends keyof RegistrationFormData>(key: K, value: RegistrationFormData[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (touched) setErrors(validate({ ...form, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    await initiatePayment(form);
  };

  const statusLabel: Record<string, string> = {
    creating_order: 'Creating your order…',
    opening_checkout: 'Opening payment gateway…',
    verifying: 'Verifying payment…',
  };

  return (
    <div className="min-h-screen bg-midnight-950 text-slate-100 relative overflow-hidden pt-28 pb-20 px-4">
      {/* Moonlight aura background orbs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-60 right-10 w-[400px] h-[300px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-cyan-400 font-semibold text-xs tracking-widest uppercase mb-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 inline-block">Step 1 of 2</span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight"><span className="gradient-text">Register</span> for IDEAVYA</h1>
          <p className="text-gray-400">
            Fill in your details. You'll be taken to payment on the next step.
          </p>
          {!configured && (
            <div className="mt-4 flex items-start gap-2 px-4 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs text-left">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span><strong>Test Mode:</strong> Supabase not configured. Submissions will fail until you add credentials to <code className="font-mono">.env.local</code>.</span>
            </div>
          )}
        </div>

        {/* Scan to Register */}
        <RegistrationQRCodeCard className="mb-6" />

        {/* Fee summary */}
        <div className="glass-card p-4 mb-6 border-cyan-500/30 bg-cyan-500/5 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-200 text-sm font-medium">Team Registration Fee</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
              Per Team
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-cyan-300 font-semibold">⚡ Early Bird: ₹150</span>
            <span className="text-gray-400">Standard: ₹200</span>
          </div>
        </div>

        {/* Error state */}
        {flowState.status === 'error' && (
          <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <div>
              <strong className="block mb-1">Registration failed</strong>
              {flowState.error}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="glass-card p-6 space-y-5">
          {/* Participant type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Participating as</label>
            <div className="grid grid-cols-2 gap-3">
              {(['team', 'individual'] as ParticipantType[]).map(type => (
                <button
                  key={type}
                  type="button"
                  id={`type-${type}`}
                  onClick={() => setField('participant_type', type)}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    form.participant_type === type
                      ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'bg-midnight-900/60 border-white/10 text-slate-400 hover:border-cyan-500/30 hover:text-slate-200'
                  }`}
                >
                  {type === 'team' ? <Users size={15} /> : <User size={15} />}
                  {type === 'team' ? 'Team (2–4 Members)' : 'Solo Representative'}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-cyan-400/90 flex items-center gap-1.5">
              <span>ℹ️</span> Interdisciplinary teams mandatory: Must represent at least two distinct departments.
            </p>
          </div>

          <FormInput id="full_name" label="Full Name" icon={User} value={form.full_name}
            onChange={v => setField('full_name', v)} error={errors.full_name}
            placeholder="John Doe" required />

          <FormInput id="email" label="Email Address" icon={Mail} type="email" value={form.email}
            onChange={v => setField('email', v)} error={errors.email}
            placeholder="john@college.edu" required />

          <FormInput id="phone" label="Mobile Number" icon={Phone} type="tel" value={form.phone}
            onChange={v => setField('phone', v.replace(/\D/g, '').slice(0, 10))} error={errors.phone}
            placeholder="9876543210" required />

          <FormInput id="college" label="College / Institution" icon={School} value={form.college}
            onChange={v => setField('college', v)} error={errors.college}
            placeholder="IIT Bombay" required />

          {form.participant_type === 'team' && (
            <FormInput id="team_name" label="Team Name" icon={Users} value={form.team_name}
              onChange={v => setField('team_name', v)} error={errors.team_name}
              placeholder="Team Innovators" required />
          )}

          {/* Track selector */}
          <div>
            <label htmlFor="track-select" className="block text-sm font-medium text-gray-300 mb-1.5">
              Track <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                id="track-select"
                value={form.track}
                onChange={e => setField('track', e.target.value)}
                className={`w-full px-4 py-3 pr-10 rounded-xl bg-midnight-900/80 border text-sm appearance-none transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/40 ${
                  form.track ? 'text-slate-100' : 'text-slate-500'
                } ${errors.track ? 'border-red-500/60' : 'border-white/10 hover:border-cyan-500/30 focus:border-cyan-400/60'}`}
              >
                <option value="" disabled className="bg-gray-900">Select your track…</option>
                {TRACKS.map(t => (
                  <option key={t} value={t} className="bg-gray-900">{t}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
            {errors.track && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle size={11} />{errors.track}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="register-submit-btn"
            disabled={isProcessing}
            className="btn-primary w-full justify-center py-3.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isProcessing ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {statusLabel[flowState.status] ?? 'Processing…'}
              </>
            ) : (
              <>
                Proceed to Payment (₹150 Team Pass)
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <p className="text-center text-gray-600 text-xs">
            By registering, you agree to the event terms and conditions.
          </p>
        </form>
      </div>
    </div>
  );
}
