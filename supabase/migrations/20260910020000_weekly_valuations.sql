alter table public.properties
  add column annual_appreciation_rate numeric(6,3) not null default 3 check (annual_appreciation_rate between -25 and 50),
  add column last_valued_at timestamptz;

create table public.property_valuations (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  estimated_value numeric(14,2) not null check (estimated_value >= 0),
  source text not null default 'haven_growth_model' check (source in ('haven_growth_model', 'owner', 'professional')),
  recorded_at timestamptz not null default now()
);

create index property_valuations_owner_property_date_idx on public.property_valuations(owner_id, property_id, recorded_at desc);
alter table public.property_valuations enable row level security;
create policy "owners read their valuations" on public.property_valuations for select using ((select auth.uid()) = owner_id);
create policy "owners add manual valuations" on public.property_valuations for insert with check ((select auth.uid()) = owner_id and source in ('owner', 'professional'));
create trigger valuations_owner_guard before insert or update on public.property_valuations for each row execute function public.enforce_property_owner();

create or replace function public.refresh_weekly_property_valuations()
returns integer language plpgsql security definer set search_path = '' as $$
declare updated_count integer;
begin
  with due as (
    update public.properties
    set current_value = round(current_value * power(1 + annual_appreciation_rate / 100, 7.0 / 365.0), 2), last_valued_at = now(), updated_at = now()
    where last_valued_at is null or last_valued_at < now() - interval '6 days'
    returning id, owner_id, current_value
  ), inserted as (
    insert into public.property_valuations (property_id, owner_id, estimated_value, source)
    select id, owner_id, current_value, 'haven_growth_model' from due returning 1
  ) select count(*) into updated_count from inserted;
  return updated_count;
end;
$$;
revoke all on function public.refresh_weekly_property_valuations() from public, anon, authenticated;

create extension if not exists pg_cron with schema pg_catalog;
select cron.schedule('haven-weekly-property-valuations', '0 4 * * 1', $$select public.refresh_weekly_property_valuations()$$);
