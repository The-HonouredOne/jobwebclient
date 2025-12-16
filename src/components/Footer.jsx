import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* BRAND / ABOUT */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🏛️</span>
              <div>
                <h3 className="text-xl font-bold text-white">GovJobs</h3>
                <p className="text-sm text-gray-400">
                  Government Job Updates Portal
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-400">
              GovJobs provides the latest government job notifications,
              exam updates, results, and admit card information across India.
              We aim to deliver accurate and timely updates to aspirants.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink
                  to="/"
                  className="hover:text-white transition-colors"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/jobs"
                  className="hover:text-white transition-colors"
                >
                  Government Jobs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/news"
                  className="hover:text-white transition-colors"
                >
                  Latest News
                </NavLink>
              </li>
              <li>
                {/* <NavLink
                  to="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </NavLink> */}
              </li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">
              Contact Information
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>info@govjobs.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>

          {/* SOCIAL LINKS */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">
              Stay Connected
            </h4>

            <div className="space-y-3">
              <a
                href="https://chat.whatsapp.com/YOUR_GROUP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                <FaWhatsapp />
                Join WhatsApp
              </a>

              <a
                href="https://t.me/YOUR_CHANNEL"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                <FaTelegramPlane />
                Join Telegram
              </a>

              <a
                href="https://www.youtube.com/@YOURCHANNEL"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                <FaYoutube />
                YouTube Channel
              </a>
            </div>
          </div>
        </div>

        {/* DISCLAIMER */}
        {/* <div className="mt-10 border-t border-gray-800 pt-6 text-sm text-gray-400">
          <p className="leading-relaxed">
            <strong>Disclaimer:</strong> GovJobs is not affiliated with any
            government organization. All job information provided on this
            website is collected from official government sources and news
            papers. Candidates are advised to verify details from the official
            notification before applying.
          </p>
        </div> */}

        {/* BOTTOM BAR */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} GovJobs. All rights reserved.
          </p>

          {/* <div className="flex items-center gap-4 text-gray-400">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaYoutube />
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
