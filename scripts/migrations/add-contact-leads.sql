-- Contact leads: stores submissions from the public /contact form.
-- Two surfaces consume this:
--   1. Public contact form (anon) — INSERT only, never SELECT.
--   2. Admin panel (authenticated) — full read + status management.
--
-- Apply against the Supabase project (same as the other migrations):
--   psql / Supabase SQL editor → run this file once.

create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  restaurant text,
  phone text,
  service text,
  message text not null,
  -- light provenance for spam triage / analytics
  source_path text,
  user_agent text,
  status text not null default 'new' check (status in ('new','contacted','archived','spam')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_leads_created_at_idx
  on public.contact_leads (created_at desc);

-- updated_at auto-touch (function defined in create-client-reports-table.sql;
-- re-create defensively in case this migration runs on a fresh DB).
create or replace function public.touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists contact_leads_touch_updated_at on public.contact_leads;
create trigger contact_leads_touch_updated_at
  before update on public.contact_leads
  for each row execute function public.touch_updated_at();

-- RLS
alter table public.contact_leads enable row level security;

-- Anon (the public form) can INSERT only. No SELECT/UPDATE/DELETE for anon —
-- leads must never be publicly readable.
create policy "anon can submit a lead"
  on public.contact_leads for insert
  to anon
  with check (true);

-- Authenticated (admin) can read and manage everything.
create policy "authenticated reads leads"
  on public.contact_leads for select
  to authenticated
  using (true);

create policy "authenticated updates leads"
  on public.contact_leads for update
  to authenticated
  using (true);

create policy "authenticated deletes leads"
  on public.contact_leads for delete
  to authenticated
  using (true);

-- Column-level grant: anon may INSERT only the user-supplied fields + provenance.
-- (status/id/timestamps are server/DB-controlled.)
grant insert (
  name, email, restaurant, phone, service, message, source_path, user_agent
) on public.contact_leads to anon;
