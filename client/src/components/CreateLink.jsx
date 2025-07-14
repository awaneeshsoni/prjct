import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import linkService from "../services/linkService";
import { LinkContext } from "../context/LinkContext"; 

export default function CreateLink() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const { links, setLinks } = useContext(LinkContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await linkService.addLink({ title, url });
        setLinks([res, ...links]);
        navigate('/links');
    } catch (err) {
      console.error("Failed to add link:", err);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Add New Link</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="title" className="block mb-1 font-medium text-sm">
                Link Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="e.g. My Portfolio"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="url" className="block mb-1 font-medium text-sm">
                URL
              </label>
              <input
                id="url"
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={!title || !url}
              className="w-full bg-orange-500 text-white font-medium py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
            >
              Add Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
