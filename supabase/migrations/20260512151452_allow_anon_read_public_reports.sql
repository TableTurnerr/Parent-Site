-- Allow anonymous (logged-out) users to read published reports whose
-- visibility is 'public' or 'unlisted', plus the minimal client row needed
-- to resolve /report/[slug] → report. Previously only `authenticated`
-- policies existed, so anon SELECTs returned zero rows and the public
-- report route 404'd even when visibility was set to public.
--
-- RLS is only consulted after the table-level GRANT passes, so anon also
-- needs explicit SELECT privileges on both tables.

GRANT SELECT ON public.client_reports TO anon;
GRANT SELECT ON public.clients TO anon;

CREATE POLICY client_reports_anon_read_public
  ON public.client_reports
  FOR SELECT
  TO anon
  USING (
    status = 'published'
    AND visibility IN ('public', 'unlisted')
  );

CREATE POLICY clients_anon_read_for_public_reports
  ON public.clients
  FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1
      FROM public.client_reports r
      WHERE r.client_id = clients.id
        AND r.status = 'published'
        AND r.visibility IN ('public', 'unlisted')
    )
  );
