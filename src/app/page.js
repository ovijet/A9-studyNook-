import Banner from "@/component/Banner";
import RoomCard from "@/component/RoomCard";
import Image from "next/image";
import AllRooms from "./Rooms/page";

export default function Home() {
  return (
    <div>
      <Banner />
      <AllRooms />
    </div>
  );
}
