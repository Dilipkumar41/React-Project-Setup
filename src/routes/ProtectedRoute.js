// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getSession } from "../utils/session";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = getSession();

  if (!user) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Logged in but role not allowed → redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
