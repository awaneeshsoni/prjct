import React from "react";
import { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
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
        <div className="flex flex-col justify-center items-center">
            <Navbar />
            <div className="max-w-md px-4 py-4 rounded-md shadow-md bg-gray-300">
                <div className="text-center">
                    <h4 className="text-2xl font-bold">Sign Up</h4>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                    <div>
                        <label>Name
                        </label>
                        <input
                            id="name"
                            type="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="relative block w-full px-3 py-2 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                        />
                    </div>
                    <div>

                        <label>Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="relative block w-full px-3 py-2 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                        />
                    </div>
                    <div>

                        <label>Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="relative block w-full px-3 py-2 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                        />
                    </div>
                    <button type="submit" className="px-2 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-200" disabled={loading} >SignUp</button>
                </form>
                <div>
                    <p>Already have an account? <a className="text-orange-500 hover:text-orange-600 transition duration-200" href="/login">Login</a></p>
                </div>
            </div>
            <Footer />
        </div>
    )
}