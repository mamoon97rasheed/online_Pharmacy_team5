import API from "./api";

const getAll = () => API.get("/members").then(r => r.data);
const getById = (id) => API.get(`/members/${id}`).then(r => r.data);
const update = (id, payload) => API.put(`/members/${id}`, payload).then(r => r.data);
const approve = (id) => API.put(`/members/${id}/approve`);
const disable = (id) => API.put(`/members/${id}/disable`);
const remove = (id) => API.delete(`/members/${id}`);

export default { getAll, getById, update, approve, disable, remove };
