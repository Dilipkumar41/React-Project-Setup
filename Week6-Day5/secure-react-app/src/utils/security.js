// utils/security.js
// Basic client-side helpers for demo purposes (NOT production grade).

// Escape potentially dangerous text (XSS prevention for rendered content)
export function sanitize(text) {
  const div = document.createElement("div");
  div.innerText = String(text ?? "");
  return div.innerHTML;
}

// Very simple CSRF token mechanism for a demo SPA.
// In real apps, prefer httpOnly, sameSite cookies and server-side validation.
const CSRF_KEY = "csrfToken";

export function generateCSRF() {
  const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
  sessionStorage.setItem(CSRF_KEY, token);
  return token;
}

export function getCSRF() {
  return sessionStorage.getItem(CSRF_KEY);
}

export function validateCSRF(token) {
  return token && token === sessionStorage.getItem(CSRF_KEY);
}
