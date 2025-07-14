import React, { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authService.signup({ name, email, password });
      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Signup failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign up for Prjct.in</h2>

          {error && (
            <p className="bg-red-100 text-red-600 px-4 py-2 mb-4 rounded text-sm">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-orange-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
