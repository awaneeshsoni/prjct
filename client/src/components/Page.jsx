import React from "react";
import { Link } from "react-router-dom";

export default function Page({ title, slug, id }) {
  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4 break-all">prjct.in/{slug}</p>
      <div className="flex gap-3">
        <Link
          to={`/pages/${id}`}
          className="bg-orange-500 text-white px-4 py-1.5 text-sm rounded-md hover:bg-orange-600 transition"
        >
          Edit
        </Link>
        <Link
          to={`/${slug}`}
          target="_blank"
          className="bg-gray-200 text-gray-800 px-4 py-1.5 text-sm rounded-md hover:bg-gray-300 transition"
        >
          Visit
        </Link>
      </div>
    </div>
  );
}
