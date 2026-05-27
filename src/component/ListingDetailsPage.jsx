
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import BookNewModal from './BookNewModal';

import { Button } from '@heroui/react';
import EditModal from './EditModal';
import { DeleteModal } from './Delete';

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

  // const imageSrc =
  //   image && image.startsWith('http')
  //     ? image
  //     : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">

      {/* Hero Section */}
      <div className="relative w-full h-[350px] md:h-[550px] overflow-hidden">

        <Image
          src={image}
          alt={roomName || 'Room'}
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-6xl px-5">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              Premium Study Room
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              {roomName}
            </h1>

            <p className="text-gray-200 mt-4 text-lg max-w-2xl">
              {description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-10">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-lg p-6 text-center border border-gray-100"
          >
            <div className="text-4xl mb-3">💰</div>

            <p className="text-gray-500 text-sm">
              Hourly Rate
            </p>

            <h2 className="text-2xl font-bold text-purple-600 mt-1">
              ${hourlyRate}
            </h2>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-lg p-6 text-center border border-gray-100"
          >
            <div className="text-4xl mb-3">🪑</div>

            <p className="text-gray-500 text-sm">
              Capacity
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-1">
              {capacity} Seats
            </h2>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-lg p-6 text-center border border-gray-100"
          >
            <div className="text-4xl mb-3">📍</div>

            <p className="text-gray-500 text-sm">
              Floor
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-1">
              {floor}
            </h2>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-lg p-6 text-center border border-gray-100"
          >
            <div className="text-4xl mb-3">📅</div>

            <p className="text-gray-500 text-sm">
              Bookings
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-1">
              {bookingCount || 0}
            </h2>
          </motion.div>

        </div>

        {/* Description + Booking */}
        <div className="grid lg:grid-cols-3 gap-8 mt-12">

          {/* Description */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">

              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                About This Room
              </h2>

              <p className="text-gray-600 leading-relaxed text-lg">
                {description}
              </p>

            </div>

            {/* Amenities */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 mt-8">

              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Amenities
              </h2>

              <div className="flex flex-wrap gap-4">

                {amenities.map((item, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-purple-100 text-purple-700 px-5 py-3 rounded-2xl font-medium"
                  >
                    {getAmenityIcon(item)} {item}
                  </motion.span>
                ))}

              </div>

            </div>

          </div>

          {/* Booking Card */}
          <div>

            <div className="sticky top-24 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl shadow-2xl p-8 text-white">

              <p className="text-purple-200 text-sm">
                Reserve your spot today
              </p>

              <h2 className="text-5xl font-bold mt-3">
                ${hourlyRate}
              </h2>

              <p className="text-purple-200 mt-1">
                per hour
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-center justify-between border-b border-white/20 pb-3">
                  <span>🪑 Capacity</span>
                  <span>{capacity} Seats</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/20 pb-3">
                  <span>📍 Floor</span>
                  <span>{floor}</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/20 pb-3">
                  <span>📅 Bookings</span>
                  <span>{bookingCount || 0}</span>
                </div>

              </div>

              {/* <button className="w-full mt-8 bg-white text-purple-700 hover:bg-gray-100 font-bold py-4 rounded-2xl transition-all duration-300 text-lg shadow-lg">
                Book Now
              </button> */}

              <BookNewModal book={book}/>

            </div>

          </div>

       

        </div>

      </div>

      <div className='flex justify-end item-center gap-4 mt-5 max-w-6xl mx-auto'>
       
              <EditModal book={book} />
              <DeleteModal book={book} />

      </div>

           {/* <Button variant="danger">Delete</Button> */}
          
      
    </div>
  );
};

export default ListingDetailsPage;