"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import { FaBookOpen } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { data } = authClient.useSession();
  const user = data?.user;
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const baseLinks = [
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/Rooms" },
  ];

  const userLinks = [
    { name: "Add Room", path: "/addRoom" },
    { name: "My Listings", path: "/listings" },
    { name: "My Bookings", path: "/bookings" },
  ];

  const navLinks = user ? [...baseLinks, ...userLinks] : baseLinks;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b1110]/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between min-h-[80px]">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            {/* MOBILE MENU */}
            <button
              className="lg:hidden text-white"
              onClick={() => setOpen(!open)}
            >
              <HiMenuAlt3 size={24} />
            </button>

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: -10 }}
                className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"
              >
                <FaBookOpen className="text-white" />
              </motion.div>

              <h1 className="text-white font-bold text-xl">
                StudyNook
              </h1>
            </Link>
          </div>

          {/* CENTER (DESKTOP) */}
          <div className="hidden lg:flex gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  pathname === link.path
                    ? "bg-primary text-white"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            {!user ? (
              <div className="hidden sm:flex gap-2">
                <Link href="/login">
                  <button className="px-4 py-2 text-white border rounded-full">
                    Login
                  </button>
                </Link>

                <Link href="/register">
                  <button className="px-4 py-2 bg-primary text-white rounded-full">
                    Register
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">

                 <Avatar size="sm">
                  <Avatar.Image
                    src={user?.image}
                    referrerPolicy="no-referrer"
                  />
                  <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                </Avatar>

                <div className="hidden md:block text-right">
                  <p className="text-white text-sm font-medium">
                    {user?.name}
                  </p>
                  <p className="text-gray-400 text-xs">Welcome</p>
                </div>

                <Button
                  onClick={handleSignOut}
                  size="sm"
                  className="bg-red-500 text-white rounded-full"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        {open && (
          <div className="lg:hidden mt-3 bg-[#121a18] rounded-2xl p-4 space-y-2 border border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setOpen(false)}
                className="block text-gray-200 px-3 py-2 rounded-lg hover:bg-white/10"
              >
                {link.name}
              </Link>
            ))}

            {!user && (
              <div className="pt-3 space-y-2">
                <Link href="/login">
                  <div className="text-center py-2 bg-white text-black rounded-lg">
                    Login
                  </div>
                </Link>

                <Link href="/register">
                  <div className="text-center py-2 border border-white/20 text-white rounded-lg">
                    Register
                  </div>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;