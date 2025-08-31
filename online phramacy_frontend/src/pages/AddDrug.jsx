import React, { useState } from "react";
import drugService from "../services/drugService";
import { useNavigate } from "react-router-dom";

export default function AddDrug() {
  const [form, setForm] = useState({ name: "", description: "", price: 0, quantity: 0 });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const change = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      await drugService.create(form);
      setMsg("Created");
      setTimeout(() => nav("/"), 800);
    } catch (err) {
      setMsg(err.response?.data?.message || "Create failed");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <h2>Add Drug</h2>
      <form onSubmit={submit}>
        <div className="form-row"><label>Name</label><input className="input" value={form.name} onChange={e => change("name", e.target.value)} required /></div>
        <div className="form-row"><label>Description</label><textarea className="input" value={form.description} onChange={e => change("description", e.target.value)} /></div>
        <div className="form-row"><label>Price</label><input type="number" className="input" value={form.price} onChange={e => change("price", Number(e.target.value))} required /></div>
        <div className="form-row"><label>Quantity</label><input type="number" className="input" value={form.quantity} onChange={e => change("quantity", Number(e.target.value))} required /></div>
        <button className="btn btn-primary" type="submit">Create</button>
        {msg && <div style={{ marginTop: 8 }}>{msg}</div>}
      </form>
    </div>
  );
}
