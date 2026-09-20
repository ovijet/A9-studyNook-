import React from "react";
import { Search, Clock, Sparkles } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Browse & Filter Rooms",
    description: "Search study rooms by floor, seat capacity, amenities like Wi-Fi or whiteboard, or price.",
    stepLabel: "Step 01",
    icon: Search,
  },
  {
    id: 2,
    title: "Select Date & Time Slot",
    description: "Choose your date and pick an open hourly slot — instantaneous lock to prevent double booking.",
    stepLabel: "Step 02",
    icon: Clock,
  },
  {
    id: 3,
    title: "Focus & Achieve",
    description: "Receive instant confirmation, check into your room, and enjoy quiet, uninterrupted productivity.",
    stepLabel: "Step 03",
    icon: Sparkles,
  },
];

const BookWorks = () => {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
            <span>Simple 3-Step Process</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            How StudyNook Works
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            From discovering available rooms to walking into your quiet space in under 60 seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 relative z-10 flex flex-col items-center text-center group"
              >
                {/* Step Number Pill */}
                <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold mb-6">
                  {step.stepLabel}
                </span>

                {/* Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center mb-6 shadow-md shadow-orange-500/25 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BookWorks;