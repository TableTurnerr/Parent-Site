-- Phase A.5: Add client_id FK and report_month to client_reports (nullable for now;
-- backfilled in next migration, then constrained NOT NULL).

ALTER TABLE public.client_reports
  ADD COLUMN client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  ADD COLUMN report_month DATE;

COMMENT ON COLUMN public.client_reports.report_month IS
  'First-of-month date (YYYY-MM-01) identifying which monthly report this is. Unique with client_id.';
