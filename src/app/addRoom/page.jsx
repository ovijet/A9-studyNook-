"use client";
import { authClient } from "@/lib/auth-client";
import { Input, TextArea, TextField, Button, Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const amenities = [
    { key: "whiteboard", label: "Whiteboard", icon: "📝" },
    { key: "projector", label: "Projector", icon: "📽️" },
    { key: "wifi", label: "Wi-Fi", icon: "📶" },
    { key: "power", label: "Power Outlets", icon: "🔌" },
    { key: "quiet", label: "Quiet Zone", icon: "🤫" },
    { key: "ac", label: "Air Conditioning", icon: "❄️" },
];

const AddRoomPage = () => {
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const router=useRouter()

    const handleCheckboxChange = (amenityLabel) => {
        if (selectedAmenities.includes(amenityLabel)) {
            setSelectedAmenities(selectedAmenities.filter(a => a !== amenityLabel));
        } else {
            setSelectedAmenities([...selectedAmenities, amenityLabel]);
        }
    };


const onSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const room = Object.fromEntries(formData.entries());

  room.amenities = selectedAmenities;
  room.capacity = Number(room.capacity);
  room.hourlyRate = Number(room.hourlyRate);
  room.floor = room.floor ? Number(room.floor) : null;

  try {
    const session = await authClient.getSession();

    const email = session?.data?.user?.email;

    if (!email) {
      toast.error("User not logged in");
      return;
    }

    // 🔥 IMPORTANT
    room.ownerEmail = email;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/study`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(room),
      }
    );

    const data = await res.json();

    if (res.ok) {
      toast.success("Room added successfully");
      router.push("/listings");
    } else {
      toast.error(data?.message || "Failed to add room");
    }
  } catch (error) {
    console.log(error);
    // toast.error("Something went wrong");
  }
};

    return (
        <div className="mx-auto px-4 py-6 md:p-8 max-w-7xl">
            <h1 className="font-bold text-2xl md:text-3xl mb-6 text-slate-800 dark:text-slate-100 text-center">
                Add New Room
            </h1>

            <Card className="max-w-3xl w-full mx-auto">
                <div className="p-5 md:p-8 w-full">
                    <form onSubmit={onSubmit} className="space-y-6 md:space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">


                            <div className="md:col-span-2">
                                <TextField isRequired>
                                    <Label>Room Name</Label>
                                    <Input name="roomName" placeholder="e.g., Quantum Coding Cell" radius="lg" />
                                </TextField>
                            </div>

                            {/* Amenities - Styled Checkbox Group */}
                            <div className="md:col-span-2">
                                <Label className="block text-sm font-medium mb-3">
                                    Amenities <span className="text-gray-400">(Select multiple)</span>
                                </Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {amenities.map((amenity) => (
                                        <label
                                            key={amenity.key}
                                            className={`
                                                flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all
                                                ${selectedAmenities.includes(amenity.label)
                                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                                                }
                                            `}
                                        >
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                                                checked={selectedAmenities.includes(amenity.label)}
                                                onChange={() => handleCheckboxChange(amenity.label)}
                                            />
                                            <span className="text-lg">{amenity.icon}</span>
                                            <span className="text-sm">{amenity.label}</span>
                                        </label>
                                    ))}
                                </div>

                                {selectedAmenities.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {selectedAmenities.map((amenity) => (
                                            <span
                                                key={amenity}
                                                className="inline-flex items-center gap-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full"
                                            >
                                                {amenities.find(a => a.label === amenity)?.icon} {amenity}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>


                            <div>
                                <TextField>
                                    <Label>Capacity</Label>
                                    <Input
                                        name="capacity"
                                        type="number"
                                        placeholder="4"
                                        radius="lg"
                                        min="1"
                                    />
                                </TextField>
                            </div>


                            <div>
                                <TextField isRequired>
                                    <Label>Hourly Rate (USD)</Label>
                                    <Input
                                        name="hourlyRate"
                                        type="number"
                                        placeholder="5"
                                        radius="lg"
                                        min="0"
                                        step="0.5"
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">$</span>
                                            </div>
                                        }
                                    />
                                </TextField>
                            </div>

                            <div>
                                <TextField>
                                    <Label>Floor</Label>
                                    <Input
                                        name="floor"
                                        type="number"
                                        placeholder="3"
                                        radius="lg"
                                        min="0"
                                    />
                                </TextField>
                            </div>


                            <div className="md:col-span-2">
                                <TextField isRequired>
                                    <Label>Image URL</Label>
                                    <Input
                                        name="image"
                                        type="url"
                                        placeholder="https://example.com/room.jpg"
                                        radius="lg"
                                    />
                                </TextField>
                            </div>


                            <div className="md:col-span-2">
                                <TextField isRequired>
                                    <Label>Description</Label>
                                    <TextArea
                                        name="description"
                                        placeholder="Describe the room experience, facilities, and any special features..."
                                        minRows={3}
                                    />
                                </TextField>
                            </div>

                        </div>

                        <Button
                         
                            type="submit"
                            className="w-full bg-purple-800 text-white rounded-md py-3 text-base font-medium hover:bg-purple-700 transition-colors"
                        >
                            Add Room
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
};

const Label = ({ children, className }) => (
    <label className={`block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 ${className || ''}`}>
        {children}
    </label>
);

export default AddRoomPage;