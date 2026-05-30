import RoomDetailsPage from "@/component/RoomDetailsPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import React from "react";

const RoomPage = async ({ params }) => {
  const { id } = await params;

  const {token} =await auth.api.getToken({
    headers:await headers()
  })

  console.log(token,'llllllllll');

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/study/${id}`, {
    
    headers:{
      authorization:`Bearer ${token}`
    },
    cache: "no-store",
  });

  const book = await res.json();

  // console.log(book, "oviiiiiixxxxxxx");
  return (
    <div>
      <RoomDetailsPage book={book} />
    </div>
  );
};

export default RoomPage;
