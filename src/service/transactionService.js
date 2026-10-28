import api from "../api/axios";

export const transactionService = {
  getAll: (params) => api.get("/transactions", { params }).then((response) => response.data),
  getMyTransactions: (params) => api.get("/transactions/list", { params }).then((response) => response.data),
  getById: (id) => api.get(`/transactions/${id}`).then((response) => response.data),
  transfer: (payload) => api.post("/transactions/transfer", payload).then((response) => response.data),
  deposit: (payload) => api.post("/transactions/deposit", payload).then((response) => response.data),
  withdraw: (payload) => api.post("/transactions/withdraw", payload).then((response) => response.data),
  getReceipt: (id) => api.get(`/transactions/${id}/receipt`, { responseType: "blob" }).then((response) => response.data),
};