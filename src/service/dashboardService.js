import api from "../api/axios";

export const dashboardService = {
    getStats: () => api.get("/dashboard/stats").then((res) => res.data),
    getMonthlyTransactions: () => api.get("/dashboard/monthly-transactions").then((res) => res.data),
    getMonthlyDeposits: () => api.get("/dashboard/monthly-deposits").then((res) => res.data),
    getMonthlyWithdrawals: () => api.get("/dashboard/monthly-withdrawals").then((res) => res.data),
    getRecentActivities: () => api.get("/dashboard/recent-activities").then((res) => res.data),
};