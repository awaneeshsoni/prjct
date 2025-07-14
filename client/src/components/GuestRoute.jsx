import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function GuestRoute({ children }) {
  const { auth, loading } = useContext(AuthContext);
  if (loading) return <div className="text-center p-10 text-white">Loading...</div>;
  return auth ? <Navigate to="/dashboard" /> : children;
}
