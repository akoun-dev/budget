import React, { useState } from "react";
import {
  Plus,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
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
import { formatCurrency, formatDate, formatMonth } from "@/lib/formatters";
import AddIncomeDialog from "@/components/dialogs/AddIncomeDialog";

const Income: React.FC = () => {
  const { incomes, currency, currentMonth, currentYear } = useBudget();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalExpected = incomes.reduce((sum, inc) => sum + inc.expectedAmount, 0);
  const totalReceived = incomes.reduce((sum, inc) => sum + inc.actualAmount, 0);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Revenus</h1>
            <p className="text-muted-foreground capitalize">
              {formatMonth(currentMonth, currentYear, "fr-FR")}
            </p>
          </div>
          <Button variant="gradient" className="gap-2" onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4" />
            Ajouter un Revenu
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenus Attendus</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalExpected, currency)}</p>
                </div>
                <div className="p-3 rounded-xl bg-info/10">
                  <Clock className="w-6 h-6 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenus Reçus</p>
                  <p className="text-2xl font-bold text-success">{formatCurrency(totalReceived, currency)}</p>
                </div>
                <div className="p-3 rounded-xl bg-success/10">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="gradient">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-foreground/80">En Attente</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalExpected - totalReceived, currency)}</p>
                </div>
                <div className="p-3 rounded-xl bg-primary-foreground/20">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Income List */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Liste des Revenus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {incomes.map((income) => (
              <div
                key={income.id}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-success/10">
                    <TrendingUp className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold">{income.source}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(income.paymentDate)}</span>
                      <span>•</span>
                      <span>{income.depositAccount}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatCurrency(income.actualAmount || income.expectedAmount, currency)}
                    </p>
                    {income.status === "expected" && (
                      <p className="text-sm text-muted-foreground">
                        Attendu: {formatCurrency(income.expectedAmount, currency)}
                      </p>
                    )}
                  </div>

                  <Badge
                    variant={income.status === "received" ? "default" : "secondary"}
                    className={income.status === "received" ? "bg-success text-success-foreground" : ""}
                  >
                    {income.status === "received" ? "Reçu" : "Attendu"}
                  </Badge>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <AddIncomeDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </MainLayout>
  );
};

export default Income;
