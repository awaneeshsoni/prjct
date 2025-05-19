import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import pageService from "../services/pageService";
import { useNavigate, useParams } from "react-router-dom";
import linkService from "../services/linkService";
import Footer from "../components/Footer";

export default function EditPage() {
    const { id } = useParams();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [slug, setSlug] = useState("")
    const [links, setLinks] = useState([]);
    const [selectedLinks, setSelectedLinks] = useState([]);
    const [allowAnonymousMessages, setAllowAnonymousMessages] = useState(Boolean);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const response = await pageService.getPage(id)
            setTitle(response.data.page.title)
            setDescription(response.data.page.description)
            setSlug(response.data.page.slug)
            setSelectedLinks(response.data.page.links.map((link) => link._id))
            setAllowAnonymousMessages(response.data.page.allowAnonymousMessages)
        }
        const fetchLinks = async () => {
            try {
                const userLinks = await linkService.getLinks();
                setLinks(userLinks.data.links)
            } catch (error) {
                console.error("Error fetching links:", error.message);
            }
        };
        fetchData()
        fetchLinks();
    }, [])


    function handleLinkChnage(linkId ) {
        setSelectedLinks((prevSelected) =>
            prevSelected.includes(linkId)
                ? prevSelected.filter((id) => id !== linkId)
                : [...prevSelected, linkId]
        );
    }

    async function handleSubmit(e){
        e.preventDefault();
        const res = await  pageService.editPage({id, title, description, slug, links: selectedLinks, allowAnonymousMessages})
        if(res){
            navigate('/dashboard')
        }
    }

    async function handleDelete(){
        const res = await pageService.deletePage(id)
        if(res){
            navigate('/dashboard')
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <Navbar />
            <div className="flex flex-col max-w-md bg-gray-200 px-10 py-4 rounded-md shadow-md">
                <div className=" flex justify-center items-center mb-3">
                <h1 className="text-2xl font-bold">Edit Page</h1>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                    <label></label>
                    <input
                        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                        id="title"
                        type="title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                        required
                    />
                    <label></label>
                    <textarea
                        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                    <label></label>
                    <input
                        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                        id="slug"
                        type="text"
                        value={slug}
                        onChange={(e) => { setSlug(e.target.value) }}
                    />
                    <div className="flex items-center m-2">
                        <input
                            id="allow-messages"
                            type="checkbox"
                            checked={allowAnonymousMessages}
                            onChange={() => setAllowAnonymousMessages((prev) => !prev)}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label
                            htmlFor="allow-messages"
                            className="block ml-2 text-sm text-gray-900"
                        >
                            Allow Anonymous Messaging
                        </label>
                    </div>
                    <div>
                        <label>Selected Links</label>
                        {links.length > 0 ? (
                            <div className="mt-2 space-y-2">
                      {links.map((link) => (
                          <div key={link._id} className="flex items-center">
                          <input
                            id={`link-${link._id}`}
                            type="checkbox"
                            checked={selectedLinks.includes(link._id)}
                            onChange={() => handleLinkChnage(link._id)}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                          />
                          <label
                            htmlFor={`link-${link._id}`}
                            className="block ml-2 text-sm text-gray-900"
                          >
                            {link.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-gray-600">No Links created</p>}
                    </div>
                    <div className="flex flex-row space-x-2 m-2">
                    <button type="submit" className="text-white hover:cursor-pointer bg-green-500 p-2 rounded-sm" >Update Page</button>
                    <button className="text-white hover:cursor-pointer bg-red-500 p-2 rounded-sm" onClick={handleDelete}>Delete Page</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}