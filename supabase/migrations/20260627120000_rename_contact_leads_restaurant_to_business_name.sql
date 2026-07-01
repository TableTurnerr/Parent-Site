-- Brand cleanup: the contact_leads.restaurant column is a leftover from the
-- agency/restaurant era. It actually stores the lead's business name, which on
-- the review-automation site is a home-service company, not a restaurant.
-- Rename it to business_name for clean analytics and code.
--
-- Safe rename: IF EXISTS guards make this idempotent. A plain RENAME preserves
-- all existing data, indexes, and (since none reference the column by name) RLS
-- policies. Deploy the matching application code alongside this migration.

ALTER TABLE public.contact_leads
  RENAME COLUMN restaurant TO business_name;
