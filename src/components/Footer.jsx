import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏛️</span>
              <div>
                <h3 className="font-bold text-lg">GovJobs</h3>
                <p className="text-gray-400 text-sm">Official Government Portal</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted source for government job opportunities across India. 
              Find the latest notifications, exam updates, and career guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><NavLink to="/" className="text-gray-400 hover:text-white transition-colors">Home</NavLink></li>
              <li><NavLink to="/news" className="text-gray-400 hover:text-white transition-colors">Latest News</NavLink></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Job Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Job Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Central Government</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">State Government</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Banking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Railway</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Defence</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span className="text-gray-400">info@govjobs.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span className="text-gray-400">+91 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span className="text-gray-400">New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        {/* <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 GovJobs. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">Facebook</span>
              📘
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              🐦
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">LinkedIn</span>
              💼
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">YouTube</span>
              📺
            </a>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;