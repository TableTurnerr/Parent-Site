import "server-only";

export interface GhlLead {
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  trade?: string;
  message?: string;
  /** "/signup" for free-trial intent, "/contact" for a demo request. */
  source: string;
}

/**
 * Best-effort push of a site lead into GoHighLevel (our internal CRM) via an
 * inbound-webhook URL — a GHL Workflow with an "Inbound Webhook" trigger that
 * maps these JSON fields onto a contact and runs whatever automation/pipeline
 * the team sets up.
 *
 * Design notes:
 * - No-op (with a dev warning) if GHL_LEAD_WEBHOOK_URL is unset, so local dev
 *   and previews don't fail.
 * - NEVER throws. Callers schedule this via next/server `after()`, so a GHL
 *   outage can't affect the visitor's form submission.
 * - This is purely additive: the lead is still written to Supabase
 *   `contact_leads` as the source of truth, so nothing is lost if GHL is down.
 */
export async function pushLeadToGHL(lead: GhlLead): Promise<void> {
  const url = process.env.GHL_LEAD_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[ghl] GHL_LEAD_WEBHOOK_URL unset; skipping GHL push");
    }
    return;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // GHL inbound webhooks accept arbitrary JSON; the workflow maps fields.
      // Send a few name variants so mapping is easy on the GHL side.
      body: JSON.stringify({
        name: lead.name,
        firstName: lead.name,
        email: lead.email,
        phone: lead.phone ?? "",
        businessName: lead.businessName ?? "",
        trade: lead.trade ?? "",
        message: lead.message ?? "",
        source: lead.source,
        submittedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) {
      console.error(`[ghl] webhook responded ${res.status}`);
    }
  } catch (err) {
    console.error(
      "[ghl] lead push failed:",
      err instanceof Error ? err.message : err,
    );
  }
}
