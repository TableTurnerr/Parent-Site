import { createClient } from "@/app/lib/supabase/server";
import { Inbox, Mail, Phone } from "lucide-react";

export const dynamic = "force-dynamic";

const statusColors: Record<string, string> = {
  new: "bg-green-100 text-green-700",
  contacted: "bg-blue-100 text-blue-700",
  archived: "bg-gray-100 text-gray-600",
  spam: "bg-rose-100 text-rose-700",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function LeadsPage() {
  const supabase = await createClient();

  const { data: leads, error } = await supabase
    .from("contact_leads")
    .select("id, name, email, restaurant, phone, service, message, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-charcoal)]">
          Contact Leads
        </h1>
        <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
          Submissions from the public contact form.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          Could not load leads: {error.message}. If this is the first run, make sure the{" "}
          <code className="font-mono">add-contact-leads.sql</code> migration has been applied.
        </div>
      )}

      {!error && (!leads || leads.length === 0) && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--color-border)] py-16 text-center">
          <Inbox className="mb-3 h-8 w-8 text-[var(--color-warm-gray-light)]" />
          <p className="text-sm font-medium text-[var(--color-charcoal)]">No leads yet</p>
          <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
            New contact form submissions will appear here.
          </p>
        </div>
      )}

      {leads && leads.length > 0 && (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-xl border border-[var(--color-border)] bg-white p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-[var(--color-charcoal)]">
                    {lead.name}
                  </span>
                  {lead.restaurant && (
                    <span className="text-sm text-[var(--color-warm-gray)]">
                      · {lead.restaurant}
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      statusColors[lead.status] ?? statusColors.new
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>
                <span className="text-xs text-[var(--color-warm-gray)]">
                  {formatDate(lead.created_at)}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                <a
                  href={`mailto:${lead.email}`}
                  className="inline-flex items-center gap-1.5 text-[var(--color-accent)] hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" /> {lead.email}
                </a>
                {lead.phone && (
                  <a
                    href={`tel:${lead.phone}`}
                    className="inline-flex items-center gap-1.5 text-[var(--color-charcoal)] hover:underline"
                  >
                    <Phone className="h-3.5 w-3.5" /> {lead.phone}
                  </a>
                )}
                {lead.service && (
                  <span className="text-[var(--color-warm-gray)]">
                    Interested in: {lead.service}
                  </span>
                )}
              </div>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[var(--color-charcoal)]">
                {lead.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
