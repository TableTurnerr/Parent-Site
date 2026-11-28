// Missed-call text-back as the customer sees it on their phone: the call goes unanswered, an automatic text goes out,
// the customer replies and the job gets booked. A written example with a made-up business (it says so), using the
// same bubble styles as AiAnsweringDemo.
import { CalendarCheck, PhoneMissed, Zap } from "lucide-react";

const STEPS: [title: string, text: string][] = [
  ["The call goes unanswered", "You're on a roof, under a sink or driving. The homeowner hears voicemail."],
  ["A text goes out in seconds", "Automatically, from your business number, before they call the next company."],
  ["They text back", "Plenty of people would rather text than leave a voicemail. The reply lands in one inbox on your phone."],
  ["You book the job", "Reply when you can and book it. The lead and the conversation go straight into your CRM."],
];

export default function MissedCallTextBack() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="mx-auto max-w-[20rem] rounded-[2.5rem] border-[10px] border-ink/90 bg-surface p-4 shadow-xl">
          <div className="flex items-center justify-between text-[11px] font-semibold text-muted">
            <span>2:14 PM</span>
            <span>Summit Heating &amp; Air</span>
          </div>
          <ol className="mt-3 space-y-2" aria-label="Example text conversation">
            <li className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-line bg-bg px-3 py-1 text-[11px] font-semibold text-ink-soft">
              <PhoneMissed className="h-3.5 w-3.5 text-red-500" aria-hidden /> Missed call · 2:14 PM
            </li>
            <li className="max-w-[85%] rounded-2xl rounded-bl-sm bg-primary px-3 py-2 text-[13px] leading-snug text-primary-ink">
              <span className="mb-0.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-primary-ink/75">
                <Zap className="h-3 w-3" aria-hidden /> Sent automatically · 2:14 PM
              </span>
              Sorry we missed your call! This is Summit Heating &amp; Air. How can we help?
            </li>
            <li className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-white px-3 py-2 text-[13px] leading-snug text-ink ring-1 ring-line dark:bg-ink/10">
              Hi, our AC stopped cooling. Can someone come out tomorrow?
            </li>
            <li className="max-w-[85%] rounded-2xl rounded-bl-sm bg-primary px-3 py-2 text-[13px] leading-snug text-primary-ink">
              We can do tomorrow between 8 and 10 AM. Does that work?
            </li>
            <li className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-white px-3 py-2 text-[13px] leading-snug text-ink ring-1 ring-line dark:bg-ink/10">
              Perfect, see you then.
            </li>
            <li className="rounded-2xl bg-white p-3 ring-1 ring-line dark:bg-ink/10">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-success">
                <CalendarCheck className="h-3.5 w-3.5" aria-hidden /> Job booked
              </p>
              <p className="mt-1 text-[13px] leading-snug text-ink">AC not cooling · tomorrow 8–10 AM</p>
            </li>
          </ol>
        </div>
        <p className="mt-3 text-center text-xs text-muted">Example conversation with a made-up business, written to show how it works.</p>
      </div>

      <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-1 xl:grid-cols-2">
        {STEPS.map(([t, d], i) => (
          <li key={t} className="card flex gap-4 p-5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft font-bold text-primary" aria-hidden>{i + 1}</span>
            <span>
              <span className="block font-bold text-ink">{t}</span>
              <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{d}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
