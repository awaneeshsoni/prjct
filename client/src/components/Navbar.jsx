import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const { auth, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isAuthPage = location.pathname.includes("/login") || location.pathname.includes("/signup");
  const isLogged = !!auth;

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <header className="bg-white shadow-md z-50 relative">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          Prjct.in
        </Link>

        {!isLogged ? (
          <nav className="flex items-center space-x-4">
            <Link to="/pricing" className="text-gray-700 hover:text-orange-500 transition">
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
              </>
            )}
          </nav>
        ) : (
          <div className="flex items-center space-x-4 relative">
            <Link to="/dashboard" className="text-gray-700 hover:text-orange-500 transition text-sm font-medium">
              Dashboard
            </Link>

            <button onClick={toggleDropdown} className="w-8 h-8 rounded-full overflow-hidden focus:outline-none">
              <img
                src={auth.avatar || `https://api.dicebear.com/7.x/thumbs/svg?seed=${auth.username || "user"}`}
                alt="Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute top-12 right-0 bg-white shadow-md rounded-md border border-gray-200 w-40 z-50">
                <Link
                  to={`/profile/${auth._id}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
