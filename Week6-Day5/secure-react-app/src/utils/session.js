// utils/session.js
const KEY = "authUser";

export function setSession(user) {
  sessionStorage.setItem(KEY, JSON.stringify(user));
}

export function getSession() {
  const raw = sessionStorage.getItem(KEY);
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
}

export function clearSession() {
  sessionStorage.removeItem(KEY);
}
