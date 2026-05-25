"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import { FaBookOpen } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { motion } from "framer-motion";

const Navbar = () => {
  const { data } = authClient.useSession();
  const user = data?.user;
  const pathname = usePathname();

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/Rooms" },
    { name: "Add Room", path: "/addRoom" },
    { name: "My Listings", path: "/listings" },
    { name: "My Bookings", path: "/bookings" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b1110]/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="navbar px-0 min-h-[80px]">
          
          {/* LEFT */}
          <div className="navbar-start">
            
            {/* Mobile Menu */}
            <div className="dropdown lg:hidden">
              <label
                tabIndex={0}
                className="btn btn-ghost text-white hover:bg-white/10"
              >
                <HiMenuAlt3 size={24} />
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[100] p-3 shadow-2xl bg-[#121a18] rounded-2xl w-64 border border-white/10 space-y-1"
              >
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className={`rounded-xl text-sm ${
                        pathname === link.path
                          ? "bg-primary text-white"
                          : "text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

                {!user && (
                  <>
                    <li className="pt-2">
                      <Link
                        href="/login"
                        className="rounded-xl bg-white text-black font-medium justify-center"
                      >
                        Login
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/register"
                        className="rounded-xl border border-white/20 text-white justify-center"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <motion.div
                whileHover={{ rotate: -10, scale: 1.05 }}
                className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30"
              >
                <FaBookOpen className="text-white text-xl" />
              </motion.div>

              <div>
                <h1 className="text-white text-2xl font-extrabold tracking-wide">
                  StudyNook
                </h1>

                <p className="text-xs text-gray-400 -mt-1 hidden sm:block">
                  Smart Study Room Booking
                </p>
              </div>
            </Link>
          </div>

          {/* CENTER */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-2   border-white/10 rounded-full px-3 py-2">
              {navLinks.map((link) => {
                const active = pathname === link.path;

                return (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        active
                          ? "bg-primary text-white shadow-md"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="navbar-end">
            {!user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link href="/login">
                  <button className="px-5 py-2 rounded-full text-sm font-medium border border-white/20 text-white hover:bg-white/10 transition">
                    Login
                  </button>
                </Link>

                 <Link href="/resister"><button className="px-5 py-2 rounded-full text-sm font-semibold bg-primary text-white hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/30">
                    Register
                  </button></Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                
                {/* User Info */}
                <div className="hidden md:block text-right">
                  <h4 className="text-sm font-semibold text-white leading-none">
                    {user?.name}
                  </h4>

                  <p className="text-xs text-gray-400 mt-1">
                    Welcome Back
                  </p>
                </div>

                {/* Avatar */}
                <Avatar size="sm"> <Avatar.Image referrerPolicy="no-referrer" src={user?.image} /> <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback> </Avatar>

                {/* Signout */}
                <Button
                  onClick={handleSignOut}
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 rounded-full px-5 font-medium hover:scale-105 transition-all duration-300"
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;