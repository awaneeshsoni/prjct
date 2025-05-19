import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import linkService from "../services/linkService";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";

export default function EditLink(){
    const {id} = useParams()
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () =>{
            const response = await linkService.getLink(id)
            if(!response){
                console.log("noe response for the link")
            }
            setUrl(response.data.link.url )
            setTitle(response.data.link.title )
        }
        fetchData()
    },[])
    
    async function handleDelete(){
        const response = linkService.deleteLink(id);
        navigate('/dashboard')
        if(response){
        }
    }
    
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response =  await linkService.editLink({title, url, id})
            navigate('/dashboard')
            console.log(response)
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <div className="flex flex-col justify-center items-center">
            <Navbar />
            <div className="flex itmes-center flex-col justify-center mx-2 px-4 max-w-md p-8 space-y-8 bg-gray-200 shadow-md rounded-lg ">
                <div className="flex justify-center">
                <h3 className="text-2xl font-bold">Edit Link</h3>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 m-2 justify-center items">
                    <div className="flex flex-col">
                    <label></label>
                    <input
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder="Link Title"
                    type="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    </div>
                    <div className="flex flex-col">
                    <label></label>
                    <input 
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    type="text"
                    placeholder="Link Url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    />
                    </div>
                    <div className="flex flex-row space-x-4">
                    <button type="submit" className="text-white hover:cursor-pointer bg-green-500 p-2 rounded-sm">Update Link</button>
                    <button className="text-white hover:cursor-pointer bg-red-500 p-2 rounded-sm" onClick={handleDelete}>Delete Link</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}