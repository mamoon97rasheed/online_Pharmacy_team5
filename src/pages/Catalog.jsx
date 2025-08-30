import { useEffect, useState } from "react";
import { getDrugs } from "../lib/api";
import ProductCard from "../components/ProductCard";

export default function Catalog() {
  const [products, setProducts] = useState([]);

  async function loadProducts() {
    try {
      const data = await getDrugs();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // 🟢 When delete happens, filter it out locally
  function handleDeleteFromCatalog(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onDelete={handleDeleteFromCatalog} />
      ))}
    </div>
  );
}
