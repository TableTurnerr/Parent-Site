// Three ways in, each placed for a different kind of visitor:
//  - wants proof first      → free audit (AuditBand, already on most pages)
//  - wants to talk it over  → BookCallBand: a 15-minute call booked for later
//  - ready now, hates forms → CallNowBand: call the main line right now
// Plus the floating CallWidget (site-wide) that nudges toward a call.
import { CalendarClock, Check, MessageSquareText, Phone } from "lucide-react";
import { growthSite } from "@/app/lib/growth";

export const TEL = `tel:${growthSite.phoneE164}`;
export const SMS = `sms:${growthSite.phoneE164}`;

/** For the owner who wants to talk it through before deciding. */
export function BookCallBand({ title = "Rather talk it through first? Book a 15-minute call" }: { title?: string }) {
  return (
    <section className="section" data-analytics-section="book_call_band">
      <div className="container-tt">
        <div className="card grid gap-8 p-7 md:p-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="eyebrow">Not sure what you need yet?</span>
            <h2 className="mt-4 text-2xl font-bold text-ink md:text-3xl">{title}</h2>
            <ul className="mt-5 grid gap-2.5 text-[0.97rem] text-ink-soft">
              {[
                "Tell us what's working and what isn't. No pitch deck, no pressure.",
                "Get a straight answer on what we'd fix first, and roughly what it costs.",
                "Know whether we're a fit before the call ends.",
              ].map((t) => (
                <li key={t} className="flex gap-2.5"><Check className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden /> {t}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-5">
            <a href={growthSite.bookingUrl} className="btn btn-primary">
              <CalendarClock className="h-4 w-4" aria-hidden /> Pick a time for a 15-minute call
            </a>
            <p className="text-center text-sm text-ink-soft">
              Can&apos;t wait? <a href={TEL} className="font-semibold text-ink hover:text-primary">Call {growthSite.phoneDisplay}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** For the owner who is ready now and would rather pick up the phone than fill in a form. */
export function CallNowBand({ title = "Ready now? Skip the forms and call us" }: { title?: string }) {
  return (
    <section className="section" data-analytics-section="call_now_band">
      <div className="container-tt">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-primary/25 bg-primary/[0.06] px-7 py-12 md:px-14 md:py-14">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow">Talk to an owner today</span>
              <h2 className="display-2 mt-5 text-ink">{title}</h2>
              <p className="lead mt-4">
                Call <a href={TEL} className="font-semibold text-ink underline decoration-primary/40 underline-offset-4 hover:text-primary">{growthSite.phoneDisplay}</a> and
                you&apos;ll talk to one of the owners, not a sales rep. Tell us your trade and your town, and we&apos;ll tell you honestly
                what we&apos;d do. If we&apos;re on another call, leave a message and we&apos;ll call you back.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-5">
              <a href={TEL} className="btn btn-primary !py-4 text-lg">
                <Phone className="h-5 w-5" aria-hidden /> Call {growthSite.phoneDisplay}
              </a>
              <a href={SMS} className="btn btn-ghost">
                <MessageSquareText className="h-4 w-4" aria-hidden /> Text us instead
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
