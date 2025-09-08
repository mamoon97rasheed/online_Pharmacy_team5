// src/state/CartContext.jsx
import { createContext, useContext, useState } from "react";
import { addCartItem, viewCart, clearCart } from "../lib/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth(); // ✅ get logged-in user
  const [cart, setCart] = useState([]);

  // ✅ Add product to backend cart
  async function addToCart(product) {
    if (!user) {
      console.warn("User not logged in, cannot add to cart.");
      return;
    }
    try {
      await addCartItem(user.username, product);

      // Refresh cart from backend
      const updatedCart = await viewCart(user.username);
      setCart(updatedCart.items || updatedCart || []);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  }

  // ✅ Load user’s cart
  async function loadCart() {
    if (!user) return;
    try {
      const res = await viewCart(user.username);
      setCart(res.items || res || []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  }

  // ✅ Clear cart
  async function emptyCart() {
    if (!user) return;
    try {
      await clearCart(user.username);
      setCart([]);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, loadCart, emptyCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
