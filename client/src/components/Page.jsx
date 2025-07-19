import React from "react";
import { Link } from "react-router-dom";

export default function Page({ title, slug, id, visits = 0, messageCount = 0 }) {
  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4 space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 break-all">prjct.in/{slug}</p>

      {/* Analytics stats */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>👁️ {visits} visits</span>
        <span>💬 {messageCount} messages</span>
      </div>

      <div className="flex gap-3 pt-2">
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
