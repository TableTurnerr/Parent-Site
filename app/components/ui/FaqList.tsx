/**
 * Lightweight FAQ accordion built on native <details>/<summary>. Works in
 * server components (no client JS), is keyboard- and screen-reader-accessible
 * out of the box, and the chevron rotates via the `group-open` state.
 */
interface FaqItem {
  question: string;
  answer: string;
}

function ChevronIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FaqList({
  faqs,
}: {
  faqs: ReadonlyArray<FaqItem>;
}) {
  return (
    <div className="border-t border-border">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="group border-b border-border [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium text-charcoal">
            {faq.question}
            <span className="shrink-0 text-warm-gray transition-transform duration-300 group-open:rotate-180">
              <ChevronIcon />
            </span>
          </summary>
          <p className="pb-5 text-warm-gray leading-relaxed">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
