import RoomDetailsPage from "@/component/RoomDetailsPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const RoomPage = async ({ params }) => {
  const { id } = await params;

  let token = null;
  try {
    const authData = await auth.api.getToken({
      headers: await headers()
    });
    token = authData?.token;
  } catch (err) {
    // Session token optional
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/study/${id}`, {
    headers: token ? { authorization: `Bearer ${token}` } : {},
    cache: "no-store",
  });

  const book = await res.json();

  return (
    <div>
      <RoomDetailsPage book={book} />
    </div>
  );
};

export default RoomPage;

