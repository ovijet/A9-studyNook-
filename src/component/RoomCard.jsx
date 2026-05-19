import Image from "next/image";
import Link from "next/link";
import React from "react";

const RoomCard = ({ books }) => {
  const {
  _id,
    image,
    roomName,
    description,
    floor,
    capacity,
    hourlyRate,
    amenities,
  } = books;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100">
      {/* Image */}
      <div className="overflow-hidden">
        <Image
          src={image}
          width={500}
          height={300}
          alt={roomName}
          className="w-full h-60 object-cover hover:scale-105 transition-transform duration-500"
        />
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
            {hourlyRate}
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {description?.slice(0, 100)}...
          </p>
        </div>

        {/* Capacity */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700"> {capacity}</p>
          <p className="text-sm text-gray-500 mt-1">{floor}</p>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 pt-2">
          {amenities?.slice(0, 3).map((item, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
            >
              {item}
            </span>
          ))}

          {amenities?.length > 3 && (
            <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
              +{amenities.length - 3} more
            </span>
          )}
        </div>

        <Link
          href={`/Rooms/${_id}`}
          className="block text-center bg-[#18211E] hover:bg-[#E69233] text-white font-semibold py-3 rounded-2xl transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
