import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BudgetProvider } from "@/contexts/BudgetContext";
import Index from "./pages/Index";
import Income from "./pages/Income";
import Envelopes from "./pages/Envelopes";
import Bills from "./pages/Bills";
import Subscriptions from "./pages/Subscriptions";
import Expenses from "./pages/Expenses";
import Savings from "./pages/Savings";
import Debts from "./pages/Debts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BudgetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/income" element={<Income />} />
            <Route path="/envelopes" element={<Envelopes />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/debts" element={<Debts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </BudgetProvider>
  </QueryClientProvider>
);

export default App;
