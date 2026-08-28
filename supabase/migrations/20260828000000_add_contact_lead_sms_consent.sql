-- A2P 10DLC consent evidence for TABLETURNERR LLC's own public-site forms.
-- These fields are intentionally scoped to TableTurnerr website communications;
-- they are not a consent source for a client business or client campaign.

ALTER TABLE public.contact_leads
  ADD COLUMN IF NOT EXISTS customer_care_sms_consent boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS marketing_sms_consent boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS customer_care_sms_consented_at timestamptz,
  ADD COLUMN IF NOT EXISTS marketing_sms_consented_at timestamptz,
  ADD COLUMN IF NOT EXISTS sms_disclosure_version text,
  ADD COLUMN IF NOT EXISTS customer_care_sms_disclosure text,
  ADD COLUMN IF NOT EXISTS marketing_sms_disclosure text,
  ADD COLUMN IF NOT EXISTS form_submitted_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS source_page_url text,
  ADD COLUMN IF NOT EXISTS ip_address inet;

ALTER TABLE public.contact_leads
  ADD CONSTRAINT contact_leads_customer_care_sms_timestamp_check
    CHECK (
      (customer_care_sms_consent AND customer_care_sms_consented_at IS NOT NULL)
      OR
      (NOT customer_care_sms_consent AND customer_care_sms_consented_at IS NULL)
    ),
  ADD CONSTRAINT contact_leads_marketing_sms_timestamp_check
    CHECK (
      (marketing_sms_consent AND marketing_sms_consented_at IS NOT NULL)
      OR
      (NOT marketing_sms_consent AND marketing_sms_consented_at IS NULL)
    );

COMMENT ON COLUMN public.contact_leads.customer_care_sms_consent IS
  'Explicit website-form consent for customer-care messages from TABLETURNERR LLC only.';
COMMENT ON COLUMN public.contact_leads.marketing_sms_consent IS
  'Explicit website-form consent for customer-engagement and marketing messages from TABLETURNERR LLC only.';
COMMENT ON COLUMN public.contact_leads.sms_disclosure_version IS
  'Immutable identifier for the disclosure shown when the submission was made.';
COMMENT ON COLUMN public.contact_leads.customer_care_sms_disclosure IS
  'Exact customer-care disclosure text displayed when the submission was made.';
COMMENT ON COLUMN public.contact_leads.marketing_sms_disclosure IS
  'Exact marketing disclosure text displayed when the submission was made.';
