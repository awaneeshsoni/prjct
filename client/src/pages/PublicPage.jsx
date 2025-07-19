import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pageService from "../services/pageService";
import messageService from "../services/messageService";
import { FaSpinner, FaPaperPlane } from "react-icons/fa";

const PublicPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/pages/track/${slug}`, {
      method: "POST",
    });

    const fetchPage = async () => {
      try {
        const res = await pageService.getPublicPage(slug);
        setPage(res.data.page);
      } catch (err) {
        console.error("Failed to fetch page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const res = await messageService.addMessage({ message: newMessage, slug });
      if (res) {
        alert("Message sent!");
        setNewMessage("");
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Error sending message");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <FaSpinner className="animate-spin text-orange-500" size={36} />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Page not found.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">{page.title}</h1>
          <p className="mt-2 text-gray-600">{page.description}</p>
        </div>

        <div className="space-y-3">
          {page.links?.map((link) => (
            <button
              key={link._id}
              onClick={() => {
                fetch(`${API}/links/track/${link._id}`, {
                  method: "GET",
                }).finally(() => {
                  const url = link.url.startsWith("http") ? link.url : `https://${link.url}`;
                  window.open(url, "_blank");
                });
              }}
              className="block w-full text-center bg-gray-800 text-white font-medium py-2.5 rounded-full hover:bg-gray-700 transition"
            >
              {link.title}
            </button>
          ))}
        </div>

        {page.allowAnonymousMessages && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Leave a Message</h3>
            <form onSubmit={handleMessageSubmit} className="space-y-4">
              <textarea
                placeholder="Type your message..."
                required
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-800"
              />
              <button
                type="submit"
                disabled={submitLoading}
                className="w-full flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition disabled:opacity-50"
              >
                {submitLoading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    Send
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        <p className="pt-4 text-sm text-center text-gray-500">
          Built with{" "}
          <a
            href="https://inonepage.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 font-medium hover:underline"
          >
            Prjct.in
          </a>
        </p>
      </div>
    </div>
  );
};

export default PublicPage;
