import React, { useState } from "react";
import Navbar from "../components/Navbar";
import linkService from "../services/linkService";
import {  useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function CreateLink(){
    const [title, setTitle]  = useState("")
    const [url, setUrl] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault();
        const response = linkService.addLink({title, url})
        if(response) {
            navigate('/dashboard')
        }
    }
    return(
        <div className="flex justify-center items-center flex-col">
            <Navbar />
            <div className=" flex flex-col items-center bg-gray-50 px-4 py-5 shadow-md rounded-lg ">
                <h4 className="text-2xl font-bold text-gray-800">Add Link</h4>
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="flex flex-col space-y-2 ">
                    <label className="font-semibold"></label>
                    <input 
                    className="focus:outline-none relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text:sm"
                    type="title"
                    placeholder="Link Title"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    </div>
                    <div>

                    <label></label>
                    <input 
                        className=" focus:outline-none relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                        type="text"
                        value={url}
                        required
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Url"
                        />
                    </div>
                    <button type="submit" 
                    className="focus:outline-none relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md group hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed" 
                    >Add Link</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}