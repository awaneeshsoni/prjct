import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center">
        <div className="flex justify-center flex-wrap gap-6 text-sm mb-3">
          <Link to="/" className="hover:text-orange-500 transition">
            Home
          </Link>
          <Link to="/blog" className="hover:text-orange-500 transition">
            Blog
          </Link>
          <Link to="/about" className="hover:text-orange-500 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-orange-500 transition">
            Contact
          </Link>
        </div>
        <p className="text-xs text-gray-400">
          © {year} <span className="text-gray-700 font-medium">Prjct.in</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
