import { getResend, getFromHeader } from "./client";

export interface SendEmailResult {
  ok: boolean;
  id?: string;
  error?: string;
}

/**
 * Sends a transactional email via Resend. Returns a result object so callers can
 * record delivery status in `report_notifications` without throwing on failure.
 */
export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<SendEmailResult> {
  try {
    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: getFromHeader(),
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    });
    if (error) {
      return { ok: false, error: error.message ?? String(error) };
    }
    return { ok: true, id: data?.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
