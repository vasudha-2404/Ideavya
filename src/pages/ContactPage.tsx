import { useState } from 'react';
import { Mail, MapPin, Clock, Send, MessageCircle, Phone, CheckCircle, AlertCircle } from 'lucide-react';

const contacts = [
  { icon: Mail,    label: 'Email Us',     value: 'hello@IDEAVYA.io',      sub: 'We reply within 24 hours' },
  { icon: Phone,   label: 'WhatsApp',     value: '+91 98765 43210',          sub: 'Mon–Fri, 10 AM – 6 PM IST' },
  { icon: MapPin,  label: 'Venue',        value: 'Hybrid (Online + Offline)', sub: 'Offline: Bengaluru, Karnataka' },
  { icon: Clock,   label: 'Support Hours',value: '10 AM – 8 PM IST',         sub: 'Nov 15 – Dec 5, 2024' },
];

const socials = [
  { label: 'Discord',   href: '#', emoji: '💬', desc: 'Join 800+ hackers' },
  { label: 'Instagram', href: '#', emoji: '📸', desc: '@IDEAVYA.io' },
  { label: 'Twitter/X', href: '#', emoji: '🐦', desc: '@IDEAVYAhack' },
  { label: 'LinkedIn',  href: '#', emoji: '💼', desc: 'IDEAVYA 2026' },
];

type FormState = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [state, setState] = useState<FormState>('idle');

  const set = (k: keyof typeof form) => (v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');
    // Simulate form submission (replace with real endpoint / Supabase edge function)
    await new Promise(r => setTimeout(r, 1500));
    setState('sent');
  };

  return (
    <main className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="relative py-24 px-4 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-brand-600/30 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-300 text-sm font-medium mb-6">
            <MessageCircle size={13} className="text-brand-400" /> Get In Touch
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-black text-white leading-tight mb-5">
            We'd Love to <span className="gradient-text">Hear From You</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Questions, sponsorships, partnerships, or just want to say hi — our team is ready.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          {/* Left — contact info */}
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-8">Contact Information</h2>
            <div className="space-y-4 mb-10">
              {contacts.map((c) => (
                <div key={c.label} className="glass-card p-5 flex items-start gap-4 hover:border-brand-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center shrink-0">
                    <c.icon size={18} className="text-brand-400" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs mb-0.5">{c.label}</div>
                    <div className="text-white font-semibold text-sm">{c.value}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <h3 className="font-display font-bold text-lg text-white mb-5">Follow Us</h3>
            <div className="grid grid-cols-2 gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="glass-card p-4 flex items-center gap-3 hover:border-brand-500/30 hover:scale-105 transition-all duration-200"
                >
                  <span className="text-2xl">{s.emoji}</span>
                  <div>
                    <div className="text-white font-semibold text-sm">{s.label}</div>
                    <div className="text-gray-500 text-xs">{s.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — contact form */}
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-8">Send a Message</h2>

            {state === 'sent' ? (
              <div className="glass-card p-10 text-center border-emerald-500/30">
                <CheckCircle size={48} className="text-emerald-400 mx-auto mb-4" />
                <h3 className="font-display font-bold text-xl text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-sm">We'll get back to you within 24 hours. Thanks for reaching out!</p>
                <button onClick={() => { setState('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }} className="mt-6 btn-outline text-sm px-6 py-2.5">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => set('name')(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-colors"
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => set('email')(e.target.value)}
                      placeholder="john@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Subject *</label>
                  <select
                    required
                    value={form.subject}
                    onChange={e => set('subject')(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-colors text-gray-300"
                  >
                    <option value="" className="bg-gray-900">Select a subject</option>
                    <option value="general" className="bg-gray-900">General Inquiry</option>
                    <option value="sponsorship" className="bg-gray-900">Sponsorship / Partnership</option>
                    <option value="registration" className="bg-gray-900">Registration Help</option>
                    <option value="technical" className="bg-gray-900">Technical Support</option>
                    <option value="media" className="bg-gray-900">Press / Media</option>
                    <option value="other" className="bg-gray-900">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => set('message')(e.target.value)}
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-colors resize-none"
                  />
                </div>

                {state === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={14} /> Something went wrong. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === 'sending' ? (
                    <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</span>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
