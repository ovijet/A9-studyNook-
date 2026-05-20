import {
  Button,
  FieldError,
  Input,
  Label,
  Modal,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import React from "react";
import { FaEnvelope } from "react-icons/fa";

const BookNewModal = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const fromData = new FormData(e.currentTarget);
    const bookingData = Object.fromEntries(fromData.entries());

    const res = await fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();

    console.log(data);
    // const user = Object.fromEntries(fromData.entries());
    // console.log(user);
    // const res = await fetch("http://localhost:5000/study", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(user),
    // });
    // const data = await res.json();

    // console.log(data);
  };
  return (
    <div>
      <Modal>
        <Button
          // onClick={handleBook}

          className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-all duration-300"
        >
          Book Now
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <FaEnvelope className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Contact Us</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Fill out the form below and well get back to you. The modal
                  adapts automatically when the keyboard appears on mobile.
                </p>
              </Modal.Header>
              <Modal.Body className="p-6">
                <Surface variant="default">
                  <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    <TextField
                      className="w-full"
                      name="name"
                      type="text"
                      variant="secondary"
                    >
                      <Label>Name</Label>
                      <Input placeholder="Enter your name" />
                    </TextField>
                    <TextField
                      className="w-full"
                      name="email"
                      type="email"
                      variant="secondary"
                    >
                      <Label>Email</Label>
                      <Input placeholder="Enter your email" />
                    </TextField>
                    <TextField
                      className="w-full"
                      name="phone"
                      type="tel"
                      variant="secondary"
                    >
                      <Label>Phone</Label>
                      <Input placeholder="Enter your phone number" />
                    </TextField>

                    <Modal.Footer>
                      <Button slot="close" variant="secondary">
                        Cancel
                      </Button>
                      <Button type="submit">Send Message</Button>
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

export default BookNewModal;
