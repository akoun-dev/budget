export type Currency = "EUR" | "FCFA" | "USD";

export interface User {
  id: string;
  email: string;
  name: string;
  currency: Currency;
  country: string;
  createdAt: Date;
}

export interface BudgetMonth {
  id: string;
  userId: string;
  month: number;
  year: number;
  status: "active" | "closed";
  createdAt: Date;
}

export interface Income {
  id: string;
  budgetMonthId: string;
  source: string;
  expectedAmount: number;
  actualAmount: number;
  paymentDate: Date;
  depositAccount: string;
  status: "expected" | "received";
}

export interface Envelope {
  id: string;
  budgetMonthId: string;
  name: string;
  icon: string;
  budgetAmount: number;
  actualAmount: number;
  priority: number;
  color: string;
  type: "bills" | "subscriptions" | "variable" | "savings" | "debts" | "custom";
}

export interface Bill {
  id: string;
  envelopeId: string;
  description: string;
  budgetAmount: number;
  actualAmount: number;
  dueDate: Date;
  status: "pending" | "paid";
}

export interface Subscription {
  id: string;
  envelopeId: string;
  name: string;
  amount: number;
  startDate: Date;
  status: "active" | "paused" | "cancelled";
}

export interface Expense {
  id: string;
  envelopeId: string;
  category: string;
  amount: number;
  date: Date;
  description: string;
}

export interface SavingsAccount {
  id: string;
  envelopeId: string;
  name: string;
  type: "livret_a" | "assurance_vie" | "other";
  targetAmount: number;
  currentAmount: number;
}

export interface Debt {
  id: string;
  envelopeId: string;
  name: string;
  totalAmount: number;
  remainingAmount: number;
  monthlyPayment: number;
  paymentDate: Date;
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpenses: number;
  remainingBalance: number;
  remainingBudget: number;
  percentageUsed: number;
  envelopes: Envelope[];
}
