import React from "react";

export default function Analytics() {
  return (
    <div className="min-h-screen p-6 bg-white text-black">
      <h1 className="text-3xl font-bold mb-6 text-orange-500">📊 Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-100 p-4 rounded-xl shadow">
          <p className="text-gray-600 text-sm">Total Page Views</p>
          <h2 className="text-2xl font-semibold mt-1">--</h2>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl shadow">
          <p className="text-gray-600 text-sm">Total Messages</p>
          <h2 className="text-2xl font-semibold mt-1">--</h2>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl shadow">
          <p className="text-gray-600 text-sm">Unique Visitors</p>
          <h2 className="text-2xl font-semibold mt-1">--</h2>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl shadow">
          <p className="text-gray-600 text-sm">Most Visited Page</p>
          <h2 className="text-2xl font-semibold mt-1">--</h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Page Views Over Time</h3>
          <div className="h-48 flex items-center justify-center text-gray-500">
            Chart Placeholder
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Messages Received</h3>
          <div className="h-48 flex items-center justify-center text-gray-500">
            Chart Placeholder
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-100 p-4 rounded-xl shadow mt-8">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Recent Activity</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• User visited "Portfolio Page" — -- views</li>
          <li>• New message received on "Contact Page"</li>
          <li>• You created a new link: "GitHub"</li>
          <li>• --</li>
        </ul>
      </div>
    </div>
  );
}
