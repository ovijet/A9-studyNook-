import Link from 'next/link';
import RoomCard from './RoomCard';
import { ArrowRight, Sparkles } from 'lucide-react';

const FeaturedRoom = async () => {
  let data = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/featured`,
      {
        cache: 'no-store',
      }
    );

    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch featured rooms:", error);
  }

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-orange-100/60 blur-3xl rounded-full -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>Handpicked Spaces</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Featured Study Rooms
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Explore recently added spaces equipped for quiet concentration, fast Wi-Fi, and productive study marathons.
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/Rooms">
              <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all group">
                <span>View All Rooms</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((room, index) => (
            <RoomCard
              key={room._id}
              room={room}
              index={index}
            />
          ))}
        </div>

        {/* Empty State */}
        {(!data || data.length === 0) && (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              📚
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              No Featured Rooms Available
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Check back soon for newly listed study spaces in your area.
            </p>
            <Link href="/Rooms">
              <button className="bg-orange-500 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-orange-600 transition">
                Browse All Rooms
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedRoom;