'use client';

import React, { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';

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
  const { roomName, description,image} = book
  const { data } = authClient.useSession();
  const user = data?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(() =>
    new Date().toISOString().split('T')[0]
  );

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalCost = selectedSlot ? SLOT_PRICES[selectedSlot] : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !selectedSlot) return;

    setIsSubmitting(true);

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
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

    setIsOpen(false);
    setSelectedSlot(null);
    setIsSubmitting(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 rounded-xl bg-[#b5622a] text-white font-bold"
      >
        Book Now
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3">

          {/* 🔥 SMALL MODAL */}
          <div className="w-full max-w-sm bg-white text-black rounded-2xl p-5 space-y-4 relative">

            {/* CLOSE */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3"
            >
              <X size={18} />
            </button>

            {/* TITLE */}
            <div>
              <h2 className="text-lg font-bold">{roomName}</h2>
              <p className="text-xs text-gray-500">{description}</p>
              <div className="relative w-full h-32">
  <Image
    src={image}
    alt={roomName}
    fill
    className="object-cover"
  />
</div>
            </div>

            {/* DATE */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm"
            />

            {/* TIME SLOTS */}
            <div className="grid grid-cols-2 gap-2">
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedSlot === slot;

                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`text-[11px] p-2 rounded-lg border ${
                      isSelected
                        ? 'bg-[#b5622a] text-white'
                        : 'bg-white'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>

            {/* PRICE */}
            <div className="flex justify-between text-sm font-bold border-t pt-2">
              <span>Total</span>
              <span className="text-[#b5622a]">${totalCost}</span>
            </div>

            {/* ACTIONS */}
            <button
              onClick={handleSubmit}
              disabled={!selectedSlot || isSubmitting}
              className="w-full py-2 rounded-lg bg-[#b5622a] text-white disabled:opacity-50"
            >
              {isSubmitting ? 'Booking...' : 'Confirm'}
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default BookNewModal;