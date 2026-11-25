"use server";

import { after } from "next/server";
import { headers } from "next/headers";
import { createAdminClient, createClient } from "@/app/lib/supabase/server";
import { pushLeadToGHL } from "@/app/lib/ghl";
import { sendEmail } from "@/app/lib/email/send";
import { SITE_CONFIG } from "@/app/lib/constants";
import { checkAndRecordRateLimit } from "@/app/lib/ingest/rateLimit";
import { REVIEW_OFFER_SOURCE, reviewOfferActive } from "@/app/lib/review-offer";

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

export type InstantAuditResult =
  | { ok: true; url: string | null }
  | { ok: false; error: string };

/** Instant audits a month before we stop sending people to the self-serve tool (each scan costs us). */
const INSTANT_AUDIT_MONTHLY_CAP = 90;
const LIGHT_AUDIT_URL = "https://audit.seo.tableturnerr.com/light-audit/search";
const INSTANT_AUDIT_MESSAGE = "Instant Google Maps audit request";

/**
 * Free-audit popup, after our GHL form was submitted (GHL already has the contact): saves the lead to contact_leads and
 * counts it. Once this month's instant audits reach the cap no tool link is returned, and the CRM is told to run that
 * audit by hand.
 */
export async function startInstantAudit(formData: FormData): Promise<InstantAuditResult> {
  if (clean(formData.get("company_website"), 100)) return { ok: true, url: null };

  const businessName = clean(formData.get("business_name"), MAX.business_name);
  const contactName = clean(formData.get("name"), MAX.name);
  const phone = normalizePhone(clean(formData.get("phone"), MAX.phone));
  const submittedAt = new Date().toISOString();
  const hdrs = await headers();
  const sourcePageUrl = clean(formData.get("source_page_url"), 2048) || hdrs.get("referer")?.slice(0, 2048) || null;

  // Count this month's instant-audit leads (service role: anon can't read contact_leads). If the count fails,
  // fail open so a real owner is never blocked by our bookkeeping.
  let capped = false;
  try {
    const monthStart = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1)).toISOString();
    const { count } = await (await createAdminClient())
      .from("contact_leads")
      .select("id", { count: "exact", head: true })
      .eq("message", INSTANT_AUDIT_MESSAGE)
      .gte("form_submitted_at", monthStart);
    capped = (count ?? 0) >= INSTANT_AUDIT_MONTHLY_CAP;
  } catch (e) {
    console.error("[instant-audit] monthly count failed:", e instanceof Error ? e.message : e);
  }

  if (capped) {
    after(() =>
      pushLeadToGHL({
        name: contactName || businessName,
        email: "",
        phone,
        businessName,
        trade: "",
        message: `${INSTANT_AUDIT_MESSAGE} (monthly limit reached: run by hand)`,
        source: "/free-google-maps-audit",
        customerCareSmsConsent: false,
        marketingSmsConsent: false,
        customerCareSmsConsentedAt: null,
        marketingSmsConsentedAt: null,
        smsDisclosureVersion: SMS_DISCLOSURE_VERSION,
      }),
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_leads").insert({
    name: contactName || businessName || "Audit form lead",
    email: "",
    business_name: businessName || null,
    phone: phone || null,
    service: null,
    message: INSTANT_AUDIT_MESSAGE,
    source_path: "/free-google-maps-audit",
    source_page_url: sourcePageUrl,
    ip_address: getClientIp(hdrs),
    user_agent: hdrs.get("user-agent")?.slice(0, 300) ?? null,
    // Text consent for this form is recorded in GHL.
    customer_care_sms_consent: false,
    marketing_sms_consent: false,
    customer_care_sms_consented_at: null,
    marketing_sms_consented_at: null,
    sms_disclosure_version: SMS_DISCLOSURE_VERSION,
    customer_care_sms_disclosure: CUSTOMER_CARE_SMS_DISCLOSURE,
    marketing_sms_disclosure: MARKETING_SMS_DISCLOSURE,
    form_submitted_at: submittedAt,
  });
  // GHL already has the lead, so a failed insert is logged, not shown to the owner.
  if (error) console.error("[instant-audit] lead insert failed:", error.message);

  return { ok: true, url: capped ? null : LIGHT_AUDIT_URL };
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** The owners' inboxes: the team and alert addresses already set in production, plus the public contact address. */
const ownerInboxes = () =>
  Array.from(
    new Set(
      [process.env.TABLETURNERR_TEAM_EMAIL, process.env.ALERT_EMAIL_TO, SITE_CONFIG.email]
        .flatMap((v) => (v ?? "").split(","))
        .map((v) => v.trim().toLowerCase())
        .filter(Boolean),
    ),
  );

