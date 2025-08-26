import React from "react";
import UserProfile from "./UserMeta";
import { getSession } from "../utils/session";

export default function Dashboard({ onLogout }) {
  const user = getSession();
  return (
    <div>
      <UserProfile user={user} onLogout={onLogout} />
    </div>
  );
}
