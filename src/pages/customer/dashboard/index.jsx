import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/pageheader/PageHeader";
import Card from "../../../components/cards/Card";
import EmptyState from "../../../components/empty/EmptyState";
import { accountService } from "../../../service/accountService";
import { transactionService } from "../../../service/transactionService";
import { formatCurrency, formatDate } from "../../../utils/formatters";
import { PAGE_SIZE } from "../../../utils/constants";
import {
  Send,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Folder,
  ArrowUpRight as TxOut,
  ArrowDownLeft as TxIn
} from "lucide-react";

export default function CustomerDashboard() {
  // Fetch user accounts
  const { data: accountsRes, isLoading: accountsLoading } = useQuery({
    queryKey: ["accounts", "me"],
    queryFn: () => accountService.getMyAccounts(),
  });

  // Fetch recent user transactions using limit from contants
  const { data: txRes, isLoading: txLoading } = useQuery({
    queryKey: ["transactions", "me"],
    queryFn: () => transactionService.getMyTransactions({ page: 1, limit: PAGE_SIZE }),
  });

  const accounts = accountsRes?.data || accountsRes || [];
  const transactions = txRes?.data || txRes || [];

  const totalBalance = Array.isArray(accounts)
    ? accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0)
    : 0;

  const quickActions = [
    { label: "Transfer", icon: Send, path: "/customer/transfer" },
    { label: "Deposit", icon: ArrowDownLeft, path: "/customer/deposit" },
    { label: "Withdraw", icon: ArrowUpRight, path: "/customer/withdraw" },
    { label: "Cards", icon: CreditCard, path: "/customer/cards" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Welcome back, there"
        subtitle="Here's what's happening with your money."
      />

      {/* Top Banner: Total Balance & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-4 bg-primary text-white p-6 rounded-2xl flex flex-col justify-between shadow-sm">
          <div>
            <p className="text-sm font-medium text-emerald-100 opacity-90">Total Balance</p>
            <h2 className="text-3xl font-bold mt-2">
              {accountsLoading ? "..." : formatCurrency(totalBalance)}
            </h2>
          </div>
          <p className="text-xs text-emerald-100 opacity-75 mt-6">
            Across {accounts.length} account{accounts.length === 1 ? "" : "s"}
          </p>
        </div>

        <Card className="lg:col-span-8 bg-gray-50/80 p-6 rounded-2xl flex flex-col justify-center border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Quick Actions
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  to={action.path}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-100 hover:border-primary-600 hover:shadow-sm transition-all text-gray-700 hover:text-primary-600 group"
                >
                  <Icon className="w-6 h-6 mb-2 text-emerald-600 group-hover:text-primary-600 transition-colors" />
                  <span className="text-xs font-medium">{action.label}</span>
                </Link>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Your Accounts Section */}
      <div className="pt-2">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Your Accounts</h3>

        {accountsLoading ? (
          <Card className="p-8 text-center text-gray-400">
            Loading accounts...
          </Card>
        ) : accounts.length === 0 ? (
          <EmptyState
            icon={Folder}
            title="No accounts yet"
            description="Contact support to open your first account."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((acc) => (
              <Card key={acc.id} className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase">
                    {acc.accountType || "Savings"}
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    {acc.accountNumber}
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(acc.balance)}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recent Transactions Section */}
      <div className="pt-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-gray-700">Recent Transactions</h3>
          <Link to="/customer/transactions" className="text-xs font-medium text-emerald-600 hover:underline">
            View All
          </Link>
        </div>

        {txLoading ? (
          <Card className="p-8 text-center text-gray-400">
            Loading transactions...
          </Card>
        ) : transactions.length === 0 ? (
          <EmptyState
            title="No recent transactions"
            description="You have not made any transactions yet."
          />
        ) : (
          <Card className="divide-y divide-gray-100 p-0 overflow-hidden">
            {transactions.map((tx) => {
              const isCredit = tx.type?.toLowerCase() === "deposit";
              return (
                <div key={tx.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${isCredit ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                      {isCredit ? <TxIn className="w-4 h-4" /> : <TxOut className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{tx.description || tx.type}</p>
                      <p className="text-[10px] text-gray-400">{formatDate(tx.createdAt)}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold ${isCredit ? "text-emerald-600" : "text-gray-900"}`}>
                    {isCredit ? "+" : "-"}{formatCurrency(tx.amount)}
                  </span>
                </div>
              );
            })}
          </Card>
        )}
      </div>
    </div>
  );
}