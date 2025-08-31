import axios from "axios";

// For a real backend:
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Mock fallback if no backend:
API.post = async (url, data) => {
  if (url === "/login" && data.email === "test@mail.com" && data.password === "1234") {
    return { data: { token: "mockToken" } };
  }
  throw new Error("Invalid credentials");
};

export default API;
