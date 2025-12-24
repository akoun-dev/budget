import React from "react";
import { Plus, Settings2, ArrowUpDown } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useBudget } from "@/contexts/BudgetContext";
import { formatCurrency, formatPercentage, formatMonth } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const Envelopes: React.FC = () => {
  const { envelopes, currency, currentMonth, currentYear, summary } = useBudget();

  const totalBudget = envelopes.reduce((sum, env) => sum + env.budgetAmount, 0);
  const totalSpent = envelopes.reduce((sum, env) => sum + env.actualAmount, 0);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Enveloppes</h1>
            <p className="text-muted-foreground capitalize">
              {formatMonth(currentMonth, currentYear, "fr-FR")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <ArrowUpDown className="w-4 h-4" />
              Réorganiser
            </Button>
            <Button variant="gradient" className="gap-2">
              <Plus className="w-4 h-4" />
              Nouvelle Enveloppe
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card variant="gradient">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-primary-foreground/80">Budget Total</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalBudget, currency)}</p>
                </div>
                <Progress value={summary.percentageUsed} className="h-3" indicatorColor="hsl(var(--primary-foreground))" />
                <div className="flex items-center justify-between text-sm text-primary-foreground/70">
                  <span>Dépensé: {formatCurrency(totalSpent, currency)}</span>
                  <span>{formatPercentage(summary.percentageUsed)} utilisé</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Budget Restant</p>
                  <p className="text-2xl font-bold text-success">{formatCurrency(totalBudget - totalSpent, currency)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 rounded-lg bg-secondary">
                    <p className="text-muted-foreground">Enveloppes</p>
                    <p className="font-semibold">{envelopes.length}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary">
                    <p className="text-muted-foreground">En alerte</p>
                    <p className="font-semibold text-warning">
                      {envelopes.filter(e => (e.actualAmount / e.budgetAmount) >= 0.8).length}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Envelopes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {envelopes.map((envelope, index) => {
            const percentage = (envelope.actualAmount / envelope.budgetAmount) * 100;
            const isOverBudget = percentage > 100;
            const isNearLimit = percentage >= 80 && !isOverBudget;
            const remaining = envelope.budgetAmount - envelope.actualAmount;

            return (
              <Card
                key={envelope.id}
                variant="elevated"
                className="animate-scale-in cursor-pointer hover:shadow-lg"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: envelope.color }}
                      />
                      <CardTitle className="text-base">{envelope.name}</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progression</span>
                      <span
                        className={cn(
                          "font-semibold",
                          isOverBudget ? "text-destructive" : isNearLimit ? "text-warning" : "text-success"
                        )}
                      >
                        {formatPercentage(Math.min(percentage, 100))}
                      </span>
                    </div>
                    <Progress
                      value={Math.min(percentage, 100)}
                      className="h-2"
                      indicatorColor={
                        isOverBudget
                          ? "hsl(var(--destructive))"
                          : isNearLimit
                          ? "hsl(var(--warning))"
                          : envelope.color
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Dépensé</p>
                      <p className="font-semibold">{formatCurrency(envelope.actualAmount, currency)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Budget</p>
                      <p className="font-semibold">{formatCurrency(envelope.budgetAmount, currency)}</p>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "p-3 rounded-lg text-center",
                      isOverBudget ? "bg-destructive/10" : "bg-success/10"
                    )}
                  >
                    <p className="text-sm text-muted-foreground">
                      {isOverBudget ? "Dépassement" : "Reste"}
                    </p>
                    <p
                      className={cn(
                        "font-bold",
                        isOverBudget ? "text-destructive" : "text-success"
                      )}
                    >
                      {isOverBudget ? "-" : ""}{formatCurrency(Math.abs(remaining), currency)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Add New Envelope Card */}
          <Card
            variant="default"
            className="border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors flex items-center justify-center min-h-[280px]"
          >
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-muted-foreground">Créer une enveloppe</p>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Envelopes;
