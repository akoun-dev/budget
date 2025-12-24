import React, { useState } from "react";
import { Plus, ShoppingCart, Utensils, Shirt, Car, Gamepad2, Filter } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useBudget } from "@/contexts/BudgetContext";
import { formatCurrency, formatDate, formatMonth, formatPercentage } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import AddExpenseDialog from "@/components/dialogs/AddExpenseDialog";

const categories = [
  { id: "1", name: "Courses", icon: ShoppingCart, budget: 250, spent: 180, color: "hsl(168, 76%, 36%)" },
  { id: "2", name: "Restaurants", icon: Utensils, budget: 150, spent: 95, color: "hsl(38, 92%, 50%)" },
  { id: "3", name: "Vêtements", icon: Shirt, budget: 100, spent: 75, color: "hsl(280, 65%, 60%)" },
  { id: "4", name: "Transport", icon: Car, budget: 80, spent: 60, color: "hsl(201, 96%, 46%)" },
  { id: "5", name: "Loisirs", icon: Gamepad2, budget: 100, spent: 45, color: "hsl(340, 75%, 55%)" },
];

const recentExpenses = [
  { id: "1", description: "Carrefour", amount: 85, category: "Courses", date: new Date(2024, 11, 22) },
  { id: "2", description: "Restaurant Le Bistrot", amount: 45, category: "Restaurants", date: new Date(2024, 11, 21) },
  { id: "3", description: "Zara", amount: 75, category: "Vêtements", date: new Date(2024, 11, 20) },
  { id: "4", description: "Essence BP", amount: 60, category: "Transport", date: new Date(2024, 11, 19) },
  { id: "5", description: "Cinéma UGC", amount: 25, category: "Loisirs", date: new Date(2024, 11, 18) },
];

const Expenses: React.FC = () => {
  const { currency, currentMonth, currentYear } = useBudget();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dépenses Variables</h1>
            <p className="text-muted-foreground capitalize">
              {formatMonth(currentMonth, currentYear, "fr-FR")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtrer
            </Button>
            <Button variant="gradient" className="gap-2" onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4" />
              Ajouter Dépense
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="gradient">
            <CardContent className="p-6">
              <p className="text-sm text-primary-foreground/80">Budget Total</p>
              <p className="text-2xl font-bold">{formatCurrency(totalBudget, currency)}</p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Dépensé</p>
              <p className="text-2xl font-bold">{formatCurrency(totalSpent, currency)}</p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Reste</p>
              <p className="text-2xl font-bold text-success">{formatCurrency(totalBudget - totalSpent, currency)}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Categories */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Catégories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories.map((category) => {
                const Icon = category.icon;
                const percentage = (category.spent / category.budget) * 100;
                const isNearLimit = percentage >= 80;

                return (
                  <div key={category.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${category.color}20` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: category.color }} />
                        </div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">{formatCurrency(category.spent, currency)}</span>
                        <span className="text-muted-foreground"> / {formatCurrency(category.budget, currency)}</span>
                      </div>
                    </div>
                    <Progress
                      value={Math.min(percentage, 100)}
                      className="h-2"
                      indicatorColor={isNearLimit ? "hsl(var(--warning))" : category.color}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Recent Expenses */}
          <Card variant="elevated">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Dépenses Récentes</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                Voir tout
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">{expense.category}</Badge>
                      <span>{formatDate(expense.date)}</span>
                    </div>
                  </div>
                  <span className="font-semibold">-{formatCurrency(expense.amount, currency)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <AddExpenseDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </MainLayout>
  );
};

export default Expenses;
