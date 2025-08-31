import React from "react";

export default function CartItem({ item, onChangeQty, onRemove }) {
  return (
    <div className="card" style={{ display: "flex", justifyContent:"space-between", alignItems:"center" }}>
      <div>
        <strong>{item.name}</strong>
        <div className="small">₹{item.price} x {item.qty} = ₹{item.price * item.qty}</div>
      </div>
      <div>
        <input type="number" min="1" value={item.qty} onChange={e => onChangeQty(item.id, Number(e.target.value))} style={{ width: 70, marginRight: 8 }} />
        <button className="btn btn-danger" onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    </div>
  );
}
