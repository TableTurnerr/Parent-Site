-- Phase A.1: Add 'client' value to user_role enum and ensure citext is available.
-- Note: ALTER TYPE ... ADD VALUE must be in its own migration; the new value cannot
-- be referenced in the same transaction it was added in.

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA extensions;

ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'client';
