import { Menu, Bell, User, Settings, LogOut } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { notificationService } from "../../service/notificationService";
import Dropdown from "../dropdown/Dropdown";
import DropdownItem from "../dropdown/DropdownItem";
import Avatar from "../avatar/Avatar";

export default function Topbar({ onMenuClick }) {
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();

  // Polled every 60s — good enough for an unread badge without needing websockets.
  const { data: unreadData } = useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: notificationService.getUnreadCount,
    refetchInterval: 60000,
  });
  const unreadCount = unreadData?.data?.count ?? unreadData?.count ?? 0;

  const rolePrefix = role?.replace("_", "-");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-100 bg-white/95 px-4 backdrop-blur sm:px-6">
      <button className="text-slate-500 lg:hidden" onClick={onMenuClick} aria-label="Open menu">
        <Menu size={22} />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/${rolePrefix}/notifications`)}
          className="relative text-slate-500 hover:text-ink"
          aria-label="Notifications"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        <Dropdown
          trigger={
            <button className="flex items-center gap-2">
              <Avatar name={`${user?.firstName || ""} ${user?.lastName || ""}`} size="sm" src={user?.avatarUrl} />
            </button>
          }
        >
          <div className="border-b border-slate-100 px-4 py-2">
            <p className="text-sm font-medium text-ink">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="truncate text-xs text-slate-400">{user?.email}</p>
          </div>
          <DropdownItem to={`/${rolePrefix}/profile`} icon={User}>
            Profile
          </DropdownItem>
          <DropdownItem to={`/${rolePrefix}/settings`} icon={Settings}>
            Settings
          </DropdownItem>
          <DropdownItem onClick={handleLogout} icon={LogOut} danger>
            Logout
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}