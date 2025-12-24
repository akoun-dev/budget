import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBudget } from "@/contexts/BudgetContext";
import { formatCurrency, formatPercentage } from "@/lib/formatters";

const COLORS = [
  "hsl(168, 76%, 36%)",
  "hsl(201, 96%, 46%)",
  "hsl(38, 92%, 50%)",
  "hsl(152, 69%, 40%)",
  "hsl(340, 75%, 55%)",
  "hsl(280, 65%, 60%)",
];

const ExpensesPieChart: React.FC = () => {
  const { envelopes, currency } = useBudget();

  const data = envelopes.map((env, index) => ({
    name: env.name,
    value: env.actualAmount,
    color: COLORS[index % COLORS.length],
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percentage = ((item.value / total) * 100);
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold" style={{ color: item.payload.color }}>
            {item.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(item.value, currency)} ({formatPercentage(percentage)})
          </p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: "300ms" }}>
      <CardHeader>
        <CardTitle>Répartition des Dépenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={renderLegend} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">Total des dépenses</p>
          <p className="text-2xl font-bold text-foreground">
            {formatCurrency(total, currency)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesPieChart;
