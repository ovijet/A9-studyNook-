'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Users, MapPin, ArrowRight } from 'lucide-react';

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
  } = room || {};

  const imageSrc =
    image && image.startsWith('http')
      ? image
      : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb';

  const visibleAmenities = amenities.slice(0, 3);
  const remainingCount = amenities.length - 3;

  const isInView = useInView(ref, {
    once: true,
    margin: '-50px',
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
      'Power Outlets': '🔌',
    };
    return iconMap[amenity] || '✨';
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200/80 hover:border-orange-200 transition-all duration-300 flex flex-col justify-between"
    >

      {/* TOP IMAGE SECTION */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <Image
          src={imageSrc}
          fill
          alt={roomName || 'Study Room'}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay on bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* PRICE BADGE */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md border border-white/40 text-slate-900 px-3.5 py-1.5 rounded-full text-xs font-black shadow-md flex items-center gap-1">
          <span className="text-orange-600">${hourlyRate}</span>
          <span className="text-slate-400 font-medium">/ hr</span>
        </div>

        {/* BOTTOM IMAGE TITLE */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 className="text-xl font-bold tracking-tight drop-shadow-sm line-clamp-1">
            {roomName}
          </h3>
        </div>
      </div>

      {/* CARD BODY CONTENT */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        
        <div className="space-y-3">
          {/* DESCRIPTION */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
            {description || "A quiet and comfortable study space equipped with modern learning amenities."}
          </p>

          {/* META BADGES (CAPACITY & FLOOR) */}
          <div className="flex items-center gap-3 pt-1 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/60">
              <Users size={14} className="text-orange-500" />
              <span>{capacity} Seats</span>
            </div>

            {floor !== null && floor !== undefined && (
              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/60">
                <MapPin size={14} className="text-orange-500" />
                <span>Floor {floor}</span>
              </div>
            )}
          </div>

          {/* AMENITIES TAGS */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {visibleAmenities.map((item, idx) => (
              <span
                key={idx}
                className="bg-orange-50 text-orange-700 border border-orange-100 text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1"
              >
                <span>{getAmenityIcon(item)}</span>
                <span>{item}</span>
              </span>
            ))}

            {remainingCount > 0 && (
              <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                +{remainingCount} more
              </span>
            )}
          </div>
        </div>

        {/* CTA LINK BUTTON */}
        <div className="pt-2">
          <Link
            href={`/Rooms/${_id}`}
            className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-2xl transition-all duration-300 text-xs sm:text-sm shadow-xs group-hover:shadow-md"
          >
            <span>View Room & Book</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </motion.div>
  );
};

export default RoomCard;