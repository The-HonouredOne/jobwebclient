import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { admin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate=useNavigate()

  const navLinkClass = ({ isActive }) => 
    `cursor-pointer transition-colors block py-2 ${
      isActive 
        ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
        : 'hover:text-blue-600'
    }`;

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2 cursor-pointer"
          onClick={()=>navigate("/")}>
            <span className="text-2xl">🏛️</span>
            <div>
              <h1 className="font-semibold text-lg">GovJobs</h1>
              <p className="text-xs text-gray-500">Official Government Portal</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 text-gray-600">
            <NavLink to='/' className={navLinkClass}>Home</NavLink>
            <NavLink to='/jobs' className={navLinkClass}>Jobs</NavLink>
            <NavLink to='/news' className={navLinkClass}>News</NavLink>
            {/* <li className="cursor-pointer hover:text-blue-600">Resources</li>
            <li className="cursor-pointer hover:text-blue-600">Contact</li> */}
            {admin && (
              <NavLink to='/admin/dashboard' className={navLinkClass}>
                🏛️ Dashboard
              </NavLink>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
              }`}></span>
              <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <ul className="py-4 space-y-2 text-gray-600">
              <li><NavLink to='/' className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Home</NavLink></li>
              <li><NavLink to='/jobs' className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Jobs</NavLink></li>
              <li><NavLink to='/news' className={navLinkClass} onClick={() => setIsMenuOpen(false)}>News</NavLink></li>
              {/* <li className="cursor-pointer hover:text-blue-600 py-2">Resources</li>
              <li className="cursor-pointer hover:text-blue-600 py-2">Contact</li> */}
              {admin && (
                <li><NavLink to='/admin/dashboard' className={navLinkClass} onClick={() => setIsMenuOpen(false)}>🏛️ Dashboard</NavLink></li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
