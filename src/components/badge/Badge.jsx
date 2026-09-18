import clsx from "clsx";

// Status pill used across transactions, accounts, cards, tickets.
// status: "success" | "pending" | "failed" | "reversed" | "active" | "inactive" | "frozen"
const STATUS_STYLES = {
  success: "bg-emerald-50 text-emerald-700",
  active: "bg-emerald-50 text-emerald-700",
  approved: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  failed: "bg-red-50 text-red-700",
  rejected: "bg-red-50 text-red-700",
  reversed: "bg-slate-100 text-slate-600",
  inactive: "bg-slate-100 text-slate-600",
  frozen: "bg-sky-50 text-sky-700",
  blocked: "bg-red-50 text-red-700",
};

export default function Badge({ status, children }) {
  const style = STATUS_STYLES[status?.toLowerCase()] || "bg-slate-100 text-slate-600";
  return <span className={clsx("badge", style)}>{children || status}</span>;
}
