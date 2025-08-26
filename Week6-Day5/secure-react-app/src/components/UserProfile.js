import React, { useEffect, useState } from "react";
import { fetchUserData, updateUserData } from "../api/mockApi";
import UserMeta from "./UserMeta";
import ProfileEditor from "./ProfileEditor";
import { sanitize } from "../utils/security";

export default function UserProfile({ user, onLogout }) {
  const [status, setStatus] = useState("Loading...");
  const [details, setDetails] = useState(null);
  const [saving, setSaving] = useState(false);

  // Simulate data fetch
  useEffect(() => {
    let mounted = true;
    setStatus("Loading...");
    fetchUserData(user.username).then((data) => {
      if (mounted) {
        setDetails(data);
        setStatus("Logged In");
      }
    });
    return () => { mounted = false; };
  }, [user]);

  const handleSave = async (updates) => {
    setSaving(true);
    const next = await updateUserData(details, updates);
    setDetails(next);
    setSaving(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>User Profile</h2>
        <p>Name: {sanitize(user.username)}</p>
        <p>Role: {sanitize(user.role)}</p>
        <p>Status: {status}{saving ? " (saving...)" : ""}</p>
        <button onClick={onLogout}>Logout</button>

        {details && (
          <>
            <UserMeta email={details.email} about={details.about} />
            <ProfileEditor currentAbout={details.about} onSave={handleSave} />
          </>
        )}
      </div>
    </div>
  );
}
