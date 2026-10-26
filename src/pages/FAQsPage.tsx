import { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    category: 'Registration',
    items: [
      { q: 'Who can participate in IDEAVYA 2026?', a: 'Any student currently enrolled in an undergraduate, postgraduate, or diploma program at any recognized institution can participate. There is no restriction on branch, year, or discipline — we welcome all!' },
      { q: 'Can I participate as an individual?', a: 'Yes! You can register as a solo participant. However, we encourage teams of 2–4 members for a richer collaborative experience. Our team formation workshop on Day 0 can help you find teammates.' },
      { q: 'What is the team size limit?', a: 'Teams can have a minimum of 1 and a maximum of 4 members. All team members must register individually through the portal.' },
      { q: 'Is there a registration fee?', a: 'Registration fees (if applicable) are configured by the event admin and displayed on the homepage. If it shows FREE, there is no charge at all. Check the Pricing section on the home page for current fee status.' },
      { q: 'Can participants from different colleges form a team?', a: 'Absolutely! Cross-college and cross-discipline teams are encouraged. Diverse perspectives lead to more creative solutions.' },
    ],
  },
  {
    category: 'The Event',
    items: [
      { q: 'Is IDEAVYA online or offline?', a: 'IDEAVYA 2026 is a hybrid event. You can participate fully online or attend the offline venue. All workshops, mentor sessions, and submissions are accessible to both modes.' },
      { q: 'How long is the hackathon?', a: 'The hacking window is exactly 48 hours — from 10:00 AM on December 1 to 8:00 AM on December 3, 2024.' },
      { q: 'Do I need to be online for the entire 48 hours?', a: 'No. You are expected to submit your project by the deadline and attend the final demo day, but you do not need to be active 24/7. Build at your own pace.' },
      { q: 'What should I build?', a: 'You must build a solution that addresses a problem within your chosen track. You can build a web app, mobile app, hardware prototype, AI model, or any working solution. It must be built from scratch during the event.' },
      { q: 'Can I use pre-existing code or templates?', a: 'You may use open-source libraries, APIs, and public templates, but the core logic and product must be built during the hackathon. Using a pre-built product and rebranding it is not allowed and will lead to disqualification.' },
    ],
  },
  {
    category: 'Judging & Prizes',
    items: [
      { q: 'How are projects judged?', a: 'Projects are evaluated on: Innovation & Originality (25%), Technical Complexity (25%), Impact & Feasibility (25%), and Presentation & Demo Quality (25%). Each track may have additional criteria.' },
      { q: 'Who are the judges?', a: 'Our judges are industry professionals, startup founders, VCs, and academic experts. The full jury list will be published two weeks before the event.' },
      { q: 'When will winners be announced?', a: 'Winners are announced at the Awards Ceremony on December 3 at 5:00 PM. Results are also emailed to all participants within 24 hours.' },
      { q: 'How are prizes distributed?', a: 'Cash prizes are transferred via bank transfer / UPI within 7 working days of the event. You will be asked to provide bank details at the time of winning.' },
    ],
  },
  {
    category: 'Technical',
    items: [
      { q: 'Is there any restriction on the tech stack?', a: 'No. Use any programming language, framework, database, or cloud platform. We only ask that your project runs in a demo environment that judges can access.' },
      { q: 'Will hardware be provided?', a: 'For offline participants, basic hardware kits (Raspberry Pi, sensors, breadboards) will be available on a first-come, first-served basis for CleanTech and IoT projects.' },
      { q: 'What if my team faces a technical issue during the event?', a: 'We have a dedicated technical support team available 24/7 in the event Discord. Raise your issue there and a volunteer or mentor will assist you.' },
      { q: 'Do you provide cloud credits?', a: 'Yes! All registered teams will receive AWS Activate credits and GCP credits. Details will be shared on Day 1 during the opening ceremony.' },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`glass-card overflow-hidden transition-all duration-300 ${open ? 'border-brand-500/30' : 'hover:border-white/20'}`}>
      <button
        className="w-full text-left px-6 py-5 flex items-start gap-4"
        onClick={() => setOpen(!open)}
      >
        <ChevronDown
          size={18}
          className={`text-brand-400 shrink-0 mt-0.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
        <span className="text-white font-medium text-sm leading-relaxed">{q}</span>
      </button>
      {open && (
        <div className="px-6 pb-5 ml-10 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQsPage() {
  return (
    <main className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="relative py-24 px-4 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-brand-600/30 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-300 text-sm font-medium mb-6">
            <HelpCircle size={13} className="text-brand-400" /> Help Center
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-black text-white leading-tight mb-5">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Everything you need to know about IDEAVYA 2026. Can't find your answer? Reach out to us.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-14">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="font-display font-bold text-2xl text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400">
                  <HelpCircle size={15} />
                </span>
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-2xl mx-auto glass-card p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-purple-500/5 pointer-events-none" />
          <div className="relative z-10">
            <Mail size={36} className="text-brand-400 mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-white mb-3">Still have questions?</h2>
            <p className="text-gray-400 mb-7 text-sm">Drop us a message and we'll get back to you within 24 hours.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="btn-primary px-8 py-3">
                Contact Us <ArrowRight size={16} />
              </Link>
              <Link to="/register" className="btn-outline px-8 py-3">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
