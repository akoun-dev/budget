import React, { createContext, useContext, useState, ReactNode } from "react";
import { Currency, Envelope, Income, DashboardSummary } from "@/types/budget";

interface BudgetContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  currentMonth: number;
  currentYear: number;
  setCurrentMonth: (month: number) => void;
  setCurrentYear: (year: number) => void;
  incomes: Income[];
  envelopes: Envelope[];
  summary: DashboardSummary;
}

const defaultEnvelopes: Envelope[] = [
  {
    id: "1",
    budgetMonthId: "1",
    name: "Factures",
    icon: "FileText",
    budgetAmount: 800,
    actualAmount: 650,
    priority: 1,
    color: "hsl(168 76% 36%)",
    type: "bills",
  },
  {
    id: "2",
    budgetMonthId: "1",
    name: "Abonnements",
    icon: "Repeat",
    budgetAmount: 150,
    actualAmount: 145,
    priority: 2,
    color: "hsl(201 96% 46%)",
    type: "subscriptions",
  },
  {
    id: "3",
    budgetMonthId: "1",
    name: "Dépenses Variables",
    icon: "ShoppingCart",
    budgetAmount: 600,
    actualAmount: 420,
    priority: 3,
    color: "hsl(38 92% 50%)",
    type: "variable",
  },
  {
    id: "4",
    budgetMonthId: "1",
    name: "Épargne",
    icon: "PiggyBank",
    budgetAmount: 400,
    actualAmount: 400,
    priority: 4,
    color: "hsl(152 69% 40%)",
    type: "savings",
  },
  {
    id: "5",
    budgetMonthId: "1",
    name: "Dettes",
    icon: "CreditCard",
    budgetAmount: 300,
    actualAmount: 300,
    priority: 5,
    color: "hsl(340 75% 55%)",
    type: "debts",
  },
];

const defaultIncomes: Income[] = [
  {
    id: "1",
    budgetMonthId: "1",
    source: "Salaire",
    expectedAmount: 2800,
    actualAmount: 2800,
    paymentDate: new Date(2024, 11, 25),
    depositAccount: "Compte Principal",
    status: "received",
  },
  {
    id: "2",
    budgetMonthId: "1",
    source: "Freelance",
    expectedAmount: 500,
    actualAmount: 0,
    paymentDate: new Date(2024, 11, 30),
    depositAccount: "Compte Principal",
    status: "expected",
  },
];

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [currentMonth, setCurrentMonth] = useState(12);
  const [currentYear, setCurrentYear] = useState(2024);
  const [incomes] = useState<Income[]>(defaultIncomes);
  const [envelopes] = useState<Envelope[]>(defaultEnvelopes);

  const totalIncome = incomes.reduce((sum, inc) => sum + inc.actualAmount, 0);
  const totalExpenses = envelopes.reduce((sum, env) => sum + env.actualAmount, 0);
  const totalBudget = envelopes.reduce((sum, env) => sum + env.budgetAmount, 0);

  const summary: DashboardSummary = {
    totalIncome,
    totalExpenses,
    remainingBalance: totalIncome - totalExpenses,
    remainingBudget: totalBudget - totalExpenses,
    percentageUsed: totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0,
    envelopes,
  };

  return (
    <BudgetContext.Provider
      value={{
        currency,
        setCurrency,
        currentMonth,
        currentYear,
        setCurrentMonth,
        setCurrentYear,
        incomes,
        envelopes,
        summary,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = (): BudgetContextType => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
};
