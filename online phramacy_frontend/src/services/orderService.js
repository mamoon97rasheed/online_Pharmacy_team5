import API from "./api";

const placeOrder = (payload) => API.post("/orders", payload).then(r => r.data);
const getUserOrders = (userId) => API.get(`/orders/user/${userId}`).then(r => r.data);

export default { placeOrder, getUserOrders };
