'use client';

import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import RoomCard from '@/component/RoomCard';
import ListingCard from '@/component/Listing';
import Link from 'next/link';


const MyListings = () => {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchRooms = async () => {

      const session = await authClient.getSession();
      const email = session?.data?.user?.email;

      if (!email) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-listings?email=${email}`
      );

      const data = await res.json();
      setRooms(data);
      setLoading(false);
    };

    fetchRooms();
  }, []);

  // DELETE FUNCTION
  const handleDelete = async (id) => {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/study/${id}`,
      {
        method: 'DELETE',
      }
    );

    const data = await res.json();

    if (data.deletedCount > 0) {

      toast.success("Room deleted");

      setRooms(prev => prev.filter(r => r._id !== id));
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-8">
        My Listings
      </h1>

      {rooms.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-16 px-6 bg-white rounded-3xl border border-gray-200 shadow-sm">
  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 mb-5">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 7V3m8 4V3M4 11h16M5 21h14a1 1 0 001-1V8a1 1 0 00-1-1H5a1 1 0 00-1 1v12a1 1 0 001 1z"
      />
    </svg>
  </div>

  <h3 className="text-2xl font-bold text-gray-800 mb-2">
    No Rooms Added Yet
  </h3>

  <p className="text-gray-500 text-center max-w-md mb-6">
    You haven't added any study rooms yet. Create your first room and start
    accepting bookings from students.
  </p>

  <Link
    href="/addRoom"
    className="px-6 py-3 bg-[#1E3029] text-white font-medium rounded-xl hover:bg-[#2A433A] transition-all duration-300 shadow-lg hover:shadow-xl"
  >
    + Add New Room
  </Link>
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
  );
};

export default MyListings;