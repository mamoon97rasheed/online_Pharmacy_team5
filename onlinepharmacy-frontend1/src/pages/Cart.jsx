import { useEffect, useState } from "react";
import { useAuth } from "../state/AuthContext";  // ✅ get logged in user
import { viewCart, clearCart } from "../lib/api";

export default function Cart() {
  const { user } = useAuth();   // user.username will be needed
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user) {
      loadCart();
    }
  }, [user]);

  async function loadCart() {
    try {
      const res = await viewCart(user.username);
      console.log("Cart API response:", res); // 👀 debug log

      // ✅ Normalize response into array
      const itemsArray = Array.isArray(res)
        ? res
        : res.items || res.cart?.items || [];

      setItems(itemsArray);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setItems([]); // fallback to empty array
    }
  }

  async function handleClear() {
    try {
      await clearCart(user.username);
      setItems([]);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 bg-white shadow rounded-lg"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} × ₹{item.price}
                </p>
              </div>
              <p className="font-bold">₹ {item.price * item.quantity}</p>
            </div>
          ))}

          <button
            onClick={handleClear}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
