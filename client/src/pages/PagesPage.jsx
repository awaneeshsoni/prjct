import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../components/Page";
import { PageContext } from "../context/PageContext";
import { AuthContext } from "../context/AuthContext";

export default function PagesPage() {
  const navigate = useNavigate();
  const { pages } = useContext(PageContext);
  const { auth } = useContext(AuthContext);

  const handleCreateClick = () => {
    const isFree = auth?.plan === "free";
    const alreadyHasPage = pages?.length >= 1;

    if (isFree && alreadyHasPage) {
      alert("You can only create 1 page on the Free plan. Upgrade to Pro to create more.");
      return;
    }

    navigate("/create-page");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Pages</h1>
        <button
          onClick={handleCreateClick}
          className="text-sm text-orange-500 hover:underline"
        >
          + Create New
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {pages && pages.length > 0 ? (
          pages.map((page) => (
            <div key={page._id} className="w-full sm:w-[48%] lg:w-[32%]">
              <Page
                id={page._id}
                title={page.title}
                slug={page.slug}
                visits={page.visits || 0}
                messageCount={page.messageCount || 0}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No pages created yet.</p>
        )}
      </div>
    </div>
  );
}
