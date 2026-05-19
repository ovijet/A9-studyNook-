"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Card } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";

const RoomDetailsPage = ({ book }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  console.log(user, "xxxxxxxxxxxxxxx");

  const {
    image,
    roomName,
    description,
    floor,
    capacity,
    hourlyRate,
    amenities,
    _id,
  } = book;

  console.log(book, "ssssss");

  const handleBook = async () => {
    const bookingData = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      bookId: _id,
      roomName,
      description,
      image,
    };

    console.log(bookingData);

    const res =await fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });
    const data =await res.json()
    console.log(data);
    toast("Booking success");
  };

  return (
    <div>
      <div className="pb-10">
        {/* Banner Image */}
        <div className="max-w-7xl mx-auto px-4">
          <Image
            src={image}
            width={1200}
            height={500}
            alt={roomName}
            className="w-full h-[400px] mt-5 rounded-2xl object-cover"
          />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
          {/* Left Side */}
          <div className="flex-1 space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800">{roomName}</h1>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>

              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Amenities</h2>

              <div className="flex flex-wrap gap-3">
                {amenities?.map((item, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Card */}
          <div className="w-full lg:w-[350px]">
            <Card className="p-6 shadow-xl rounded-2xl sticky top-5">
              <div className="space-y-4">
                <div className="flex justify-between  pb-2">
                  <span className="font-bold text-yellow-400 text-3xl">
                    {hourlyRate}
                  </span>
                </div>

                <div className="flex justify-between  pb-2">
                  <span className="font-bold text-black flex justify-center items-center gap-2">
                    {" "}
                    {/* <RiFloodLinee /> */}
                    {floor}
                  </span>
                </div>

                <div className="flex justify-between pb-2">
                  <span className="font-bold text-black flex justify-center items-center gap-2">
                    {capacity}
                  </span>
                </div>
              </div>

              {/* Button */}
              <Button
                onClick={handleBook}
                className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-all duration-300"
              >
                Book Now
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
