import React from "react";
import { Plus, PiggyBank, TrendingUp, Target, Building2 } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useBudget } from "@/contexts/BudgetContext";
import { formatCurrency, formatPercentage, formatMonth } from "@/lib/formatters";

const savingsAccounts = [
  { id: "1", name: "Livret A", type: "livret_a", target: 10000, current: 6500, icon: Building2, color: "hsl(168, 76%, 36%)" },
  { id: "2", name: "Assurance Vie", type: "assurance_vie", target: 20000, current: 8200, icon: TrendingUp, color: "hsl(201, 96%, 46%)" },
  { id: "3", name: "Vacances 2025", type: "other", target: 3000, current: 1800, icon: Target, color: "hsl(38, 92%, 50%)" },
  { id: "4", name: "Fond d'urgence", type: "other", target: 5000, current: 5000, icon: PiggyBank, color: "hsl(152, 69%, 40%)" },
];

const Savings: React.FC = () => {
  const { currency, currentMonth, currentYear } = useBudget();

  const totalSaved = savingsAccounts.reduce((sum, acc) => sum + acc.current, 0);
  const totalTarget = savingsAccounts.reduce((sum, acc) => sum + acc.target, 0);
  const monthlyBudget = 400;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Épargne</h1>
            <p className="text-muted-foreground capitalize">
              {formatMonth(currentMonth, currentYear, "fr-FR")}
            </p>
          </div>
          <Button variant="gradient" className="gap-2">
            <Plus className="w-4 h-4" />
            Nouveau Compte
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card variant="gradient">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-foreground/80">Épargne Totale</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalSaved, currency)}</p>
                </div>
                <div className="p-3 rounded-xl bg-primary-foreground/20">
                  <PiggyBank className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Objectif Total</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalTarget, currency)}</p>
                  <p className="text-sm text-success">{formatPercentage((totalSaved / totalTarget) * 100)} atteint</p>
                </div>
                <div className="p-3 rounded-xl bg-success/10">
                  <Target className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Épargne ce mois</p>
                  <p className="text-2xl font-bold">{formatCurrency(monthlyBudget, currency)}</p>
                  <p className="text-sm text-muted-foreground">Objectif: 500€</p>
                </div>
                <div className="p-3 rounded-xl bg-warning/10">
                  <TrendingUp className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Savings Accounts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savingsAccounts.map((account, index) => {
            const Icon = account.icon;
            const percentage = (account.current / account.target) * 100;
            const isComplete = percentage >= 100;

            return (
              <Card
                key={account.id}
                variant="elevated"
                className="animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${account.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: account.color }} />
                      </div>
                      <div>
                        <p className="font-semibold">{account.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {account.type === "livret_a" ? "Livret A" : 
                           account.type === "assurance_vie" ? "Assurance Vie" : "Objectif"}
                        </p>
                      </div>
                    </div>
                    {isComplete && (
                      <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                        Objectif atteint!
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold">{formatCurrency(account.current, currency)}</span>
                        <span className="text-muted-foreground">/ {formatCurrency(account.target, currency)}</span>
                      </div>
                      <Progress
                        value={Math.min(percentage, 100)}
                        className="h-3"
                        indicatorColor={isComplete ? "hsl(var(--success))" : account.color}
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        {formatPercentage(percentage)} de l'objectif
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Retirer
                      </Button>
                      <Button variant="default" size="sm" className="flex-1">
                        Ajouter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default Savings;
