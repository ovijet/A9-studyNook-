'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock3, ShieldCheck } from "lucide-react";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-white">

      {/* soft background glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-100 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <div className="relative z-10">

            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-6"
            >
              <BookOpen className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-gray-600 font-medium">
                Quiet rooms, on demand
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 leading-tight"
            >
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                Study Room
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-600 text-lg leading-relaxed mt-6 max-w-xl"
            >
              Browse and book quiet, private study rooms for focused learning,
              online classes, meetings, and productivity sessions.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <Link href="/Rooms">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-2xl font-semibold shadow-md transition">
                  Explore Rooms
                </button>
              </Link>

              <Link href="/addRoom">
                <button className="border border-gray-300 hover:border-orange-400 hover:bg-orange-50 text-gray-700 px-7 py-3 rounded-2xl font-semibold transition">
                  List Your Room
                </button>
              </Link>
            </motion.div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">

              <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-5">
                <Clock3 className="text-orange-500 mb-3" size={28} />
                <h3 className="text-gray-900 font-bold text-lg">Instant Booking</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Reserve study rooms anytime.
                </p>
              </div>

              <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-5">
                <BookOpen className="text-orange-500 mb-3" size={28} />
                <h3 className="text-gray-900 font-bold text-lg">Quiet Spaces</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Perfect for focused sessions.
                </p>
              </div>

              <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-5">
                <ShieldCheck className="text-orange-500 mb-3" size={28} />
                <h3 className="text-gray-900 font-bold text-lg">Safe & Secure</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Verified listings and users.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-14">
              <div>
                <h2 className="text-4xl font-black text-gray-900">120+</h2>
                <p className="text-gray-500 mt-1">Rooms Listed</p>
              </div>

              <div>
                <h2 className="text-4xl font-black text-gray-900">5K+</h2>
                <p className="text-gray-500 mt-1">Happy Students</p>
              </div>

              <div>
                <h2 className="text-4xl font-black text-gray-900">24/7</h2>
                <p className="text-gray-500 mt-1">Support Available</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex justify-center lg:justify-end"
          >

            {/* Glow */}
            <div className="absolute w-[350px] h-[350px] bg-orange-100 rounded-full blur-3xl"></div>

            {/* Floating Card */}
            <div className="absolute -top-5 left-0 md:left-10 bg-white border border-gray-200 px-5 py-4 rounded-2xl shadow-md z-20">
              <p className="text-sm text-gray-500">Available Today</p>
              <h3 className="text-2xl font-bold text-gray-900">
                32+ Rooms
              </h3>
            </div>

            {/* Image */}
            <div className="relative overflow-hidden rounded-[32px] border border-gray-200 shadow-xl">
              <Image
                src="/banner-books.jpg"
                alt="Study Room"
                width={600}
                height={700}
                priority
                className="w-full max-w-md lg:max-w-xl object-cover hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
            </div>

            {/* Bottom Card */}
            <div className="absolute -bottom-6 right-0 bg-white border border-gray-200 px-6 py-4 rounded-2xl shadow-md">
              <p className="text-gray-500 text-sm">Trusted by Students</p>
              <h4 className="text-gray-900 font-bold text-2xl">
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