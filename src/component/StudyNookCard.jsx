import React from "react";
import { CalendarDays, Clock3, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Instant Room Reservation",
    description:
      "Select your date, pick your preferred hourly time slot, and confirm instantly with zero friction.",
    icon: CalendarDays,
    color: "from-orange-500 to-amber-500",
  },
  {
    id: 2,
    title: "Flexible Hourly Booking",
    description:
      "Book strictly for the hours you need — morning exam review, afternoon study group, or late-night focus.",
    icon: Clock3,
    color: "from-amber-500 to-yellow-500",
  },
  {
    id: 3,
    title: "Quiet & Verified Spaces",
    description:
      "Enjoy noise-controlled rooms equipped with Wi-Fi, power outlets, and comfortable seating designed for productivity.",
    icon: ShieldCheck,
    color: "from-orange-600 to-red-500",
  },
];

const StudyNookCard = () => {
  return (
    <section className="py-20 bg-white border-y border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <Zap size={14} className="text-orange-500 fill-orange-500" />
            <span>Designed For Students</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Why Choose StudyNook?
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Everything you need for uninterrupted concentration and flawless group collaboration.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative bg-slate-50/70 hover:bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Badge */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-md shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center text-xs font-bold text-orange-600 group-hover:translate-x-1 transition-transform">
                  <span>Learn more</span>
                  <span className="ml-1">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default StudyNookCard;