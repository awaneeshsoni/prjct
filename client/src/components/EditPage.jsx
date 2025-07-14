import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pageService from "../services/pageService";
import { AuthContext } from "../context/AuthContext";
import { PageContext } from "../context/PageContext";
import { LinkContext } from "../context/LinkContext";

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { pages, setPages } = useContext(PageContext);
  const { links } = useContext(LinkContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [allowAnonymousMessages, setAllowAnonymousMessages] = useState(false);
  const [selectedLinks, setSelectedLinks] = useState([]);

  useEffect(() => {
    const page = pages.find((p) => p._id === id);
    if (page) {
      setTitle(page.title);
      setDescription(page.description);
      setSlug(page.slug);
      setAllowAnonymousMessages(page.allowAnonymousMessages);
      setSelectedLinks(page.links.map((l) => l.toString())); // 🛡️ safe
    }
  }, [id, pages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await pageService.editPage(
        {
          id,
          title,
          description,
          slug,
          allowAnonymousMessages,
          links: selectedLinks,
        },
        token
      );
      setPages((prev) => prev.map((p) => (p._id === id ? res.data.page : p)));
      navigate("/pages");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await pageService.deletePage(id);
      setPages((prev) => prev.filter((p) => p._id !== id));
      navigate("/pages");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const toggleLink = (linkId) => {
    setSelectedLinks((prev) =>
      prev.includes(linkId)
        ? prev.filter((id) => id !== linkId)
        : [...prev, linkId]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Edit Page</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              maxLength={140}
              placeholder="Max 140 characters"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Slug (Unique URL)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={allowAnonymousMessages}
              onChange={() => setAllowAnonymousMessages((prev) => !prev)}
              className="w-4 h-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-700">
              Allow Anonymous Messaging
            </label>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Select Links</p>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {links.length === 0 ? (
                <p className="text-sm text-gray-400">No links available</p>
              ) : (
                links.map((link) => {
                  const linkId = link._id.toString();
                  return (
                    <div key={linkId} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`link-${linkId}`}
                        checked={selectedLinks.includes(linkId)}
                        onChange={() => toggleLink(linkId)}
                        className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                      />
                      <label htmlFor={`link-${linkId}`} className="ml-2 text-sm text-gray-800">
                        {link.title}
                      </label>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md transition"
            >
              Update Page
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition"
            >
              Delete Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
