
import { useQuery } from "@tanstack/react-query";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Building2, Users, Wallet, ArrowLeftRight } from "lucide-react"
import PageHeader from "../../../components/pageheader/PageHeader";
import ChartCard from "../../../components/cards/ChartCard"
import { dashboardService } from "../../../service/dashboardService"
import { formatCurrency } from "../../../utils/formatters";
import StatCard from "../../../components/cards/StatCard"

export default function BankAdminDashboard() {
    const { data: statsRes, isLoading } = useQuery({
        queryKey: ["dashboard", "stats", "bank-admin"],
        queryFn: dashboardService.getStats
    })
    const { data: depositsRes } = useQuery({
        queryKey: ["dashboard", "monthly-deposits"],
        queryFn: dashboardService.getMonthlyDeposits,
    })

    const stats = statsRes?.data || statsRes || {}
    const deposits = depositsRes?.data || depositsRes || []

    return (
        <div>
            <PageHeader title="Bank Admin Dashboard"
                subtitle="Overview of your bank's,branches,staff, and customers." />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard label="Branches" value={isLoading ? "~" : stats.TotalBranches ?? 0}
                    icon={Building2} accent="primary" />
                <StatCard label="Staff" value={isLoading ? "~" : stats.TotalStaff ?? 0}
                    icon={Users} accent="primary" />
                <StatCard label="Customers" value={isLoading ? "~" : stats.TotalCustomers ?? 0}
                    icon={Users} accent="primary" />
                <StatCard label="Total Deposits" value={isLoading ? "~" : formatCurrency(stats.TotalDeposits)}
                    icon={Wallet} accent="primary" />
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <ChartCard title="Monthly Deposits" subtitle="Across all branches">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={deposits}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94A3BB" />
                            <YAxis tick={{ fontSize: 12 }} stroke="#94A3BB" />
                            <Tooltip />
                            <Bar dataKey="amount" fill="#14B8A6" radius={[6, 6, 0,0 ]}/>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="Recent Transactions" subtitle="Latest activity across your bank">
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                        See full list of transaction page
                    </div>
                </ChartCard>
            </div>
        </div>
    )
}