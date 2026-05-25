-- Team-wide API keys for the wireframe MCP server. Mirrors the pattern of
-- public.client_api_keys: SHA-256 hash + visible prefix, plaintext returned
-- exactly once at mint time. Used by /api/mcp to authenticate AI agents.

create table if not exists public.wireframe_mcp_keys (
  id           uuid primary key default gen_random_uuid(),
  label        text not null,
  key_hash     text not null unique,
  key_prefix   text not null,
  created_by   uuid references auth.users(id) on delete set null,
  created_at   timestamptz not null default now(),
  last_used_at timestamptz,
  revoked_at   timestamptz,
  revoked_by   uuid references auth.users(id) on delete set null
);

create index if not exists wireframe_mcp_keys_active_idx
  on public.wireframe_mcp_keys (revoked_at) where revoked_at is null;

alter table public.wireframe_mcp_keys enable row level security;

-- Team members can read keys (so the UI can list them). Hash is stored, not
-- the plaintext, so leaking the row doesn't leak the secret.
create policy wireframe_mcp_keys_select
  on public.wireframe_mcp_keys for select
  to authenticated
  using (private.is_team_member());

-- Only writers can mint/update via direct DML; in practice this happens
-- through the RPCs below, which run as SECURITY DEFINER.
create policy wireframe_mcp_keys_insert
  on public.wireframe_mcp_keys for insert
  to authenticated
  with check (private.is_team_writer());

create policy wireframe_mcp_keys_update
  on public.wireframe_mcp_keys for update
  to authenticated
  using (private.is_team_writer())
  with check (private.is_team_writer());

-- Generate a fresh "ttwf_..." token, store its SHA-256 hash, and return the
-- plaintext + prefix exactly once. Callers must persist the plaintext now;
-- it cannot be recovered later.
create or replace function public.mint_wireframe_mcp_key(p_label text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_caller uuid := auth.uid();
  v_random bytea;
  v_token  text;
  v_prefix text;
  v_hash   text;
  v_id     uuid;
begin
  if v_caller is null then
    raise exception 'not authenticated';
  end if;
  if not (select private.is_team_writer()) then
    raise exception 'insufficient role';
  end if;
  if p_label is null or length(btrim(p_label)) = 0 then
    raise exception 'label is required';
  end if;

  -- 32 random bytes -> 64 hex chars, prefixed for visual identification.
  v_random := extensions.gen_random_bytes(32);
  v_token  := 'ttwf_' || encode(v_random, 'hex');
  v_prefix := substring(v_token from 1 for 12);
  v_hash   := encode(extensions.digest(v_token, 'sha256'), 'hex');

  insert into public.wireframe_mcp_keys (label, key_hash, key_prefix, created_by)
  values (btrim(p_label), v_hash, v_prefix, v_caller)
  returning id into v_id;

  return jsonb_build_object(
    'id',         v_id,
    'token',      v_token,
    'key_prefix', v_prefix,
    'label',      btrim(p_label)
  );
end;
$$;

revoke all on function public.mint_wireframe_mcp_key(text) from public;
grant execute on function public.mint_wireframe_mcp_key(text) to authenticated;

-- Soft-revoke (sets revoked_at + revoked_by). Keeps the row so audit/last_used
-- history stays intact.
create or replace function public.revoke_wireframe_mcp_key(p_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_caller uuid := auth.uid();
begin
  if v_caller is null then
    raise exception 'not authenticated';
  end if;
  if not (select private.is_team_writer()) then
    raise exception 'insufficient role';
  end if;

  update public.wireframe_mcp_keys
     set revoked_at = now(),
         revoked_by = v_caller
   where id = p_id
     and revoked_at is null;
end;
$$;

revoke all on function public.revoke_wireframe_mcp_key(uuid) from public;
grant execute on function public.revoke_wireframe_mcp_key(uuid) to authenticated;
