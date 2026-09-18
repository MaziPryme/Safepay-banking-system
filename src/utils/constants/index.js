

export const API_BASE_URL = "https://banksystembackend-wtt0.onrender.com/api/v1";

export const ROLES = {
    ADMIN: "admin",
    BANK_ADMIN: "bank_admin",
    STAFF: "staff",
    CUSTOMER: "customer",
    CUSTOMER_SERVICE: "customer_service",
}

export const ROLE_DASHBOARD_ROUTE = {
    [ROLES.ADMIN]: "/admin/dashboard",
    [ROLES.BANK_ADMIN]: "/bank-admin/dashboard",
    [ROLES.STAFF]: "/staff/dashboard",
    [ROLES.CUSTOMER]: "/customer/dashboard",
    [ROLES.CUSTOMER_SERVICE]: "/customer-service/dashboard",    

}

export const STORAGE_KEYS = {
    ACCESS_TOKEN: "bms-access_token",
    USER: "bms-user",
    REMEMBER_ME: "bms-remember_me",
}

export const TRANSACTION_STATUS = {
    PENDING: "pending",
    SUCCESS: "success",
    FAILED: "failed",
    REVERSED: "reversed",
}

export const TRANSACTION_TYPES = {
    DEPOSIT: "deposit",
    WITHDRAWAL: "withdrawal",
    TRANSFER: "transfer",
}

export const PAGE_SIZE = 10;


