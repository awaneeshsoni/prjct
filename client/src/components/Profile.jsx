import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import authService from "../services/authService";

export default function Profile() {
  const { auth, setAuth, token } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: auth?.name || "",
    password: "",
  });

  const handleUpdate = async () => {
    try {
      const res = await authService.updateUser(
        {
          name: formData.name,
          password: formData.password || undefined,
        },
        token
      );

      if (res) {
        setAuth({name: formData.name});
        setFormData({ name: formData.name, password: "" });
        setEditMode(false);
      }
    } catch (err) {
      console.error("Failed to update user", err);
    }
  };

  if (!auth)
    return <div className="text-white text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen text-black py-10 px-4">
      <div className="max-w-md mx-auto bg-white border border-gray-200 p-6 rounded-2xl shadow-md">
        <h1 className="text-xl font-bold mb-6 text-center text-orange-500">👤 Profile</h1>

        {editMode ? (
          <>
            <label className="block mb-4">
              <span className="text-sm font-medium text-gray-700">Name</span>
              <input
                className="block w-full bg-white border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </label>

            <label className="block mb-4">
              <span className="text-sm font-medium text-gray-700">New Password (optional)</span>
              <input
                type="password"
                className="block w-full bg-white border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </label>

            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="text-gray-600 border border-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mb-2">
              <span className="font-medium text-gray-600">Name:</span> {auth.name}
            </p>
            <p className="mb-6">
              <span className="font-medium text-gray-600">Email:</span> {auth.email}
            </p>

            <button
              onClick={() => setEditMode(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}
