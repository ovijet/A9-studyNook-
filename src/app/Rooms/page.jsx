export const dynamic = "force-dynamic";

import RoomCard from "@/component/RoomCard";
import RoomFilter from "@/component/RoomFilter";

const normalize = (value = "") => {
  const v = value.toLowerCase().trim();

  if (
    v === "wi-fi" ||
    v === "wifi"
  )
    return "wifi";

  if (
    v === "air conditioning" ||
    v === "ac"
  )
    return "ac";

  if (
    v === "quiet zone" ||
    v === "quiet"
  )
    return "quiet";

  return v;
};

const parseRate = (rate) => {
  if (typeof rate === "number")
    return rate;

  if (!rate) return 0;

  return Number(
    rate.toString().replace(/[^0-9.]/g, "")
  );
};

const AllRooms = async ({
  searchParams,
}) => {
  const params = await searchParams;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/study`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  const search =
    params?.search?.toLowerCase() || "";

  const minRate =
    Number(params?.minRate) || 0;

  const maxRate =
    Number(params?.maxRate) ||
    Infinity;

  const selectedAmenities =
    params?.amenities
      ? params.amenities
          .split(",")
          .map(normalize)
      : [];

  const filteredRooms = data.filter(
    (room) => {
      // SEARCH MATCH
      const roomNameMatch =
        room.roomName
          ?.toLowerCase()
          .includes(search);

      // RATE MATCH
      const rate = parseRate(
        room.hourlyRate
      );

      const rateMatch =
        rate >= minRate &&
        rate <= maxRate;

      // AMENITIES MATCH
      const roomAmenities = (
        room.amenities || []
      ).map(normalize);

      const amenitiesMatch =
        selectedAmenities.length ===
          0 ||
        selectedAmenities.every((a) =>
          roomAmenities.includes(a)
        );

      return (
        roomNameMatch &&
        rateMatch &&
        amenitiesMatch
      );
    }
  );

  return (
    <div className="bg-[#111815] min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            All Study Rooms
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <RoomFilter />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
            {filteredRooms.length >
            0 ? (
              filteredRooms.map((room) => (
                <RoomCard
                  key={room._id}
                  room={{
                    ...room,
                    image:
                      room.image ||
                      room.imageUrl,
                  }}
                />
              ))
            ) : (
              <div className="text-white text-xl font-semibold col-span-full flex justify-center item-center">
                No rooms found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;