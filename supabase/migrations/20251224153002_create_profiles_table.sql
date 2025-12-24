-- Migration: 20251224153002_create_profiles_table
-- Description: Création de la table profiles (correspondant à l'interface User) avec RLS.

-- Table: profiles (Correspond à l'interface User)
create table profiles (
    id uuid primary key references auth.users on delete cascade,
    email text unique not null,
    name text,
    currency text not null default 'EUR', -- Utilisation de TEXT pour Currency pour la flexibilité
    country text,
    created_at timestamptz not null default now()
);

-- RLS pour profiles
alter table profiles enable row level security;
create policy "utilisateurs peuvent voir leur propre profil" on profiles for select using (auth.uid() = id);
create policy "utilisateurs peuvent mettre à jour leur propre profil" on profiles for update using (auth.uid() = id);
create policy "les utilisateurs peuvent insérer leur propre profil" on profiles for insert with check (auth.uid() = id);
