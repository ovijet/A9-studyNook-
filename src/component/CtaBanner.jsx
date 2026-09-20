'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

const CtaBanner = () => {
  return (
    <section className="py-16 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 rounded-3xl p-8 md:p-14 text-white shadow-2xl shadow-slate-900/20 border border-slate-800">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={14} />
                <span>Earn Extra Income</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Have an Available Room or Quiet Desk Space?
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                List your space on StudyNook to help local university students focus and study peacefully while earning steady hourly rental income.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Free Host Listing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Set Your Own Hourly Rate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Verified Student Guests</span>
                </div>
              </div>
            </div>

            {/* Right CTAs */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-4 shrink-0">
              <Link href="/addRoom" className="w-full sm:w-auto lg:w-full">
                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all text-base">
                  <PlusCircle size={20} />
                  <span>Become a Host Now</span>
                </button>
              </Link>

              <Link href="/Rooms" className="w-full sm:w-auto lg:w-full">
                <button className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-2xl border border-white/20 transition-all text-sm">
                  <span>Explore All Spaces</span>
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
