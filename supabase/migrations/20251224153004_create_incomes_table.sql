-- Migration: 20251224153004_create_incomes_table
-- Description: Création de la table incomes avec RLS.

-- Table: incomes
create table incomes (
    id uuid primary key default gen_random_uuid(),
    budget_month_id uuid references budget_months on delete cascade not null,
    source text not null,
    expected_amount numeric(10, 2) not null,
    actual_amount numeric(10, 2) not null default 0.00,
    payment_date date not null,
    deposit_account text,
    status income_status not null default 'expected'
);

-- RLS pour incomes
alter table incomes enable row level security;
create policy "les utilisateurs peuvent gérer leurs revenus" on incomes
    using (exists (select 1 from budget_months where budget_months.id = incomes.budget_month_id and budget_months.user_id = auth.uid()))
    with check (exists (select 1 from budget_months where budget_months.id = incomes.budget_month_id and budget_months.user_id = auth.uid()));

create index idx_incomes_budget_month_id on incomes (budget_month_id);
