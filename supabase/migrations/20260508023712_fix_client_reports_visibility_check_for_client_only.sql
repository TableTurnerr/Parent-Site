-- The previous migration (add_client_only_visibility) added 'client_only' to
-- the post_visibility enum used by `posts`, but client_reports.visibility is
-- a separate TEXT column with its own CHECK constraint. Inserting/updating a
-- client_reports row with visibility='client_only' was failing
-- "violates check constraint client_reports_visibility_check".
-- Recreate the constraint with the new value included.

ALTER TABLE public.client_reports
  DROP CONSTRAINT IF EXISTS client_reports_visibility_check;

ALTER TABLE public.client_reports
  ADD CONSTRAINT client_reports_visibility_check
  CHECK (visibility = ANY (ARRAY['public'::text, 'unlisted'::text, 'private'::text, 'client_only'::text]));
