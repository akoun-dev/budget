import React from "react";
import { Plus, CreditCard, GraduationCap, Car, Calendar, TrendingDown } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useBudget } from "@/contexts/BudgetContext";
import { formatCurrency, formatPercentage, formatMonth } from "@/lib/formatters";

const debts = [
  { 
    id: "1", 
    name: "Prêt Étudiant", 
    icon: GraduationCap, 
    totalAmount: 15000, 
    remaining: 8500, 
    monthlyPayment: 250,
    paymentDate: 5,
    color: "hsl(340, 75%, 55%)",
    endDate: new Date(2027, 5, 1)
  },
  { 
    id: "2", 
    name: "Crédit Auto", 
    icon: Car, 
    totalAmount: 8000, 
    remaining: 3200, 
    monthlyPayment: 200,
    paymentDate: 10,
    color: "hsl(280, 65%, 60%)",
    endDate: new Date(2025, 8, 1)
  },
  { 
    id: "3", 
    name: "Carte de Crédit", 
    icon: CreditCard, 
    totalAmount: 2000, 
    remaining: 800, 
    monthlyPayment: 100,
    paymentDate: 15,
    color: "hsl(201, 96%, 46%)",
    endDate: new Date(2025, 3, 1)
  },
];

const Debts: React.FC = () => {
  const { currency, currentMonth, currentYear } = useBudget();

  const totalDebt = debts.reduce((sum, debt) => sum + debt.remaining, 0);
  const totalMonthly = debts.reduce((sum, debt) => sum + debt.monthlyPayment, 0);
  const totalPaid = debts.reduce((sum, debt) => sum + (debt.totalAmount - debt.remaining), 0);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dettes</h1>
            <p className="text-muted-foreground capitalize">
              {formatMonth(currentMonth, currentYear, "fr-FR")}
            </p>
          </div>
          <Button variant="gradient" className="gap-2">
            <Plus className="w-4 h-4" />
            Ajouter une Dette
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card variant="elevated" className="border-l-4 border-l-destructive">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Dette Totale</p>
                  <p className="text-2xl font-bold text-destructive">{formatCurrency(totalDebt, currency)}</p>
                </div>
                <div className="p-3 rounded-xl bg-destructive/10">
                  <CreditCard className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Paiement Mensuel</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalMonthly, currency)}</p>
                </div>
                <div className="p-3 rounded-xl bg-warning/10">
                  <Calendar className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Déjà Remboursé</p>
                  <p className="text-2xl font-bold text-success">{formatCurrency(totalPaid, currency)}</p>
                </div>
                <div className="p-3 rounded-xl bg-success/10">
                  <TrendingDown className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Debts List */}
        <div className="space-y-4">
          {debts.map((debt, index) => {
            const Icon = debt.icon;
            const paidPercentage = ((debt.totalAmount - debt.remaining) / debt.totalAmount) * 100;
            const monthsRemaining = Math.ceil(debt.remaining / debt.monthlyPayment);

            return (
              <Card
                key={debt.id}
                variant="elevated"
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="p-4 rounded-xl"
                        style={{ backgroundColor: `${debt.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: debt.color }} />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{debt.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Paiement le {debt.paymentDate} de chaque mois
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 max-w-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Progression</span>
                        <span className="text-sm font-medium text-success">{formatPercentage(paidPercentage)} remboursé</span>
                      </div>
                      <Progress
                        value={paidPercentage}
                        className="h-3"
                        indicatorColor="hsl(var(--success))"
                      />
                      <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                        <span>Payé: {formatCurrency(debt.totalAmount - debt.remaining, currency)}</span>
                        <span>Total: {formatCurrency(debt.totalAmount, currency)}</span>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <p className="text-sm text-muted-foreground">Reste à payer</p>
                      <p className="text-xl font-bold text-destructive">{formatCurrency(debt.remaining, currency)}</p>
                      <p className="text-sm text-muted-foreground">
                        ~{monthsRemaining} mois restants
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button variant="default" size="sm">
                        Payer {formatCurrency(debt.monthlyPayment, currency)}
                      </Button>
                      <Button variant="outline" size="sm">
                        Payer plus
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

export default Debts;
