import api from "../api/axios";


export const bankService = {
    getAll: (params) => api.get("/banks", { params }).then((res) => res.data),
    getById: (id) => api.get(`/banks/${id}`).then((res) => res.data),
    create: (payload) => api.post("/banks/create", payload).then((res) => res.data),
    update: (id, payload) => api.put(`banks/${id}/update`, payload).then((res) => res.data),
    delete: (Id) => api.delete(`/banks/${Id}/delete`).then((res) => res.data),
}