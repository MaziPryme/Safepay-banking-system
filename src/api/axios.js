import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { getAccessToken, setAccessToken, clearAccessToken, clearAuthStorage } from "../utils/tokenHelper";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor 

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;

        const isAuthEndpoint = originalRequest?.url?.includes("/auth/login") || originalRequest?.
        url?.includes("/auth/refresh");

        if (status === 401 && !originalRequest._retry && !isAuthEndpoint){
            if(isRefreshing){
                return new Promise((resolve, reject) => {
                    pendingQueue.push({resolve, reject});
                })
                .then((newToken) => { 
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest)
                })
                .catch((error) => Promise.reject(error));
            }
            originalRequest._retry = true;
            isRefreshing = true;

            try{
                const { data } = await axios.postForm(`${API_BASE_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );
                const newAccessToken = data?.data?.accessToken || data?.accessToken;
                setAccessToken(newAccessToken);
                processQueue(null, newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            }catch(refreshError){
                processQueue(refreshError, null ); 
                clearAuthStorage();
                window.location.href = "/login";
                return Promise.reject(refreshError)
            }finally{
                isRefreshing = false;
            }
        }
        return Promise.reject(error)
    }
)

export default api;