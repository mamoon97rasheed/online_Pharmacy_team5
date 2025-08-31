import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const register = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/register`, data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default { login, register };
