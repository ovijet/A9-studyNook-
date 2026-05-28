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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="flex items-center justify-between h-20">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            <button
              className="lg:hidden text-gray-700"
              onClick={() => setOpen(!open)}
            >
              <HiMenuAlt3 size={24} />
            </button>

            <Link href="/" className="flex items-center gap-3">

              <motion.div
                whileHover={{ rotate: -10 }}
                className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-md"
              >
                <FaBookOpen className="text-white" />
              </motion.div>

              <h1 className="text-xl font-bold text-gray-900">
                StudyNook
              </h1>
            </Link>
          </div>

          {/* CENTER LINKS */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  pathname === link.path
                    ? "bg-orange-500 text-white shadow"
                    : "text-gray-600 hover:bg-gray-100"
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
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition">
                    Login
                  </button>
                </Link>

                <Link href="/register">
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
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
                  <Avatar.Fallback>
                    {user?.name?.charAt(0)}
                  </Avatar.Fallback>
                </Avatar>

                <div className="hidden md:block text-right">
                  <p className="text-gray-900 text-sm font-medium">
                    {user?.name}
                  </p>
                  <p className="text-gray-500 text-xs">Welcome</p>
                </div>

                <Button
                  onClick={handleSignOut}
                  size="sm"
                  className="bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>

        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="lg:hidden mt-3 bg-white border border-gray-200 rounded-2xl p-4 space-y-2 shadow-md">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                {link.name}
              </Link>
            ))}

            {!user && (
              <div className="pt-3 space-y-2">
                <Link href="/login">
                  <div className="text-center py-2 border border-gray-300 rounded-lg text-gray-700">
                    Login
                  </div>
                </Link>

                <Link href="/register">
                  <div className="text-center py-2 bg-orange-500 text-white rounded-lg">
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