-- TableTurnerr: Client Reports Table Migration
-- Run this in Supabase Studio SQL editor at http://psdb.tableturnerr.com:8000

CREATE TABLE client_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_slug TEXT NOT NULL UNIQUE,
  client_url TEXT NOT NULL,
  report_content_md TEXT NOT NULL,
  report_content_html TEXT,
  grader_data JSONB,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL
);

CREATE INDEX idx_client_reports_slug ON client_reports(client_slug);
CREATE INDEX idx_client_reports_status ON client_reports(status);

ALTER TABLE client_reports ENABLE ROW LEVEL SECURITY;

-- Anyone can read published reports (powers the public /report/[slug] page)
CREATE POLICY "Published reports readable by anyone"
  ON client_reports FOR SELECT TO anon
  USING (status = 'published');

-- Authenticated team members can read all reports (draft, published, archived)
CREATE POLICY "Team can read all reports"
  ON client_reports FOR SELECT TO authenticated
  USING (true);

-- Authenticated team members can update reports (e.g., status changes in admin panel)
CREATE POLICY "Team can update reports"
  ON client_reports FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_client_reports_updated_at
  BEFORE UPDATE ON client_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Note: INSERT and DELETE are handled exclusively by the push script
-- using the SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS entirely.
