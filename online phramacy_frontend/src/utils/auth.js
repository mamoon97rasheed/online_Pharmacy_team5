// src/utils/auth.js
// Simple localStorage-based auth helper for demo/testing only.

const USERS_KEY = "pharmacy_users";
const AUTH_KEY = "pharmacy_authUser";

export function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser({ name, email, password }) {
  const users = getUsers();
  if (users.find(u => u.email === email.toLowerCase())) {
    throw new Error("User already exists");
  }
  const newUser = { id: Date.now(), name, email: email.toLowerCase(), password };
  users.push(newUser);
  saveUsers(users);
  // auto-login after register
  localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
  return newUser;
}

export function loginUser({ email, password }) {
  const users = getUsers();
  const found = users.find(u => u.email === email.toLowerCase() && u.password === password);
  if (found) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(found));
    return found;
  }
  // fallback test account (if none registered)
  if (email.toLowerCase() === "test@mail.com" && password === "1234") {
    const testUser = { id: 0, name: "Demo User", email: "test@mail.com" };
    localStorage.setItem(AUTH_KEY, JSON.stringify(testUser));
    return testUser;
  }
  throw new Error("Invalid email or password");
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function getAuthUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
  } catch { return null; }
}
