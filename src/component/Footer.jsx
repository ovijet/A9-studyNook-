import React from "react";
import Link from "next/link";
import { FaBookOpen } from "react-icons/fa";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa6";
import { Mail, Send, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* TOP NEWSLETTER BANNER */}
        <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-amber-500 rounded-3xl p-8 md:p-12 mb-16 shadow-xl shadow-orange-500/10 text-white flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
              Stay in the Loop with StudyNook
            </h3>
            <p className="text-orange-100 text-sm md:text-base leading-relaxed">
              Get updates on newly listed quiet study rooms, student discounts, and exam season productivity tips.
            </p>
          </div>

          <div className="w-full lg:w-auto flex items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-1.5 focus-within:bg-white/30 transition">
            <Mail className="w-5 h-5 text-white/80 ml-3 shrink-0" />
            <input
              type="email"
              placeholder="Enter your student email..."
              className="bg-transparent border-none text-white placeholder-white/70 px-3 py-2 text-sm focus:outline-none w-full lg:w-64"
            />
            <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition shrink-0 shadow-md">
              <span>Subscribe</span>
              <Send size={14} />
            </button>
          </div>
        </div>

        {/* 4-COLUMN CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

          {/* COLUMN 1: BRAND STORY */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-md">
                <FaBookOpen className="text-white text-lg" />
              </div>
              <span className="text-2xl font-black text-white">
                Study<span className="text-orange-500">Nook</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed">
              Quiet private study rooms booked on demand by the hour. Tailor-made for students, researchers, and lifelong learners.
            </p>

            <div className="flex gap-3 pt-2">
              {[
                { icon: FaFacebookF, href: "#", color: "hover:bg-blue-600 hover:border-blue-600" },
                { icon: FaTwitter, href: "#", color: "hover:bg-sky-500 hover:border-sky-500" },
                { icon: FaInstagram, href: "#", color: "hover:bg-pink-600 hover:border-pink-600" },
                { icon: FaLinkedinIn, href: "#", color: "hover:bg-blue-700 hover:border-blue-700" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className={`w-9 h-9 rounded-xl border border-slate-800 bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white transition-all ${social.color}`}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide uppercase text-xs text-orange-500">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-orange-400 transition">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/Rooms" className="hover:text-orange-400 transition">
                  Explore All Rooms
                </Link>
              </li>
              <li>
                <Link href="/addRoom" className="hover:text-orange-400 transition">
                  List Your Study Room
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="hover:text-orange-400 transition">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-orange-400 transition">
                  My Listed Spaces
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: LEGAL & SUPPORT */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide uppercase text-xs text-orange-500">
              Trust & Safety
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Host Guarantee & Rules
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Cancellation Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  24/7 Student Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: CONTACT INFO */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide uppercase text-xs text-orange-500">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-orange-500 shrink-0" />
                <span>support@studynook.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-orange-500 shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-orange-500 shrink-0" />
                <span>University District, Dhaka</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} StudyNook Inc. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <span className="text-red-500">❤️</span>
            <span>for productive students everywhere</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;