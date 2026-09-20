'use client';

import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import ListingCard from '@/component/Listing';
import Link from 'next/link';
import { PlusCircle, LayoutGrid, Loader2 } from 'lucide-react';

const MyListings = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const session = await authClient.getSession();
        const email = session?.data?.user?.email;

        if (!email) {
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/my-listings?email=${email}`
        );

        if (res.ok) {
          const data = await res.json();
          setRooms(data);
        }
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
      setLoading(false);
    };

    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/study/${id}`,
        {
          method: 'DELETE',
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Study room deleted");
        setRooms((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete room");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        <p className="text-slate-500 text-sm font-semibold">Loading your study room listings...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-screen py-10 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-2">
              <LayoutGrid size={14} className="text-orange-500" />
              <span>Host Dashboard</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              My Listed Study Spaces
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage, edit, or delete the study rooms you've published on StudyNook.
            </p>
          </div>

          <Link href="/addRoom">
            <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-6 py-3 rounded-2xl shadow-md shadow-orange-500/20 hover:shadow-lg transition-all text-sm shrink-0">
              <PlusCircle size={18} />
              <span>Add New Room</span>
            </button>
          </Link>
        </div>

        {/* CONTENT GRID OR EMPTY STATE */}
        {rooms.length === 0 ? (
          <div className="bg-white border border-slate-200/90 rounded-3xl p-12 md:p-16 text-center max-w-xl mx-auto space-y-4 shadow-xs">
            <div className="w-20 h-20 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mx-auto text-3xl font-bold">
              📚
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
              No Study Rooms Added Yet
            </h3>

            <p className="text-slate-500 text-sm leading-relaxed">
              You haven't listed any rooms for students yet. Add your first space and start accepting hourly bookings.
            </p>

            <div className="pt-2">
              <Link href="/addRoom">
                <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-2xl transition-all text-sm">
                  <PlusCircle size={18} />
                  <span>List Your First Room</span>
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, index) => (
              <ListingCard
                key={room._id}
                room={room}
                index={index}
                showActions={true}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyListings;