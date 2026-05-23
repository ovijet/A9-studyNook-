import RoomDetailsPage from "@/component/RoomDetailsPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const RoomPage = async ({ params }) => {
  const { id } = await params;

  const {token}=await auth.api.getToken({
    headers:await headers()
  })
  console.log(token);

  const res = await fetch(`http://localhost:5000/study/${id}`, {
    
    headers:{
      authorization:`Bearer ${token}`
    },
    cache: "no-store",
  });

  const book = await res.json();

  console.log(book, "oviiiiii");

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
