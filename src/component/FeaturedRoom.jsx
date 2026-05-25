// import Link from "next/link";
// import RoomCard from "@/component/RoomCard";

// const FeaturedRooms = async () => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/study`,
//     {
//       cache: "no-store",
//     }
//   );

//   const data = await res.json();

//   const rooms = data.slice(0, 3);

//   return (
//     <div className="px-6 py-10 bg-[#111815]">
//       <div className="max-w-7xl mx-auto">

//         {/* header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-bold text-white">
//             Featured Rooms
//           </h1>

//           <Link
//             href="/Rooms"
//             className="bg-orange-500 text-white px-5 py-3 rounded-xl"
//           >
//             View All Rooms
//           </Link>
//         </div>

//         {/* cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {rooms.map((room) => (
//             <RoomCard
//               key={room._id}
//               room={room}
//             />
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default FeaturedRooms;