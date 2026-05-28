'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const RoomCard = ({ room, index = 0 }) => {
  const ref = useRef(null);

  const {
    _id,
    image,
    roomName,
    description,
    floor,
    capacity,
    hourlyRate,
    amenities = [],
  } = room;

  const visibleAmenities = amenities.slice(0, 3);
  const remainingCount = amenities.length - 3;

  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
  });

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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200"
    >

      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden">

        <motion.div whileHover={{ scale: 1.05 }} className="w-full h-full">
          <Image
            src={image}
            fill
            alt={roomName || 'Room'}
            className="object-cover"
          />
        </motion.div>

        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-orange-600 px-3 py-1 rounded-full text-sm font-semibold shadow">
          {hourlyRate}
        </div>

      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-4">

        {/* TITLE */}
        <h2 className="text-xl font-bold text-gray-900">
          {roomName}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-500 text-sm leading-relaxed">
          {description?.slice(0, 100)}...
        </p>

        {/* META */}
        <div className="flex items-center justify-between text-sm text-gray-600">

          <p>🪑 {capacity} Seats</p>
          <p>📍 {floor}</p>

        </div>

        {/* AMENITIES */}
        <div className="flex flex-wrap gap-2">

          {visibleAmenities.map((item, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
            >
              {getAmenityIcon(item)} {item}
            </span>
          ))}

          {remainingCount > 0 && (
            <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
              +{remainingCount} more
            </span>
          )}

        </div>

        {/* BUTTON */}
        <Link
          href={`/Rooms/${_id}`}
          className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
        >
          View Details
        </Link>

      </div>
    </motion.div>
  );
};

export default RoomCard;