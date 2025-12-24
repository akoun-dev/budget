-- Migration: 20251224153005_create_envelopes_table
-- Description: Création de la table envelopes avec RLS.

-- Table: envelopes
create table envelopes (
    id uuid primary key default gen_random_uuid(),
    budget_month_id uuid references budget_months on delete cascade not null,
    name text not null,
    icon text,
    budget_amount numeric(10, 2) not null,
    actual_amount numeric(10, 2) not null default 0.00,
    priority integer not null default 0,
    color text,
    type envelope_type not null default 'custom'
);

-- RLS pour envelopes
alter table envelopes enable row level security;
create policy "les utilisateurs peuvent gérer leurs enveloppes" on envelopes
    using (exists (select 1 from budget_months where budget_months.id = envelopes.budget_month_id and budget_months.user_id = auth.uid()))
    with check (exists (select 1 from budget_months where budget_months.id = envelopes.budget_month_id and budget_months.user_id = auth.uid()));

create index idx_envelopes_budget_month_id on envelopes (budget_month_id);
