import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container">
      <div className="card">
        <h2>404 — Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link to="/login"><button className="primary">Go to Login</button></Link>
      </div>
    </div>
  );
}
