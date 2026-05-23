"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { useRouter } from "next/navigation";
import { authClient, signUp } from "@/lib/auth-client";
import { signUpEmail } from "better-auth/api";

const RegisterPage = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    

    console.log(userData);

    const { data, error } = await signUp.email({
        ...userData
    });

    if (error) {
      alert('error');
      return;
    }

    if (data) {
      alert("Signup successful");
      router.push("/");
    }
  };

  // Google Sign Up
  const GoogleSignUp = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
    });

    if (error) {
      alert(error.message);
      return;
    }

    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="border mx-auto w-full max-w-md px-4 sm:px-6 py-8">
        <h1 className="text-center text-2xl font-bold">Sign Up</h1>

        <Form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-4 mt-4"
        >
          {/* Name */}
          <TextField isRequired name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>

          {/* Image URL */}
          <TextField isRequired name="image" type="text">
            <Label>Image URL</Label>
            <Input placeholder="Enter image URL" />
            <FieldError />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>

            <Input placeholder="Enter your password" />

            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>

            <FieldError />
          </TextField>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button type="submit" color="primary" className="w-full">
              Submit
            </Button>

            <Button type="reset" variant="bordered" className="w-full">
              Reset
            </Button>
          </div>
        </Form>

        <p className="text-center my-4 text-sm text-gray-500">or</p>

        {/* Google Button */}
        <Button
          onClick={GoogleSignUp}
          variant="bordered"
          className="w-full flex items-center justify-center gap-2"
        >
          <FcGoogle />
          Sign up with Google
        </Button>
      </Card>
    </div>
  );
};

export default RegisterPage;