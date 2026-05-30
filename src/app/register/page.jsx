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
import { toast } from "react-toastify";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await signUp.email({
      ...userData,
    });

    if (error) {
     toast.error(error?.message||"someThink is wrong");
      return;
    }

    if (data) {
      toast("Signup successful");
      router.push("/");
    }
  };

  const GoogleSignUp = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
    });

    if (data) {
      toast("Signup successful");
      router.push("/");
    }

    if (error) {
      toast.error(error?.message||"someThink is wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-950 dark:to-slate-900 px-4 py-10">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="text-center pt-8 pb-2">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Create a StudyNook Account
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Join and start booking study rooms
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">

          {/* Name */}
          <TextField isRequired name="name">
            <Label className="text-sm font-medium">Full Name</Label>
            <Input
              placeholder="Enter your name"
              className="rounded-lg"
            />
            <FieldError />
          </TextField>

          {/* Image */}
          <TextField isRequired name="image">
            <Label className="text-sm font-medium">Profile Image</Label>
            <Input
              placeholder="https://example.com/image.jpg"
              className="rounded-lg"
            />
            <FieldError />
          </TextField>

          {/* Email */}
          <TextField isRequired name="email" type="email">
            <Label className="text-sm font-medium">Email Address</Label>
            <Input
              placeholder="john@example.com"
              className="rounded-lg"
            />
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField isRequired minLength={8} name="password" type="password">
            <Label className="text-sm font-medium">Password</Label>
            <Input
              placeholder="Enter secure password"
              className="rounded-lg"
            />
            <Description className="text-xs">
              8+ characters with uppercase & number
            </Description>
            <FieldError />
          </TextField>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3 font-medium transition"
            >
              Create Account
            </Button>

            <Button
              type="reset"
              variant="bordered"
              className="w-full rounded-lg py-3"
            >
              Reset
            </Button>
          </div>
        </Form>

        {/* Divider */}
        <div className="flex items-center gap-3 px-6 my-4">
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />
          <span className="text-xs text-slate-500">OR</span>
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />
        </div>

        {/* Google */}
        <div className="px-6 pb-8">
          <Button
            onClick={GoogleSignUp}
            variant="bordered"
            className="w-full flex items-center justify-center gap-2 rounded-lg py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>
        </div>


<p className="text-center text-sm text-gray-600 mt-6">
  Already have an account?{' '}
  <Link
    href="/login"
    className="text-orange-500 font-semibold hover:text-orange-600 transition underline underline-offset-4"
  >
    Login
  </Link>
</p>      </Card>
    </div>
  );
};

export default RegisterPage;