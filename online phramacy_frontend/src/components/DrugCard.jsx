import React from "react";
import { Link } from "react-router-dom";

export default function DrugCard({ drug, onAdd }) {
  return (
    <div className="card">
      <h4>{drug.name}</h4>
      <div className="small">Price: ₹{drug.price}</div>
      <div className="small">Stock: {drug.quantity}</div>
      <p className="small">{drug.description ? drug.description.slice(0, 100) : ""}</p>
      <div style={{ marginTop: 8 }}>
        <Link to={`/drug/${drug.id}`} className="btn btn-primary" style={{ marginRight: 8 }}>View</Link>
        {onAdd && <button className="btn" onClick={() => onAdd(drug)}>Add</button>}
      </div>
    </div>
  );
}
