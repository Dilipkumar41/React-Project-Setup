import React from "react";
import { sanitize } from "../utils/security";

export default function UserMeta({ email, about }) {
  return (
    <div className="card" style={{ marginTop: 12 }}>
      <h3>Meta</h3>
      <p>Email: {sanitize(email)}</p>
      <p>About: {sanitize(about)}</p>
    </div>
  );
}
