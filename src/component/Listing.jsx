
'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const ListingCard = ({ room, index = 0 }) => {
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

  const imageSrc =
    image && image.startsWith('http')
      ? image
      : "https://images.unsplash.com/photo-1506744038136-46273834b3fb";

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
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      {/* Image */}
      <div className="overflow-hidden relative h-60">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Image
            src={imageSrc}
            fill
            alt={roomName || 'Room'}
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title + Price */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mt-3">
              {roomName}
            </h2>
          </div>

          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
            ${hourlyRate}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {description?.slice(0, 100)}...
        </p>

        {/* Capacity */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700">
            🪑 {capacity} Seats
          </p>

          <p className="text-sm text-gray-500 mt-1">
            📍 {floor}
          </p>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 pt-2">
          {visibleAmenities.map((item, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
            >
              {getAmenityIcon(item)} {item}
            </span>
          ))}

          {remainingCount > 0 && (
            <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
              +{remainingCount} more
            </span>
          )}
        </div>

        {/* Button */}
        <Link
          href={`/listings/${_id}`}
          className="block text-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ListingCard;