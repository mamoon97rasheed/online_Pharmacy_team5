import React, { useEffect, useState } from "react";
import { getDrugs, deleteDrug, updateDrug } from "../lib/api";
import { useAuth } from "../state/AuthContext";



export default function Admin() {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingDrug, setEditingDrug] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", quantityAvailable: "" });

  const { user } = useAuth(); // get logged-in user

  // Load drugs
  const loadDrugs = async () => {
    try {
      setLoading(true);
      const data = await getDrugs();
      setDrugs(data);
    } catch (err) {
      console.error("Error loading drugs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrugs();
  }, []);

  // Delete drug
// ✅ Delete drug with proper error handling
const handleDelete = async (id) => {
  try {
    console.log("Calling delete with:", id, adminUsername);
    const msg = await deleteDrug(id, adminUsername); // backend returns a string
    alert(msg); // ✅ show real message
    if (msg === "Drug deleted successfully") {
      fetchData(); // refresh only if actually deleted
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert(err.response?.data || "Delete failed"); // ✅ show server error if available
  }
};

 

  // Start editing
  const startEdit = (drug) => {
    setEditingDrug(drug.drugId);
    setForm({
      name: drug.name,
      price: drug.price,
      quantityAvailable: drug.quantityAvailable,
    });
  };

  // Save update
  const handleUpdate = async () => {
    if (!user?.username) {
      alert("You must be logged in as admin to update.");
      return;
    }
    try {
      const updated = await updateDrug(editingDrug, form, user.username);
      if (updated) {
        alert("Drug updated successfully");
        setEditingDrug(null);
        loadDrugs();
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed, check console");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Drug Management</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drugs.map((drug) => (
              <tr key={drug.drugId}>
                <td className="border p-2">{drug.drugId}</td>
                <td className="border p-2">
                  {editingDrug === drug.drugId ? (
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="border px-2"
                    />
                  ) : (
                    drug.name
                  )}
                </td>
                <td className="border p-2">
                  {editingDrug === drug.drugId ? (
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="border px-2"
                    />
                  ) : (
                    `$${drug.price}`
                  )}
                </td>
                <td className="border p-2">
                  {editingDrug === drug.drugId ? (
                    <input
                      type="number"
                      value={form.quantityAvailable}
                      onChange={(e) => setForm({ ...form, quantityAvailable: e.target.value })}
                      className="border px-2"
                    />
                  ) : (
                    drug.quantityAvailable
                  )}
                </td>
                <td className="border p-2 space-x-2">
                  {editingDrug === drug.drugId ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={handleUpdate}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-400 text-white px-3 py-1 rounded"
                        onClick={() => setEditingDrug(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                        onClick={() => startEdit(drug)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(drug.drugId)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
