import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import { createPageMetadata } from "@/app/lib/metadata";
import { SITE_CONFIG } from "@/app/lib/constants";
import { generateBreadcrumbSchema } from "@/app/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Terms of Service for TableTurnerr review-automation software: subscription terms, the 90-day results guarantee, and SMS/TCPA messaging requirements.",
  path: "/terms",
});

const LAST_UPDATED = "June 27, 2026";

export default function TermsOfServicePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Terms of Service", url: `${SITE_CONFIG.url}/terms` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-cream pt-24 sm:pt-28 md:pt-36">
        <Container>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-warm-gray">
              <li>
                <Link
                  href="/"
                  className="hover:text-charcoal transition-colors"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span className="text-charcoal font-medium">
                  Terms of Service
                </span>
              </li>
            </ol>
          </nav>
        </Container>
      </div>

      {/* Content */}
      <section className="bg-cream pt-10 pb-16 md:pt-14 md:pb-24">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-charcoal mb-4">
              Terms of Service
            </h1>
            <p className="text-warm-gray text-sm mb-12">
              Last updated: {LAST_UPDATED}
            </p>

            <div className="prose-legal space-y-10 text-warm-gray text-[1.0625rem] leading-relaxed">
              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  1. Agreement to Terms
                </h2>
                <p>
                  By accessing or using the TableTurnerr website at{" "}
                  <Link
                    href={SITE_CONFIG.url}
                    className="text-charcoal underline underline-offset-2 hover:text-accent transition-colors"
                  >
                    tableturnerr.com
                  </Link>{" "}
                  (&quot;Site&quot;) or by creating an account for or using our
                  software (the &quot;Service&quot;), you agree to be bound by
                  these Terms of Service (&quot;Terms&quot;). If you do not agree
                  to these Terms, do not use our Site or Service.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  2. The Service
                </h2>
                <p>
                  TableTurnerr provides review-automation software for
                  home-service businesses. The Service connects to your field
                  service management or CRM platform and, after a job is
                  completed, sends review requests to your customers by SMS and/or
                  email, routes them to public review platforms (such as Google,
                  Facebook, Yelp, and Angi), and reports the results in a
                  dashboard. We are a software provider; we do not write, edit,
                  filter, suppress, or gate the reviews your customers choose to
                  leave. Specific features, usage limits, and pricing for your
                  plan are described at signup or in your subscription.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  3. Accounts &amp; Free Trial
                </h2>
                <p className="mb-3">
                  You must provide accurate account information and are
                  responsible for safeguarding your login credentials and for all
                  activity under your account. You must be authorized to act on
                  behalf of the business you register.
                </p>
                <p>
                  We may offer a free trial. Unless stated otherwise, trials run
                  for the stated period and require no credit card. At the end of
                  a trial, the Service may pause until you start a paid
                  subscription. Promotional offers (for example, introductory
                  discount codes) apply only as described at the time of the
                  offer.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  4. Acceptable Use
                </h2>
                <p className="mb-3">
                  You agree to use the Site and Service only for lawful purposes.
                  You may not:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Use the Service in any way that violates applicable laws or
                    regulations, including telemarketing, anti-spam, and consumer
                    protection laws.
                  </li>
                  <li>
                    Upload contact information for people who have not done
                    business with you, or send messages to anyone who has not
                    provided the consent described in Section 5.
                  </li>
                  <li>
                    Offer, request, or provide any incentive in exchange for a
                    review, or attempt to suppress, gate, or solicit only
                    positive reviews.
                  </li>
                  <li>
                    Attempt to gain unauthorized access to the Service, its
                    servers, or any connected systems, or introduce viruses,
                    malware, or other harmful code.
                  </li>
                  <li>
                    Scrape, harvest, resell, or create derivative works from the
                    Service or its content without our written consent.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  5. SMS / Text Messaging &amp; TCPA Compliance
                </h2>
                <p className="mb-3">
                  The Service sends messages on your behalf to{" "}
                  <strong className="text-charcoal">your own customers</strong>.
                  You are the sender of those messages and are solely responsible
                  for compliance with the Telephone Consumer Protection Act
                  (TCPA), the CAN-SPAM Act, CTIA messaging guidelines, carrier
                  A2P 10DLC registration requirements, and any other applicable
                  law. By using the Service, you represent and warrant that:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-3">
                  <li>
                    You have obtained the legally required prior express consent
                    from each customer before any message is sent to them, and
                    you can produce evidence of that consent on request.
                  </li>
                  <li>
                    You will only contact customers about transactions they have
                    completed with you, and you will honor opt-out requests
                    (including &quot;STOP&quot; replies) promptly.
                  </li>
                  <li>
                    You will register your brand and campaign for A2P 10DLC where
                    required, and provide accurate business information for that
                    registration.
                  </li>
                </ul>
                <p>
                  Message and data rates may apply to your customers. Message
                  frequency varies. The Service includes automated opt-out
                  handling, but it does not replace your own legal obligations.
                  You agree to indemnify TableTurnerr for any claim arising from
                  messages sent through your account, including claims that the
                  required consent was not obtained.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  6. Subscription &amp; Payment
                </h2>
                <p>
                  The Service is billed as a recurring subscription. There are no
                  long-term contracts: plans are month-to-month and you may
                  cancel at any time, effective at the end of your current billing
                  period. Fees are charged in advance for each billing period
                  using the payment method on file. Unless required by law or
                  stated otherwise in these Terms, fees already charged for a
                  billing period are not prorated on cancellation. We may change
                  pricing on renewal with reasonable advance notice.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  7. 90-Day Results Guarantee
                </h2>
                <p className="mb-3">
                  We offer a results guarantee: if, after 90 days of active use,
                  your business has not earned more reviews than it did in the 90
                  days before you started, your next month of service is free.
                  This is our complete and exclusive remedy under the guarantee.
                </p>
                <p>
                  The guarantee assumes the Service is connected to your CRM and
                  actively sending review requests, that the customer contact data
                  you provide is accurate, and that your account is in good
                  standing. It applies to the recurring subscription fee for the
                  following month and does not apply to one-time fees, taxes, or
                  third-party charges (such as carrier messaging fees). To claim
                  it, contact us at{" "}
                  <Link
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-charcoal underline underline-offset-2 hover:text-accent transition-colors"
                  >
                    {SITE_CONFIG.email}
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  8. Customer Data &amp; Your Responsibilities
                </h2>
                <p className="mb-3">When using the Service, you agree to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Provide accurate, lawfully collected customer contact
                    information and keep it up to date.
                  </li>
                  <li>
                    Grant the access we need to connect your CRM or field service
                    platform, and maintain those integrations.
                  </li>
                  <li>
                    Be responsible, as the data controller, for the personal
                    information of your customers that you load into or generate
                    through the Service. We act as your service provider /
                    processor for that data and handle it as described in our{" "}
                    <Link
                      href="/privacy"
                      className="text-charcoal underline underline-offset-2 hover:text-accent transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  9. Intellectual Property
                </h2>
                <p>
                  The Service, the Site, and all related software, content,
                  graphics, logos, and designs are the property of TableTurnerr or
                  its licensors and are protected by intellectual property laws.
                  We grant you a limited, non-exclusive, non-transferable right to
                  use the Service during your subscription. The data you upload
                  and the reviews your customers generate remain yours; you grant
                  us the rights needed to operate the Service on your behalf.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  10. Third-Party Platforms
                </h2>
                <p>
                  The Service integrates with third-party platforms, including but
                  not limited to field service / CRM systems (such as Jobber,
                  Housecall Pro, ServiceTitan, Workiz, and QuickBooks), review
                  platforms (such as Google, Facebook, Yelp, and Angi), and SMS /
                  email delivery providers and carriers. Your use of those
                  platforms is subject to their own terms and policies.
                  TableTurnerr is not responsible for the actions, availability,
                  policies, or pricing of third-party services, and we may change
                  supported integrations over time.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  11. Disclaimers
                </h2>
                <p className="mb-3">
                  The Site and Service are provided on an &quot;as is&quot; and
                  &quot;as available&quot; basis. To the fullest extent permitted
                  by law, TableTurnerr disclaims all warranties, express or
                  implied, including but not limited to:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Warranties of merchantability, fitness for a particular
                    purpose, and non-infringement.
                  </li>
                  <li>
                    Guarantees of a specific number of reviews, ratings, ranking,
                    or revenue. Results depend on factors outside our control,
                    including your job volume, customer behavior, and the policies
                    of third-party review platforms. The only guarantee we make is
                    the one stated in Section 7.
                  </li>
                  <li>
                    Uninterrupted or error-free operation of the Site or Service.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  12. Limitation of Liability
                </h2>
                <p>
                  To the maximum extent permitted by applicable law, TableTurnerr
                  and its owners, employees, and contractors shall not be liable
                  for any indirect, incidental, special, consequential, or
                  punitive damages arising out of or related to your use of the
                  Site or Service, regardless of the cause of action or theory of
                  liability. Our total liability for any claim arising from or
                  related to the Service shall not exceed the total amount you paid
                  to TableTurnerr in the twelve (12) months preceding the claim.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  13. Indemnification
                </h2>
                <p>
                  You agree to indemnify and hold harmless TableTurnerr, its
                  owners, employees, and contractors from any claims, damages,
                  losses, liabilities, and expenses (including legal fees) arising
                  out of your use of the Service, your breach of these Terms, the
                  messages sent through your account, or any customer data or
                  materials you provide.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  14. Termination
                </h2>
                <p>
                  You may cancel your subscription at any time from your account or
                  by contacting us. We may suspend or terminate your access for
                  conduct that violates these Terms, for non-payment, or for use
                  that creates legal or carrier-compliance risk. On termination,
                  your right to use the Service ends; we may delete your data after
                  a reasonable retention period as described in our Privacy
                  Policy.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  15. Governing Law
                </h2>
                <p>
                  These Terms are governed by and construed in accordance with
                  applicable law. Any disputes arising under or in connection with
                  these Terms shall be resolved through good-faith negotiation,
                  and if unresolved, through binding arbitration or in a court of
                  competent jurisdiction.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  16. Changes to These Terms
                </h2>
                <p>
                  We may revise these Terms at any time by updating this page.
                  Changes take effect upon posting. Your continued use of the Site
                  or Service after any changes constitutes acceptance of the
                  revised Terms. We encourage you to review this page
                  periodically.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  17. Contact Us
                </h2>
                <p>
                  If you have any questions about these Terms of Service, contact
                  us at:
                </p>
                <div className="mt-3 space-y-1">
                  <p>
                    <strong className="text-charcoal">TableTurnerr</strong>
                  </p>
                  <p>
                    Email:{" "}
                    <Link
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-charcoal underline underline-offset-2 hover:text-accent transition-colors"
                    >
                      {SITE_CONFIG.email}
                    </Link>
                  </p>
                  <p>
                    Phone:{" "}
                    <Link
                      href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                      className="text-charcoal underline underline-offset-2 hover:text-accent transition-colors"
                    >
                      {SITE_CONFIG.phone}
                    </Link>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
