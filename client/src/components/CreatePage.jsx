import React, { useState, useContext } from "react";
import pageService from "../services/pageService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LinkContext } from "../context/LinkContext";
import { PageContext } from "../context/PageContext";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [allowAnonymousMessages, setAllowAnonymousMessages] = useState(false);
  const [selectedLinks, setSelectedLinks] = useState([]);

  const navigate = useNavigate();
  const { auth, token } = useContext(AuthContext);
  const { links } = useContext(LinkContext);
  const { pages, setPages } = useContext(PageContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (auth?.plan === "free" && pages.length >= 1) {
      alert("You can only create 1 page on the Free plan. Upgrade to Pro to create more!");
      return;
    }

    try {
      const res = await pageService.createPage(
        {
          title,
          description,
          slug,
          allowAnonymousMessages,
          links: selectedLinks,
        }
      );

      if (res?.data) {
        setPages([res.data.newPage, ...pages]);
        alert("Page created successfully!");
        navigate("/pages");
      }
    } catch (err) {
      console.error("Failed to create page:", err);
    }
  }

  function handleSelectLink(linkId) {
    setSelectedLinks((prev) =>
      prev.includes(linkId)
        ? prev.filter((id) => id !== linkId)
        : [...prev, linkId]
    );
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg bg-white border border-gray-200 shadow-lg rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create a New Page
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Page Title
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
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description (max 140 chars)
              </label>
              <textarea
                id="description"
                rows={3}
                maxLength={140}
                placeholder="Brief description of the page"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                Slug (username-like URL)
              </label>
              <input
                id="slug"
                type="text"
                placeholder="e.g. johncodes"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                Your page will be at: <span className="text-gray-600">prjct.in/{slug || "your-slug"}</span>
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="allow-messages"
                checked={allowAnonymousMessages}
                onChange={() => setAllowAnonymousMessages((prev) => !prev)}
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="allow-messages" className="ml-2 text-sm text-gray-700">
                Allow anonymous messages
              </label>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Select Links to Attach</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {links.map((link) => (
                  <div key={link._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`link-${link._id}`}
                      checked={selectedLinks.includes(link._id)}
                      onChange={() => handleSelectLink(link._id)}
                      className="accent-orange-500"
                    />
                    <label htmlFor={`link-${link._id}`} className="text-sm text-gray-800">
                      {link.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-medium py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Create Page
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
