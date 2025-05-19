import React, { useEffect, useState } from "react";
import linkService from "../services/linkService";
import pageService from "../services/pageService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CreatePage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [slug, setSlug] = useState("");
    const [allowAnonymousMessages, setAllowAnonymousMessages] = useState(false);
    const [selectedLinks, setSelectedLinks] = useState([]);
    const [links, setLinks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLinks = async () => {
            const res = await linkService.getLinks();
            if (res) {
                setLinks(res.data.links);
            }
        };
        fetchLinks();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await pageService.createPage({
            title,
            description,
            slug,
            allowAnonymousMessages,
            links: selectedLinks, 
        });
        if (res) {
            alert("Page created successfully!");
            navigate("/dashboard");
        }
    }

    function handleSelectLink(linkId) {
        setSelectedLinks((prevSelected) =>
            prevSelected.includes(linkId)
                ? prevSelected.filter((id) => id !== linkId)
                : [...prevSelected, linkId]
        );
    }

    return (
        <div className="flex flex-col justify-center items-center ">
            <Navbar />
            <div className="flex flex-col space-y-9 items-center justify-center bg-gray-100 rounded-lg shadow-md px-10 max-w-md py-2 ">
                <h3 className="text-2xl font-bold mt-4 text-gray-800">Create a new Page</h3>
                <form onSubmit={handleSubmit} className="space-y-1">
                    <div>
                        <label></label>
                        <input
                            type="text"
                            placeholder="Page Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                />
                    </div>
                    <div>
                        <label></label>
                        <textarea
                            type="text"
                            placeholder="Page Description (max 140 chars) "
                            value={description}
                            rows={3}
                            maxLength={140}
                            onChange={(e) => setDescription(e.target.value)}
                            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                 />
                    </div>
                    <div>
                        <label></label>
                        <input
                            type="text"
                            value={slug}
                            placeholder="Slug (unique username for page) "
                            onChange={(e) => setSlug(e.target.value)}
                            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                />
                    </div>
                    <div className="flex flex-row m-2 justify-center items-center">
                        <input
                            type="checkbox"
                            id="allow-messages"
                            checked={allowAnonymousMessages}
                            onChange={() => setAllowAnonymousMessages((prev) => !prev)}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label
                  htmlFor="allow-messages"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Allow Anonymous Messages
                </label>
                    </div>
                    <h3 className="text-lg font-medium text-gray-700">
                  Select Links to Add
                </h3>
                    {links.map((link) => (
                        <div key={link._id} className="flex flex-row gap-1 items-center">
                            <input
                                id={`link-${link._id}`}
                                type="checkbox"
                                checked={selectedLinks.includes(link._id)}
                                onChange={() => handleSelectLink(link._id)}
                            />
                            <label htmlFor={`link-${link._id}`} >{link.title}</label>
                        </div>
                    ))}

                    <button type="submit" className="m-12 bg-blue-500 text-white px-4 py-2 rounded">
                        Create Page
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}
