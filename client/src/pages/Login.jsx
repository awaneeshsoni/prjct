import React from "react";
import { useState } from "react";
import authService  from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        try{
            await authService.login({
            email: email,
            password: password
        })
        setLoading(false)
        navigate('/dashboard')
    }
    catch(error){
        console.log(error)
    }
    }

    return(
        <div className=" flex flex-col items-center justify-center">
            <Navbar />
            <div className="bg-gray-300 px-4 py-4 rounded-md shadow-md max-w-md" >
                <div className="text-center">
                    <h3 className="text-2xl font-bold">Login</h3>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-3" >
                    <div className="flex flex-col space-y-1">
                    <label>Email</label>
                    <input id="email" 
                    required type="email" 
                    placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}
                    className="relative block w-full px-3 py-2 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm" />
                    </div>
                    <div className="flex flex-col">
                    <label>Password</label>
                    <input id="password" placeholder="password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="relative bg-gray-100 block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm" />
                    </div>
                    <button className="px-2 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-200" type="submit" disabled={loading} >Login</button>
                </form>
                <div className="flex flex-row space-x-2 mt-2" >
                    <p>New here?</p>
                    <Link className="text-orange-500 hover:text-orange-600 transition duration-200" to={'/signup'}>Sign Up</Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}