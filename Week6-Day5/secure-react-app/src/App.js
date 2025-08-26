import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import { getSession, clearSession } from "./utils/session";

function NavBar({ user, onLogout }) {
  return (
    <div className="navbar">
      <div>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/admin">Admin</Link>
      </div>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: 10 }}>
              Hello, {user.username} ({user.role})
            </span>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <button className="primary">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => getSession());
  const navigate = useNavigate();

  const handleLogin = (u) => {
    setUser(u);
    navigate(u.role === "admin" ? "/admin" : "/dashboard", { replace: true });
  };

  const handleLogout = () => {
    clearSession();
    setUser(null);
    navigate("/login", { replace: true });
  };

  const isAuthenticated = !!user;

  return (
    <div className="app-shell">
      <NavBar user={user} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <div className="card">
                <h2>Welcome</h2>
                <p>
                  This app demonstrates React basics, routing, props/state,
                  RBAC, and basic security (XSS, CSRF).
                </p>
              </div>
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <Login onLogin={handleLogin} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} isAuthenticated={isAuthenticated} />
            )
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
