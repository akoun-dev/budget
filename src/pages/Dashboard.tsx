import React, { useState } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/dashboard/StatsCard";
import EnvelopeCard from "@/components/dashboard/EnvelopeCard";
import BudgetChart from "@/components/dashboard/BudgetChart";
import ExpensesPieChart from "@/components/dashboard/ExpensesPieChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import AddExpenseDialog from "@/components/dialogs/AddExpenseDialog";
import AddIncomeDialog from "@/components/dialogs/AddIncomeDialog";
import { useBudget } from "@/contexts/BudgetContext";
import { formatCurrency, formatPercentage, formatMonth } from "@/lib/formatters";

const Dashboard: React.FC = () => {
  const { summary, envelopes, currency, currentMonth, currentYear } = useBudget();
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const [incomeDialogOpen, setIncomeDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Tableau de Bord</h1>
          <p className="text-muted-foreground capitalize">{formatMonth(currentMonth, currentYear, "fr-FR")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setExpenseDialogOpen(true)}>
            <Plus className="w-4 h-4" />
            Ajouter Dépense
          </Button>
          <Button variant="gradient" className="gap-2" onClick={() => setIncomeDialogOpen(true)}>
            <Plus className="w-4 h-4" />
            Nouveau Revenu
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Revenus Totaux" value={formatCurrency(summary.totalIncome, currency)} icon={TrendingUp} trend={{ value: 5.2, isPositive: true }} variant="primary" delay={0} />
        <StatsCard title="Dépenses Totales" value={formatCurrency(summary.totalExpenses, currency)} icon={TrendingDown} trend={{ value: 2.1, isPositive: false }} variant="danger" delay={50} />
        <StatsCard title="Solde Restant" value={formatCurrency(summary.remainingBalance, currency)} subtitle={`${formatPercentage(100 - summary.percentageUsed)} disponible`} icon={Wallet} variant="success" delay={100} />
        <StatsCard title="Épargne du Mois" value={formatCurrency(400, currency)} subtitle="Objectif: 500€" icon={PiggyBank} variant="warning" delay={150} />
      </div>

      {/* Envelopes Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Mes Enveloppes</h2>
          <Button variant="ghost" size="sm" className="text-primary">Gérer les enveloppes</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {envelopes.map((envelope, index) => (
            <EnvelopeCard key={envelope.id} envelope={envelope} delay={index * 50} />
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetChart />
        <ExpensesPieChart />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions />

      {/* Dialogs */}
      <AddExpenseDialog open={expenseDialogOpen} onOpenChange={setExpenseDialogOpen} />
      <AddIncomeDialog open={incomeDialogOpen} onOpenChange={setIncomeDialogOpen} />
    </div>
  );
};

export default Dashboard;
