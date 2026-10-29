import { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickFaqs = [
  {
    q: 'Who is eligible to participate in IDEAVYA 2026?',
    a: 'Any student currently enrolled in an undergraduate or postgraduate engineering or science degree program is eligible. Interdisciplinary participation is mandatory: each team of 2 to 4 members must represent at least two distinct departments.',
  },
  {
    q: 'What is the team size and interdisciplinary requirement?',
    a: 'Teams must have 2 to 4 members. To encourage cross-functional problem solving, teams must include members from at least two different academic departments (e.g., ECE + CSE, or Mechanical + Civil).',
  },
  {
    q: 'What is the registration fee structure?',
    a: 'Registration is charged per team: ₹150 for Early Bird registration and ₹200 for Standard registration. This covers all members of your team, online bootcamp mentorship, and entry to campus rounds.',
  },
  {
    q: 'What are the competition stages?',
    a: 'The competition follows five levels: Level 1 (Online Idea Submission & Screening) → Innovation Bootcamp (Online) → Level 2 (Refined Idea Submission & Evaluation) → Semi-Finale (Day 1 on MITS Campus) → Grand Finale & Awards (Day 2 on MITS Campus).',
  },
  {
    q: 'Where and when will the physical finals take place?',
    a: 'The Semi-Finale and Grand Finale will be hosted in-person on 10 & 11 November 2026 at the Madanapalle Institute of Technology & Science (MITS) Campus in Andhra Pradesh.',
  },
];

export default function HomeFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="py-24 px-4 bg-transparent border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-300 font-semibold text-sm tracking-widest uppercase mb-3 block flex items-center justify-center gap-1.5">
            <HelpCircle size={14} /> Clear Answers
          </span>
          <h2 className="section-title mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Everything you need to know about eligibility, team formation, fees, and judging criteria.
          </p>
        </div>

        <div className="space-y-3.5 mb-10">
          {quickFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className={`glass-card transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-blue-400/40 bg-white/[0.07]' : 'hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                >
                  <span className="font-display font-semibold text-white text-base leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-blue-300 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-blue-300' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-gray-300 text-sm leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/faqs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-white transition-colors group"
          >
            Have more questions? Read the complete FAQ guide <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
