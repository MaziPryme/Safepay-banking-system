import { ROLES, ROLE_DASHBOARD_ROUTE } from "./constants";

export const hasRole = (userRole, allowedRoles = []) => {
    if(!allowedRoles.length) return true;
    return allowedRoles.includes(userRole); 
}

export const getDashboardRouteForRole = (role) => ROLE_DASHBOARD_ROUTE[role] || "/login"

export const isAdmin = (role) => role === ROLES.ADMIN;
export const isBankAdmin = (role) => role === ROLES.BANK_ADMIN;
export const isStaff = (role) => role === ROLES.STAFF;
export const isCustomer = (role) => role === ROLES.CUSTOMER;
export const isCustomerService = (role) => role === ROLES.CUSTOMER_SERVICE;