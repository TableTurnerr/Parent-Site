"use client";

import { useState } from "react";

export default function SignupBookingWidget() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="card overflow-hidden bg-white shadow-[0_28px_70px_-42px_rgba(22,26,51,0.38)]">
      <div className="flex flex-col gap-4 border-b border-line bg-white px-6 py-5 text-left sm:px-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">
            {showForm ? "Tell us about your business" : "Book a meeting"}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
            {showForm
              ? "Share your details and we’ll be in touch."
              : "Choose a time that works for you and tell us a little about your business."}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-ghost shrink-0"
          onClick={() => setShowForm((current) => !current)}
        >
          {showForm ? "Choose a Time Instead" : "Fill Form Instead"}
        </button>
      </div>

      <div className="bg-white" hidden={showForm}>
        <iframe
          src="https://portalapi.tableturnerr.com/widget/bookings/tableturnerr"
          style={{ width: "100%", height: "100%", border: "none", borderRadius: "8px" }}
          className="block w-full overflow-hidden border-0"
          title="Book a TableTurnerr appointment"
        />
      </div>

      <div className="bg-white" hidden={!showForm}>
        <iframe
          src="https://portalapi.tableturnerr.com/widget/form/ipvrLi2tZqQelOTXlmfp"
          style={{ width: "100%", height: "100%", border: "none", borderRadius: "8px" }}
          className="block w-full overflow-hidden border-0"
          id="inline-ipvrLi2tZqQelOTXlmfp"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Appointment Form"
          data-height="1122"
          data-layout-iframe-id="inline-ipvrLi2tZqQelOTXlmfp"
          data-form-id="ipvrLi2tZqQelOTXlmfp"
          data-cookie-consent="true"
          data-cookie-consent-provider="auto"
          title="Appointment Form"
        />
      </div>
    </div>
  );
}
