import Link from 'next/link';
import RoomCard from './RoomCard';
import { FaArrowRight } from 'react-icons/fa';

const FeaturedRoom = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/featured`,
    {
      cache: 'no-store',
    }
  );

  const data = await res.json();

  return (
    <section className="py-16 bg-gradient-to-b from-base-100 to-base-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Featured Rooms
            </span>

            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Available Study Rooms
            </h2>

            <p className="text-base-content/70 mt-4 text-lg">
              Hand-picked rooms recently added to StudyNook. 
              Find peaceful, modern, and fully equipped spaces 
              for focused learning and productivity.
            </p>
          </div>

          <div>
            <Link href="/Rooms">
              <button className="btn bg-[#FF653F] text-white hover:bg-[#EE5A24] rounded-full px-8">
                View All Rooms   <FaArrowRight />
              </button>
            </Link>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
            />
          ))}
        </div>

        {/* Empty State */}
        {data?.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold mb-3">
              No Featured Rooms Found
            </h3>

            <p className="text-base-content/60">
              Please check back later for newly added rooms.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedRoom;