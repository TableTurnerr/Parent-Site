"use server";

import { headers } from "next/headers";
import { createClient } from "@/app/lib/supabase/server";

export type LeadResult = { ok: true } | { ok: false; error: string };

const MAX = {
  name: 120,
  email: 200,
  restaurant: 160,
  phone: 40,
  service: 80,
  message: 4000,
} as const;

function clean(value: FormDataEntryValue | null, max: number): string {
  return (typeof value === "string" ? value : "").trim().slice(0, max);
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
  const restaurant = clean(formData.get("restaurant"), MAX.restaurant);
  const phone = clean(formData.get("phone"), MAX.phone);
  const service = clean(formData.get("service"), MAX.service);
  const message = clean(formData.get("message"), MAX.message);

  if (!name || !email || !message) {
    return { ok: false, error: "Please fill in your name, email, and message." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const hdrs = await headers();
  const userAgent = hdrs.get("user-agent")?.slice(0, 300) ?? null;

  const supabase = await createClient();
  const { error } = await supabase.from("contact_leads").insert({
    name,
    email,
    restaurant: restaurant || null,
    phone: phone || null,
    service: service || null,
    message,
    source_path: "/contact",
    user_agent: userAgent,
  });

  if (error) {
    // Don't leak DB internals to the client; log server-side for triage.
    console.error("[contact] lead insert failed:", error.message);
    return { ok: false, error: "Something went wrong sending your message. Please email us directly." };
  }

  return { ok: true };
}
