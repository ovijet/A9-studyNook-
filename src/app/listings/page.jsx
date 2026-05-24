'use client';

import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import RoomCard from '@/component/RoomCard';

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
        <p className="text-center text-gray-500">
          No rooms added yet
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {rooms.map((room, index) => (
            <RoomCard
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