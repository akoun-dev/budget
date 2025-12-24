-- Migration: 20251224153003_create_budget_months_table
-- Description: Création de la table budget_months avec RLS.

-- Table: budget_months
create table budget_months (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users on delete cascade not null,
    month integer not null check (month >= 1 and month <= 12),
    year integer not null,
    status budget_month_status not null default 'active',
    created_at timestamptz not null default now(),
    unique (user_id, month, year)
);

-- RLS pour budget_months
alter table budget_months enable row level security;
create policy "les utilisateurs peuvent gérer leurs mois de budget" on budget_months
    using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Index pour améliorer les performances de recherche par utilisateur et par mois
create index idx_budget_months_user_month_year on budget_months (user_id, month, year);
