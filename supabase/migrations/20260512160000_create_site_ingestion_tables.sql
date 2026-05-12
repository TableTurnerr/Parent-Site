-- Site ingestion infrastructure: per-client API keys, origin allowlists,
-- and the destination tables for reviews + generic form submissions posted
-- from external client websites.
--
-- RLS shape mirrors public.client_reports: team_member can read, team_writer
-- can write, clients with an active client_access grant can SELECT their own
-- rows. API keys are team-only (never exposed via RLS to clients).

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE public.site_review_status AS ENUM ('new', 'read', 'archived');
CREATE TYPE public.site_submission_status AS ENUM ('new', 'read', 'archived');

-- ============================================================
-- client_api_keys
-- ============================================================
CREATE TABLE public.client_api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  key_hash text NOT NULL UNIQUE,
  key_prefix text NOT NULL,
  label text NOT NULL,
  created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_used_at timestamptz,
  revoked_at timestamptz,
  revoked_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL
);

CREATE INDEX client_api_keys_client_id_active_idx
  ON public.client_api_keys (client_id) WHERE revoked_at IS NULL;
CREATE INDEX client_api_keys_key_hash_active_idx
  ON public.client_api_keys (key_hash) WHERE revoked_at IS NULL;

COMMENT ON TABLE public.client_api_keys IS
  'API keys issued per client for external sites to POST reviews/form submissions to the ingestion API. Keys are SHA-256 hashed at rest; plaintext is shown once at creation time. key_prefix stores the first ~12 chars of the plaintext for display in admin UI.';

ALTER TABLE public.client_api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY client_api_keys_team_all
  ON public.client_api_keys FOR ALL TO authenticated
  USING ((SELECT private.is_team_writer()))
  WITH CHECK ((SELECT private.is_team_writer()));

-- Clients deliberately cannot see/modify API keys via RLS — they only ever
-- see the resulting reviews/submissions. Keys live in the admin surface.

-- ============================================================
-- client_site_origins
-- ============================================================
CREATE TABLE public.client_site_origins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  origin text NOT NULL,
  label text,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  UNIQUE (client_id, origin)
);

CREATE INDEX client_site_origins_origin_idx ON public.client_site_origins (origin);

COMMENT ON TABLE public.client_site_origins IS
  'Allowlist of HTTP origins permitted to call the ingestion API for a given client. Compared case-insensitively against the Origin header on each ingest request.';

ALTER TABLE public.client_site_origins ENABLE ROW LEVEL SECURITY;

CREATE POLICY client_site_origins_team_all
  ON public.client_site_origins FOR ALL TO authenticated
  USING ((SELECT private.is_team_writer()))
  WITH CHECK ((SELECT private.is_team_writer()));

CREATE POLICY client_site_origins_client_read
  ON public.client_site_origins FOR SELECT TO authenticated
  USING (
    client_id IN (
      SELECT client_id FROM public.client_access
      WHERE profile_id = (SELECT auth.uid()) AND revoked_at IS NULL
    )
  );

-- ============================================================
-- site_reviews
-- ============================================================
CREATE TABLE public.site_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  location_id uuid REFERENCES public.locations(id) ON DELETE SET NULL,
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  feedback text NOT NULL CHECK (length(trim(feedback)) >= 3),
  reviewer_name text NOT NULL CHECK (length(trim(reviewer_name)) >= 1),
  reviewer_email extensions.citext,
  reviewer_phone text,
  source text NOT NULL,
  status public.site_review_status NOT NULL DEFAULT 'new',
  ip inet,
  user_agent text,
  api_key_id uuid REFERENCES public.client_api_keys(id) ON DELETE SET NULL,
  read_at timestamptz,
  read_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX site_reviews_client_created_idx
  ON public.site_reviews (client_id, created_at DESC);
CREATE INDEX site_reviews_client_status_new_idx
  ON public.site_reviews (client_id) WHERE status = 'new';
CREATE INDEX site_reviews_location_idx
  ON public.site_reviews (location_id) WHERE location_id IS NOT NULL;

CREATE TRIGGER site_reviews_set_updated_at
  BEFORE UPDATE ON public.site_reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.site_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY site_reviews_team_read
  ON public.site_reviews FOR SELECT TO authenticated
  USING ((SELECT private.is_team_member()));

CREATE POLICY site_reviews_team_write
  ON public.site_reviews FOR ALL TO authenticated
  USING ((SELECT private.is_team_writer()))
  WITH CHECK ((SELECT private.is_team_writer()));

CREATE POLICY site_reviews_client_read
  ON public.site_reviews FOR SELECT TO authenticated
  USING (
    client_id IN (
      SELECT client_id FROM public.client_access
      WHERE profile_id = (SELECT auth.uid()) AND revoked_at IS NULL
    )
  );

-- ============================================================
-- site_form_submissions
-- ============================================================
CREATE TABLE public.site_form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  location_id uuid REFERENCES public.locations(id) ON DELETE SET NULL,
  form_type text NOT NULL CHECK (length(trim(form_type)) BETWEEN 1 AND 64),
  payload jsonb NOT NULL,
  contact_name text,
  contact_email extensions.citext,
  contact_phone text,
  source text NOT NULL,
  status public.site_submission_status NOT NULL DEFAULT 'new',
  ip inet,
  user_agent text,
  api_key_id uuid REFERENCES public.client_api_keys(id) ON DELETE SET NULL,
  read_at timestamptz,
  read_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX site_form_submissions_client_created_idx
  ON public.site_form_submissions (client_id, created_at DESC);
CREATE INDEX site_form_submissions_client_status_new_idx
  ON public.site_form_submissions (client_id) WHERE status = 'new';
CREATE INDEX site_form_submissions_client_form_type_idx
  ON public.site_form_submissions (client_id, form_type);
CREATE INDEX site_form_submissions_location_idx
  ON public.site_form_submissions (location_id) WHERE location_id IS NOT NULL;

CREATE TRIGGER site_form_submissions_set_updated_at
  BEFORE UPDATE ON public.site_form_submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.site_form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY site_form_submissions_team_read
  ON public.site_form_submissions FOR SELECT TO authenticated
  USING ((SELECT private.is_team_member()));

CREATE POLICY site_form_submissions_team_write
  ON public.site_form_submissions FOR ALL TO authenticated
  USING ((SELECT private.is_team_writer()))
  WITH CHECK ((SELECT private.is_team_writer()));

CREATE POLICY site_form_submissions_client_read
  ON public.site_form_submissions FOR SELECT TO authenticated
  USING (
    client_id IN (
      SELECT client_id FROM public.client_access
      WHERE profile_id = (SELECT auth.uid()) AND revoked_at IS NULL
    )
  );
