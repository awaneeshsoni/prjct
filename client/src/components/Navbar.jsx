import React from "react";
import { Link } from "react-router-dom";
import {FaUserCircle} from 'react-icons/fa'

export default function Navbar(){
    const isLogged = false;

    const username = localStorage.getItem("username") || ""
    return(
        <div className="flex flex-row justify-between px-4 mb-10 container mx-auto py-4 bg-white shadow-md ">
            <Link to={'/'} className="text-orange-500 text-2xl font-bold"
            >OnePage</Link>
            {
                isLogged ? 
                <div className="flex flex-row justify-center items-center space-x-2">
                <FaUserCircle ></FaUserCircle>
            <p className="text-gray-700">Hi, {username}</p>
            </div> : ""
            }
        </div>
    )
}