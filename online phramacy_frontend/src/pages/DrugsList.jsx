import React, { useEffect, useState, useContext } from "react";
import drugService from "../services/drugService";
import DrugCard from "../components/DrugCard";
import { CartContext } from "../context/CartContext";

export default function DrugsList() {
  const [drugs, setDrugs] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const data = await drugService.getAll();
      setDrugs(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleAdd = (drug) => {
    if (drug.quantity <= 0) return alert("Out of stock");
    addToCart(drug, 1);
  };

  const list = drugs.filter(d => d.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <h2>Drugs</h2>
      <div style={{ marginBottom: 12 }}>
        <input className="input" placeholder="Search by name..." value={q} onChange={e => setQ(e.target.value)} />
      </div>

      {loading ? <div>Loading...</div> : (
        <div className="grid">
          {list.map(d => <DrugCard key={d.id} drug={d} onAdd={handleAdd} />)}
        </div>
      )}
    </div>
  );
}
