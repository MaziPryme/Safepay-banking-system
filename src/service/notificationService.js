import { mark } from "framer-motion/client";
import api from "../api/axios";


export const notificationService = {
    getAll: (params) => api.get("/notifications", { params }).then((res) => res.data),
    getUnreadCount: () => api.get("/notifications/unread-count").then((res) => res.data),
    markAsRead: (Id) => api.patch(`/notifications/${Id}/read`).then((res) => res.data),
    markAllAsRead: () => api.patch("/notifications/read-all").then((res) => res.data),
    delete: (Id) => api.delete(`/notifications/${Id}`).then((res) => res.data),
}