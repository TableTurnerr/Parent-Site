-- Sliding-window rate-limit ledger for the public ingestion API.
-- One row per accepted request; helper queries the row count in the
-- last N seconds for a given (ip, route) tuple.

CREATE TABLE public.ingest_rate_events (
  id bigserial PRIMARY KEY,
  ip text NOT NULL,
  route text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX ingest_rate_events_lookup_idx
  ON public.ingest_rate_events (ip, route, created_at DESC);

ALTER TABLE public.ingest_rate_events ENABLE ROW LEVEL SECURITY;
-- No policies: only the service role (via createAdminClient) touches this table.
