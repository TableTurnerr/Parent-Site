# Client messaging compliance boundary

TableTurnerr's public-site SMS consent records apply only to communications from
**TABLETURNERR LLC**. They must never be used as consent for an independent
client business, including when that client uses a TableTurnerr-managed account,
TextGrid subaccount, workspace, sending number, or other messaging
infrastructure.

Before activating any client-branded messaging campaign, the responsible client
must have and maintain:

- its own A2P Brand registration and Campaign registration;
- its own consent disclosure, Privacy Policy, SMS Terms, and consent records;
- a registered sending number or campaign assignment;
- brand-specific STOP and HELP handling;
- client-specific messaging records; and
- a compliance review covering applicable law, carrier rules, CTIA guidance, and
  A2P 10DLC requirements.

Client campaign workflows must gate customer-care, feedback, review, and
marketing messages on the relevant client-brand consent record. A TableTurnerr
website lead is not an eligible recipient for a client campaign by virtue of
having selected either public-site consent checkbox.

Review campaigns must request honest feedback from every eligible customer. Do
not request only positive or five-star reviews, gate requests by satisfaction,
filter or suppress negative feedback, route unhappy customers away from public
review platforms, or offer incentives for reviews.

## GoHighLevel configuration

The public contact-form webhook now includes `customer_care_sms_consent`,
`marketing_sms_consent`, their consent timestamps, and
`sms_disclosure_version`. Map these values to non-marketing custom fields in
GoHighLevel. Any GHL workflow that sends SMS must require the matching `true`
field before a send; do not infer consent from the presence of a phone number,
a submitted form, an account, or a Terms acceptance.

This configuration applies only to TABLETURNERR LLC's own contact leads. It is
not a substitute for the client-level controls above.
