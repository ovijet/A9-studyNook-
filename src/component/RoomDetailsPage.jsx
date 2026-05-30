'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import BookNewModal from './BookNewModal';

const RoomDetailsPage = ({ book }) => {
  const {
    image,
    roomName,
    description,
    floor,
    capacity,
    hourlyRate,
    amenities = [],
    bookingCount,
  } = book || {};

  const imageSrc =
    image && image.startsWith('http')
      ? image
      : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb';

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      Whiteboard: '📝',
      Projector: '📽️',
      'Wi-Fi': '📶',
      WiFi: '📶',
      wifi: '📶',
      AC: '❄️',
      'Air Conditioning': '❄️',
      quiet: '🤫',
      'Quiet Zone': '🤫',
    };

    return iconMap[amenity] || '✓';
  };

  return (
    <div className="min-h-screen bg-white pb-20">

      {/* HERO */}
      <div className="relative w-full h-[350px] md:h-[550px] overflow-hidden">

        <Image
          src={imageSrc}
          alt={roomName || 'Room'}
          fill
          priority
          className="object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* content */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-6xl px-5">

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 shadow">
              Premium Study Room
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white">
              {roomName}
            </h1>

            <p className="text-gray-200 mt-4 text-lg max-w-2xl">
              {description}
            </p>

          </motion.div>

        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-4 mt-10">

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          {[
            { label: 'Hourly Rate', value: `${hourlyRate}`, icon: '💰', color: 'text-orange-500' },
            { label: 'Capacity', value: `${capacity} Seats`, icon: '🪑' },
            { label: 'Floor', value: floor, icon: '📍' },
            { label: 'Bookings', value: bookingCount || 0, icon: '📅' },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 text-center"
            >
              <div className="text-4xl mb-3">{item.icon}</div>

              <p className="text-gray-500 text-sm">{item.label}</p>

              <h2 className={`text-2xl font-bold mt-1 ${item.color || 'text-gray-900'}`}>
                {item.value}
              </h2>
            </motion.div>
          ))}

        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-3 gap-8 mt-12">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* ABOUT */}
            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8">

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                About This Room
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {description}
              </p>

            </div>

            {/* AMENITIES */}
            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Amenities
              </h2>

              <div className="flex flex-wrap gap-3">

                {amenities.map((item, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-medium border border-orange-100"
                  >
                    {getAmenityIcon(item)} {item}
                  </motion.span>
                ))}

              </div>

            </div>

          </div>

          {/* RIGHT BOOKING CARD */}
          <div>

            <div className="sticky top-24 bg-white border border-gray-200 rounded-3xl shadow-lg p-8">

              <p className="text-orange-500 text-sm font-medium">
                Reserve your spot today
              </p>

              <h2 className="text-5xl font-bold text-gray-900 mt-3">
                {hourlyRate}
              </h2>

              <p className="text-gray-500 mt-1">
                per hour
              </p>

              <div className="mt-8 space-y-4 text-gray-700">

                <div className="flex justify-between border-b pb-3">
                  <span>🪑 Capacity</span>
                  <span>{capacity} Seats</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span>📍 Floor</span>
                  <span>{floor}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span>📅 Bookings</span>
                  <span>{bookingCount || 0}</span>
                </div>

              </div>

              {/* BUTTON */}
              <div className="mt-8">
                <BookNewModal book={book} />
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default RoomDetailsPage;