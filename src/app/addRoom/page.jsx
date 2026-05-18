"use client";

import React from "react";
import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Select,
  SelectValue,
  TextArea,
  TextField,
} from "@heroui/react";

const AddDestination = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const fromData = new FormData(e.currentTarget);
    const user = Object.fromEntries(fromData.entries());
    console.log(user);
    const res = await fetch("http://localhost:5000/study", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    console.log(data);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-10 border-b border-white/10">
          <h1 className="text-4xl font-bold text-white">Add a New Room</h1>
          <p className="text-gray-300 mt-3 text-lg">
            Share your study room with others. You can edit or remove it any
            time.
          </p>
        </div>

        {/* Form */}
        <form className="p-10 space-y-8" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Destination Name */}
            <div className="md:col-span-2">
              <TextField name="roomName" isRequired>
                <Label className="text-white mb-2 block">RoomName</Label>

                <Input
                  placeholder="Bali Paradise"
                  className="rounded-2xl bg-white/90"
                />

                <FieldError />
              </TextField>
            </div>
            {/* Description */}
            <div className="md:col-span-2">
              <TextField name="description" isRequired>
                <Label className="text-white mb-2 block">Description</Label>

                <TextArea
                  placeholder="Describe the travel experience..."
                  className="rounded-3xl bg-white/90"
                />

                <FieldError />
              </TextField>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <TextField name="image" isRequired>
                <Label className="text-white mb-2 block">Image URL</Label>

                <Input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="rounded-2xl bg-white/90"
                />

                <FieldError />
              </TextField>
            </div>

            <div className="flex justify-between gap-5 items-center w-full">
              <TextField name="floor" isRequired>
                <Label className="text-white mb-2 block">Floor</Label>

                <Input
                  placeholder="7 Days / 6 Nights"
                  className="rounded-2xl bg-white/90"
                />

                <FieldError />
              </TextField>
              <TextField name="capacity" isRequired>
                <Label className="text-white mb-2 block">Capacity</Label>

                <Input
                  placeholder="0"
                  className="rounded-2xl bg-white/90"
                  type="number"
                />

                <FieldError />
              </TextField>
              <TextField name="hourlyRote" isRequired>
                <Label className="text-white mb-2 block">Hourly Rate($)</Label>

                <Input
                  placeholder="0"
                  className="rounded-2xl bg-white/90"
                  type="number"
                />

                <FieldError />
              </TextField>
            </div>
          </div>

          {/* Button */}
          <Button
            type="submit"
            className="w-full h-14 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-white text-lg font-semibold transition-all duration-300"
          >
            Add Room
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddDestination;
