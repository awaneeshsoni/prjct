import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, Links } from "react-router-dom";

export default function Home(){
    return(
        <div className="flex flex-col justify-center items-center">
            <Navbar/>
            <p>Home page still still development!</p>
            <p>Visit</p> <Link className="text-blue-300 p-2 bg-blue-700" to={'/login'}>Login</Link>
            <Footer />
        </div>
    )
}