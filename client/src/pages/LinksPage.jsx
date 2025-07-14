import React, { useContext, useEffect } from "react";
import { LinkContext } from "../context/LinkContext";
import LinkComp from "../components/Link";
import { Link } from "react-router-dom";

export default function LinksPage() {

  const { links, fetchLinks } = useContext(LinkContext);

//   useEffect(() => {
//     fetchLinks()
//   },[])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Links</h1>
        <Link
          to="/create-link"
          className="text-sm text-orange-500 hover:underline"
        >
          + Add Link
        </Link>
      </div>

      <div className="flex flex-wrap gap-4">
        {links && links.length > 0 ? (
          links.map((lnk) => (
            <div key={lnk._id} className="w-full sm:w-[48%] lg:w-[32%]">
              <LinkComp id={lnk._id} title={lnk.title} url={lnk.url} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No links added yet.</p>
        )}
      </div>
    </div>
  );
}
