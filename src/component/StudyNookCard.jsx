import React from "react";
import { CalendarDays, Clock3, ShieldCheck } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Easy Booking",
    description:
      "Pick a date, choose an hour, and confirm instantly without any hassle.",
    icon: <CalendarDays className="w-10 h-10 text-[#FF6900]" />,
  },
  {
    id: 2,
    title: "Flexible Schedule",
    description:
      "Book study rooms based on your own routine — morning, evening, or late-night focus sessions.",
    icon: <Clock3 className="w-10 h-10 text-[#FF6900]" />,
  },
  {
    id: 3,
    title: "Safe & Quiet Space",
    description:
      "Enjoy a peaceful environment designed for concentration, productivity, and comfort.",
    icon: <ShieldCheck className="w-10 h-10 text-[#FF6900]" />,
  },
];

const StudyNookCard = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-10 py-16 bg-[#F7F7F5]">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1E3029] mb-4">
            Why StudyNook?
          </h1>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Built around the way real students study — quiet, focused, and on
            your schedule.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-[#EEF3F0] flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-[#1E3029] mb-3">
                {feature.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudyNookCard;