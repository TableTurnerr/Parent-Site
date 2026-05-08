-- Phase A.8: Extend handle_new_user trigger so that when a user signs up with an email
-- that has pending client_access grants, they're auto-assigned role='client',
-- status='approved', and their grants are linked + accepted.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  has_pending_grants BOOLEAN;
  resolved_role public.user_role;
  resolved_status public.profile_status;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM public.client_access
    WHERE email = NEW.email::extensions.citext
      AND profile_id IS NULL
      AND revoked_at IS NULL
  ) INTO has_pending_grants;

  IF has_pending_grants THEN
    resolved_role := 'client'::public.user_role;
    resolved_status := 'approved'::public.profile_status;
  ELSE
    resolved_role := 'author'::public.user_role;
    resolved_status := 'pending'::public.profile_status;
  END IF;

  INSERT INTO public.profiles (id, email, full_name, avatar_url, role, status)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url',
    resolved_role,
    resolved_status
  );

  UPDATE public.client_access
  SET profile_id = NEW.id, accepted_at = now()
  WHERE email = NEW.email::extensions.citext
    AND profile_id IS NULL
    AND revoked_at IS NULL;

  RETURN NEW;
END;
$function$;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM public, anon, authenticated;
