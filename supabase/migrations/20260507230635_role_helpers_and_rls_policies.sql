-- Phase A.9-12: Combined role helpers in `private` schema + RLS policies for
-- clients, client_access, report_notifications, and tightened client_reports.

CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM public, anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated;

CREATE OR REPLACE FUNCTION private.current_user_role()
RETURNS public.user_role
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT role FROM public.profiles WHERE id = (SELECT auth.uid())
$$;

CREATE OR REPLACE FUNCTION private.is_team_member()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT (SELECT private.current_user_role()) IN
    ('admin'::public.user_role, 'manager'::public.user_role, 'editor'::public.user_role,
     'author'::public.user_role, 'commenter'::public.user_role, 'viewer'::public.user_role)
$$;

CREATE OR REPLACE FUNCTION private.is_team_writer()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT (SELECT private.current_user_role()) IN
    ('admin'::public.user_role, 'manager'::public.user_role,
     'editor'::public.user_role, 'author'::public.user_role)
$$;

REVOKE ALL ON FUNCTION private.current_user_role() FROM public, anon;
REVOKE ALL ON FUNCTION private.is_team_member() FROM public, anon;
REVOKE ALL ON FUNCTION private.is_team_writer() FROM public, anon;
GRANT EXECUTE ON FUNCTION private.current_user_role() TO authenticated;
GRANT EXECUTE ON FUNCTION private.is_team_member() TO authenticated;
GRANT EXECUTE ON FUNCTION private.is_team_writer() TO authenticated;

-- Pin search_path on update_updated_at_column (advisor fix)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- ============================================================
-- clients
-- ============================================================
CREATE POLICY clients_team_select ON public.clients FOR SELECT TO authenticated
  USING ((SELECT private.is_team_member()));

CREATE POLICY clients_team_write ON public.clients FOR ALL TO authenticated
  USING ((SELECT private.is_team_writer()))
  WITH CHECK ((SELECT private.is_team_writer()));

CREATE POLICY clients_client_read ON public.clients FOR SELECT TO authenticated
  USING (
    id IN (
      SELECT client_id FROM public.client_access
      WHERE profile_id = (SELECT auth.uid()) AND revoked_at IS NULL
    )
  );

-- ============================================================
-- client_access
-- ============================================================
CREATE POLICY client_access_team_all ON public.client_access FOR ALL TO authenticated
  USING ((SELECT private.is_team_writer()))
  WITH CHECK ((SELECT private.is_team_writer()));

CREATE POLICY client_access_self_read ON public.client_access FOR SELECT TO authenticated
  USING (profile_id = (SELECT auth.uid()));

-- ============================================================
-- report_notifications
-- ============================================================
CREATE POLICY report_notifications_team ON public.report_notifications FOR ALL TO authenticated
  USING ((SELECT private.is_team_writer()))
  WITH CHECK ((SELECT private.is_team_writer()));

-- ============================================================
-- client_reports
-- ============================================================
DROP POLICY IF EXISTS "Team can read all reports" ON public.client_reports;
DROP POLICY IF EXISTS "Team can update reports" ON public.client_reports;

CREATE POLICY client_reports_team_read ON public.client_reports FOR SELECT TO authenticated
  USING ((SELECT private.is_team_member()));

CREATE POLICY client_reports_team_write ON public.client_reports FOR ALL TO authenticated
  USING ((SELECT private.is_team_writer()))
  WITH CHECK ((SELECT private.is_team_writer()));

CREATE POLICY client_reports_client_read ON public.client_reports FOR SELECT TO authenticated
  USING (
    status = 'published'
    AND client_id IN (
      SELECT client_id FROM public.client_access
      WHERE profile_id = (SELECT auth.uid()) AND revoked_at IS NULL
    )
  );
