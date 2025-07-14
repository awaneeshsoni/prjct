import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { auth, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center p-10 text-white">Checking session...</div>;

  return auth ? children : <Navigate to="/login" />;
}
