import { getSiteUrl } from "./client";

interface ShareOpts {
  recipientEmail: string;
  clientName: string;
  invitedByName?: string | null;
  reportMonth?: string | null;
  hasExistingAccount: boolean;
  /** One-click magic-login URL. Falls back to /login if omitted. */
  loginUrl?: string | null;
}

interface PublishedOpts {
  recipientEmail: string;
  clientName: string;
  reportMonth: string;
  reportSlug: string;
}

const monthLabel = (month: string | null | undefined) => {
  if (!month) return null;
  const d = new Date(month);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

/** "TableTurnerr shared a report with you" — sent on access grant. */
export function renderShareEmail(opts: ShareOpts) {
  const site = getSiteUrl();
  const loginUrl = opts.loginUrl ?? `${site}/login`;
  const isOneClick = Boolean(opts.loginUrl);
  const ctaLabel = isOneClick ? "View your report" : "Sign in to TableTurnerr";
  const monthStr = monthLabel(opts.reportMonth);

  const subject = `${opts.invitedByName ?? "TableTurnerr"} shared ${opts.clientName}'s report with you`;

  const ctaCopy = isOneClick
    ? "Click the button below to open your report — you'll be signed in automatically. No password required."
    : opts.hasExistingAccount
      ? "Sign in to view your report"
      : "Click the link below to sign in. We'll email you a one-time login link — no password required.";

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5f1eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;">
  <div style="max-width:560px;margin:0 auto;padding:48px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <div style="font-size:28px;font-weight:800;letter-spacing:-0.02em;">Table<span style="font-weight:900">Turnerr</span></div>
    </div>
    <div style="background:#fff;border-radius:16px;padding:32px;border:1px solid #e8e3d8;">
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:700;">A report has been shared with you</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#444;">
        ${opts.invitedByName ? `<strong>${opts.invitedByName}</strong> at TableTurnerr` : "TableTurnerr"} has given you access to the digital presence report${monthStr ? ` for <strong>${monthStr}</strong>` : ""} for <strong>${opts.clientName}</strong>.
      </p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#444;">${ctaCopy}</p>
      <p style="text-align:center;margin:24px 0;">
        <a href="${loginUrl}" style="display:inline-block;background:#1a1a1a;color:#fff;text-decoration:none;padding:14px 32px;border-radius:999px;font-size:15px;font-weight:500;">${ctaLabel}</a>
      </p>
      <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#888;">
        Once signed in, you'll see all monthly reports for ${opts.clientName} on your dashboard.
        New reports are added each month as we update your digital presence analysis.
      </p>
    </div>
    <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#999;text-align:center;">
      You're receiving this because someone at TableTurnerr granted you report access for ${opts.clientName}. If this looks wrong, just ignore this email.
    </p>
  </div>
</body></html>`;

  const text = isOneClick
    ? `${opts.invitedByName ?? "TableTurnerr"} has given you access to the digital presence report${monthStr ? ` for ${monthStr}` : ""} for ${opts.clientName}.\n\nOpen your report (one-click sign-in): ${loginUrl}\n\nOnce signed in, you'll see all monthly reports for ${opts.clientName}.`
    : `${opts.invitedByName ?? "TableTurnerr"} has given you access to the digital presence report${monthStr ? ` for ${monthStr}` : ""} for ${opts.clientName}.\n\nSign in here: ${loginUrl}\n\nOnce signed in, you'll see all monthly reports for ${opts.clientName} on your dashboard.`;

  return { subject, html, text };
}

interface MultiShareOpts {
  recipientEmail: string;
  clientNames: string[];
  invitedByName?: string | null;
  hasExistingAccount: boolean;
  loginUrl?: string | null;
}

/** "TableTurnerr shared multiple reports with you" — sent on bulk access grant. */
export function renderMultiShareEmail(opts: MultiShareOpts) {
  const site = getSiteUrl();
  const loginUrl = opts.loginUrl ?? `${site}/login`;
  const isOneClick = Boolean(opts.loginUrl);
  const ctaLabel = isOneClick ? "View your reports" : "Sign in to TableTurnerr";
  const count = opts.clientNames.length;

  const subject = `${opts.invitedByName ?? "TableTurnerr"} shared ${count} reports with you`;

  const ctaCopy = isOneClick
    ? "Click the button below to open your reports — you'll be signed in automatically. No password required."
    : opts.hasExistingAccount
      ? "Sign in to view your reports"
      : "Click the link below to sign in. We'll email you a one-time login link — no password required.";

  const listHtml = opts.clientNames
    .map(
      (n) =>
        `<li style="margin:0 0 6px;font-size:15px;line-height:1.6;color:#1a1a1a;"><strong>${n}</strong></li>`,
    )
    .join("");

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5f1eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;">
  <div style="max-width:560px;margin:0 auto;padding:48px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <div style="font-size:28px;font-weight:800;letter-spacing:-0.02em;">Table<span style="font-weight:900">Turnerr</span></div>
    </div>
    <div style="background:#fff;border-radius:16px;padding:32px;border:1px solid #e8e3d8;">
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:700;">${count} reports have been shared with you</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#444;">
        ${opts.invitedByName ? `<strong>${opts.invitedByName}</strong> at TableTurnerr` : "TableTurnerr"} has given you access to digital presence reports for the following companies:
      </p>
      <ul style="margin:0 0 20px;padding-left:20px;">${listHtml}</ul>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#444;">${ctaCopy}</p>
      <p style="text-align:center;margin:24px 0;">
        <a href="${loginUrl}" style="display:inline-block;background:#1a1a1a;color:#fff;text-decoration:none;padding:14px 32px;border-radius:999px;font-size:15px;font-weight:500;">${ctaLabel}</a>
      </p>
      <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#888;">
        Once signed in, you'll see all monthly reports for each company on your dashboard.
        New reports are added each month as we update your digital presence analysis.
      </p>
    </div>
    <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#999;text-align:center;">
      You're receiving this because someone at TableTurnerr granted you access to these reports. If this looks wrong, just ignore this email.
    </p>
  </div>
</body></html>`;

  const list = opts.clientNames.map((n) => `  • ${n}`).join("\n");
  const text = isOneClick
    ? `${opts.invitedByName ?? "TableTurnerr"} has given you access to ${count} digital presence reports:\n\n${list}\n\nOpen your reports (one-click sign-in): ${loginUrl}`
    : `${opts.invitedByName ?? "TableTurnerr"} has given you access to ${count} digital presence reports:\n\n${list}\n\nSign in here: ${loginUrl}`;

  return { subject, html, text };
}

interface ReviewNotifyOpts {
  clientName: string;
  clientSlug: string;
  rating: number;
  feedback: string;
  reviewerName: string;
  reviewerEmail: string | null;
  reviewerPhone: string | null;
  locationName: string | null;
  reviewId: string;
}

export function renderReviewNotificationEmail(opts: ReviewNotifyOpts) {
  const site = getSiteUrl();
  const adminUrl = `${site}/admin/companies/${opts.clientSlug}/reviews`;
  const stars = "★".repeat(opts.rating) + "☆".repeat(5 - opts.rating);
  const subject = `New ${opts.rating}-star review for ${opts.clientName}`;

  const contactParts: string[] = [];
  if (opts.reviewerEmail) contactParts.push(opts.reviewerEmail);
  if (opts.reviewerPhone) contactParts.push(opts.reviewerPhone);
  const contactLine = contactParts.length ? contactParts.join(" · ") : "No contact details provided";

  const escapedFeedback = opts.feedback
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5f1eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;">
  <div style="max-width:560px;margin:0 auto;padding:48px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <div style="font-size:28px;font-weight:800;letter-spacing:-0.02em;">Table<span style="font-weight:900">Turnerr</span></div>
    </div>
    <div style="background:#fff;border-radius:16px;padding:32px;border:1px solid #e8e3d8;">
      <p style="margin:0 0 8px;font-size:13px;line-height:1.4;color:#888;text-transform:uppercase;letter-spacing:0.08em;">New review · ${opts.clientName}${opts.locationName ? ` · ${opts.locationName}` : ""}</p>
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:700;">${stars} <span style="color:#888;font-weight:500;font-size:16px;">${opts.rating}/5</span></h1>
      <p style="margin:0 0 4px;font-size:15px;line-height:1.5;color:#1a1a1a;"><strong>${opts.reviewerName}</strong></p>
      <p style="margin:0 0 20px;font-size:13px;line-height:1.5;color:#666;">${contactLine}</p>
      <div style="background:#f9f6f0;border-left:3px solid #1a1a1a;padding:16px 18px;border-radius:6px;margin:0 0 24px;">
        <p style="margin:0;font-size:15px;line-height:1.6;color:#333;">${escapedFeedback}</p>
      </div>
      <p style="text-align:center;margin:24px 0 0;">
        <a href="${adminUrl}" style="display:inline-block;background:#1a1a1a;color:#fff;text-decoration:none;padding:14px 32px;border-radius:999px;font-size:15px;font-weight:500;">Open in admin</a>
      </p>
    </div>
    <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#999;text-align:center;">
      You're receiving this because you have access to ${opts.clientName} on TableTurnerr.
    </p>
  </div>
</body></html>`;

  const text = `New ${opts.rating}-star review for ${opts.clientName}${opts.locationName ? ` (${opts.locationName})` : ""}\n\nFrom: ${opts.reviewerName}\n${contactLine}\n\n"${opts.feedback}"\n\nOpen in admin: ${adminUrl}`;

  return { subject, html, text };
}

interface ReviewAckOpts {
  reviewerName: string;
  clientName: string;
}

export function renderReviewAckEmail(opts: ReviewAckOpts) {
  const subject = `We received your feedback`;

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5f1eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;">
  <div style="max-width:560px;margin:0 auto;padding:48px 24px;">
    <div style="background:#fff;border-radius:16px;padding:32px;border:1px solid #e8e3d8;">
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:700;">Thank you, ${opts.reviewerName}.</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#444;">
        We've received your note about your visit to <strong>${opts.clientName}</strong>. Someone from the team will read it personally and reach out within one business day.
      </p>
      <p style="margin:0 0 0;font-size:15px;line-height:1.6;color:#444;">
        We appreciate you taking the time to tell us — feedback like yours is how we keep getting better.
      </p>
    </div>
    <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#999;text-align:center;">
      Sent on behalf of ${opts.clientName} via TableTurnerr.
    </p>
  </div>
</body></html>`;

  const text = `Thank you, ${opts.reviewerName}.\n\nWe've received your note about your visit to ${opts.clientName}. Someone from the team will read it personally and reach out within one business day.\n\nWe appreciate you taking the time to tell us.`;

  return { subject, html, text };
}

interface SubmissionNotifyOpts {
  clientName: string;
  clientSlug: string;
  formType: string;
  payload: Record<string, unknown>;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  locationName: string | null;
}

export function renderSubmissionNotificationEmail(opts: SubmissionNotifyOpts) {
  const site = getSiteUrl();
  const adminUrl = `${site}/admin/companies/${opts.clientSlug}/submissions`;
  const formTypeLabel = opts.formType.charAt(0).toUpperCase() + opts.formType.slice(1);
  const subject = `New ${opts.formType} inquiry for ${opts.clientName}`;

  const contactParts: string[] = [];
  if (opts.contactEmail) contactParts.push(opts.contactEmail);
  if (opts.contactPhone) contactParts.push(opts.contactPhone);
  const contactLine = contactParts.length ? contactParts.join(" · ") : "No contact details provided";

  const payloadRows = Object.entries(opts.payload)
    .map(([k, v]) => {
      const key = k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      const value =
        v === null || v === undefined
          ? "—"
          : typeof v === "object"
            ? JSON.stringify(v)
            : String(v);
      const safe = value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");
      return `<tr><td style="padding:6px 12px 6px 0;font-size:13px;color:#888;vertical-align:top;width:35%;">${key}</td><td style="padding:6px 0;font-size:14px;color:#1a1a1a;">${safe}</td></tr>`;
    })
    .join("");

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5f1eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;">
  <div style="max-width:560px;margin:0 auto;padding:48px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <div style="font-size:28px;font-weight:800;letter-spacing:-0.02em;">Table<span style="font-weight:900">Turnerr</span></div>
    </div>
    <div style="background:#fff;border-radius:16px;padding:32px;border:1px solid #e8e3d8;">
      <p style="margin:0 0 8px;font-size:13px;line-height:1.4;color:#888;text-transform:uppercase;letter-spacing:0.08em;">${formTypeLabel} inquiry · ${opts.clientName}${opts.locationName ? ` · ${opts.locationName}` : ""}</p>
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:700;">${opts.contactName ?? "New submission"}</h1>
      <p style="margin:0 0 20px;font-size:13px;line-height:1.5;color:#666;">${contactLine}</p>
      <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">${payloadRows}</table>
      <p style="text-align:center;margin:24px 0 0;">
        <a href="${adminUrl}" style="display:inline-block;background:#1a1a1a;color:#fff;text-decoration:none;padding:14px 32px;border-radius:999px;font-size:15px;font-weight:500;">Open in admin</a>
      </p>
    </div>
    <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#999;text-align:center;">
      You're receiving this because you have access to ${opts.clientName} on TableTurnerr.
    </p>
  </div>
</body></html>`;

  const textLines = Object.entries(opts.payload).map(([k, v]) => {
    const value = v === null || v === undefined ? "—" : typeof v === "object" ? JSON.stringify(v) : String(v);
    return `${k}: ${value}`;
  });

  const text = `New ${opts.formType} inquiry for ${opts.clientName}${opts.locationName ? ` (${opts.locationName})` : ""}\n\nFrom: ${opts.contactName ?? "Unknown"}\n${contactLine}\n\n${textLines.join("\n")}\n\nOpen in admin: ${adminUrl}`;

  return { subject, html, text };
}

interface SubmissionAckOpts {
  contactName: string | null;
  clientName: string;
  formType: string;
}

export function renderSubmissionAckEmail(opts: SubmissionAckOpts) {
  const greeting = opts.contactName ? `Thank you, ${opts.contactName}.` : "Thank you.";
  const subject = `We received your ${opts.formType} inquiry`;

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5f1eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;">
  <div style="max-width:560px;margin:0 auto;padding:48px 24px;">
    <div style="background:#fff;border-radius:16px;padding:32px;border:1px solid #e8e3d8;">
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:700;">${greeting}</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#444;">
        We've received your ${opts.formType} inquiry for <strong>${opts.clientName}</strong>. Someone from the team will follow up within one business day.
      </p>
    </div>
    <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#999;text-align:center;">
      Sent on behalf of ${opts.clientName} via TableTurnerr.
    </p>
  </div>
</body></html>`;

  const text = `${greeting}\n\nWe've received your ${opts.formType} inquiry for ${opts.clientName}. Someone from the team will follow up within one business day.`;

  return { subject, html, text };
}

/** "Your new monthly report is ready" — sent when a new month publishes. */
export function renderPublishedEmail(opts: PublishedOpts) {
  const site = getSiteUrl();
  const portalUrl = `${site}/portal/clients/${opts.reportSlug}`;
  const monthStr = monthLabel(opts.reportMonth) ?? opts.reportMonth;

  const subject = `${opts.clientName}'s ${monthStr} report is ready`;

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5f1eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;">
  <div style="max-width:560px;margin:0 auto;padding:48px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <div style="font-size:28px;font-weight:800;letter-spacing:-0.02em;">Table<span style="font-weight:900">Turnerr</span></div>
    </div>
    <div style="background:#fff;border-radius:16px;padding:32px;border:1px solid #e8e3d8;">
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:700;">Your ${monthStr} report is live</h1>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#444;">
        We've published the latest digital presence report for <strong>${opts.clientName}</strong>. Sign in to your portal to read the full breakdown.
      </p>
      <p style="text-align:center;margin:24px 0;">
        <a href="${portalUrl}" style="display:inline-block;background:#1a1a1a;color:#fff;text-decoration:none;padding:14px 32px;border-radius:999px;font-size:15px;font-weight:500;">View ${monthStr} report</a>
      </p>
    </div>
    <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#999;text-align:center;">
      You're receiving this because you have access to ${opts.clientName}'s reports on TableTurnerr.
    </p>
  </div>
</body></html>`;

  const text = `Your ${monthStr} report for ${opts.clientName} is now available.\n\nView it here: ${portalUrl}`;

  return { subject, html, text };
}
