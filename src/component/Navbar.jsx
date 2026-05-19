"use client";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import { FaBookOpen } from "react-icons/fa";

const Navbar = () => {
  const { data } = authClient.useSession();
  const user = data?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="navbar bg-[#111815] text-white shadow-sm">
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto py-1">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="text-white text-2xl flex justify-center items-center gap-3">
            <FaBookOpen className="text-green-700" /> StudyNook
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="hidden md:flex items-center gap-6 text-[16px]">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/Rooms">Rooms</Link>
            </li>
            <li>
              <Link href="/addRoom">Add Room</Link>
            </li>
            <li>
              <Link href="/listings">My Listings</Link>
            </li>
            <li>
              <Link href="/bookings">My Bookings</Link>
            </li>
          </ul>
        </div>
        {!user ? (
          <>
            <div className="navbar-end gap-5">
              <Link href="/login">Login</Link>
              <Link href="/resister">Register</Link>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar size="sm">
              <Avatar.Image referrerPolicy="no-referrer" src={user?.image} />
              <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
            </Avatar>

            <Button
              onClick={handleSignOut}
              size="sm"
              className="bg-orange-400 text-white"
            >
              SignOut
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
