"use client";

import { BookingDeleteModal } from "@/component/BookingDeleteModal";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, DollarSign, Bookmark, ArrowRight, Loader2, CheckCircle2, XCircle } from "lucide-react";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const totalSpent = bookings.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const activeBookings = bookings.filter((b) => b.status !== "cancelled").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        <p className="text-slate-500 text-sm font-semibold">Loading your study room reservations...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-screen py-10 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Bookmark size={14} className="text-orange-500" />
              <span>Student Reservations</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              My Bookings Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Track your upcoming study sessions, reserved slots, and booking history.
            </p>
          </div>

          <Link href="/Rooms">
            <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-6 py-3 rounded-2xl shadow-md shadow-orange-500/20 hover:shadow-lg transition-all text-sm">
              <span>Book Another Room</span>
              <ArrowRight size={16} />
            </button>
          </Link>
        </div>

        {/* METRICS SUMMARY WIDGETS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <Bookmark size={22} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Bookings</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">{bookings.length}</h3>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Active Confirmed</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">{activeBookings}</h3>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <DollarSign size={22} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Invested</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">${totalSpent}</h3>
            </div>
          </div>
        </div>

        {/* BOOKINGS TABLE / LIST */}
        {bookings.length === 0 ? (
          <div className="bg-white border border-slate-200/90 rounded-3xl p-12 md:p-16 text-center max-w-xl mx-auto space-y-4 shadow-xs">
            <div className="w-20 h-20 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mx-auto text-4xl">
              📅
            </div>

            <h3 className="text-2xl font-bold text-slate-900">No Reservations Yet</h3>

            <p className="text-slate-500 text-sm leading-relaxed">
              You haven't reserved any study rooms. Browse our available spaces and pick a slot that fits your schedule.
            </p>

            <div className="pt-2">
              <Link href="/Rooms">
                <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-2xl transition-all text-sm">
                  <span>Browse Rooms Now</span>
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-slate-200/90 rounded-3xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <th className="p-4 md:p-5">Study Room</th>
                    <th className="p-4 md:p-5">Date</th>
                    <th className="p-4 md:p-5">Time Slot</th>
                    <th className="p-4 md:p-5">Price</th>
                    <th className="p-4 md:p-5">Status</th>
                    <th className="p-4 md:p-5 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-sm">
                  {bookings.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 md:p-5">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                            <Image
                              src={item.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'}
                              alt={item.roomName || 'Study Room'}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 line-clamp-1">{item.roomName}</p>
                            <p className="text-slate-400 text-xs line-clamp-1">{item.description?.slice(0, 40) || 'Study Room'}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 md:p-5 font-semibold text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-orange-500" />
                          <span>{item.date}</span>
                        </div>
                      </td>

                      <td className="p-4 md:p-5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                          <Clock size={12} className="text-slate-500" />
                          <span>{item.slot}</span>
                        </div>
                      </td>

                      <td className="p-4 md:p-5 font-black text-slate-900">
                        ${item.price}
                      </td>

                      <td className="p-4 md:p-5">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold ${
                            item.status === "cancelled"
                              ? "bg-red-50 text-red-600 border border-red-200"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}
                        >
                          {item.status === "cancelled" ? (
                            <>
                              <XCircle size={12} />
                              <span>Cancelled</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 size={12} />
                              <span>Confirmed</span>
                            </>
                          )}
                        </span>
                      </td>

                      <td className="p-4 md:p-5 text-right">
                        {item.status !== "cancelled" ? (
                          <BookingDeleteModal item={item} setBookings={setBookings} />
                        ) : (
                          <span className="text-slate-400 text-xs font-medium">No actions</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookingsPage;