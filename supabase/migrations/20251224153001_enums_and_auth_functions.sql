-- Migration: 20251224153001_enums_and_auth_functions
-- Description: Création des types ENUM et de la fonction/trigger pour l'intégration de l'authentification Supabase.

-- Création des types ENUM
create type budget_month_status as enum ('active', 'closed');
create type income_status as enum ('expected', 'received');
create type envelope_type as enum ('bills', 'subscriptions', 'variable', 'savings', 'debts', 'custom');
create type bill_status as enum ('pending', 'paid');
create type subscription_status as enum ('active', 'paused', 'cancelled');
create type savings_account_type as enum ('livret_a', 'assurance_vie', 'other');

-- Fonction pour créer un profil lors de l'inscription
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger pour créer un profil
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
