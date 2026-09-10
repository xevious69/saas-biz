create table public.properties (
  id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 120),
  property_type text not null check (property_type in ('house', 'apartment', 'holiday_home', 'studio', 'other')),
  address text not null, currency char(3) not null default 'CHF',
  purchase_price numeric(14,2) not null check (purchase_price >= 0), current_value numeric(14,2) not null check (current_value >= 0),
  purchase_date date, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.mortgages (
  id uuid primary key default gen_random_uuid(), property_id uuid not null references public.properties(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade, lender text not null,
  original_amount numeric(14,2) not null check (original_amount >= 0), outstanding_balance numeric(14,2) not null check (outstanding_balance >= 0),
  interest_rate numeric(7,4) not null check (interest_rate >= 0 and interest_rate <= 100), monthly_payment numeric(12,2) not null check (monthly_payment >= 0),
  started_on date, fixed_until date, created_at timestamptz not null default now()
);
create table public.cashflow_entries (
  id uuid primary key default gen_random_uuid(), property_id uuid not null references public.properties(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade, entry_type text not null check (entry_type in ('income', 'expense')),
  category text not null, description text, amount numeric(12,2) not null check (amount > 0), occurred_on date not null,
  recurrence text not null default 'once' check (recurrence in ('once', 'monthly', 'quarterly', 'yearly')), created_at timestamptz not null default now()
);
create index properties_owner_id_idx on public.properties(owner_id);
create index mortgages_owner_property_idx on public.mortgages(owner_id, property_id);
create index cashflow_owner_property_date_idx on public.cashflow_entries(owner_id, property_id, occurred_on desc);
alter table public.properties enable row level security;
alter table public.mortgages enable row level security;
alter table public.cashflow_entries enable row level security;
create policy "owners manage their properties" on public.properties for all using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
create policy "owners manage their mortgages" on public.mortgages for all using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
create policy "owners manage their cashflow" on public.cashflow_entries for all using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
create or replace function public.enforce_property_owner() returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if not exists (select 1 from public.properties where id = new.property_id and owner_id = new.owner_id) then raise exception 'property does not belong to owner'; end if;
  return new;
end;
$$;
create trigger mortgages_owner_guard before insert or update on public.mortgages for each row execute function public.enforce_property_owner();
create trigger cashflow_owner_guard before insert or update on public.cashflow_entries for each row execute function public.enforce_property_owner();
