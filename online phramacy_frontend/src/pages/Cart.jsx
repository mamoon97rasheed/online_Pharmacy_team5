import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import orderService from "../services/orderService";
import { AuthContext } from "../context/AuthContext";

export default function Cart() {
  const { items, updateQty, removeItem, clearCart, total } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const placeOrder = async () => {
    if (items.length === 0) return alert("Cart empty");
    const payload = {
      userId: user.id,
      items: items.map(i => ({ drugId: i.id, qty: i.qty })),
      total
    };
    try {
      await orderService.placeOrder(payload);
      alert("Order placed");
      clearCart();
    } catch (e) {
      alert("Order failed");
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {items.length === 0 ? <div>Your cart is empty</div> : (
        <>
          <div>
            {items.map(i => <CartItem key={i.id} item={i} onChangeQty={updateQty} onRemove={removeItem} />)}
          </div>
          <div className="cart-summary">
            <div><strong>Total: ₹{total}</strong></div>
            <div style={{ marginTop: 8 }}>
              <button className="btn btn-primary" onClick={placeOrder}>Place Order</button>
              <button className="btn" onClick={clearCart} style={{ marginLeft: 8 }}>Clear</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
