-- TableTurnerr: structured JSON payload for the public client report renderer.
-- The new /report/[slug] page consumes client_content_json directly to build a
-- richly designed page; client_content_md/html remain as fallback + audit trail.

ALTER TABLE client_reports
  ADD COLUMN IF NOT EXISTS client_content_json JSONB;

-- Make sure anon can SELECT the new column. The previous migration revoked
-- ALL on the table from anon and granted column-level SELECTs explicitly, so
-- we need to add this one to that grant list.
GRANT SELECT (
  id, client_name, client_slug, client_url,
  client_content_md, client_content_html, client_content_json,
  grader_data, status, visibility,
  created_at, updated_at, published_at
) ON client_reports TO anon;
