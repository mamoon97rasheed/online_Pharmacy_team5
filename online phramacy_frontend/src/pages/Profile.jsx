import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import memberService from "../services/memberService";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", mobile: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user) setForm({ name: user.name || "", email: user.email || "", mobile: user.mobile || "" });
  }, [user]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const updated = await memberService.update(user.id, form);
      // update local storage & context
      const raw = JSON.parse(localStorage.getItem("user") || "{}");
      raw.user = updated;
      localStorage.setItem("user", JSON.stringify(raw));
      setUser(updated);
      setMsg("Updated");
    } catch (err) {
      setMsg("Update failed");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Profile</h2>
      <form onSubmit={submit}>
        <div className="form-row"><label>Name</label><input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
        <div className="form-row"><label>Email</label><input className="input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
        <div className="form-row"><label>Mobile</label><input className="input" value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} /></div>
        <button className="btn btn-primary" type="submit">Save</button>
        {msg && <div style={{ marginTop: 8 }}>{msg}</div>}
      </form>
    </div>
  );
}
