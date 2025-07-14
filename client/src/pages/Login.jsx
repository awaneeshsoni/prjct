import React, { useContext, useState } from "react";
import authService from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await authService.login({ email, password });
            login({
                token: res.data.token,
                user: res.data.user,
            });
            navigate('/dashboard')
        } catch (error) {
            setError("Invalid email or password");
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-white text-black">
            <Navbar />
            <div className="flex-grow flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-2xl p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center">Welcome back</h2>
                    {error && (
                        <p className="bg-red-100 text-red-600 px-4 py-2 mb-4 rounded text-sm">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-1 font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-1 font-medium">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 text-white font-medium py-2 rounded-lg hover:bg-orange-600 transition"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm">
                        New here?{" "}
                        <Link
                            to="/signup"
                            className="text-orange-500 hover:underline transition"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
}
