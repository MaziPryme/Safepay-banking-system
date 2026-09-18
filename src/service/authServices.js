import api from "../api/axios"

export const authServices = {
    login: (payload) => api.post("/auth/login", payload).then((res) => res.data),
    signup: (payload) => api.post("/auth/signup", payload).then((res) => res.data),
    logout: () => api.post("/auth/logout").then((res) => res.data),
    refresh: () => api.post("/auth/refresh").then((res) => res.data),
    getCurrentUser: () => api.get("auth/me").then((res) => res.data),
    verifyEmail: (payload) => api.post("/auth/verify-email", payload).then((res) => res.data),
    resendVerificationEmail: (email) => api.post("/auth/resend-verification-email", {email}).then((res) => res.data),
    forgotPassword: (email) => api.post("/auth/forgot-password", {email}).then((res) => res.data),
    resendPassword: (payload) => api.post("/auth/resend-password", payload).then((res) => res.data),
    changePassword: (payload) => api.post("/auth/change-password", payload).then((res) => res.data),

}