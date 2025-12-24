import { Currency } from "@/types/budget";

export const formatCurrency = (amount: number, currency: Currency = "EUR"): string => {
  const formats: Record<Currency, { locale: string; currency: string }> = {
    EUR: { locale: "fr-FR", currency: "EUR" },
    USD: { locale: "en-US", currency: "USD" },
    FCFA: { locale: "fr-FR", currency: "XOF" },
  };

  const format = formats[currency];
  
  return new Intl.NumberFormat(format.locale, {
    style: "currency",
    currency: format.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: Date, locale: string = "fr-FR"): string => {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const formatMonth = (month: number, year: number, locale: string = "fr-FR"): string => {
  const date = new Date(year, month - 1);
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(date);
};

export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

export const getMonthName = (month: number, locale: string = "fr-FR"): string => {
  const date = new Date(2024, month - 1);
  return new Intl.DateTimeFormat(locale, { month: "long" }).format(date);
};
