"use client";

import { AlertDialog, Button } from "@heroui/react";
import { toast } from "react-toastify";

export function BookingDeleteModal({
  item,
  setBookings,
}) {

  const {
    _id,
    roomName,
  } = item || {};

  const handleDelete = async () => {
    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "cancelled",
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {

        toast.success("Booking cancelled");

        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === _id
              ? {
                  ...booking,
                  status: "cancelled",
                }
              : booking
          )
        );

      } else {
        toast.error("Cancel failed");
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog>

      <Button variant="danger">
        Cancel
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>

          <AlertDialog.Dialog className="sm:max-w-[400px]">

            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>

              <AlertDialog.Icon status="danger" />

              <AlertDialog.Heading>
                Cancel booking?
              </AlertDialog.Heading>

            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                Are you sure you want to cancel{" "}
                <strong>{roomName}</strong> ?
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>

              <Button
                slot="close"
                variant="tertiary"
              >
                Close
              </Button>

              <Button
                onClick={handleDelete}
                slot="close"
                variant="danger"
              >
                Confirm Cancel
              </Button>

            </AlertDialog.Footer>

          </AlertDialog.Dialog>

        </AlertDialog.Container>
      </AlertDialog.Backdrop>

    </AlertDialog>
  );
}