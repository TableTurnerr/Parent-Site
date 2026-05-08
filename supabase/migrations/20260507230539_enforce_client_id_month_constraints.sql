-- Phase A.7: Enforce NOT NULL on client_id/report_month, drop obsolete unique on
-- client_slug (multiple monthly reports per client share a slug), add new composite
-- uniqueness on (client_id, report_month).

ALTER TABLE public.client_reports
  ALTER COLUMN client_id SET NOT NULL,
  ALTER COLUMN report_month SET NOT NULL;

ALTER TABLE public.client_reports
  DROP CONSTRAINT IF EXISTS client_reports_client_slug_key;

ALTER TABLE public.client_reports
  ADD CONSTRAINT client_reports_client_month_unique UNIQUE (client_id, report_month);

CREATE INDEX IF NOT EXISTS idx_client_reports_client ON public.client_reports(client_id);
CREATE INDEX IF NOT EXISTS idx_client_reports_month ON public.client_reports(report_month DESC);
CREATE INDEX IF NOT EXISTS idx_client_reports_client_month ON public.client_reports(client_id, report_month DESC);

ALTER TABLE public.client_reports
  ADD CONSTRAINT client_reports_month_first_day
    CHECK (report_month = date_trunc('month', report_month)::date);