/**
 * First-10-reviews offer popup, after our GHL form was submitted (GHL already has the contact): emails the owners so they
 * can call, and saves our own copy to contact_leads.
 */
export async function claimReviewOffer(formData: FormData): Promise<LeadResult> {
  if (clean(formData.get("company_website"), 100)) return { ok: true };
  if (!reviewOfferActive()) return { ok: false, error: "Sorry, this offer has ended." };

  const businessName = clean(formData.get("business_name"), MAX.business_name).replace(/\s+/g, " ");
  const person = clean(formData.get("name"), MAX.name);
  const phone = normalizePhone(clean(formData.get("phone"), MAX.phone));
  const digits = phone.replace(/\D/g, "");
  if (!businessName || digits.length < 10 || digits.length > 15) {
    return { ok: false, error: "Please add your business name and a phone number we can call." };
  }

  const hdrs = await headers();
  const ip = getClientIp(hdrs);
  // Each submission emails the owners, so cap repeats. Fail open if the check itself breaks.
  try {
    const limit = await checkAndRecordRateLimit(ip, "review-offer", { max: 5, windowSec: 3600 });
    if (!limit.ok) return { ok: false, error: "Too many tries. Please call us at (332) 333-1008 and mention the offer." };
  } catch (e) {
    console.error("[review-offer] rate limit check failed:", e instanceof Error ? e.message : e);
  }

  const submittedAt = new Date().toISOString();
  const sourcePageUrl = clean(formData.get("source_page_url"), 2048) || hdrs.get("referer")?.slice(0, 2048) || null;
  const message = "First 10 reviews free offer (popup). Call them.";
  const when = new Date(submittedAt).toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "medium", timeStyle: "short" });
  const rows: [string, string][] = [
    ["Business", businessName],
    ["Name", person || "not given"],
    ["Phone", phone],
    ["Page", sourcePageUrl ?? "unknown"],
    ["Time", `${when} ET`],
  ];
  const subject = `Call now: ${businessName} wants the 10 free reviews offer`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nThey asked for a call. The full form, with the texting consent they gave, is in GoHighLevel.`;
  const html = `<div style="font-family:system-ui,sans-serif;color:#111827"><h2>New offer claim: 10 free reviews</h2>${rows
    .map(([k, v]) => `<p style="margin:0 0 6px"><strong>${k}:</strong> ${k === "Phone" ? `<a href="tel:${escapeHtml(v)}">${escapeHtml(v)}</a>` : escapeHtml(v)}</p>`)
    .join("")}<p>They asked for a call. The full form, with the texting consent they gave, is in GoHighLevel.</p></div>`;
  const supabase = await createClient();

  const [email, db] = await Promise.allSettled([
    Promise.all(ownerInboxes().map((to) => sendEmail({ to, subject, text, html }))),
    supabase.from("contact_leads").insert({
      name: person || businessName,
      email: "",
      business_name: businessName,
      phone,
      service: null,
      message,
      source_path: REVIEW_OFFER_SOURCE,
      source_page_url: sourcePageUrl,
      ip_address: ip,
      user_agent: hdrs.get("user-agent")?.slice(0, 300) ?? null,
      customer_care_sms_consent: false,
      marketing_sms_consent: false,
      customer_care_sms_consented_at: null,
      marketing_sms_consented_at: null,
      sms_disclosure_version: SMS_DISCLOSURE_VERSION,
      customer_care_sms_disclosure: CUSTOMER_CARE_SMS_DISCLOSURE,
      marketing_sms_disclosure: MARKETING_SMS_DISCLOSURE,
      form_submitted_at: submittedAt,
    }),
  ]);

  const emailed = email.status === "fulfilled" && email.value.some((r) => r.ok);
  const saved = db.status === "fulfilled" && !db.value.error;
  if (!emailed) console.error("[review-offer] owner email failed");
  if (!saved) console.error("[review-offer] lead insert failed:", db.status === "fulfilled" ? db.value.error?.message : db.reason);

  if (!emailed && !saved) {
    return { ok: false, error: "That didn't go through. Please call us at (332) 333-1008 and mention the offer." };
  }
  return { ok: true };
}
