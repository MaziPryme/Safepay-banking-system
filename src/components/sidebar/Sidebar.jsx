import { NavLink } from "react-router-dom";
import { Landmark, X } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../../context/AuthContext";
import { sidebarMenus } from "./SidebarMenu";

// Renders only the menu items belonging to the logged-in user's role (from sidebarMenus.js).
// isMobileOpen/onClose control the slide-in behaviour on small screens.
export default function Sidebar({ isMobileOpen, onClose }) {
  const { role } = useAuth();
  const menuItems = sidebarMenus[role] || [];

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-100 bg-white transition-transform duration-200 lg:static lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-2 font-semibold text-primary">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Landmark size={16} />
            </span>
            KhristBank
          </div>
          <button className="lg:hidden text-slate-400" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive ? "bg-primary-50 text-primary" : "text-slate-500 hover:bg-slate-50 hover:text-ink"
                )
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}