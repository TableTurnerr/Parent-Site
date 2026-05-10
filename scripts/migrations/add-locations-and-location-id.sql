-- Add per-company locations + link reports to a (client, location, month) triple.
-- Applied to Supabase Cloud on 2026-05-11.
--
-- Before: client_reports was unique on (client_id, report_month). Multi-location
-- brands worked around this by creating *separate* clients rows per location
-- (e.g. "Taco Delphia 22Nd Walnut" and "Taco Delphia South Broad" were two
-- companies sharing tacodelphia.online). That confused the admin panel and
-- prevented per-company aggregation.
--
-- After:
--   clients         one row per company         (e.g. "Taco Delphia")
--   locations       one row per location         (e.g. "South Broad", "22nd & Walnut")
--   client_reports  one row per (company, location, month)
--
-- The duplicate clients rows for Taco Delphia and Wings N Things were merged
-- in a one-shot data migration that ran alongside this DDL — see commit
-- history for the consolidation script.

----------------------------------------------------------------------
-- 1. Locations table
----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.locations (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  name        text NOT NULL,
  slug        text NOT NULL,
  address     text,
  is_primary  boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT  locations_client_slug_key UNIQUE (client_id, slug)
);

CREATE INDEX IF NOT EXISTS locations_client_id_idx ON public.locations(client_id);

COMMENT ON TABLE public.locations IS
  'Per-company locations. Companies (clients) can have one or more locations; '
  'client_reports attach to a (client_id, location_id, report_month) triple.';

ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "locations_select_all"            ON public.locations FOR SELECT USING (true);
CREATE POLICY "locations_insert_authenticated"  ON public.locations FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "locations_update_authenticated"  ON public.locations FOR UPDATE TO authenticated USING (true);
CREATE POLICY "locations_delete_authenticated"  ON public.locations FOR DELETE TO authenticated USING (true);

----------------------------------------------------------------------
-- 2. Add location_id to client_reports + swap the unique constraint
----------------------------------------------------------------------
ALTER TABLE public.client_reports
  ADD COLUMN IF NOT EXISTS location_id uuid
    REFERENCES public.locations(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS client_reports_location_id_idx
  ON public.client_reports(location_id);

COMMENT ON COLUMN public.client_reports.location_id IS
  'FK to locations.id. Each report row is unique per (client_id, location_id, report_month).';

-- Backfill happened in a one-shot data migration (see commit message). Once
-- every existing row has a location_id set:
ALTER TABLE public.client_reports
  ALTER COLUMN location_id SET NOT NULL;

ALTER TABLE public.client_reports
  DROP CONSTRAINT IF EXISTS client_reports_client_month_unique;

ALTER TABLE public.client_reports
  ADD CONSTRAINT client_reports_client_location_month_unique
  UNIQUE (client_id, location_id, report_month);
