import Banner from "@/component/Banner";
import FeaturedRoom from "@/component/Featured";
import RoomCategories from "@/component/RoomCategories";
import StudyNookCard from "@/component/StudyNookCard";
import BookWorks from "@/component/BookWorks";
import Testimonials from "@/component/Testimonials";
import FaqSection from "@/component/FaqSection";

export default function Home() {
  return (
    <div className="space-y-0 overflow-x-hidden">
      <Banner />
      <FeaturedRoom />
      <RoomCategories />
      <StudyNookCard />
      <BookWorks />
      <Testimonials />
      <FaqSection />
    </div>
  );
}

