import RoomDetailsPage from "@/component/RoomDetailsPage";
import React from "react";

const RoomPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/study/${id}`, {
    cache: "no-store",
  });

  const book = await res.json();

  console.log(book, "ffffff");

  // if (!data) {
  //   return <div>No Room Found</div>;
  // }
  return (
    <div>
      <RoomDetailsPage book={book} />
    </div>
  );
};

export default RoomPage;
