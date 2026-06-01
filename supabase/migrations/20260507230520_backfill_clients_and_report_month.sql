-- Phase A.6: Backfill clients table from existing client_reports rows (one per slug),
-- then link each report to its client and set report_month from published_at/created_at.

INSERT INTO public.clients (name, slug, url, created_by, created_at)
SELECT DISTINCT ON (client_slug)
  client_name,
  client_slug,
  client_url,
  created_by,
  created_at
FROM public.client_reports
ORDER BY client_slug, created_at
ON CONFLICT (slug) DO NOTHING;

UPDATE public.client_reports cr
SET client_id = c.id
FROM public.clients c
WHERE cr.client_slug = c.slug AND cr.client_id IS NULL;

UPDATE public.client_reports
SET report_month = date_trunc('month', COALESCE(published_at, created_at))::date
WHERE report_month IS NULL;
