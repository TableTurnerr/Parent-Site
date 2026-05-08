-- Phase A.4: Idempotent ledger of emails sent so we never double-send a notification.

CREATE TABLE public.report_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES public.client_reports(id) ON DELETE CASCADE,
  client_access_id UUID NOT NULL REFERENCES public.client_access(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('share','published')),
  email TEXT NOT NULL,
  delivery_id TEXT,
  delivery_status TEXT NOT NULL DEFAULT 'sent' CHECK (delivery_status IN ('sent','failed','pending')),
  error_message TEXT,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT report_notifications_unique UNIQUE (report_id, client_access_id, notification_type)
);

CREATE INDEX idx_report_notifications_report ON public.report_notifications(report_id);
CREATE INDEX idx_report_notifications_grant ON public.report_notifications(client_access_id);

ALTER TABLE public.report_notifications ENABLE ROW LEVEL SECURITY;
