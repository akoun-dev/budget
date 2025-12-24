import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  className?: string;
  delay?: number;
}

const variantStyles = {
  default: {
    card: "",
    icon: "bg-secondary text-foreground",
    trend: "",
  },
  primary: {
    card: "gradient-primary text-primary-foreground",
    icon: "bg-primary-foreground/20 text-primary-foreground",
    trend: "text-primary-foreground/80",
  },
  success: {
    card: "",
    icon: "bg-success/10 text-success",
    trend: "text-success",
  },
  warning: {
    card: "",
    icon: "bg-warning/10 text-warning",
    trend: "text-warning",
  },
  danger: {
    card: "",
    icon: "bg-destructive/10 text-destructive",
    trend: "text-destructive",
  },
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  className,
  delay = 0,
}) => {
  const styles = variantStyles[variant];

  return (
    <Card
      variant={variant === "primary" ? "gradient" : "elevated"}
      className={cn(
        "overflow-hidden animate-slide-up",
        styles.card,
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p
              className={cn(
                "text-sm font-medium",
                variant === "primary" ? "text-primary-foreground/80" : "text-muted-foreground"
              )}
            >
              {title}
            </p>
            <p className="text-2xl lg:text-3xl font-bold tracking-tight">{value}</p>
            {subtitle && (
              <p
                className={cn(
                  "text-sm",
                  variant === "primary" ? "text-primary-foreground/70" : "text-muted-foreground"
                )}
              >
                {subtitle}
              </p>
            )}
            {trend && (
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  styles.trend,
                  trend.isPositive ? "text-success" : "text-destructive"
                )}
              >
                {trend.isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{trend.value}% vs mois précédent</span>
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-xl", styles.icon)}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
