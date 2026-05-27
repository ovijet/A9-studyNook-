"use client";

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
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <div className="overflow-x-auto rounded-3xl border shadow bg-white">
        <table className="w-full text-left border-collapse">

          {/* HEADER */}
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4">Room</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Cost</th>
              {/* <th className="p-4">Status</th> */}
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {bookings.map((item) => (
              <tr key={item._id} className="border-t">

                <td className="p-4 font-bold">
                 {item.image} {item.roomName}
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
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    canceled
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default BookingsPage;