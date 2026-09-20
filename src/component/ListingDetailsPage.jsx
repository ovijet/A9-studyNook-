"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BookNewModal from "./BookNewModal";
import EditModal from "./EditModal";
import { DeleteModal } from "./Delete";
import {
  DollarSign,
  Users,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const ListingDetailsPage = ({ book }) => {
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
    image && image.startsWith("http")
      ? image
      : "https://images.unsplash.com/photo-1506744038136-46273834b3fb";

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      Whiteboard: "📝",
      Projector: "📽️",
      "Wi-Fi": "📶",
      WiFi: "📶",
      wifi: "📶",
      AC: "❄️",
      "Air Conditioning": "❄️",
      quiet: "🤫",
      "Quiet Zone": "🤫",
      "Power Outlets": "🔌",
    };
    return iconMap[amenity] || "✨";
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO BANNER */}
      <div className="relative w-full h-[400px] md:h-[520px] overflow-hidden bg-slate-900">
        <Image
          src={imageSrc}
          alt={roomName || "Listed Room Details"}
          fill
          priority
          className="object-cover opacity-80"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
              <Sparkles size={14} />
              <span>Host Workspace Listing</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md">
              {roomName}
            </h1>

            <p className="text-slate-300 text-sm md:text-base max-w-2xl font-normal leading-relaxed line-clamp-2">
              {description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10 space-y-10">
        {/* HOST QUICK ACTIONS TOP BAR */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Manage Your Room Listing
            </h3>
            <p className="text-xs text-slate-500">
              Update capacity, hourly rate, description, or remove space.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <EditModal book={book} />
            <DeleteModal book={book} />
          </div>
        </div>

        {/* STATS WIDGETS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              label: "Hourly Price",
              value: `$${hourlyRate}`,
              icon: DollarSign,
              color: "text-orange-600 bg-orange-50 border-orange-100",
            },
            {
              label: "Capacity",
              value: `${capacity} Seats`,
              icon: Users,
              color: "text-blue-600 bg-blue-50 border-blue-100",
            },
            {
              label: "Floor Level",
              value:
                floor !== null && floor !== undefined
                  ? `Floor ${floor}`
                  : "Ground",
              icon: MapPin,
              color: "text-emerald-600 bg-emerald-50 border-emerald-100",
            },
            {
              label: "Bookings Count",
              value: `${bookingCount || 0} Times`,
              icon: Calendar,
              color: "text-purple-600 bg-purple-50 border-purple-100",
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs flex items-center gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${stat.color}`}
                >
                  <Icon size={22} />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">
                    {stat.value}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* DETAILS & PREVIEW */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT DETAILS COLUMN */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xs space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Listing Overview
              </h2>
              <p className="text-slate-600 leading-relaxed text-base font-normal">
                {description || "No description provided for this room."}
              </p>

              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>Publicly Searchable on StudyNook</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>Real-Time Reservation Lock Enabled</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xs space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Configured Amenities
              </h2>

              <div className="flex flex-wrap gap-3">
                {amenities.map((item, index) => (
                  <div
                    key={index}
                    className="bg-orange-50/80 border border-orange-200/80 text-orange-900 px-4 py-2.5 rounded-2xl text-sm font-semibold flex items-center gap-2"
                  >
                    <span className="text-base">{getAmenityIcon(item)}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR PREVIEW */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xl shadow-slate-200/50 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full inline-block">
                  Student Rate
                </span>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="text-4xl font-black text-slate-900">
                    ${hourlyRate}
                  </span>
                  <span className="text-slate-500 font-medium">/ per hour</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 text-sm text-slate-700">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Seat Capacity</span>
                  <span className="font-bold text-slate-900">
                    {capacity} Persons
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Floor Level</span>
                  <span className="font-bold text-slate-900">
                    {floor !== null && floor !== undefined
                      ? `Floor ${floor}`
                      : "Ground"}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <BookNewModal book={book} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListingDetailsPage;
