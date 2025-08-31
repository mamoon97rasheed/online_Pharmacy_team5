import React, { useEffect, useState, useContext } from "react";
import orderService from "../services/orderService";
import { AuthContext } from "../context/AuthContext";

export default function Orders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.id) load();
  }, [user]);

  const load = async () => {
    try {
      const data = await orderService.getUserOrders(user.id);
      setOrders(data);
    } catch (e) { console.error(e); }
  };

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? <p>No orders yet</p> : (
        <div>
          {orders.map(o => (
            <div className="card" key={o.id} style={{ marginBottom: 8 }}>
              <div><strong>Order #{o.id}</strong> — ₹{o.total}</div>
              <div className="small">Placed: {new Date(o.createdAt).toLocaleString()}</div>
              <ul>
                {o.items.map(it => <li key={it.drugId}>{it.name} x {it.qty}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
