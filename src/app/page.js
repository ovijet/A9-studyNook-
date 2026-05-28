import Banner from "@/component/Banner";
import RoomCard from "@/component/RoomCard";
import Image from "next/image";
import AllRooms from "./Rooms/page";
import FeaturedRooms from "@/component/FeaturedRoom";
import FeaturedRoom from "@/component/Featured";
import StudyNookCard from "@/component/StudyNookCard";
import BookWorks from "@/component/BookWorks";

export default function Home() {
  return (
    <div>
      <Banner />
      {/* <AllRooms /> */}
      {/* <FeaturedRooms/> */}
      <FeaturedRoom/>
      <StudyNookCard/>
      <BookWorks/>
    </div>
  );
}
