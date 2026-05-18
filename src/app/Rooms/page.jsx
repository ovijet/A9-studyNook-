import RoomCard from "@/component/RoomCard";
import React from "react";

const AllRooms = async () => {
  const res = await fetch("http://localhost:5000/study");
  const data = await res.json();
  console.log(data, "fffffffff");
  return (
    <div>
      <h1>All study Rooms</h1>
      <p>
        Browse the full catalog. Filter by amenity, price, or search by name.
      </p>
      <div>
        {data.map((books) => (
          <RoomCard key={books._id} books={books}></RoomCard>
        ))}
      </div>
    </div>
  );
};

export default AllRooms;
