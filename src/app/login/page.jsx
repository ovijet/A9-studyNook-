"use client";

import { authClient, signIn } from "@/lib/auth-client";
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
import { FaGoogle } from "react-icons/fa";

export default function SignUpPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formdata.entries());
    // const { email, password } = userData;
const { data, error } = await signIn.email({
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

  return (
    <Card className="border mx-auto w-full max-w-md px-4 sm:px-6 py-8 mt-6">
      <h1 className="text-center text-xl sm:text-2xl font-bold">Sign In</h1>

      <Form className="flex w-full flex-col gap-4 mt-4" onSubmit={onSubmit}>
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            successful;
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

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
        <div className="flex flex-col sm:flex-row gap-2">
          <Button type="submit" className="w-full">
            Submit
          </Button>
          <Button type="reset" variant="secondary" className="w-full">
            Reset
          </Button>
        </div>
      </Form>

      <p className="text-center my-3 text-sm">or</p>
      <Button className="w-full" onClick={() => router.push("/signup")}>
        Dont have an account? Sign Up
      </Button>

      <Button
        // onClick={handleGoogleSignIn}
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
      >
        <FaGoogle /> Sign in with Google
      </Button>
    </Card>
  );
}
