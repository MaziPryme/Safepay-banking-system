import { Link } from "react-router-dom";
import clsx from "clsx";

// A single row inside a <Dropdown>. Renders as a <Link> if `to` is passed, else a <button>.
export default function DropdownItem({ to, onClick, icon: Icon, children, danger = false }) {
  const classes = clsx(
    "flex w-full items-center gap-2 px-4 py-2 text-sm text-left transition-colors",
    danger ? "text-red-600 hover:bg-red-50" : "text-ink hover:bg-slate-50"
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {Icon && <Icon size={16} />}
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}