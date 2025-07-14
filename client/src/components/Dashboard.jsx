import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import linkService from "../services/linkService";
import messageService from "../services/messageService";
import pageService from "../services/pageService";

import Message from "../components/Message";
import Page from "../components/Page";
import LinkComp from "../components/Link";
import Footer from "../components/Footer";

// ✅ Sidebar Component (basic)
function Sidebar() {
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <aside className="w-60 h-screen bg-white shadow-md p-6 flex flex-col justify-between fixed top-0 left-0">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-orange-500">Prjct.in</h2>
        <nav className="flex flex-col space-y-3 text-gray-700 text-sm">
          <Link to="/dashboard" className="hover:text-orange-500">📊 Analytics</Link>
          <Link to="/messages" className="hover:text-orange-500">💬 Messages</Link>
          <Link to="/create-page" className="hover:text-orange-500">📄 Create Page</Link>
          <Link to="/create-link" className="hover:text-orange-500">🔗 Add Link</Link>
        </nav>
      </div>

      <div className="space-y-3 text-sm text-gray-600">
        <Link to={`/profile/${userId}`} className="flex items-center space-x-2 hover:text-orange-500">
          <span>👤</span>
          <span>{username}</span>
        </Link>
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-600 text-left w-full"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [links, setLinks] = useState([]);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userLinks, userPages, userMessages] = await Promise.all([
          linkService.getLinks(),
          pageService.getPages(),
          messageService.getMessages(),
        ]);
        setLinks(userLinks?.data.links || []);
        setPages(userPages?.data.pages || []);
        setMessages(userMessages?.data.messages || []);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-60 w-full px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Messages */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-700">Recent Messages</h2>
              <Link to="/messages" className="text-sm text-orange-500 hover:underline">
                See All
              </Link>
            </div>
            <div className="space-y-3">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <Message
                    key={message._id}
                    message={message.message}
                    page={message.page?.title || "Page Deleted"}
                    createdAt={message.createdAt}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-sm">No messages yet.</p>
              )}
            </div>
          </div>

          {/* Pages */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-700">Your Pages</h2>
              <Link to="/create-page" className="text-sm text-orange-500 hover:underline">
                Create Page
              </Link>
            </div>
            <div className="space-y-3">
              {pages.length > 0 ? (
                pages.map((page) => (
                  <Page key={page._id} id={page._id} title={page.title} slug={page.slug} />
                ))
              ) : (
                <p className="text-gray-500 text-sm">No pages created.</p>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-700">Your Links</h2>
              <Link to="/create-link" className="text-sm text-orange-500 hover:underline">
                Add Link
              </Link>
            </div>
            <div className="space-y-3">
              {links.length > 0 ? (
                links.map((lnk) => (
                  <LinkComp key={lnk._id} id={lnk._id} title={lnk.title} url={lnk.url} />
                ))
              ) : (
                <p className="text-gray-500 text-sm">No links added.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Footer />
        </div>
      </main>
    </div>
  );
}
