import { useQuery } from "@tanstack/react-query"
import PageHeader from "../../../components/pageheader/PageHeader"
import ChartCard from "../../../components/cards/ChartCard";
import StatCard from "../../../components/cards/StatCard";
import { dashboardService } from "../../../service/dashboardService";
import { formatCurrency } from "../../../utils/formatters";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Landmark, Users, Wallet, ArrowLeftRight } from "lucide-react";

export default function AdminDashboard() {
    const { data: statsRes, isLoading: statsLoading } = useQuery({
        queryKey: ["dashboard", "stats", "admin"],
        queryFn: dashboardService.getStats
    });
    const { data: txRes } = useQuery({
        queryKey: ["dashboard", "monthly-transactions"],
        queryFn: dashboardService.getMonthlyTransactions,
    });

    const stats = statsRes?.data || statsRes || {};
    const monthlyTx = txRes?.data || txRes || [];

    return (
        <div >
            <PageHeader  title="Admin Dashboard" subtitle="System-wide overview across every bank on the platform" />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard label="Total Banks" value={statsLoading ? "-" : stats.totalBanks ?? 0} icon={Landmark} accent="primary" />
                <StatCard label="Total Users" value={statsLoading ? "-" : stats.totalUsers ?? 0} icon={Users} accent="secondary" />
                <StatCard label="Total Accounts" value={statsLoading ? "-" : stats.totalAccounts ?? 0} icon={Wallet} accent="accent" />
                <StatCard label="Total Transaction Volume" value={statsLoading ? "-" : formatCurrency(stats.totalAccounts ?? 0)}
                    icon={ArrowLeftRight} accent="primary" />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <ChartCard title="Monthly Transactions" subtitle="Volume across all branks">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyTx}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94A3BB" />
                            <YAxis tick={{ fontSize: 12 }} stroke="#94A3BB" />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#0F766E" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="System Activity" subtitle="Recent logins and admin action">
                    <div>
                        Activity log visualization coming admin activity logs
                    </div>
                </ChartCard>
            </div>
        </div>
    )
}