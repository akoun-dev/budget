import React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  Home,
  Car,
  Coffee,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBudget } from "@/contexts/BudgetContext";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: Date;
  icon: React.ElementType;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    description: "Salaire Décembre",
    amount: 2800,
    type: "income",
    category: "Salaire",
    date: new Date(2024, 11, 25),
    icon: ArrowDownRight,
  },
  {
    id: "2",
    description: "Loyer Appartement",
    amount: 650,
    type: "expense",
    category: "Factures",
    date: new Date(2024, 11, 23),
    icon: Home,
  },
  {
    id: "3",
    description: "Courses Carrefour",
    amount: 85,
    type: "expense",
    category: "Courses",
    date: new Date(2024, 11, 22),
    icon: ShoppingCart,
  },
  {
    id: "4",
    description: "Essence",
    amount: 60,
    type: "expense",
    category: "Transport",
    date: new Date(2024, 11, 21),
    icon: Car,
  },
  {
    id: "5",
    description: "Café et déjeuner",
    amount: 25,
    type: "expense",
    category: "Restaurants",
    date: new Date(2024, 11, 20),
    icon: Coffee,
  },
];

const RecentTransactions: React.FC = () => {
  const { currency } = useBudget();

  return (
    <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: "400ms" }}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Transactions Récentes</CardTitle>
        <Button variant="ghost" size="sm" className="text-primary">
          Voir tout
        </Button>
      </CardHeader>
      <CardContent className="space-y-1">
        {mockTransactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-secondary/50",
              "animate-slide-up"
            )}
            style={{ animationDelay: `${400 + index * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  transaction.type === "income"
                    ? "bg-success/10"
                    : "bg-secondary"
                )}
              >
                <transaction.icon
                  className={cn(
                    "w-4 h-4",
                    transaction.type === "income"
                      ? "text-success"
                      : "text-muted-foreground"
                  )}
                />
              </div>
              <div>
                <p className="font-medium text-sm">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">
                  {transaction.category} • {formatDate(transaction.date)}
                </p>
              </div>
            </div>
            <span
              className={cn(
                "font-semibold",
                transaction.type === "income" ? "text-success" : "text-foreground"
              )}
            >
              {transaction.type === "income" ? "+" : "-"}
              {formatCurrency(transaction.amount, currency)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
