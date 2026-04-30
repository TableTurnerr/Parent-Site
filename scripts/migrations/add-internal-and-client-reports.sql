-- TableTurnerr: Split client_reports into internal + client variants with visibility controls
-- Applies to existing client_reports table created by create-client-reports-table.sql

-- 1. Add new columns
ALTER TABLE client_reports
  ADD COLUMN IF NOT EXISTS internal_content_md   TEXT,
  ADD COLUMN IF NOT EXISTS internal_content_html TEXT,
  ADD COLUMN IF NOT EXISTS client_content_md     TEXT,
  ADD COLUMN IF NOT EXISTS client_content_html   TEXT,
  ADD COLUMN IF NOT EXISTS visibility            TEXT NOT NULL DEFAULT 'public'
    CHECK (visibility IN ('public', 'unlisted', 'private'));

-- 2. Backfill from legacy column (treat existing report_content_* as the client variant)
UPDATE client_reports
SET
  client_content_md   = COALESCE(client_content_md,   report_content_md),
  client_content_html = COALESCE(client_content_html, report_content_html)
WHERE client_content_md IS NULL OR client_content_html IS NULL;

-- 3. Make client_content_md required going forward
ALTER TABLE client_reports
  ALTER COLUMN client_content_md SET NOT NULL;

-- 4. Drop the legacy single-report columns
ALTER TABLE client_reports
  DROP COLUMN IF EXISTS report_content_md,
  DROP COLUMN IF EXISTS report_content_html;

-- 5. Reset RLS for the new shape
DROP POLICY IF EXISTS "Published reports readable by anyone"   ON client_reports;
DROP POLICY IF EXISTS "Team can read all reports"              ON client_reports;
DROP POLICY IF EXISTS "Team can update reports"                ON client_reports;

-- Anon may only see public, published reports
CREATE POLICY "Public published reports readable by anyone"
  ON client_reports FOR SELECT TO anon
  USING (status = 'published' AND visibility = 'public');

-- Authenticated team sees everything
CREATE POLICY "Team can read all reports"
  ON client_reports FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Team can update reports"
  ON client_reports FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- 6. Column-level guard: revoke internal_* columns from anon entirely.
-- Even with the SELECT policy above, anon must never reach internal_content_*.
-- Postgres column-level grants enforce this at the protocol layer.
REVOKE ALL ON client_reports FROM anon;
GRANT SELECT (
  id, client_name, client_slug, client_url,
  client_content_md, client_content_html,
  grader_data, status, visibility,
  created_at, updated_at, published_at
) ON client_reports TO anon;

-- Helpful index for the admin filter UIs
CREATE INDEX IF NOT EXISTS idx_client_reports_visibility ON client_reports(visibility);
