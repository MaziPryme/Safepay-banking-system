import { STORAGE_KEYS } from "./constants/index";

export const getAccessToken = () =>  localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

export const setAccessToken = (token) => {
    if(token) localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
}

export const clearAccessToken = () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
}

export const getStoredUser = () => {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? JSON.parse(raw) : null;
}

export const setStoredUser = (user) => {
    if(user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export const clearStoredUser = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
}

export const clearAuthStorage = () => {
    clearAccessToken();
    clearStoredUser();
}
