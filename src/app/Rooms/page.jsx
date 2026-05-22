import RoomCard from "@/component/RoomCard";
import React from "react";

const AllRooms = async () => {
  const res = await fetch("http://localhost:5000/study");
  const data = await res.json();
  console.log(data, "fffffffff");
  return (
    <div className="bg-[#111815]">
      <h1>All study Rooms</h1>
      <p>
        Browse the full catalog. Filter by amenity, price, or search by name.
      </p>
      <div className="grid grid-cols-3 items-center gap-3 max-w-7xl mx-auto">
        {data.map((room) => (
          <RoomCard key={room._id} room={room}></RoomCard>
        ))}
      </div>
    </div>
  );
};

export default AllRooms;
