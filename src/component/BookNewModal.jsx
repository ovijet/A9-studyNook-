'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { toast } from 'react-toastify';

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

const SLOT_PRICES = {
  '08:00 - 09:00': 10,
  '09:00 - 10:00': 20,
  '10:00 - 11:00': 30,
  '11:00 - 12:00': 40,
  '12:00 - 13:00': 50,
  '13:00 - 14:00': 60,
  '14:00 - 15:00': 70,
  '15:00 - 16:00': 80,
};

const BookNewModal = ({ book }) => {
  const { roomName, description, image } = book;

  const { data } = authClient.useSession();
  const user = data?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalCost = selectedSlot ? SLOT_PRICES[selectedSlot] : 0;

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!user || !selectedSlot) return;

  setIsSubmitting(true);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        roomName,
        description,
        image,
        date,
        slot: selectedSlot,
        price: totalCost,
      }),
    });

    const data = await res.json();

   
    if (!res.ok) {
      
      toast.error(data.message || "Already booked for this slot!")
      setIsSubmitting(false);
      return;
    }

    toast("Booking successful!");

    setIsOpen(false);
    setSelectedSlot(null);

  } catch (error) {
    toast("Something went wrong!");
  }

  setIsSubmitting(false);
};

  return (
    <>
      {/* OPEN BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
      >
        Book Now
      </button>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3">

          <div className="w-full max-w-md  bg-white rounded-3xl shadow-2xl overflow-hidden relative">

            {/* CLOSE */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
            >
              <X size={18} />
            </button>

            {/* HEADER IMAGE */}
            <div className="relative h-40 w-full">
              <Image
                src={image}
                alt={roomName}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />

              <div className="absolute bottom-3 left-4 text-white">
                <h2 className="text-lg font-bold">{roomName}</h2>
                <p className="text-xs text-gray-200">
                  {description?.slice(0, 60)}...
                </p>
              </div>
            </div>

            {/* BODY */}
            <div className="p-5 space-y-4">

              {/* DATE */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Select Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* TIME SLOTS */}
              <div>
                <label className="text-sm text-gray-600 mb-2 block">
                  Choose Time Slot
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlot === slot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`text-xs p-2 rounded-xl border transition ${
                          isSelected
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-white text-gray-700 hover:border-orange-300'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PRICE */}
              <div className="flex justify-between items-center border-t pt-3">
                <span className="text-sm text-gray-600">Total</span>
                <span className="text-lg font-bold text-orange-500">
                  ${totalCost}
                </span>
              </div>

              {/* BUTTON */}
              <button
                onClick={handleSubmit}
                disabled={!selectedSlot || isSubmitting}
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold disabled:opacity-50 transition"
              >
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookNewModal;