-- Wireframe canvas: per-client content blob (JSON tier) + single-user edit lock.
-- Keyed by public.clients(id) so every restaurant we manage gets its own canvas.

-- ============================================================
-- wireframe_content
-- ============================================================
CREATE TABLE public.wireframe_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL UNIQUE REFERENCES public.clients(id) ON DELETE CASCADE,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  version INTEGER NOT NULL DEFAULT 1,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

CREATE INDEX idx_wireframe_content_client_id ON public.wireframe_content(client_id);

CREATE TRIGGER update_wireframe_content_updated_at
  BEFORE UPDATE ON public.wireframe_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.wireframe_content ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- wireframe_edit_locks
-- ============================================================
CREATE TABLE public.wireframe_edit_locks (
  client_id UUID PRIMARY KEY REFERENCES public.clients(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  display_name TEXT,
  acquired_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_heartbeat_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_wireframe_edit_locks_heartbeat ON public.wireframe_edit_locks(last_heartbeat_at);

ALTER TABLE public.wireframe_edit_locks ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS policies
-- ============================================================
CREATE POLICY wireframe_content_team_select ON public.wireframe_content
  FOR SELECT TO authenticated
  USING ((SELECT private.is_team_member()));

CREATE POLICY wireframe_content_team_write ON public.wireframe_content
  FOR ALL TO authenticated
  USING ((SELECT private.is_team_writer()))
  WITH CHECK ((SELECT private.is_team_writer()));

CREATE POLICY wireframe_edit_locks_team_select ON public.wireframe_edit_locks
  FOR SELECT TO authenticated
  USING ((SELECT private.is_team_member()));

CREATE POLICY wireframe_edit_locks_team_write ON public.wireframe_edit_locks
  FOR ALL TO authenticated
  USING ((SELECT private.is_team_writer()))
  WITH CHECK ((SELECT private.is_team_writer()));

-- ============================================================
-- Lock-management RPCs. SECURITY DEFINER is intentional: the
-- in-function checks enforce role + ownership, and centralising
-- the stale-lock takeover rule here keeps it consistent.
-- A heartbeat older than 90 seconds is considered stale.
-- ============================================================
CREATE OR REPLACE FUNCTION public.acquire_wireframe_lock(p_client_id UUID, p_display_name TEXT DEFAULT NULL)
RETURNS public.wireframe_edit_locks
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_caller UUID := auth.uid();
  v_existing public.wireframe_edit_locks;
  v_result public.wireframe_edit_locks;
BEGIN
  IF v_caller IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  IF NOT (SELECT private.is_team_writer()) THEN
    RAISE EXCEPTION 'insufficient role';
  END IF;

  SELECT * INTO v_existing FROM public.wireframe_edit_locks WHERE client_id = p_client_id;

  IF v_existing.client_id IS NOT NULL
     AND v_existing.profile_id <> v_caller
     AND v_existing.last_heartbeat_at > now() - interval '90 seconds' THEN
    RETURN v_existing;
  END IF;

  INSERT INTO public.wireframe_edit_locks (client_id, profile_id, display_name, acquired_at, last_heartbeat_at)
  VALUES (p_client_id, v_caller, p_display_name, now(), now())
  ON CONFLICT (client_id) DO UPDATE
    SET profile_id = EXCLUDED.profile_id,
        display_name = EXCLUDED.display_name,
        acquired_at = now(),
        last_heartbeat_at = now()
  RETURNING * INTO v_result;

  RETURN v_result;
END;
$$;

CREATE OR REPLACE FUNCTION public.heartbeat_wireframe_lock(p_client_id UUID)
RETURNS public.wireframe_edit_locks
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_caller UUID := auth.uid();
  v_result public.wireframe_edit_locks;
BEGIN
  IF v_caller IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  UPDATE public.wireframe_edit_locks
     SET last_heartbeat_at = now()
   WHERE client_id = p_client_id AND profile_id = v_caller
   RETURNING * INTO v_result;

  RETURN v_result;
END;
$$;

CREATE OR REPLACE FUNCTION public.release_wireframe_lock(p_client_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_caller UUID := auth.uid();
BEGIN
  IF v_caller IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  DELETE FROM public.wireframe_edit_locks
   WHERE client_id = p_client_id AND profile_id = v_caller;

  RETURN FOUND;
END;
$$;

REVOKE ALL ON FUNCTION public.acquire_wireframe_lock(UUID, TEXT) FROM public, anon;
REVOKE ALL ON FUNCTION public.heartbeat_wireframe_lock(UUID) FROM public, anon;
REVOKE ALL ON FUNCTION public.release_wireframe_lock(UUID) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.acquire_wireframe_lock(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.heartbeat_wireframe_lock(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.release_wireframe_lock(UUID) TO authenticated;

-- ============================================================
-- Realtime: publish both tables so other clients see lock + content updates.
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.wireframe_content;
ALTER PUBLICATION supabase_realtime ADD TABLE public.wireframe_edit_locks;
