import api from "../api/axios";

export const accountService = {
  getAll: (params) => api.get("/accounts", { params }).then((response) => response.data),
  getById: (id) => api.get(`/accounts/${id}`).then((response) => response.data),
  getMyAccounts: (params) => api.get("/accounts/me", { params }).then((response) => response.data),
  create: (payload) => api.post("/accounts/create", payload).then((response) => response.data),
  update: (id, payload) => api.put(`/accounts/${id}/update`, payload).then((response) => response.data),
  freeze: (id) => api.put(`/accounts/${id}/freeze`).then((response) => response.data),
  unfreeze: (id) => api.put(`/accounts/${id}/unfreeze`).then((response) => response.data),
  close: (id) => api.delete(`/accounts/${id}/close`).then((response) => response.data),
  getBalance: (id) => api.get(`/accounts/${id}/balance`).then((response) => response.data),
};