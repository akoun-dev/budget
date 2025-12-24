import React from "react";
import { Plus, Home, Zap, Wifi, Droplets, Calendar, CheckCircle2, Clock } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBudget } from "@/contexts/BudgetContext";
import { formatCurrency, formatMonth } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const mockBills = [
  { id: "1", description: "Loyer Appartement", icon: Home, budget: 650, actual: 650, dueDate: new Date(2024, 11, 1), status: "paid" as const },
  { id: "2", description: "Électricité EDF", icon: Zap, budget: 85, actual: 0, dueDate: new Date(2024, 11, 15), status: "pending" as const },
  { id: "3", description: "Internet Free", icon: Wifi, budget: 40, actual: 40, dueDate: new Date(2024, 11, 5), status: "paid" as const },
  { id: "4", description: "Eau", icon: Droplets, budget: 35, actual: 0, dueDate: new Date(2024, 11, 20), status: "pending" as const },
];

const Bills: React.FC = () => {
  const { currency, currentMonth, currentYear } = useBudget();

  const totalBudget = mockBills.reduce((sum, bill) => sum + bill.budget, 0);
  const totalPaid = mockBills.filter(b => b.status === "paid").reduce((sum, bill) => sum + bill.actual, 0);
  const pendingCount = mockBills.filter(b => b.status === "pending").length;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Factures</h1>
            <p className="text-muted-foreground capitalize">
              {formatMonth(currentMonth, currentYear, "fr-FR")}
            </p>
          </div>
          <Button variant="gradient" className="gap-2">
            <Plus className="w-4 h-4" />
            Ajouter une Facture
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Budget Factures</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalBudget, currency)}</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <Home className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Payées</p>
                  <p className="text-2xl font-bold text-success">{formatCurrency(totalPaid, currency)}</p>
                </div>
                <div className="p-3 rounded-xl bg-success/10">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">En Attente</p>
                  <p className="text-2xl font-bold text-warning">{pendingCount} factures</p>
                </div>
                <div className="p-3 rounded-xl bg-warning/10">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bills List */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Liste des Factures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockBills.map((bill) => {
              const Icon = bill.icon;
              const isPaid = bill.status === "paid";

              return (
                <div
                  key={bill.id}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl transition-colors",
                    isPaid ? "bg-success/5" : "bg-warning/5"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-xl",
                      isPaid ? "bg-success/10" : "bg-warning/10"
                    )}>
                      <Icon className={cn("w-5 h-5", isPaid ? "text-success" : "text-warning")} />
                    </div>
                    <div>
                      <p className="font-semibold">{bill.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Échéance: {bill.dueDate.toLocaleDateString("fr-FR")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(bill.budget, currency)}</p>
                    </div>

                    <Badge
                      variant={isPaid ? "default" : "secondary"}
                      className={isPaid ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"}
                    >
                      {isPaid ? "Payée" : "En attente"}
                    </Badge>

                    {!isPaid && (
                      <Button size="sm" variant="outline">
                        Marquer payée
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Bills;
