-- Uptime/status + centralized logging + alerting subsystem.
--
-- Ingest is service-role only (createAdminClient bypasses RLS); admin reads go
-- through createClient() under team-read RLS, mirroring site_reviews. Writes to
-- the time-series/log tables have NO RLS policy (same posture as
-- ingest_rate_events) so only the service role touches them.

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA extensions;

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE public.service_kind  AS ENUM ('http', 'push');
CREATE TYPE public.uptime_status AS ENUM ('up', 'down', 'degraded');
CREATE TYPE public.log_level     AS ENUM ('debug', 'info', 'warn', 'error', 'fatal');

-- ============================================================
-- monitored_services (registry)
-- ============================================================
CREATE TABLE public.monitored_services (
  id                        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key                       text NOT NULL UNIQUE CHECK (key ~ '^[a-z0-9][a-z0-9_-]{1,63}$'),
  name                      text NOT NULL,
  kind                      public.service_kind NOT NULL,
  health_url                text,                            -- required for kind='http'
  expected_interval_seconds integer,                         -- required for kind='push'
  degraded_latency_ms       integer NOT NULL DEFAULT 1500,
  enabled                   boolean NOT NULL DEFAULT true,
  created_at                timestamptz NOT NULL DEFAULT now(),
  updated_at                timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT http_needs_url    CHECK (kind <> 'http' OR health_url IS NOT NULL),
  CONSTRAINT push_needs_window CHECK (kind <> 'push' OR expected_interval_seconds IS NOT NULL)
);

CREATE INDEX monitored_services_enabled_idx ON public.monitored_services (enabled) WHERE enabled;

CREATE TRIGGER monitored_services_set_updated_at
  BEFORE UPDATE ON public.monitored_services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

COMMENT ON TABLE public.monitored_services IS
  'Authoritative registry of services the uptime poller checks and that telemetry rows reference by key.';

-- ============================================================
-- uptime_checks (time-series)
-- ============================================================
CREATE TABLE public.uptime_checks (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  service_id  uuid NOT NULL REFERENCES public.monitored_services(id) ON DELETE CASCADE,
  service_key text NOT NULL,                                 -- denormalized for retention/filtering
  status      public.uptime_status NOT NULL,
  status_code integer,
  latency_ms  integer,
  error       text,
  checked_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX uptime_checks_service_time_idx ON public.uptime_checks (service_id, checked_at DESC);
CREATE INDEX uptime_checks_time_idx         ON public.uptime_checks (checked_at DESC);

COMMENT ON TABLE public.uptime_checks IS
  'One row per poll (http) or per evaluated heartbeat window (push). Pruned to ~30d by the poller.';

-- ============================================================
-- service_heartbeats (latest push state, one row per service)
-- ============================================================
CREATE TABLE public.service_heartbeats (
  service_id   uuid PRIMARY KEY REFERENCES public.monitored_services(id) ON DELETE CASCADE,
  service_key  text NOT NULL UNIQUE,
  last_beat_at timestamptz NOT NULL DEFAULT now(),
  version      text,
  status       text,                                         -- self-reported: ok|degraded|down
  meta         jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER service_heartbeats_set_updated_at
  BEFORE UPDATE ON public.service_heartbeats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

COMMENT ON TABLE public.service_heartbeats IS
  'Latest heartbeat per push service. Upserted by POST /api/telemetry/heartbeat.';

-- ============================================================
-- system_logs (structured centralized logs)
-- ============================================================
CREATE TABLE public.system_logs (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  service_key text NOT NULL,
  level       public.log_level NOT NULL DEFAULT 'info',
  message     text NOT NULL,
  event       text,
  context     jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX system_logs_time_idx         ON public.system_logs (created_at DESC);
CREATE INDEX system_logs_service_time_idx ON public.system_logs (service_key, created_at DESC);
CREATE INDEX system_logs_level_time_idx   ON public.system_logs (level, created_at DESC);
CREATE INDEX system_logs_errors_idx       ON public.system_logs (created_at DESC) WHERE level IN ('error', 'fatal');
CREATE INDEX system_logs_message_trgm_idx ON public.system_logs USING gin (message extensions.gin_trgm_ops);

COMMENT ON TABLE public.system_logs IS
  'Structured log lines from all services (TS/Python/extension). Pruned to ~14d by the ingest route.';

-- ============================================================
-- alert_state (debounce ledger -- service-role only, no read policy)
-- ============================================================
CREATE TABLE public.alert_state (
  alert_key        text PRIMARY KEY,                         -- e.g. 'uptime:zoomphone-bridge', 'logspike:crm-dashboard'
  state            text NOT NULL,                            -- 'up'|'down'|'degraded'|'ok'|'spiking'
  since            timestamptz NOT NULL DEFAULT now(),
  last_notified_at timestamptz,
  last_value       jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER alert_state_set_updated_at
  BEFORE UPDATE ON public.alert_state
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

COMMENT ON TABLE public.alert_state IS
  'Last-known state per alert key so alerts.ts only fires on transitions. Internal; no RLS read policy.';

-- ============================================================
-- RLS
-- ============================================================
ALTER TABLE public.monitored_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uptime_checks      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_heartbeats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_logs        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alert_state        ENABLE ROW LEVEL SECURITY;

-- Team can read the four display tables (mirrors site_reviews_team_read).
CREATE POLICY monitored_services_team_read ON public.monitored_services
  FOR SELECT TO authenticated USING ((SELECT private.is_team_member()));
CREATE POLICY uptime_checks_team_read ON public.uptime_checks
  FOR SELECT TO authenticated USING ((SELECT private.is_team_member()));
CREATE POLICY service_heartbeats_team_read ON public.service_heartbeats
  FOR SELECT TO authenticated USING ((SELECT private.is_team_member()));
CREATE POLICY system_logs_team_read ON public.system_logs
  FOR SELECT TO authenticated USING ((SELECT private.is_team_member()));

-- Team-writer may manage the registry from the admin UI (future CRUD).
CREATE POLICY monitored_services_team_write ON public.monitored_services
  FOR ALL TO authenticated
  USING ((SELECT private.is_team_writer())) WITH CHECK ((SELECT private.is_team_writer()));

-- uptime_checks / service_heartbeats / system_logs get NO write policy and
-- alert_state gets NO policy at all: only the service role (ingest routes,
-- cron, alerts.ts) writes them. Same posture as ingest_rate_events.

-- ============================================================
-- Seed the known services
-- ============================================================
INSERT INTO public.monitored_services (key, name, kind, health_url, expected_interval_seconds) VALUES
  ('parent-site',             'Parent Site (Next.js)',     'http', 'https://tableturnerr.com/api/health',       NULL),
  ('crm-dashboard',           'CRM Dashboard',             'http', 'https://app.tableturnerr.com/',              NULL),
  ('crm-api',                 'CRM API',                   'http', 'https://crm.tableturnerr.com/',              NULL),
  ('zoomphone-bridge',        'Zoom Phone -> GHL Bridge',  'http', 'https://zoomphone.tableturnerr.com/health',  NULL),
  ('pocketbase',              'PocketBase',                'http', 'https://crmdb.tableturnerr.com/api/health',   NULL),
  ('discord-bot',             'Discord Bot',               'push', NULL, 600),
  ('insta-outreach-agent',    'Instagram Outreach Agent',  'push', NULL, 900),
  ('leads-scraper-extension', 'Leads Scraper Extension',   'push', NULL, 3600)
ON CONFLICT (key) DO NOTHING;
