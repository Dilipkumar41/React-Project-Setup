// api/mockApi.js
// Simulated API calls using setTimeout to mimic latency.

export function loginApi(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!username || !password) return reject("Username and password are required.");
      // Very naive demo: "admin" username yields admin role
      const role = username.trim().toLowerCase() === "admin" ? "admin" : "user";
      resolve({ username, role });
    }, 700);
  });
}

export function fetchUserData(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const role = username.trim().toLowerCase() === "admin" ? "admin" : "user";
      resolve({
        username,
        role,
        email: `${username}@example.com`,
        about: "Enthusiastic learner. Likes React and secure coding."
      });
    }, 900);
  });
}

export function updateUserData(current, updates) {
  // pretend to persist and return merged data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...current, ...updates });
    }, 600);
  });
}
