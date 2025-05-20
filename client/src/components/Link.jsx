import React from "react";
import { Link } from "react-router-dom";

export default function LinkComp(props){
    return(
        <div className="flex flex-row w-60 h-auto justify-between bg-white rounded-lg shadow-md mb-4 p-4">
            <div>
            <h4 className="text-lg font-semibold text-gray-600">{props.title}</h4>
            <p className="text-gray-400 font-serif">{props.url}</p>
            </div>
            <Link className=" inline-block h-10 bg-gray-200 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-300 transition duration-200 text-sm font-semibold" 
            to={`/links/${props.id}`}>Edit</Link>
        </div>
    )
}