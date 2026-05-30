"use client";

import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { error } from "better-auth/api";
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

const EditModal = ({ book }) => {

    const router=useRouter()
  const {
    _id,
    image,
    roomName,
    description,
    floor,
    capacity,
    hourlyRate,
    amenities: oldAmenities = [],
  } = book || {};

  const [selectedAmenities, setSelectedAmenities] =
    useState(oldAmenities);

  const handleCheckboxChange = (amenityLabel) => {
    if (selectedAmenities.includes(amenityLabel)) {
      setSelectedAmenities(
        selectedAmenities.filter((a) => a !== amenityLabel)
      );
    } else {
      setSelectedAmenities([
        ...selectedAmenities,
        amenityLabel,
      ]);
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

    console.log(room);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/study/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(room),
        }
      );

      const data = await res.json();

      console.log(data);

      if (res.ok) {
        toast.success("Room updated successfully");
        router.refresh()
      } else {
        toast.error(error?.message|| "Failed to update");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal>
     
          <Button variant="outline">Edit</Button>
        

        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-3xl">
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Heading>Edit Room</Modal.Heading>

                <p className="mt-1 text-sm text-muted">
                  Update your room information
                </p>
              </Modal.Header>

              <Modal.Body className="p-6">
                <Surface variant="default">
                  <form
                    onSubmit={onSubmit}
                    className="space-y-6 md:space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                      
                      {/* Room Name */}
                      <div className="md:col-span-2">
                        <TextField isRequired defaultValue={roomName}>
                          <Label>Room Name</Label>

                          <Input
                            defaultValue={roomName}
                            name="roomName"
                            placeholder="e.g., Quantum Coding Cell"
                            radius="lg"
                          />
                        </TextField>
                      </div>

                      {/* Amenities */}
                      <div className="md:col-span-2">
                        <Label className="block text-sm font-medium mb-3">
                          Amenities
                        </Label>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {amenities.map((amenity) => (
                            <label
                              key={amenity.key}
                              className={`
                                flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all
                                ${
                                  selectedAmenities.includes(
                                    amenity.label
                                  )
                                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                                    : "border-gray-200 dark:border-gray-700 hover:border-purple-300"
                                }
                              `}
                            >
                              <input
                                type="checkbox"
                                className="w-4 h-4"
                                checked={selectedAmenities.includes(
                                  amenity.label
                                )}
                                onChange={() =>
                                  handleCheckboxChange(
                                    amenity.label
                                  )
                                }
                              />

                              <span>{amenity.icon}</span>

                              <span className="text-sm">
                                {amenity.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Capacity */}
                      <div>
                        <TextField defaultValue={capacity}>
                          <Label>Capacity</Label>

                          <Input
                            defaultValue={capacity}
                            name="capacity"
                            type="number"
                            placeholder="4"
                            radius="lg"
                          />
                        </TextField>
                      </div>

                      {/* Hourly Rate */}
                      <div>
                        <TextField isRequired defaultValue={hourlyRate}>
                          <Label>Hourly Rate</Label>

                          <Input
                            defaultValue={hourlyRate}
                            name="hourlyRate"
                            type="number"
                            placeholder="5"
                            radius="lg"
                          />
                        </TextField>
                      </div>

                      {/* Floor */}
                      <div>
                        <TextField defaultValue={floor}>
                          <Label>Floor</Label>

                          <Input
                            defaultValue={floor}
                            name="floor"
                            type="number"
                            placeholder="3"
                            radius="lg"
                          />
                        </TextField>
                      </div>

                      {/* Image */}
                      <div className="md:col-span-2">
                        <TextField isRequired>
                          <Label>Image URL</Label>

                          <Input
                            defaultValue={image}
                            name="image"
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            radius="lg"
                          />
                        </TextField>
                      </div>

                      {/* Description */}
                      <div className="md:col-span-2">
                        <TextField isRequired defaultValue={description}>
                          <Label>Description</Label>

                          <TextArea
                            defaultValue={description}
                            name="description"
                            minRows={3}
                            placeholder="Describe the room..."
                          />
                        </TextField>
                      </div>
                    </div>

                    <Modal.Footer>
                      <Button slot="close" variant="secondary">
                        Cancel
                      </Button>

                      <Button type="submit" slot='close'>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default EditModal;