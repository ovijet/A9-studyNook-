'use client';

import React, { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

const BookNewModal = ({book}) => {

  // const { roomName,description}=book

  console.log("ROOM DETAILS BOOK:", book);


  const {
    image,
    roomName,
    description,
    floor,
    capacity,
    // hourlyRate,
    amenities = [],
    bookingCount,
  } = book || {};

  const { data } = authClient.useSession();
    const user = data?.user;

    console.log(user,'user');
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const TIME_SLOTS = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
  ];

  const hourlyRate = 10;
  const totalCost = selectedSlots.length * hourlyRate;

  const toggleSlot = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot)
        ? prev.filter((s) => s !== slot)
        : [...prev, slot]
    );
  };

  // ✅ FIXED SUBMIT
  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   const form = new FormData(e.target);

  //   const bookingData = {
  //     date: form.get("date"),
  //     slots: selectedSlots,
  //     totalCost,
  //   };

  //   console.log("BOOKING:", bookingData);
  // };


  const onSubmit = async (e) => {
  e.preventDefault();

  if (!user) {
    alert("Please login first");
    return;
  }

  const form = new FormData(e.target);

  const bookingData = {
    userId: user.id,
    name: user.name,
    email: user.email,
    roomName,
    description,
    date: form.get("date"),
    slots: selectedSlots,
    totalCost,
  };

  console.log("BOOKING:", bookingData);

  await fetch("http://localhost:5000/booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  setIsOpen(false);
  setSelectedSlots([]);
};

  return (
    <>
      {/* OPEN BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full mt-8 bg-black text-purple-700 hover:bg-gray-100 font-bold py-4 rounded-2xl"
      >
        Book Now
      </button>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">

          <div className="bg-white text-black w-full max-w-2xl rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 text-white relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4"
              >
                <X />
              </button>

              <h2 className="text-2xl font-bold">{roomName}</h2>
              <h2>{description}</h2>
            </div>

            {/* ✅ FORM START */}
            <form onSubmit={onSubmit} className="p-6 space-y-6">

              {/* DATE */}
              <div>
                <label className="block mb-2">Select Date</label>
                <input
                  type="date"
                  name="date"
                  className="w-full border p-3 rounded-xl"
                />
              </div>

              {/* TIME SLOTS */}
              <div>
                <label className="block mb-3">Select Time Slot</label>

                <div className="grid grid-cols-2 gap-3">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => toggleSlot(slot)}
                      className={`p-3 border rounded-xl ${
                        selectedSlots.includes(slot)
                          ? "bg-purple-600 text-white"
                          : "bg-white"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* SUMMARY */}
              <div className="flex justify-between bg-gray-100 p-4 rounded-xl">
                <p>Total: ${totalCost}</p>
                <p>{selectedSlots.length} Hours</p>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-4">

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-1/3 border p-3 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-2/3 bg-purple-600 text-white p-3 rounded-xl"
                >
                  Confirm Booking
                </button>

              </div>

            </form>
            {/* ✅ FORM END */}

          </div>
        </div>
      )}
    </>
  );
};

export default BookNewModal;