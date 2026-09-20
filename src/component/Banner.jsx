'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Clock3, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, Search, MapPin, Users, Calendar } from "lucide-react";

const Banner = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (capacity) params.set("capacity", capacity);
    router.push(`/Rooms?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-slate-50/50 pt-10 pb-16 lg:pt-16 lg:pb-24">

      {/* Ambient background glow blobs */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-gradient-to-br from-orange-300/40 to-amber-200/30 blur-3xl rounded-full pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-gradient-to-tr from-amber-200/50 to-orange-100/40 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MAIN HERO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">

          {/* LEFT CONTENT COLUMN */}
          <div className="lg:col-span-7 space-y-8 z-10 text-center lg:text-left">

            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-orange-200/90 shadow-xs text-orange-700 text-xs sm:text-sm font-bold tracking-wide"
            >
              <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>Quiet Private Study Rooms On Demand</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.08] tracking-tight"
            >
              Find & Book Your{" "}
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Study Sanctuary
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal"
            >
              Book noise-controlled private study rooms equipped with fast Wi-Fi, whiteboards, and power outlets. Tailor-made for exam review, online classes, and deep focus sessions.
            </motion.p>

            {/* HERO QUICK SEARCH WIDGET CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-3 sm:p-4 shadow-xl shadow-slate-200/50"
            >
              <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                
                {/* Search input */}
                <div className="sm:col-span-5 relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search room or amenities..."
                    className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                  />
                </div>

                {/* Capacity select */}
                <div className="sm:col-span-4 relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition appearance-none cursor-pointer"
                  >
                    <option value="">Any Capacity</option>
                    <option value="1">1 Person (Solo Pod)</option>
                    <option value="2">2-4 Persons (Group)</option>
                    <option value="6">6+ Persons (Suite)</option>
                  </select>
                </div>

                {/* Search CTA */}
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-orange-500/25 hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Search</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Stats Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-8 pt-4 border-t border-slate-200/80"
            >
              <div>
                <p className="text-3xl font-black text-slate-900">120+</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Study Nooks</p>
              </div>

              <div className="w-px h-10 bg-slate-200" />

              <div>
                <p className="text-3xl font-black text-slate-900">5K+</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Happy Students</p>
              </div>

              <div className="w-px h-10 bg-slate-200" />

              <div>
                <p className="text-3xl font-black text-slate-900">4.9★</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Average Rating</p>
              </div>
            </motion.div>

          </div>

          {/* RIGHT VISUAL HERO IMAGE & FLOATING CARDS */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-md lg:max-w-none"
            >
              {/* Background ambient glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 via-amber-400 to-yellow-300 rounded-3xl blur-2xl opacity-35 transform rotate-3 scale-95" />

              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-2xl bg-white">
                <Image
                  src="/banner-books.jpg"
                  alt="Study Room Workspace"
                  width={600}
                  height={650}
                  priority
                  className="w-full h-[450px] lg:h-[540px] object-cover hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 text-white max-w-xs">
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                    Top Pick Space
                  </span>
                  <p className="font-bold text-lg leading-snug">
                    Quiet Coding & Learning Hub
                  </p>
                  <p className="text-xs text-slate-200 mt-1">
                    Equipped with High-Speed Wi-Fi & Whiteboard
                  </p>
                </div>
              </div>

              {/* FLOATING CARD 1 - TOP LEFT */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-xl border border-slate-200/90 p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Available Today</p>
                  <p className="text-sm font-bold text-slate-900">32+ Quiet Rooms</p>
                </div>
              </motion.div>

              {/* FLOATING CARD 2 - BOTTOM RIGHT */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-xl border border-slate-200/90 p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold shrink-0">
                  ⚡
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Instant Confirmation</p>
                  <p className="text-sm font-bold text-slate-900">Zero Wait Time</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* TRUSTED UNIVERSITIES BADGES TICKER BAR */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-between gap-6 opacity-75">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Trusted by Students From
          </p>

          <div className="flex flex-wrap items-center gap-8 text-slate-500 font-black text-sm tracking-wider">
            <span className="hover:text-orange-500 transition">BUET</span>
            <span className="hover:text-orange-500 transition">DHAKA UNIVERSITY</span>
            <span className="hover:text-orange-500 transition">BRACU</span>
            <span className="hover:text-orange-500 transition">NSU</span>
            <span className="hover:text-orange-500 transition">IUB</span>
            <span className="hover:text-orange-500 transition">MIST</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Banner;
