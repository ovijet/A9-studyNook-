import Banner from "@/component/Banner";
import RoomCard from "@/component/RoomCard";
import Image from "next/image";
import AllRooms from "./Rooms/page";
import FeaturedRooms from "@/component/FeaturedRoom";

export default function Home() {
  return (
    <div>
      <Banner />
      {/* <AllRooms /> */}
      <FeaturedRooms/>
    </div>
  );
}
