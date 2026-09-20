"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import { FaBookOpen } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { LogOut, PlusCircle, Bookmark, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    { name: "Explore Rooms", path: "/Rooms" },
  ];

  const userLinks = [
    { name: "Add Room", path: "/addRoom", icon: PlusCircle },
    { name: "My Listings", path: "/listings", icon: LayoutGrid },
    { name: "My Bookings", path: "/bookings", icon: Bookmark },
  ];

  const navLinks = user ? [...baseLinks, ...userLinks] : baseLinks;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">

          {/* LEFT - BRAND LOGO */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-slate-700 hover:text-orange-500 p-2 rounded-xl transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation menu"
            >
              {open ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
            </button>

            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -6 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/25"
              >
                <FaBookOpen className="text-white text-xl" />
              </motion.div>

              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-orange-500 transition-colors">
                  Study<span className="text-orange-500">Nook</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 -mt-1">
                  Focus & Learn
                </span>
              </div>
            </Link>
          </div>

          {/* CENTER - NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className="relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors z-10"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-orange-500 rounded-full shadow-md shadow-orange-500/30"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-white" : "text-slate-600 hover:text-slate-900"}`}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* RIGHT - USER ACTIONS */}
          <div className="flex items-center gap-3">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <button className="px-5 py-2.5 text-sm font-semibold text-slate-700 hover:text-orange-600 hover:bg-slate-100/80 rounded-full transition-all">
                    Sign In
                  </button>
                </Link>

                <Link href="/register">
                  <button className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Get Started
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4 pl-2 border-l border-slate-200">
                <div className="flex items-center gap-3 bg-slate-100/80 hover:bg-slate-100 py-1.5 px-3 rounded-full border border-slate-200/60 transition">
                  <Avatar size="sm" className="ring-2 ring-orange-500/30">
                    <Avatar.Image src={user?.image} referrerPolicy="no-referrer" />
                    <Avatar.Fallback className="bg-orange-500 text-white font-bold text-xs">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>

                  <div className="hidden sm:block text-left pr-1">
                    <p className="text-slate-900 text-xs font-bold leading-tight max-w-[120px] truncate">
                      {user?.name}
                    </p>
                    <p className="text-orange-600 text-[10px] font-semibold">Student Member</p>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  title="Logout"
                  className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full border border-slate-200 hover:border-red-200 transition-all"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-slate-200/80 pb-6 pt-4"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition ${
                        isActive
                          ? "bg-orange-500 text-white shadow-md"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-white" />}
                    </Link>
                  );
                })}

                {!user && (
                  <div className="pt-4 mt-2 border-t border-slate-200 grid grid-cols-2 gap-3">
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <div className="w-full text-center py-3 border border-slate-300 rounded-2xl text-slate-700 text-sm font-semibold hover:bg-slate-100">
                        Sign In
                      </div>
                    </Link>

                    <Link href="/register" onClick={() => setOpen(false)}>
                      <div className="w-full text-center py-3 bg-orange-500 text-white text-sm font-semibold rounded-2xl shadow-md">
                        Get Started
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;