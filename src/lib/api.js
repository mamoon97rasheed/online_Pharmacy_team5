import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8080'
});

// ---------------- AUTH ----------------

export async function login(username, password) {
  const res = await api.post('/api/auth/login', { username, password });
  return res.data;
}

export async function register(payload) {
  // payload: { username, password, role? }
  const res = await api.post('/api/auth/register', payload);
  return res.data;
}

// ---------------- DRUGS ----------------

export async function getDrugs() {
  const res = await api.get('/api/drugs');
  return res.data;
}

// ✅ Add drug (admin only)
export async function addDrug(drug, adminUsername) {
  const res = await api.post('/api/drugs', drug, {
    params: { adminUsername }   // backend expects @RequestParam
  });
  return res.data;
}

// ✅ Update drug (admin only)
export async function updateDrug(drugId, drug, adminUsername) {
  const res = await api.put(`/api/drugs/${drugId}`, drug, {
    params: { adminUsername }   // backend expects @RequestParam
  });
  return res.data;
}

// ✅ Delete drug (admin only)
export async function deleteDrug(id, adminUsername) {
  const res = await api.delete(`/api/drugs/${id}`, {
    params: { adminUsername }   // backend expects @RequestParam
  });
  return res.data;
}

// ---------------- CART ----------------

export async function addCartItem(username, product) {
  const res = await api.post('/api/cart/add', null, {
    params: {
      username,
      drugId: product.drugId,  // ✅ backend expects drugId
      quantity: 1
    }
  });
  return res.data;
}

export async function viewCart(username) {
  const res = await api.get('/api/cart/view', {
    params: { username }
  });
  return res.data;
}

export async function clearCart(username) {
  const res = await api.delete('/api/cart/clear', {
    params: { username }
  });
  return res.data;
}

// ---------------- ORDERS ----------------

export async function placeOrder(username) {
  const res = await api.post('/api/orders/place', null, {
    params: { username }
  });
  return res.data;
}

export async function getOrders(username) {
  const res = await api.get(`/api/orders/user/${encodeURIComponent(username)}`);
  return res.data;
}
