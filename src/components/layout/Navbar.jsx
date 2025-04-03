import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, Settings } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo area */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">GoTrip</span>
            </Link>
          </div>

          {/* Navigation links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive("/")
                  ? "border-blue-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Home
            </Link>
            
            <Link
              to="/bookings"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                location.pathname.startsWith("/bookings")
                  ? "border-blue-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              My Bookings
            </Link>
          </div>

          {/* Right side features */}
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
              <Search className="h-6 w-6" />
            </button>
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
