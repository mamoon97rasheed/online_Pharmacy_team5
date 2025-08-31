// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { loginUser } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill both fields");
      return;
    }
    try {
      await loginUser(form); // uses localStorage helper
      navigate("/"); // on success go home
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-left">
          <h1>Login</h1>

          <div className="social-row" aria-hidden>
            <div className="social-btn">G</div>
            <div className="social-btn">f</div>
            <div className="social-btn">in</div>
          </div>

          <p className="small-muted">or use your account</p>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                className="input"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="Email"
                type="email"
                required
              />
            </div>

            <div className="form-group">
              <input
                className="input"
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="Password"
                type="password"
                required
              />
            </div>

            <button type="submit" className="primary-btn">Sign In</button>

            {error && <div className="error">{error}</div>}
          </form>

          <p style={{ marginTop: 12 }} className="small-muted">
            Don't have an account? <Link to="/signup">Create account</Link>
          </p>
        </div>

        <div className="auth-right">
          <h2>Hello, Patient!</h2>
          <p style={{ textAlign: "center", maxWidth: 260 }}>
            Access prescriptions, order medicines and manage your cart easily.
          </p>
          <Link to="/signup"><button className="link-btn">Sign Up</button></Link>
        </div>
      </div>
    </div>
  );
}
