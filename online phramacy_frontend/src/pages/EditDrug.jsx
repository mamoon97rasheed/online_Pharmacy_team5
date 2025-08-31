import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import drugService from "../services/drugService";

export default function EditDrug() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  useEffect(() => { load(); }, [id]);

  const load = async () => {
    try {
      const d = await drugService.getById(id);
      setForm(d);
    } catch (e) { console.error(e); }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await drugService.update(id, form);
      setMsg("Updated");
      setTimeout(()=>nav("/"), 700);
    } catch (err) { setMsg(err.response?.data?.message || "Update failed"); }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <h2>Edit Drug</h2>
      <form onSubmit={submit}>
        <div className="form-row"><label>Name</label><input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required/></div>
        <div className="form-row"><label>Description</label><textarea className="input" value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
        <div className="form-row"><label>Price</label><input type="number" className="input" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} required/></div>
        <div className="form-row"><label>Quantity</label><input type="number" className="input" value={form.quantity} onChange={e => setForm({...form, quantity: Number(e.target.value)})} required/></div>
        <button className="btn btn-primary" type="submit">Save</button>
        {msg && <div style={{ marginTop: 8 }}>{msg}</div>}
      </form>
    </div>
  );
}
