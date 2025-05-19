import React from "react";
import {Link } from "react-router-dom";

export default function Page({title, slug, id}){
    return(
        <div className="flex flex-row justify-between w-60 mt-4 bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <div className="flex justify-between space-x-2">
            <Link className="inline-block bg-gray-800 text-white py-2 px-4 rounded-full h-10 hover:bg-gray-700 transition duration-200 text-sm font-semibold " 
            to={`/pages/${id}`}>Edit</Link>
            <Link target="_blank" className="inline-block bg-gray-500 text-white py-2 px-4 rounded-full h-10 hover:bg-gray-700 transition duration-200 text-sm font-semibold" 
            to={`/${slug}`} >Visit</Link>
            </div>
        </div>
    )
}