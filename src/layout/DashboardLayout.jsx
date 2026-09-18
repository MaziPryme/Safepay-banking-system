import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/sidebar/Topbar";
import { div } from "framer-motion/client";

export default function DashboardLayout() {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return(
        <div className="flex min-h-screen bg-surface">
            <Sidebar isMobileOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen (false)} />

            <div className="flex min-h-screen flex-1 flex-col lg:ml-0">
                <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)}/>
                <main className="flex-1 p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}