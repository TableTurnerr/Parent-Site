import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");

const form = read("app/components/site/LeadForm.tsx");
const action = read("app/(marketing)/contact/actions.ts");
const privacy = read("app/(marketing)/privacy/page.tsx");
const terms = read("app/(marketing)/terms/page.tsx");
const footer = read("app/components/site/SiteFooter.tsx");
const migration = read("supabase/migrations/20260828000000_add_contact_lead_sms_consent.sql");
const clientGuidance = read("docs/a2p-client-compliance.md");
const pricing = read("app/lib/pricing.ts");

test("SMS checkbox preferences are optional, separate, and unselected by default", () => {
  assert.match(form, /name="customer_care_sms_consent"/);
  assert.match(form, /name="marketing_sms_consent"/);
  assert.match(form, /type="checkbox"/);
  assert.doesNotMatch(form, /defaultChecked|checked=|required[^\n]*customer.*sms|customer.*sms[^\n]*required/);
  assert.match(form, /SMS messages will be sent only for[\s\S]*categories you separately select above/);
});

test("server action preserves separate affirmative consent evidence", () => {
  for (const field of [
    "customer_care_sms_consent",
    "marketing_sms_consent",
    "customer_care_sms_consented_at",
    "marketing_sms_consented_at",
    "sms_disclosure_version",
    "source_page_url",
    "ip_address",
    "form_submitted_at",
  ]) assert.match(action, new RegExp(field));
  assert.match(action, /formData\.get\("customer_care_sms_consent"\) === "on"/);
  assert.match(action, /formData\.get\("marketing_sms_consent"\) === "on"/);
  assert.match(action, /A2P-2026-08-28/);
});

test("database migration stores consent timestamps only for affirmative selections", () => {
  assert.match(migration, /customer_care_sms_consent boolean NOT NULL DEFAULT false/);
  assert.match(migration, /marketing_sms_consent boolean NOT NULL DEFAULT false/);
  assert.match(migration, /customer_care_sms_timestamp_check/);
  assert.match(migration, /marketing_sms_timestamp_check/);
});

test("public legal pages expose the required SMS sections", () => {
  assert.match(privacy, /id="sms-privacy"/);
  assert.match(privacy, /SMS and Mobile Information/);
  assert.match(terms, /id="sms-terms"/);
  assert.match(terms, /SMS Terms/);
  assert.match(terms, /August 28, 2026/);
  assert.match(form, /href="\/privacy"/);
  assert.match(form, /href="\/terms#sms-terms"/);
  assert.match(footer, /Privacy Policy/);
  assert.match(footer, /Terms of Service/);
  assert.match(footer, /© 2026 TableTurnerr LLC\. All rights reserved\./);
});

test("website consent is not presented as client-brand consent", () => {
  assert.match(privacy, /does not authorize an[\s\S]*independent client/);
  assert.match(terms, /must not rely on TableTurnerr[\s\S]*website consent/);
  assert.match(clientGuidance, /must never be used as consent for an independent[\s\S]*client business/);
  assert.match(clientGuidance, /own A2P Brand registration and Campaign registration/);
});

test("this change adds no TableTurnerr review route or review URL configuration", () => {
  assert.equal(existsSync(resolve(root, "app/(marketing)/review")), false);
  assert.equal(existsSync(resolve(root, "app/review")), false);
  assert.doesNotMatch(action + form, /GOOGLE_REVIEW_URL|review redirect/i);
});

test("review copy retains the no-gating standard", () => {
  assert.match(clientGuidance, /honest feedback from every eligible customer/);
  assert.match(pricing, /honest reviews from every eligible customer/);
  assert.doesNotMatch(pricing, /happy customers.*reviews/i);
});
