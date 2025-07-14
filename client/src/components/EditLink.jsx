import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import linkService from "../services/linkService";
import { LinkContext } from "../context/LinkContext";

export default function EditLink() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const { links, setLinks } = useContext(LinkContext);

 useEffect(() => {
  const existingLink = links.find((link) => link._id === id);
  if (existingLink) {
    setTitle(existingLink.title);
    setUrl(existingLink.url);
  }
}, [id, links]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const updatedLink = await linkService.editLink({ title, url, id });
      setLinks((prev) =>
        prev.map((link) => (link._id === id ? updatedLink : link))
      );

      navigate("/links");
    } catch (err) {
      console.error("Failed to update link:", err);
    }
  }

  async function handleDelete() {
    try {
      await linkService.deleteLink(id);
      setLinks((prev) => prev.filter((link) => link._id !== id));

      navigate("/links");
    } catch (err) {
      console.error("Failed to delete link:", err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Edit Link</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-medium mb-1">Link Title</label>
            <input
              type="text"
              placeholder="Enter link title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-medium mb-1">Link URL</label>
            <input
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md transition"
            >
              Update Link
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition"
            >
              Delete Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
