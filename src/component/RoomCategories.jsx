'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code, BookOpen, Users, Compass, ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'coding-lab',
    title: 'Coding & Tech Cells',
    tagline: 'Dual monitors, high-speed fiber & power strips',
    icon: Code,
    badge: 'Popular',
    color: 'from-orange-500 to-amber-500',
    count: '38 Rooms',
  },
  {
    id: 'solo-pod',
    title: 'Solo Quiet Pods',
    tagline: 'Soundproof walls for exam prep & deep reading',
    icon: BookOpen,
    badge: 'Silent Zone',
    color: 'from-amber-500 to-yellow-500',
    count: '45 Rooms',
  },
  {
    id: 'group-suite',
    title: 'Group Study Suites',
    tagline: 'Projectors, whiteboards & conference tables',
    icon: Users,
    badge: 'Team Work',
    color: 'from-orange-600 to-red-500',
    count: '24 Rooms',
  },
  {
    id: 'exam-cabin',
    title: '24/7 Exam Cabins',
    tagline: 'Round-the-clock access with complimentary coffee',
    icon: Compass,
    badge: 'Night Focus',
    color: 'from-slate-800 to-slate-900',
    count: '16 Rooms',
  },
];

const RoomCategories = () => {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
              <span>Purpose Built Spaces</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Browse Spaces by Study Type
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Whether you need quiet solo isolation, high-speed coding monitors, or group collaboration whiteboards.
            </p>
          </div>

          <Link href="/Rooms">
            <button className="flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 text-sm group">
              <span>View All Categories</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-110 transition-transform`}>
                      <Icon size={22} />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      {cat.count}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md inline-block mb-2">
                    {cat.badge}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {cat.title}
                  </h3>

                  <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-orange-600">
                  <Link href={`/Rooms`} className="flex items-center gap-1">
                    <span>Explore Spaces</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default RoomCategories;
