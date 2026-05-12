const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_ALLOWED_RE = /^[\d\s()+\-.]{7,24}$/;

export function isValidEmail(value: string): boolean {
  if (value.length > 254) return false;
  return EMAIL_RE.test(value);
}

export function isValidPhone(value: string): boolean {
  if (!PHONE_ALLOWED_RE.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function cleanString(value: unknown, max = 5000): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.length > max) return null;
  return trimmed;
}

export function cleanOptionalEmail(value: unknown): { ok: true; value: string | null } | { ok: false; error: string } {
  if (value === undefined || value === null || value === "") return { ok: true, value: null };
  if (typeof value !== "string") return { ok: false, error: "email must be a string" };
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return { ok: true, value: null };
  if (!isValidEmail(trimmed)) return { ok: false, error: "invalid email" };
  return { ok: true, value: trimmed };
}

export function cleanOptionalPhone(value: unknown): { ok: true; value: string | null } | { ok: false; error: string } {
  if (value === undefined || value === null || value === "") return { ok: true, value: null };
  if (typeof value !== "string") return { ok: false, error: "phone must be a string" };
  const trimmed = value.trim();
  if (!trimmed) return { ok: true, value: null };
  if (!isValidPhone(trimmed)) return { ok: false, error: "invalid phone" };
  return { ok: true, value: trimmed };
}

export type ReviewPayload = {
  rating: number;
  feedback: string;
  reviewer_name: string;
  reviewer_email: string | null;
  reviewer_phone: string | null;
  location_slug: string | null;
};

export function parseReviewBody(body: unknown): { ok: true; data: ReviewPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "body required" };
  const { turnstile_token: _turnstile, ...b } = body as Record<string, unknown>;
  void _turnstile;

  const ratingRaw = b.rating;
  const rating = typeof ratingRaw === "number" ? ratingRaw : Number(ratingRaw);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { ok: false, error: "rating must be an integer 1-5" };
  }

  const feedback = cleanString(b.feedback, 2000);
  if (!feedback || feedback.length < 3) return { ok: false, error: "feedback must be 3-2000 chars" };

  const reviewer_name = cleanString(b.name ?? b.reviewer_name, 120);
  if (!reviewer_name) return { ok: false, error: "name required" };

  const emailResult = cleanOptionalEmail(b.email ?? b.reviewer_email);
  if (!emailResult.ok) return emailResult;

  const phoneResult = cleanOptionalPhone(b.phone ?? b.reviewer_phone);
  if (!phoneResult.ok) return phoneResult;

  const location_slug = typeof b.location_slug === "string" && b.location_slug.trim()
    ? b.location_slug.trim().toLowerCase()
    : null;

  return {
    ok: true,
    data: {
      rating,
      feedback,
      reviewer_name,
      reviewer_email: emailResult.value,
      reviewer_phone: phoneResult.value,
      location_slug,
    },
  };
}

export type SubmissionPayload = {
  form_type: string;
  payload: Record<string, unknown>;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  location_slug: string | null;
};

export function parseSubmissionBody(body: unknown): { ok: true; data: SubmissionPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "body required" };
  const { turnstile_token: _turnstile, ...b } = body as Record<string, unknown>;
  void _turnstile;

  const form_type = cleanString(b.form_type, 64);
  if (!form_type) return { ok: false, error: "form_type required" };
  if (!/^[a-z0-9_-]+$/i.test(form_type)) return { ok: false, error: "form_type must be alphanumeric/_/-" };

  const payload = b.payload;
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false, error: "payload must be a JSON object" };
  }
  const payloadJson = JSON.stringify(payload);
  if (payloadJson.length > 32 * 1024) return { ok: false, error: "payload exceeds 32KB" };

  const contact_name = cleanString(b.contact_name, 120);

  const emailResult = cleanOptionalEmail(b.contact_email);
  if (!emailResult.ok) return emailResult;

  const phoneResult = cleanOptionalPhone(b.contact_phone);
  if (!phoneResult.ok) return phoneResult;

  const location_slug = typeof b.location_slug === "string" && b.location_slug.trim()
    ? b.location_slug.trim().toLowerCase()
    : null;

  return {
    ok: true,
    data: {
      form_type,
      payload: payload as Record<string, unknown>,
      contact_name,
      contact_email: emailResult.value,
      contact_phone: phoneResult.value,
      location_slug,
    },
  };
}
