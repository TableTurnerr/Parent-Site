-- Add 'client_only' visibility for client_reports.
-- A client_only report is hidden from the public /report/[slug] routes
-- and is only viewable by team members (via /admin) and granted clients
-- (via the /portal). RLS already enforces this — the public route filters
-- by visibility IN ('public','unlisted'), so client_only is naturally excluded.

ALTER TYPE public.post_visibility ADD VALUE IF NOT EXISTS 'client_only';
