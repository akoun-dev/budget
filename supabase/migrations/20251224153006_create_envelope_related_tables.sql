-- Migration: 20251224153006_create_envelope_related_tables
-- Description: Création des tables bills, subscriptions, expenses, savings_accounts, et debts, toutes liées à la table envelopes.

-- Table: bills
create table bills (
    id uuid primary key default gen_random_uuid(),
    envelope_id uuid references envelopes on delete cascade not null,
    description text not null,
    budget_amount numeric(10, 2) not null,
    actual_amount numeric(10, 2) not null default 0.00,
    due_date date not null,
    status bill_status not null default 'pending'
);

-- RLS pour bills
alter table bills enable row level security;
create policy "les utilisateurs peuvent gérer leurs factures" on bills
    using (exists (select 1 from envelopes e join budget_months bm on e.budget_month_id = bm.id where e.id = bills.envelope_id and bm.user_id = auth.uid()))
    with check (exists (select 1 from envelopes e join budget_months bm on e.budget_month_id = bm.id where e.id = bills.envelope_id and bm.user_id = auth.uid()));

-- Table: subscriptions
create table subscriptions (
    id uuid primary key default gen_random_uuid(),
    envelope_id uuid references envelopes on delete cascade not null,
    name text not null,
    amount numeric(10, 2) not null,
    start_date date not null,
    status subscription_status not null default 'active'
);

-- RLS pour subscriptions
alter table subscriptions enable row level security;
create policy "les utilisateurs peuvent gérer leurs abonnements" on subscriptions
    using (exists (select 1 from envelopes e join budget_months bm on e.budget_month_id = bm.id where e.id = subscriptions.envelope_id and bm.user_id = auth.uid()))
    with check (exists (select 1 from envelopes e join budget_months bm on e.budget_month_id = bm.id where e.id = subscriptions.envelope_id and bm.user_id = auth.uid()));

-- Table: expenses
create table expenses (
    id uuid primary key default gen_random_uuid(),
    envelope_id uuid references envelopes on delete cascade not null,
    category text,
    amount numeric(10, 2) not null,
    date date not null default now(),
    description text
);

-- RLS pour expenses
alter table expenses enable row level security;
create policy "les utilisateurs peuvent gérer leurs dépenses" on expenses
    using (exists (select 1 from envelopes e join budget_months bm on e.budget_month_id = bm.id where e.id = expenses.envelope_id and bm.user_id = auth.uid()))
    with check (exists (select 1 from envelopes e join budget_months bm on e.budget_month_id = bm.id where e.id = expenses.envelope_id and bm.user_id = auth.uid()));

create index idx_expenses_envelope_id on expenses (envelope_id);

-- Table: savings_accounts
create table savings_accounts (
    id uuid primary key default gen_random_uuid(),
    envelope_id uuid references envelopes on delete cascade not null,
    name text not null,
    type savings_account_type not null default 'other',
    target_amount numeric(10, 2) not null,
    current_amount numeric(10, 2) not null default 0.00
);

-- RLS pour savings_accounts
alter table savings_accounts enable row level security;
create policy "les utilisateurs peuvent gérer leurs comptes d'épargne" on savings_accounts
    using (exists (select 1 from envelopes e join budget_months bm on e.budget_month_id = bm.id where e.id = savings_accounts.envelope_id and bm.user_id = auth.uid()))
    with check (exists (select 1 from envelopes e join budget_months bm on e.budget_month_id = bm.id where e.id = savings_accounts.envelope_id and bm.user_id = auth.uid()));

-- Table: debts
create table debts (
    id uuid primary key default gen_random_uuid(),
    envelope_id uuid references envelopes on delete cascade not null,
    name text not null,
    total_amount numeric(10, 2) not null,
    remaining_amount numeric(10, 2) not null,
    monthly_payment numeric(10, 2) not null,
    payment_date date not null
);

-- RLS pour debts
alter table debts enable row level security;
create policy "les utilisateurs peuvent gérer leurs dettes" on debts
    using (exists (select 1 from envelopes e join budget_months bm on e.budget_month_id = bm.id where e.id = debts.envelope_id and bm.user_id = auth.uid()))
    with check (exists (select 1 from envelopes e join budget_months bm on e.budget_month_id = bm.id where e.id = debts.envelope_id and bm.user_id = auth.uid()));
