import React from "react";

export default function Message({ page, message, createdAt }) {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      return date.toLocaleString();
    } catch (error) {
      console.log(error);
      return "Invalid Date";
    }
  };

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-500">Message</span>
        <span className="text-xs bg-orange-100 text-orange-500 px-2 py-0.5 rounded-full font-medium">
          {page}
        </span>
      </div>

      <p className="text-gray-800 text-sm mb-3">{message}</p>

      <p className="text-xs text-gray-400 text-right">
        Posted at: {formatDate(createdAt)}
      </p>
    </div>
  );
}
