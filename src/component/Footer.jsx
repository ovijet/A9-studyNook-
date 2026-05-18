import Image from "next/image";
import React from "react";
import { FaBookOpen } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#18211E] text-white mt-3">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {/* Logo + About */}
        <aside className="space-y-4">
          <div className="flex gap-3 items-center">
            <h3 className="font-bold text-2xl flex justify-center item-center gap-4">
              <FaBookOpen className="text-green-700" /> StudyNook
            </h3>
          </div>

          <p className="text-sm text-gray-400 leading-6">
            Quiet study rooms, booked by the hour. Built for students, scholars, and lifelong learners.
          </p>
        </aside>

        {/* Contact */}
        <nav className="space-y-3">
          <h6 className="font-semibold text-lg text-white">Contact Info</h6>

          <p className="text-sm text-gray-400 hover:text-orange-500 transition cursor-pointer">
            Email: info@suncart.com
          </p>

          <p className="text-sm text-gray-400 hover:text-orange-500 transition cursor-pointer">
            Phone: +880 1234-567890
          </p>

          <p className="text-sm text-gray-400">Address: Dhaka, Bangladesh</p>
        </nav>

        {/* Links */}
        <nav className="space-y-3">
          <h6 className="font-semibold text-lg text-white">Quick Links</h6>

          <p className="text-sm text-gray-400 hover:text-orange-500 transition cursor-pointer">
            Terms of Service
          </p>

          <p className="text-sm text-gray-400 hover:text-orange-500 transition cursor-pointer">
            Privacy Policy
          </p>

          <p className="text-sm text-gray-400 hover:text-orange-500 transition cursor-pointer">
            Cookie Policy
          </p>

          <p className="text-sm text-gray-400 hover:text-orange-500 transition cursor-pointer">
            Press Kit
          </p>
        </nav>

        {/* Social */}
        <nav className="space-y-3">
          <h6 className="font-semibold text-lg text-white">Social Links</h6>

          <div className="flex gap-4 text-2xl">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition"
            >
              <FaFacebook />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-500 transition"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </nav>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 max-w-7xl mx-auto  py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} SunCart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
