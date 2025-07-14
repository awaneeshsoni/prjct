import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isAuthPage = location.pathname.includes("/login") || location.pathname.includes("/signup");

  // You can wire this later with recoil/global auth state if needed
  const isLogged = false;

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          Prjct.in
        </Link>

        {!isLogged && (
          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-orange-500 transition"
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className="text-gray-700 hover:text-orange-500 transition"
            >
              Pricing
            </Link>

            {!isAuthPage && (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1 border border-orange-500 rounded-lg text-orange-500 hover:bg-orange-50 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
