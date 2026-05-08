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
