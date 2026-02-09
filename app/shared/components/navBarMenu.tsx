"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const NavBarMenu = () => {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (loading) return <div className="animate">loading...</div>;

  const handleLogout = () => {
    logout();
    toast.success("Logout successfully");
  };

  return (
    <div className="hidden md:flex items-center gap-4 relative">
      {!isAuthenticated ? (
        <>
          <Link
            href="/auth/sign-in"
            className="font-medium bg-primary text-white rounded-lg p-2 px-5 "
          >
            Login
          </Link>
          <Link
            href="/order-tracking"
            className="font-medium bg-primary text-white rounded-lg p-2 px-5"
          >
            Order Tracking
          </Link>
        </>
      ) : (
        <div className="relative">
          {/* Profile circle */}
          <div
            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-foreground font-bold cursor-pointer"
            onMouseEnter={() => setDropdownOpen(true)}
            // onMouseLeave={() => setDropdownOpen(false)}
          >
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-4 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden py-2"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href="/profile"
                className="group relative block px-4 py-2.5 text-gray-700 hover:text-primary transition-colors duration-200 text-center"
              >
                Profile
                <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-20 transition-all duration-300"></span>
              </Link>

              <Link
                href="/order-tracking"
                className="group relative block px-4 py-2.5 text-gray-700 hover:text-primary transition-colors duration-200 text-center"
              >
                Order Tracking
                <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-20 transition-all duration-300"></span>
              </Link>

              <h5 className="group relative block px-4 py-2.5 text-gray-700 hover:text-primary transition-colors duration-200 cursor-pointer text-center">
                Return Policy
                <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-20 transition-all duration-300"></span>
              </h5>

              <button
                onClick={handleLogout}
                className="group relative w-full px-4 py-2.5 text-gray-700 hover:text-primary transition-colors duration-200 border-t border-gray-100 mt-1 text-center mx-auto"
              >
                Logout
                <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-20 transition-all duration-300"></span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
