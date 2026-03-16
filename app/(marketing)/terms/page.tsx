import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import { createPageMetadata } from "@/app/lib/metadata";
import { SITE_CONFIG } from "@/app/lib/constants";
import { generateBreadcrumbSchema } from "@/app/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Terms of Service for TableTurnerr's restaurant marketing services including website design, SEO, branding, and Google Ads management.",
  path: "/terms",
});

const LAST_UPDATED = "March 16, 2026";

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
      <div className="bg-cream pt-32 md:pt-36">
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
                  (&quot;Site&quot;) or engaging our services, you agree to be
                  bound by these Terms of Service (&quot;Terms&quot;). If you do
                  not agree to these Terms, do not use our Site or services.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  2. Services
                </h2>
                <p>
                  TableTurnerr provides restaurant marketing services including
                  but not limited to custom website design and development,
                  search engine optimization (SEO), restaurant branding, Google
                  Ads management, and Google Business Profile optimization. The
                  specific scope, deliverables, timelines, and pricing for each
                  engagement are defined in a separate service agreement or
                  proposal between TableTurnerr and the client.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  3. Use of the Website
                </h2>
                <p className="mb-3">
                  You agree to use this Site only for lawful purposes. You may
                  not:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Use the Site in any way that violates applicable laws or
                    regulations.
                  </li>
                  <li>
                    Attempt to gain unauthorized access to any part of the Site,
                    its servers, or any connected systems.
                  </li>
                  <li>
                    Introduce viruses, malware, or other harmful code.
                  </li>
                  <li>
                    Scrape, harvest, or collect information from the Site through
                    automated means without our written consent.
                  </li>
                  <li>
                    Reproduce, distribute, or create derivative works from our
                    content without authorization.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  4. Intellectual Property
                </h2>
                <p className="mb-3">
                  All content on this Site — including text, graphics, logos,
                  images, designs, code, and overall layout — is the property of
                  TableTurnerr or its licensors and is protected by copyright,
                  trademark, and other intellectual property laws.
                </p>
                <p>
                  For client projects, intellectual property ownership and
                  licensing terms are governed by the individual service
                  agreement between TableTurnerr and the client. Unless
                  otherwise stated in a service agreement, TableTurnerr retains
                  ownership of all proprietary tools, templates, frameworks, and
                  methodologies used in delivering services.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  5. Client Responsibilities
                </h2>
                <p className="mb-3">
                  When engaging our services, you agree to:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Provide accurate and complete information necessary for us to
                    perform the agreed-upon services.
                  </li>
                  <li>
                    Grant timely access to platforms, accounts, and materials as
                    required (e.g., Google Business Profile, hosting accounts,
                    branding assets).
                  </li>
                  <li>
                    Review and provide feedback on deliverables within the
                    timeframes outlined in your service agreement.
                  </li>
                  <li>
                    Ensure that all content, images, and materials you provide to
                    us do not infringe on the intellectual property rights of any
                    third party.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  6. Payment Terms
                </h2>
                <p>
                  Payment terms, including fees, schedules, and accepted methods,
                  are specified in each client&apos;s service agreement or
                  invoice. Unless otherwise stated, invoices are due upon
                  receipt. Late payments may be subject to service suspension or
                  additional fees as outlined in your agreement. All fees are
                  non-refundable unless explicitly stated otherwise.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  7. Third-Party Platforms
                </h2>
                <p>
                  Our services may involve the use of third-party platforms and
                  tools, including but not limited to Google Ads, Google Business
                  Profile, Owner.com, ChowNow, and various analytics and hosting
                  providers. Your use of these platforms is subject to their
                  respective terms of service and privacy policies. TableTurnerr
                  is not responsible for the actions, availability, or policies
                  of third-party services.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  8. Disclaimers
                </h2>
                <p className="mb-3">
                  The Site and services are provided on an &quot;as is&quot; and
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
                    Guarantees of specific results from SEO, Google Ads, or any
                    marketing campaign. Search engine rankings, traffic levels,
                    and advertising performance depend on many factors outside
                    our control.
                  </li>
                  <li>
                    Uninterrupted or error-free operation of the Site.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  9. Limitation of Liability
                </h2>
                <p>
                  To the maximum extent permitted by applicable law, TableTurnerr
                  and its owners, employees, and contractors shall not be liable
                  for any indirect, incidental, special, consequential, or
                  punitive damages arising out of or related to your use of the
                  Site or our services, regardless of the cause of action or
                  theory of liability. Our total liability for any claim arising
                  from or related to our services shall not exceed the total
                  amount paid by you to TableTurnerr in the twelve (12) months
                  preceding the claim.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  10. Indemnification
                </h2>
                <p>
                  You agree to indemnify and hold harmless TableTurnerr, its
                  owners, employees, and contractors from any claims, damages,
                  losses, liabilities, and expenses (including legal fees)
                  arising out of your use of the Site, your breach of these
                  Terms, or any content or materials you provide to us that
                  infringe on the rights of a third party.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  11. Termination
                </h2>
                <p>
                  We reserve the right to suspend or terminate your access to the
                  Site at our sole discretion, without notice, for conduct that
                  we believe violates these Terms or is harmful to other users or
                  our business. Termination of services is governed by the terms
                  outlined in your individual service agreement.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  12. Governing Law
                </h2>
                <p>
                  These Terms are governed by and construed in accordance with
                  applicable law. Any disputes arising under or in connection
                  with these Terms shall be resolved through good-faith
                  negotiation, and if unresolved, through binding arbitration or
                  in a court of competent jurisdiction.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  13. Changes to These Terms
                </h2>
                <p>
                  We may revise these Terms at any time by updating this page.
                  Changes take effect immediately upon posting. Your continued
                  use of the Site or services after any changes constitutes
                  acceptance of the revised Terms. We encourage you to review
                  this page periodically.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  14. Contact Us
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
