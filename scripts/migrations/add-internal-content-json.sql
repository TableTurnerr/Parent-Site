-- TableTurnerr: structured JSON payload for the INTERNAL deep-dive report.
-- Mirrors the client_content_json column added in add-client-content-json.sql.
-- Internal JSON is admin-only — it is NOT granted to anon at the column level.

ALTER TABLE client_reports
  ADD COLUMN IF NOT EXISTS internal_content_json JSONB;

-- The JSON-first flow no longer requires markdown. Drop the NOT NULL on
-- client_content_md so a row can ship as JSON-only. The column remains for
-- legacy rows and PDF export workflows.
ALTER TABLE client_reports
  ALTER COLUMN client_content_md DROP NOT NULL;

-- Anon must NEVER see internal_content_json. Re-state the SELECT grant
-- explicitly without internal_content_json in the column list.
GRANT SELECT (
  id, client_name, client_slug, client_url,
  client_content_md, client_content_html, client_content_json,
  grader_data, status, visibility,
  created_at, updated_at, published_at
) ON client_reports TO anon;
