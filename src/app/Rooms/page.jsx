export const dynamic = "force-dynamic";

import RoomCard from "@/component/RoomCard";
import RoomFilter from "@/component/RoomFilter";
import { Sparkles, SlidersHorizontal } from "lucide-react";

const normalize = (value = "") => {
  const v = value.toLowerCase().trim();

  if (v === "wi-fi" || v === "wifi") return "wifi";
  if (v === "air conditioning" || v === "ac") return "ac";
  if (v === "quiet zone" || v === "quiet") return "quiet";

  return v;
};

const parseRate = (rate) => {
  if (typeof rate === "number") return rate;
  if (!rate) return 0;
  return Number(rate.toString().replace(/[^0-9.]/g, ""));
};

const AllRooms = async ({ searchParams }) => {
  const params = await searchParams;
  let data = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/study`,
      {
        cache: "no-store",
      }
    );
    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error("Error loading rooms:", error);
  }

  const search = params?.search?.toLowerCase() || "";
  const minRate = Number(params?.minRate) || 0;
  const maxRate = Number(params?.maxRate) || Infinity;

  const selectedAmenities = params?.amenities
    ? params.amenities.split(",").map(normalize)
    : [];

  const filteredRooms = data.filter((room) => {
    // SEARCH MATCH
    const roomNameMatch = room.roomName?.toLowerCase().includes(search);

    // RATE MATCH
    const rate = parseRate(room.hourlyRate);
    const rateMatch = rate >= minRate && rate <= maxRate;

    // AMENITIES MATCH
    const roomAmenities = (room.amenities || []).map(normalize);
    const amenitiesMatch =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((a) => roomAmenities.includes(a));

    return roomNameMatch && rateMatch && amenitiesMatch;
  });

  return (
    <div className="bg-slate-50/50 min-h-screen py-10 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HERO BANNER FOR ROOMS */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl shadow-slate-900/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Real-Time Availability</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Explore All Study Rooms
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Find and filter quiet spaces by capacity, hourly rate, or equipment amenities. Instant booking guaranteed.
            </p>
          </div>
        </div>

        {/* CONTENT & FILTERS SECTION */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* FILTER SIDEBAR */}
          <RoomFilter />

          {/* ROOM CARDS GRID */}
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
              <p className="text-sm font-bold text-slate-700">
                Showing <span className="text-orange-600 font-extrabold">{filteredRooms.length}</span> {filteredRooms.length === 1 ? 'room' : 'rooms'}
              </p>
            </div>

            {filteredRooms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRooms.map((room, index) => (
                  <RoomCard
                    key={room._id}
                    index={index}
                    room={{
                      ...room,
                      image: room.image || room.imageUrl,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-4 shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto text-3xl">
                  🔍
                </div>
                <h3 className="text-2xl font-bold text-slate-900">No matching rooms found</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto">
                  Try adjusting your search keywords or resetting your amenity filters to see more results.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AllRooms;