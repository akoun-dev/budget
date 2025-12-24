import React from "react";
import { 
  FileText, 
  Repeat, 
  ShoppingCart, 
  PiggyBank, 
  CreditCard,
  Folder 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Envelope } from "@/types/budget";
import { useBudget } from "@/contexts/BudgetContext";
import { formatCurrency, formatPercentage } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface EnvelopeCardProps {
  envelope: Envelope;
  delay?: number;
}

const iconMap: Record<string, React.ElementType> = {
  FileText: FileText,
  Repeat: Repeat,
  ShoppingCart: ShoppingCart,
  PiggyBank: PiggyBank,
  CreditCard: CreditCard,
  Folder: Folder,
};

const EnvelopeCard: React.FC<EnvelopeCardProps> = ({ envelope, delay = 0 }) => {
  const { currency } = useBudget();
  const Icon = iconMap[envelope.icon] || Folder;
  
  const percentage = envelope.budgetAmount > 0 
    ? (envelope.actualAmount / envelope.budgetAmount) * 100 
    : 0;
  
  const remaining = envelope.budgetAmount - envelope.actualAmount;
  const isOverBudget = remaining < 0;
  const isNearLimit = percentage >= 80 && !isOverBudget;

  return (
    <Card
      variant="elevated"
      className="animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl"
              style={{ backgroundColor: `${envelope.color}15` }}
            >
              <Icon className="w-5 h-5" style={{ color: envelope.color }} />
            </div>
            <CardTitle className="text-base">{envelope.name}</CardTitle>
          </div>
          <span
            className={cn(
              "text-sm font-semibold px-2 py-1 rounded-full",
              isOverBudget
                ? "bg-destructive/10 text-destructive"
                : isNearLimit
                ? "bg-warning/10 text-warning"
                : "bg-success/10 text-success"
            )}
          >
            {formatPercentage(Math.min(percentage, 100))}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
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
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Dépensé: <span className="font-medium text-foreground">{formatCurrency(envelope.actualAmount, currency)}</span>
            </span>
            <span className="text-muted-foreground">
              Budget: <span className="font-medium text-foreground">{formatCurrency(envelope.budgetAmount, currency)}</span>
            </span>
          </div>
        </div>
        
        <div
          className={cn(
            "flex items-center justify-between py-2 px-3 rounded-lg",
            isOverBudget
              ? "bg-destructive/10"
              : "bg-secondary"
          )}
        >
          <span className="text-sm text-muted-foreground">
            {isOverBudget ? "Dépassement" : "Reste"}
          </span>
          <span
            className={cn(
              "font-semibold",
              isOverBudget ? "text-destructive" : "text-success"
            )}
          >
            {isOverBudget ? "-" : ""}{formatCurrency(Math.abs(remaining), currency)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvelopeCard;
