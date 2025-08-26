import React, { useState } from "react";
import { sanitize } from "../utils/security";

export default function ProfileEditor({ currentAbout, onSave }) {
  const [about, setAbout] = useState(currentAbout || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    // sanitize input before passing it upward
    onSave({ about: sanitize(about) });
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ marginTop: 12 }}>
      <h3>Update Profile</h3>
      <label htmlFor="about">About</label>
      <input id="about" value={about} onChange={(e) => setAbout(e.target.value)} />
      <div style={{ marginTop: 10 }}>
        <button className="primary" type="submit">Save</button>
      </div>
      <small className="muted">XSS-safe: input is sanitized before saving.</small>
    </form>
  );
}
