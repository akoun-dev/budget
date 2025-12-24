import React from "react";
import { Plus, Play, Pause, Trash2, Calendar, MoreVertical } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBudget } from "@/contexts/BudgetContext";
import { formatCurrency, formatMonth } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const mockSubscriptions = [
  { id: "1", name: "Netflix", amount: 15.99, status: "active" as const, startDate: new Date(2023, 5, 1), color: "#E50914" },
  { id: "2", name: "Spotify", amount: 9.99, status: "active" as const, startDate: new Date(2022, 8, 15), color: "#1DB954" },
  { id: "3", name: "Disney+", amount: 8.99, status: "active" as const, startDate: new Date(2024, 0, 1), color: "#113CCF" },
  { id: "4", name: "Amazon Prime", amount: 6.99, status: "paused" as const, startDate: new Date(2023, 2, 10), color: "#FF9900" },
  { id: "5", name: "iCloud", amount: 2.99, status: "active" as const, startDate: new Date(2021, 11, 1), color: "#157EFB" },
];

const Subscriptions: React.FC = () => {
  const { currency, currentMonth, currentYear } = useBudget();

  const activeSubscriptions = mockSubscriptions.filter(s => s.status === "active");
  const monthlyTotal = activeSubscriptions.reduce((sum, sub) => sum + sub.amount, 0);
  const yearlyTotal = monthlyTotal * 12;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Abonnements</h1>
            <p className="text-muted-foreground capitalize">
              {formatMonth(currentMonth, currentYear, "fr-FR")}
            </p>
          </div>
          <Button variant="gradient" className="gap-2">
            <Plus className="w-4 h-4" />
            Nouvel Abonnement
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card variant="gradient">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-foreground/80">Coût Mensuel</p>
                  <p className="text-2xl font-bold">{formatCurrency(monthlyTotal, currency)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Coût Annuel</p>
                  <p className="text-2xl font-bold">{formatCurrency(yearlyTotal, currency)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Abonnements Actifs</p>
                  <p className="text-2xl font-bold text-success">{activeSubscriptions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscriptions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockSubscriptions.map((subscription, index) => (
            <Card
              key={subscription.id}
              variant="elevated"
              className={cn(
                "animate-scale-in",
                subscription.status === "paused" && "opacity-60"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-primary-foreground"
                      style={{ backgroundColor: subscription.color }}
                    >
                      {subscription.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{subscription.name}</p>
                      <Badge
                        variant={subscription.status === "active" ? "default" : "secondary"}
                        className={subscription.status === "active" ? "bg-success text-success-foreground" : ""}
                      >
                        {subscription.status === "active" ? "Actif" : "En pause"}
                      </Badge>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {subscription.status === "active" ? (
                        <DropdownMenuItem>
                          <Pause className="w-4 h-4 mr-2" />
                          Mettre en pause
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>
                          <Play className="w-4 h-4 mr-2" />
                          Réactiver
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Résilier
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Montant mensuel</span>
                    <span className="text-xl font-bold">{formatCurrency(subscription.amount, currency)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Depuis {subscription.startDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Subscriptions;
