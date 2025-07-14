import React from "react";
import { Link } from "react-router-dom";

export default function LinkComp({ id, title, url }) {
  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4 flex flex-col gap-2">
      <div>
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-500 break-all">{url}</p>
      </div>

      <div className="flex justify-end">
        <Link
          to={`/links/${id}`}
          className="bg-orange-500 text-white px-4 py-1.5 text-sm rounded-md hover:bg-orange-600 transition"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
