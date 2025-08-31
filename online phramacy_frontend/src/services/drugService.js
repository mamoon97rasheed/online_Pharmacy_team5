import API from "./api";

const getAll = (params) => API.get("/drugs", { params }).then(r => r.data);
const getById = (id) => API.get(`/drugs/${id}`).then(r => r.data);
const create = (payload) => API.post("/drugs", payload).then(r => r.data);
const update = (id, payload) => API.put(`/drugs/${id}`, payload).then(r => r.data);
const remove = (id) => API.delete(`/drugs/${id}`).then(r => r.data);

export default { getAll, getById, create, update, remove };
