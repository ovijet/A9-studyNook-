"use client";

import { BookingDeleteModal } from "@/component/BookingDeleteModal";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);
  

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-gray-200 shadow-sm">
  <div className="text-6xl mb-4">📅</div>

  <h2 className="text-2xl font-bold text-gray-800 mb-2">
    No Bookings Found
  </h2>

  <p className="text-gray-500 text-center max-w-md">
    There are currently no room bookings available.
    Once users start reserving rooms, their bookings will appear here.
  </p>
</div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border shadow bg-white">
          <table className="w-full text-left border-collapse">

            <thead>
              <tr className="bg-gray-100">
                <th className="p-4">Room</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Cost</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((item) => (
                <tr
                  key={item._id}
                  className="border-t"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">

                      <div className="relative w-14 h-14 rounded-xl overflow-hidden">
                        <Image
                          src={item.image||'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'}
                          alt={item.roomName||'room'}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <span className="font-bold">
                        {item.roomName}
                      </span>

                    </div>
                  </td>

                  <td className="p-4">
                    {item.date}
                  </td>

                  <td className="p-4">
                    {item.slot}
                  </td>

                  <td className="p-4 font-bold">
                    ${item.price}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.status || "confirmed"}
                    </span>
                  </td>

                  <td className="p-4">
                    {item.status !== "cancelled" ? (
                      <BookingDeleteModal
                        item={item}
                        setBookings={setBookings}
                      />
                    ) : (
                      <span className="text-red-500 font-semibold">
                        __
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;