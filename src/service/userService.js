import api from "../api/axios"

export const userService ={
    getAll: (params) => api.get("/users", { params }).then((res) => res.data),
    getById: (id) => api.get(`/users/${id}`).then((res) => res.data),
    create: (payload) => api.post("/users/create", payload).then((res) => res.data),
    update: (id, payload) => api.put(`users/${id}/update`, payload).then((res) => res.data),
    delete: (Id) => api.delete(`/users/${Id}/delete`).then((res) => res.data),
    changeRole: (id, role) => api.patch(`users/${id}/role`, {role}).then((res) => res.data),
    toggleStatus: (id, status) => api.patch(`/users/${id}/status`, {status}).then((res) => res.data)
}

