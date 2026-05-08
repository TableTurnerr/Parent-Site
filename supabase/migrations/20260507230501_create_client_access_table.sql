-- Phase A.3: Email-keyed access grants. profile_id is null until the user signs in;
-- handle_new_user trigger (updated later) backfills profile_id and accepted_at.

CREATE TABLE public.client_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  email extensions.CITEXT NOT NULL,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  invited_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  invited_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  accepted_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  CONSTRAINT client_access_unique_email UNIQUE (client_id, email)
);

CREATE INDEX idx_client_access_email_active ON public.client_access(email) WHERE revoked_at IS NULL;
CREATE INDEX idx_client_access_profile ON public.client_access(profile_id) WHERE revoked_at IS NULL;
CREATE INDEX idx_client_access_client ON public.client_access(client_id);

ALTER TABLE public.client_access ENABLE ROW LEVEL SECURITY;
