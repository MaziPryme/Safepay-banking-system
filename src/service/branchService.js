// import api from "../api/axios";

// export const branchService = {
//     getAll: (params) => api.get("/branches", { params }).then((res) => res.data),
//     getById: (id) => api.get(`/branches/${id}`).then((res) => res.data),
//     create: (payload) => api.post("/branches/create", payload).then((res) => res.data),
//     update: (payload) => api.put(`/branches/${id}/update`, payload).then((res) => res.data),
//     delete: (id) => api.delete(`/branches/${id}/delete`).then((res) => res.data),
// };

import api from "../api/axios";

export const branchService = {
    getAll: (params) => api.get("/branches", {params}).then((response) => response.data),
    getById: (id) => api.get(`/branches/${id}`).then((response) => response.data),
    create: (payload) => api.post(`/branches/create`, payload).then((response) => response.data),
    update: (id, payload) => api.patch(`/branches/${id}/update`, payload).then((response) => response.data),
    delete: (id) => api.delete(`/branches/${id}/delete`).then((response) => response.data)
}