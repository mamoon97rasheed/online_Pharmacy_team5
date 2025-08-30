import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import { addCartItem, deleteDrug } from "../lib/api";

export default function ProductCard({ product, onDelete }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleAddToCart() {
    if (!user) {
      alert("You need to log in first!");
      return;
    }
    try {
      await addCartItem(user.username, product);
      navigate("/cart");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Something went wrong while adding to cart.");
    }
  }

 async function handleDelete() {
  try {
    await deleteDrug(product.id, user.username);
    if (onDelete) onDelete(product.id); // update catalog view
    alert("Drug deleted successfully");
  } catch (err) {
    const msg =
      err.response?.data ||
      err.message ||
      "Delete failed";
    alert("Delete failed: " + msg);
    console.error("Failed to delete drug:", err);
  }
}

  return (
    <div className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
      <p className="text-blue-600 font-semibold mb-3">₹ {product.price}</p>

      <button
        onClick={handleAddToCart}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mr-2"
      >
        Add to Cart
      </button>

      {user?.role === "ADMIN" && (
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      )}
    </div>
  );
}
