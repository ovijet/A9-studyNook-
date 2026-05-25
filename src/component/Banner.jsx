'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock3, ShieldCheck } from "lucide-react";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-[#0d1513]">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          
          {/* LEFT CONTENT */}
          <div className="relative z-10">
            
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
            >
              <BookOpen className="w-4 h-4 text-primary" />

              <span className="text-sm text-gray-300 font-medium">
                Quiet rooms, on demand
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight"
            >
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-orange-400 to-primary bg-clip-text text-transparent">
                Study Room
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg leading-relaxed mt-6 max-w-xl"
            >
              Browse and book quiet, private study rooms for focused learning,
              online classes, meetings, and productivity sessions — anytime you
              need.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <Link href="/Rooms">
                <button className="bg-primary hover:scale-105 hover:shadow-primary/40 transition-all duration-300 text-white px-7 py-3 rounded-2xl font-semibold shadow-xl">
                  Explore Rooms
                </button>
              </Link>

              <Link href="/addRoom">
                <button className="border border-white/20 hover:border-primary hover:bg-primary/10 text-white transition-all duration-300 px-7 py-3 rounded-2xl font-semibold backdrop-blur-md">
                  List Your Room
                </button>
              </Link>
            </motion.div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
              
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5">
                <Clock3 className="text-primary mb-3" size={28} />

                <h3 className="text-white font-bold text-lg">
                  Instant Booking
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  Reserve study rooms anytime.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5">
                <BookOpen className="text-orange-400 mb-3" size={28} />

                <h3 className="text-white font-bold text-lg">
                  Quiet Spaces
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  Perfect for focused sessions.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5">
                <ShieldCheck className="text-green-400 mb-3" size={28} />

                <h3 className="text-white font-bold text-lg">
                  Safe & Secure
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  Verified listings and users.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-14">
              <div>
                <h2 className="text-4xl font-black text-white">120+</h2>
                <p className="text-gray-400 mt-1">Rooms Listed</p>
              </div>

              <div>
                <h2 className="text-4xl font-black text-white">5K+</h2>
                <p className="text-gray-400 mt-1">Happy Students</p>
              </div>

              <div>
                <h2 className="text-4xl font-black text-white">24/7</h2>
                <p className="text-gray-400 mt-1">Support Available</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center lg:justify-end"
          >
            
            {/* Glow */}
            <div className="absolute w-[350px] h-[350px] bg-primary/20 rounded-full blur-3xl"></div>

            {/* Floating Card */}
            <div className="absolute -top-5 left-0 md:left-10 bg-white/10 border border-white/10 backdrop-blur-xl px-5 py-4 rounded-2xl shadow-2xl z-20">
              <p className="text-sm text-gray-300">Available Today</p>
              <h3 className="text-2xl font-bold text-white">
                32+ Rooms
              </h3>
            </div>

            {/* Main Image */}
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 shadow-2xl">
              <Image
                src="/banner-books.jpg"
                alt="Study Room"
                width={600}
                height={700}
                priority
                className="w-full max-w-md lg:max-w-xl object-cover hover:scale-105 transition-all duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Bottom Card */}
            <div className="absolute -bottom-6 right-0 bg-[#121a18] border border-white/10 px-6 py-4 rounded-2xl shadow-2xl">
              <p className="text-gray-400 text-sm">
                Trusted by Students
              </p>

              <h4 className="text-white font-bold text-2xl">
                4.9★ Rating
              </h4>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;