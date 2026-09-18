import { format, formatDistanceToNow, parseISO } from "date-fns";

// formatCurrency(1500000) -> "₦1,500,000.00"
export const formatCurrency = (amount, currency = "NGN") => {
  const value = Number(amount) || 0;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
};

// formatDate("2026-07-17T10:00:00Z") -> "17 Jul 2026"
export const formatDate = (dateString, pattern = "dd MMM yyyy") => {
  if (!dateString) return "-";
  try {
    const date = typeof dateString === "string" ? parseISO(dateString) : dateString;
    return format(date, pattern);
  } catch {
    return "-";
  }
};

export const formatDateTime = (dateString) => formatDate(dateString, "dd MMM yyyy, h:mm a");

// formatRelativeTime("2026-07-17T10:00:00Z") -> "3 hours ago"
export const formatRelativeTime = (dateString) => {
  if (!dateString) return "-";
  try {
    const date = typeof dateString === "string" ? parseISO(dateString) : dateString;
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return "-";
  }
};

// Masks an account number for display, e.g. "0123456789" -> "****6789"
export const maskAccountNumber = (accountNumber = "") => {
  if (accountNumber.length <= 4) return accountNumber;
  return `****${accountNumber.slice(-4)}`;
};