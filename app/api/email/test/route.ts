import { NextResponse } from "next/server";
import { sendEmail } from "@/app/lib/email/send";
import { renderShareEmail, renderPublishedEmail } from "@/app/lib/email/templates";

export const runtime = "nodejs";

type Body = {
  to?: string;
  template?: "hello" | "share" | "share-existing" | "published";
};

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Disabled in production" }, { status: 403 });
  }

  const body = (await request.json().catch(() => ({}))) as Body;
  const to = body.to ?? "hashaam.zahid.work@gmail.com";
  const template = body.template ?? "hello";

  let payload: { subject: string; html: string; text: string };

  switch (template) {
    case "share":
      payload = renderShareEmail({
        recipientEmail: to,
        clientName: "Sample Bistro",
        invitedByName: "Hashaam",
        reportMonth: "2026-04-01",
        hasExistingAccount: false,
      });
      break;
    case "share-existing":
      payload = renderShareEmail({
        recipientEmail: to,
        clientName: "Sample Bistro",
        invitedByName: "Hashaam",
        reportMonth: "2026-04-01",
        hasExistingAccount: true,
      });
      break;
    case "published":
      payload = renderPublishedEmail({
        recipientEmail: to,
        clientName: "Sample Bistro",
        reportMonth: "2026-04-01",
        reportSlug: "sample-bistro",
      });
      break;
    default:
      payload = {
        subject: "Hello World",
        html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
        text: "Congrats on sending your first email!",
      };
  }

  const result = await sendEmail({ to, ...payload });
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
