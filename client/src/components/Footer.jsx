import React from "react";
import { Link } from "react-router-dom";

export default function Footer(){
    const yr = new Date().getFullYear();
    return(
        <div className="container bg-gray-100 py-6 mt-20 w-screen text-center text-gray-600">
            <div className="container mx-auto">
                <div className="mt-2 space-x-4 text-sm">
                    <Link to={'/'} className="hover:text-orange-500">Home</Link>
                    <Link to={'/'} className="hover:text-orange-500">Blog</Link>
                    <Link to={'/'} className="hover:text-orange-500">About</Link>
                    <Link to={'/'} className="hover:text-orange-500">Contact</Link>
                </div>
                <p className="text-sm">© {yr} OnePage. All Rights Reserved.</p>
            </div>
        </div>
    )
}