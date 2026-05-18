import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-50 via-white to-cyan-50 py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <p className="text-indigo-600 font-semibold text-lg mb-3">
            Quiet rooms, on demand
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Find Your Perfect <br />
            Study Room
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
            Browse and book quiet, private study rooms in your library by the
            hour. List your own room and earn — without the scheduling
            headaches.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-10">
            <button className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold shadow-md">
              Explore Rooms
            </button>

            <button className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 px-6 py-3 rounded-xl font-semibold">
              Get Started
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-2xl p-5 text-center">
              <h2 className="text-3xl font-bold text-indigo-600">120+</h2>
              <p className="text-gray-500 mt-1">Rooms Listed</p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-5 text-center">
              <h2 className="text-3xl font-bold text-indigo-600">5K+</h2>
              <p className="text-gray-500 mt-1">Happy Students</p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-5 text-center">
              <h2 className="text-3xl font-bold text-indigo-600">24/7</h2>
              <p className="text-gray-500 mt-1">Available Support</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center">
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-200 rounded-full blur-3xl opacity-40"></div>

          <Image
            src={"/banner-books.jpg"}
            alt="banner"
            width={400}
            height={400}
            className="rounded-3xl shadow-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
