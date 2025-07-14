import React, { useEffect, useContext } from "react";
import Page from "../components/Page";
import { PageContext } from "../context/PageContext"; 

export default function PagesPage() {
  const { pages } = useContext(PageContext); 

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Pages</h1>
        <a
          href="/create-page"
          className="text-sm text-orange-500 hover:underline"
        >
          + Create New
        </a>
      </div>

      <div className="flex flex-wrap gap-4">
        {pages && pages.length > 0 ? (
          pages.map((page) => (
            <div key={page._id} className="w-full sm:w-[48%] lg:w-[32%]">
              <Page id={page._id} title={page.title} slug={page.slug} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No pages created yet.</p>
        )}
      </div>
    </div>
  );
}
