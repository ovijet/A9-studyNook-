"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { authClient, signUp } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";
import { Sparkles, User, Image as ImageIcon, Mail, Lock, ArrowRight } from "lucide-react";

const RegisterPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await signUp.email({
      ...userData,
    });

    if (error) {
      toast.error(error?.message || "Registration failed");
      setIsSubmitting(false);
      return;
    }

    if (data) {
      toast.success("Account created successfully!");
      router.push("/");
    }

    setIsSubmitting(false);
  };

  const GoogleSignUp = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
    });

    if (data) {
      toast.success("Account created with Google!");
      router.push("/");
    }

    if (error) {
      toast.error(error?.message || "Google registration failed");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50/50 px-4 py-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-200/40 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xl shadow-slate-200/50 relative z-10 space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} className="text-orange-500" />
            <span>Join StudyNook</span>
          </div>

          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Create Your Account
          </h1>

          <p className="text-slate-500 text-xs sm:text-sm">
            Book quiet rooms, host spaces, and boost your study productivity.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME INPUT */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                required
                name="name"
                type="text"
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
              />
            </div>
          </div>

          {/* PROFILE IMAGE INPUT */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Profile Image URL
            </label>
            <div className="relative">
              <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                required
                name="image"
                type="url"
                placeholder="https://images.unsplash.com/photo-1534528741775"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
              />
            </div>
          </div>

          {/* EMAIL INPUT */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                required
                name="email"
                type="email"
                placeholder="john@example.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
              />
            </div>
          </div>

          {/* PASSWORD INPUT */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                required
                minLength={8}
                name="password"
                type="password"
                placeholder="At least 8 characters..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm rounded-2xl shadow-md shadow-orange-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>{isSubmitting ? "Creating Account..." : "Create Free Account"}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-px bg-slate-200 flex-1" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">OR</span>
          <div className="h-px bg-slate-200 flex-1" />
        </div>

        {/* GOOGLE SIGN UP */}
        <button
          onClick={GoogleSignUp}
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200/90 rounded-2xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 transition shadow-2xs"
        >
          <FcGoogle size={20} />
          <span>Continue with Google</span>
        </button>

        {/* FOOTER SWITCH */}
        <p className="text-center text-xs text-slate-500 pt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-orange-600 font-bold hover:text-orange-700 underline underline-offset-4"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;