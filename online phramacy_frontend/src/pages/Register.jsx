// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { registerUser } from "../utils/auth";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("All fields are required");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      await registerUser({ name: form.name, email: form.email, password: form.password });
      setSuccess("Account created — redirecting...");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err.message || "Sign up failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-left">
          <h1>Create account</h1>

          <p className="small-muted">Register with your personal details</p>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input className="input" name="name" value={form.name} onChange={onChange} placeholder="Full name" required />
            </div>

            <div className="form-group">
              <input className="input" name="email" value={form.email} onChange={onChange} placeholder="Email" type="email" required />
            </div>

            <div className="form-group">
              <input className="input" name="password" value={form.password} onChange={onChange} placeholder="Password" type="password" required />
            </div>

            <div className="form-group">
              <input className="input" name="confirm" value={form.confirm} onChange={onChange} placeholder="Confirm password" type="password" required />
            </div>

            <button type="submit" className="primary-btn">Sign Up</button>

            {error && <div className="error">{error}</div>}
            {success && <div style={{ color: "green", fontWeight: 600, marginTop: 8 }}>{success}</div>}
          </form>

          <p style={{ marginTop: 12 }} className="small-muted">
            Already registered? <Link to="/login">Sign in</Link>
          </p>
        </div>

        <div className="auth-right">
          <h2>Welcome!</h2>
          <p style={{ textAlign: "center", maxWidth: 260 }}>
            Register to order medicines, view prescriptions and manage deliveries.
          </p>
          <Link to="/login"><button className="link-btn">Sign In</button></Link>
        </div>
      </div>
    </div>
  );
}
