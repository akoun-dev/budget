import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.4";

// Fonction utilitaire pour obtenir l'ID utilisateur à partir du JWT
function getUserId(req: Request): string | null {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.substring(7);
  try {
    // Note: En production, vous devriez utiliser un JWT verifier plus robuste
    // Pour l'exemple, nous allons juste décoder la partie payload (partie 2 du JWT)
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub; // 'sub' est l'ID utilisateur dans le JWT Supabase
  } catch (e) {
    console.error("Erreur de décodage JWT:", e);
    return null;
  }
}

serve(async (req) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Non autorisé" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Initialisation du client Supabase
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // 1. Récupérer le mois de budget actif pour l'utilisateur
    const { data: budgetMonth, error: monthError } = await supabaseClient
      .from("budget_months")
      .select("id")
      .eq("user_id", userId)
      .eq("status", "active")
      .single();

    if (monthError || !budgetMonth) {
      return new Response(
        JSON.stringify({
          error: "Mois de budget actif non trouvé",
          details: monthError?.message,
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const budgetMonthId = budgetMonth.id;

    // 2. Récupérer les revenus
    const { data: incomes, error: incomesError } = await supabaseClient
      .from("incomes")
      .select("actual_amount")
      .eq("budget_month_id", budgetMonthId)
      .eq("status", "received");

    if (incomesError) throw incomesError;

    const totalIncome = incomes.reduce(
      (sum, income) => sum + income.actual_amount,
      0
    );

    // 3. Récupérer les enveloppes
    const { data: envelopes, error: envelopesError } = await supabaseClient
      .from("envelopes")
      .select("budget_amount, actual_amount, name, color, icon, type, id")
      .eq("budget_month_id", budgetMonthId);

    if (envelopesError) throw envelopesError;

    const totalExpenses = envelopes.reduce(
      (sum, envelope) => sum + envelope.actual_amount,
      0
    );
    const totalBudget = envelopes.reduce(
      (sum, envelope) => sum + envelope.budget_amount,
      0
    );

    const remainingBalance = totalIncome - totalExpenses;
    const remainingBudget = totalBudget - totalExpenses;
    const percentageUsed = totalBudget > 0
      ? (totalExpenses / totalBudget) * 100
      : 0;

    const summary = {
      totalIncome,
      totalExpenses,
      remainingBalance,
      remainingBudget,
      percentageUsed,
      envelopes,
    };

    return new Response(JSON.stringify(summary), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erreur dans la fonction Edge:", error);
    return new Response(
      JSON.stringify({ error: "Erreur interne du serveur", details: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
