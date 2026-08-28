"use server";

import { after } from "next/server";
import { headers } from "next/headers";
import { createClient } from "@/app/lib/supabase/server";
import { pushLeadToGHL } from "@/app/lib/ghl";

export type LeadResult = { ok: true } | { ok: false; error: string };

const SMS_DISCLOSURE_VERSION = "A2P-2026-08-28";
const CUSTOMER_CARE_SMS_DISCLOSURE = "By checking this box and submitting this form, I consent to receive recurring customer-care text messages from TableTurnerr LLC at the number provided, including messages about my inquiry, account, service updates, and support. Message frequency varies based on account activity and support requests. Message and data rates may apply. Reply HELP for help or STOP to opt out. Consent is not a condition of purchase. View our Privacy Policy and SMS Terms.";
const MARKETING_SMS_DISCLOSURE = "By checking this box and submitting this form, I consent to receive recurring customer-engagement and marketing text messages from TableTurnerr LLC at the number provided, including requests for honest feedback or reviews. Automated feedback sequences contain no more than 3 messages per service interaction. Message and data rates may apply. Reply HELP for help or STOP to opt out. Consent is not a condition of purchase. View our Privacy Policy and SMS Terms.";

const MAX = {
  name: 120,
  email: 200,
  business_name: 160,
  phone: 40,
  service: 80,
  message: 4000,
} as const;

function clean(value: FormDataEntryValue | null, max: number): string {
  return (typeof value === "string" ? value : "").trim().slice(0, max);
}

function normalizePhone(value: string): string {
  if (!value) return "";
  const trimmed = value.trim();
  if (/^\+[1-9]\d{1,14}$/.test(trimmed)) return trimmed;

  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  // Preserve non-US and incomplete numbers rather than guessing their country.
  return trimmed;
}

function getClientIp(hdrs: Headers): string | null {
  const candidate = (hdrs.get("x-forwarded-for")?.split(",")[0] ?? hdrs.get("x-real-ip") ?? "").trim();
  // Supabase's inet type accepts standard IPv4 and IPv6 literals. Ignore any
  // malformed proxy header instead of making a valid form submission fail.
  return /^(?:\d{1,3}\.){3}\d{1,3}$|^[0-9a-fA-F:]+$/.test(candidate) ? candidate : null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitLead(formData: FormData): Promise<LeadResult> {
  // Honeypot: real users never fill a hidden field. Bots do.
  if (clean(formData.get("company_website"), 100)) {
    // Pretend success so bots don't learn the trap.
    return { ok: true };
  }

  const name = clean(formData.get("name"), MAX.name);
  const email = clean(formData.get("email"), MAX.email);
  const businessName = clean(formData.get("business_name"), MAX.business_name);
  const phone = normalizePhone(clean(formData.get("phone"), MAX.phone));
  const service = clean(formData.get("service"), MAX.service);
  const message = clean(formData.get("message"), MAX.message);

  if (!name || !email || !message) {
    return { ok: false, error: "Please fill in your name, email, and message." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  // Checkbox values are deliberately opt-in only. Missing, altered, or false
  // values can never be converted into consent.
  const customerCareSmsConsent = formData.get("customer_care_sms_consent") === "on";
  const marketingSmsConsent = formData.get("marketing_sms_consent") === "on";
  const submittedAt = new Date().toISOString();

  // Route the lead into GoHighLevel (our CRM) after the response is sent.
  // Best-effort and independent of the Supabase write, so the lead still
  // reaches the CRM even if our DB insert below fails. The trial form sets a
  // "Free trial signup" message, which lets us tag intent in GHL.
  const isTrial = message.startsWith("Free trial signup");
  after(() =>
    pushLeadToGHL({
      name,
      email,
      phone,
      businessName,
      trade: service,
      message,
      source: isTrial ? "/signup" : "/contact",
      customerCareSmsConsent,
      marketingSmsConsent,
      customerCareSmsConsentedAt: customerCareSmsConsent ? submittedAt : null,
      marketingSmsConsentedAt: marketingSmsConsent ? submittedAt : null,
      smsDisclosureVersion: SMS_DISCLOSURE_VERSION,
    }),
  );

  const hdrs = await headers();
  const userAgent = hdrs.get("user-agent")?.slice(0, 300) ?? null;
  const sourcePageUrl = clean(formData.get("source_page_url"), 2048) || hdrs.get("referer")?.slice(0, 2048) || null;

  const supabase = await createClient();
  const { error } = await supabase.from("contact_leads").insert({
    name,
    email,
    business_name: businessName || null,
    phone: phone || null,
    service: service || null,
    message,
    source_path: isTrial ? "/signup" : "/contact",
    source_page_url: sourcePageUrl,
    ip_address: getClientIp(hdrs),
    user_agent: userAgent,
    customer_care_sms_consent: customerCareSmsConsent,
    marketing_sms_consent: marketingSmsConsent,
    customer_care_sms_consented_at: customerCareSmsConsent ? submittedAt : null,
    marketing_sms_consented_at: marketingSmsConsent ? submittedAt : null,
    sms_disclosure_version: SMS_DISCLOSURE_VERSION,
    customer_care_sms_disclosure: CUSTOMER_CARE_SMS_DISCLOSURE,
    marketing_sms_disclosure: MARKETING_SMS_DISCLOSURE,
    form_submitted_at: submittedAt,
  });

  if (error) {
    // Don't leak DB internals to the client; log server-side for triage.
    console.error("[contact] lead insert failed:", error.message);
    return { ok: false, error: "Something went wrong sending your message. Please email us directly." };
  }

  return { ok: true };
}
