import React from "react";

export default function AdminDashboard() {
  return (
    <div className="container">
      <div className="card">
        <h2>Admin Dashboard</h2>
        <p>Only users with the <b>admin</b> role can see this page.</p>
        <ul>
          <li>View users</li>
          <li>Manage roles</li>
          <li>Basic audit log (placeholder)</li>
        </ul>
        <small className="muted">This is a demo screen for RBAC.</small>
      </div>
    </div>
  );
}
