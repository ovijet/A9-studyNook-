'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, DollarSign, CheckCircle2 } from 'lucide-react';
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
  '08:00 - 09:00': 15,
  '09:00 - 10:00': 20,
  '10:00 - 11:00': 25,
  '11:00 - 12:00': 25,
  '12:00 - 13:00': 20,
  '13:00 - 14:00': 20,
  '14:00 - 15:00': 25,
  '15:00 - 16:00': 30,
};

const BookNewModal = ({ book }) => {
  const { roomName, description, image, hourlyRate } = book || {};

  const { data } = authClient.useSession();
  const user = data?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const basePrice = Number(hourlyRate) || 20;
  const totalCost = selectedSlot ? (SLOT_PRICES[selectedSlot] || basePrice) : basePrice;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to book a room");
      return;
    }

    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }

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

      const responseData = await res.json();

      if (!res.ok) {
        toast.error(responseData.message || "Room is already booked for this time slot!");
        setIsSubmitting(false);
        return;
      }

      toast.success("Room booked successfully!");
      setIsOpen(false);
      setSelectedSlot(null);

    } catch (error) {
      toast.error("Something went wrong while booking!");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      {/* TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/35 transition-all"
      >
        Book Now
      </button>

      {/* MODAL DIALOG */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto">

          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden relative border border-slate-200 animate-in fade-in zoom-in duration-200">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-20 w-8 h-8 rounded-full bg-slate-900/50 hover:bg-slate-900 text-white flex items-center justify-center transition"
            >
              <X size={18} />
            </button>

            {/* HEADER ROOM THUMBNAIL */}
            <div className="relative h-44 w-full bg-slate-900">
              <Image
                src={image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'}
                alt={roomName || 'Room'}
                fill
                className="object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="bg-orange-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1 inline-block">
                  Reserve Space
                </span>
                <h3 className="text-xl font-bold tracking-tight">{roomName}</h3>
              </div>
            </div>

            {/* MODAL FORM BODY */}
            <div className="p-6 space-y-5">

              {/* DATE SELECTOR */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Calendar size={14} className="text-orange-500" />
                  <span>Select Date</span>
                </label>

                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-2xl p-3 text-sm font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                />
              </div>

              {/* TIME SLOTS SELECTOR */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Clock size={14} className="text-orange-500" />
                  <span>Available Time Slots</span>
                </label>

                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlot === slot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`text-xs font-bold p-3 rounded-2xl border flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                            : 'bg-slate-50/70 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <span>{slot}</span>
                        {isSelected && <CheckCircle2 size={14} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PRICE BREAKDOWN */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Total Booking Amount</p>
                  <p className="text-xs text-slate-400">Includes all taxes and facilities</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-orange-600">${totalCost}</span>
                </div>
              </div>

              {/* CONFIRM BUTTON */}
              <button
                onClick={handleSubmit}
                disabled={!selectedSlot || isSubmitting}
                className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-orange-500 text-white font-bold text-sm disabled:opacity-50 transition-all shadow-md"
              >
                {isSubmitting ? 'Confirming Reservation...' : 'Confirm Reservation'}
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookNewModal;