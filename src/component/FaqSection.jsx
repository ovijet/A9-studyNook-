'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: 'How do I book a quiet study room on StudyNook?',
    answer: 'Simply browse our room listings, click on a space you like, select your date and preferred hourly time slot, and click Confirm Reservation. You will get instant confirmation!',
  },
  {
    id: 2,
    question: 'Are amenities like Wi-Fi and whiteboards free of charge?',
    answer: 'Yes! All listed amenities (Wi-Fi, power outlets, whiteboards, air conditioning) are fully included in the hourly rate stated on the room page.',
  },
  {
    id: 3,
    question: 'Can I cancel or reschedule my study room booking?',
    answer: 'Yes, cancellations made at least 24 hours prior to your scheduled time slot are completely free of charge with full refund to your account.',
  },
  {
    id: 4,
    question: 'How do I list my own study room space as a host?',
    answer: 'Sign in to your StudyNook account, click on "Add Room" in the navigation bar, fill in the room capacity, hourly price, amenities, and image URL, then click Publish!',
  },
  {
    id: 5,
    question: 'What happens if another student tries to book the same slot?',
    answer: 'StudyNook locks time slots instantaneously during booking. Once a slot is confirmed by a student, it becomes unavailable to prevent any double-booking conflicts.',
  },
];

const FaqSection = () => {
  const [openId, setOpenId] = useState(1);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle size={14} className="text-orange-500" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Everything you need to know about booking, host listing, and room rules.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white border rounded-3xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-orange-300 shadow-md' : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-orange-500 text-white' : ''
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
