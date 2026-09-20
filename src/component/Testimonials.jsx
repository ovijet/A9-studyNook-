'use client';

import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { Avatar } from '@heroui/react';

const reviews = [
  {
    id: 1,
    name: 'Arafat Rahman',
    role: 'Computer Science Student',
    university: 'BUET',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    comment: 'StudyNook saved my semester during final exams! Having a noise-free coding cell with high-speed internet made my group project development effortless.',
    rating: 5,
    roomBooked: 'Quantum Coding Cell 4B',
  },
  {
    id: 2,
    name: 'Nusrat Jahan',
    role: 'Medical Student',
    university: 'Dhaka Medical College',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    comment: 'The solo quiet pods are amazing. Zero background noise, super comfortable ergonomic chairs, and instant booking right from my mobile phone.',
    rating: 5,
    roomBooked: 'Silent Focus Sanctuary',
  },
  {
    id: 3,
    name: 'Tanvir Hossain',
    role: 'BBA Scholar',
    university: 'BRAC University',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    comment: 'We booked a Group Study Suite for our thesis presentation prep. The smart projector and magnetic whiteboard made brainstorming so smooth!',
    rating: 5,
    roomBooked: 'Collaborative Hub 2',
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Star size={14} className="text-amber-500 fill-amber-500" />
            <span>Wall of Love</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Loved by 5,000+ Students
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Read real feedback from university students who ace their exams using StudyNook.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:bg-white hover:border-orange-200 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} size={18} className="fill-amber-400" />
                    ))}
                  </div>
                  <Quote size={28} className="text-orange-200 group-hover:text-orange-400 transition-colors" />
                </div>

                {/* Comment */}
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-orange-500/20 shrink-0">
                    <img src={rev.avatar} alt={rev.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                      <span>{rev.name}</span>
                      <CheckCircle2 size={14} className="text-blue-500" />
                    </h4>
                    <p className="text-[11px] text-slate-500">{rev.role} • <span className="font-semibold text-slate-700">{rev.university}</span></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
