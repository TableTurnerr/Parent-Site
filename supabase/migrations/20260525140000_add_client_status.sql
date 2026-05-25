-- Add a status to the clients table to distinguish prospects, paying clients,
-- and reusable templates. Default is 'prospect'. The wireframe tool surfaces
-- only rows where status IN ('client', 'template'); prospects are managed
-- (and promoted) from the parent admin site.
--
-- Backfill rules:
--   * Al-Baghdady and Grill Shack are the two paying clients today -> 'client'.
--   * Default Template profile -> 'template'.
--   * Everything else stays at the default 'prospect'.

DO $$ BEGIN
  CREATE TYPE public.client_status AS ENUM ('prospect', 'client', 'template');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.clients
  ADD COLUMN IF NOT EXISTS status public.client_status NOT NULL DEFAULT 'prospect';

CREATE INDEX IF NOT EXISTS idx_clients_status ON public.clients(status);

-- Strip punctuation/whitespace and lowercase so common variants
-- ("Al Baghdady", "Al-Baghdady", "The Grill Shack", "Default-Template")
-- all match.
UPDATE public.clients
SET status = 'client'
WHERE lower(regexp_replace(name, '[^a-z0-9]+', '', 'gi')) IN ('albaghdady', 'albaghdadi', 'grillshack', 'thegrillshack');

UPDATE public.clients
SET status = 'template'
WHERE lower(regexp_replace(name, '[^a-z0-9]+', '', 'gi')) IN ('defaulttemplate', 'template');
