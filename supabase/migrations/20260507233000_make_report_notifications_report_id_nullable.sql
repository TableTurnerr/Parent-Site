-- Phase A.14: 'share' notifications fire before any report exists for a client, so
-- report_id must be nullable. Use partial unique indexes to keep idempotency for
-- both per-report 'published' notifications and at-most-one 'share' per grant.

ALTER TABLE public.report_notifications
  ALTER COLUMN report_id DROP NOT NULL;

ALTER TABLE public.report_notifications
  DROP CONSTRAINT IF EXISTS report_notifications_unique;

CREATE UNIQUE INDEX report_notifications_with_report_unique
  ON public.report_notifications (report_id, client_access_id, notification_type)
  WHERE report_id IS NOT NULL;

CREATE UNIQUE INDEX report_notifications_share_unique
  ON public.report_notifications (client_access_id, notification_type)
  WHERE report_id IS NULL AND notification_type = 'share';
