import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import drugService from "../services/drugService";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function DrugDetails() {
  const { id } = useParams();
  const [drug, setDrug] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => { if (id) load(); }, [id]);

  const load = async () => {
    try { const data = await drugService.getById(id); setDrug(data); } catch (e) { console.error(e); }
  };

  const onAdd = () => {
    if (!user) return alert("Please login to add to cart.");
    if (qty < 1) return;
    if (qty > drug.quantity) return alert("Quantity exceeds stock");
    addToCart(drug, qty);
    alert("Added to cart");
  };

  if (!drug) return <div>Loading...</div>;

  return (
    <div>
      <h2>{drug.name}</h2>
      <div className="card">
        <div><strong>Price:</strong> ₹{drug.price}</div>
        <div><strong>Stock:</strong> {drug.quantity}</div>
        <p>{drug.description}</p>

        <div style={{ marginTop: 12 }}>
          <label>Qty</label>
          <input type="number" min="1" max={drug.quantity} value={qty} onChange={e => setQty(Number(e.target.value))} className="input" style={{ width: 120 }} />
        </div>

        <div style={{ marginTop: 10 }}>
          <button className="btn btn-primary" onClick={onAdd}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
