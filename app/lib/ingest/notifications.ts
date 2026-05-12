import { createAdminClient } from "@/app/lib/supabase/server";
import { sendEmail } from "@/app/lib/email/send";
import {
  renderReviewAckEmail,
  renderReviewNotificationEmail,
  renderSubmissionAckEmail,
  renderSubmissionNotificationEmail,
} from "@/app/lib/email/templates";

function getTeamEmails(): string[] {
  const raw = process.env.TABLETURNERR_TEAM_EMAIL ?? "";
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 0);
}

async function getOwnerEmails(clientId: string): Promise<string[]> {
  const admin = await createAdminClient();
  const { data } = await admin
    .from("client_access")
    .select("email")
    .eq("client_id", clientId)
    .is("revoked_at", null);
  return (data ?? []).map((r) => r.email.toLowerCase());
}

async function fanout(
  recipients: string[],
  email: { subject: string; html: string; text: string },
): Promise<void> {
  const unique = Array.from(new Set(recipients.filter(Boolean)));
  if (unique.length === 0) return;
  await Promise.allSettled(
    unique.map((to) =>
      sendEmail({ to, subject: email.subject, html: email.html, text: email.text }),
    ),
  );
}

export async function notifyNewReview(reviewId: string): Promise<void> {
  const admin = await createAdminClient();
  const { data: review } = await admin
    .from("site_reviews")
    .select(
      "id, client_id, rating, feedback, reviewer_name, reviewer_email, reviewer_phone, location_id, clients!inner ( name, slug ), locations ( name )",
    )
    .eq("id", reviewId)
    .single();

  if (!review) return;

  const client = review.clients as unknown as { name: string; slug: string } | null;
  const location = review.locations as unknown as { name: string } | null;
  if (!client) return;

  const ownerEmails = await getOwnerEmails(review.client_id);
  const teamEmails = getTeamEmails();
  const recipients = [...ownerEmails, ...teamEmails];

  const notification = renderReviewNotificationEmail({
    clientName: client.name,
    clientSlug: client.slug,
    rating: review.rating,
    feedback: review.feedback,
    reviewerName: review.reviewer_name,
    reviewerEmail: review.reviewer_email,
    reviewerPhone: review.reviewer_phone,
    locationName: location?.name ?? null,
    reviewId: review.id,
  });

  const tasks: Promise<unknown>[] = [fanout(recipients, notification)];

  if (review.reviewer_email) {
    const ack = renderReviewAckEmail({
      reviewerName: review.reviewer_name,
      clientName: client.name,
    });
    tasks.push(
      sendEmail({ to: review.reviewer_email, subject: ack.subject, html: ack.html, text: ack.text }),
    );
  }

  await Promise.allSettled(tasks);
}

export async function notifyNewSubmission(submissionId: string): Promise<void> {
  const admin = await createAdminClient();
  const { data: sub } = await admin
    .from("site_form_submissions")
    .select(
      "id, client_id, form_type, payload, contact_name, contact_email, contact_phone, location_id, clients!inner ( name, slug ), locations ( name )",
    )
    .eq("id", submissionId)
    .single();

  if (!sub) return;

  const client = sub.clients as unknown as { name: string; slug: string } | null;
  const location = sub.locations as unknown as { name: string } | null;
  if (!client) return;

  const ownerEmails = await getOwnerEmails(sub.client_id);
  const teamEmails = getTeamEmails();
  const recipients = [...ownerEmails, ...teamEmails];

  const payloadObj = (sub.payload && typeof sub.payload === "object" && !Array.isArray(sub.payload)
    ? (sub.payload as Record<string, unknown>)
    : {});

  const notification = renderSubmissionNotificationEmail({
    clientName: client.name,
    clientSlug: client.slug,
    formType: sub.form_type,
    payload: payloadObj,
    contactName: sub.contact_name,
    contactEmail: sub.contact_email,
    contactPhone: sub.contact_phone,
    locationName: location?.name ?? null,
  });

  const tasks: Promise<unknown>[] = [fanout(recipients, notification)];

  if (sub.contact_email) {
    const ack = renderSubmissionAckEmail({
      contactName: sub.contact_name,
      clientName: client.name,
      formType: sub.form_type,
    });
    tasks.push(
      sendEmail({ to: sub.contact_email, subject: ack.subject, html: ack.html, text: ack.text }),
    );
  }

  await Promise.allSettled(tasks);
}
