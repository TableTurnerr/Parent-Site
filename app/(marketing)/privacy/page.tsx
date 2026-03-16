import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import { createPageMetadata } from "@/app/lib/metadata";
import { SITE_CONFIG } from "@/app/lib/constants";
import { generateBreadcrumbSchema } from "@/app/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "TableTurnerr's privacy policy explains how we collect, use, and protect your personal information when you use our restaurant marketing services and website.",
  path: "/privacy",
});

const LAST_UPDATED = "March 16, 2026";

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Privacy Policy", url: `${SITE_CONFIG.url}/privacy` },
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
                  Privacy Policy
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
              Privacy Policy
            </h1>
            <p className="text-warm-gray text-sm mb-12">
              Last updated: {LAST_UPDATED}
            </p>

            <div className="prose-legal space-y-10 text-warm-gray text-[1.0625rem] leading-relaxed">
              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  1. Introduction
                </h2>
                <p>
                  TableTurnerr (&quot;we,&quot; &quot;us,&quot; or
                  &quot;our&quot;) operates the website{" "}
                  <Link
                    href={SITE_CONFIG.url}
                    className="text-charcoal underline underline-offset-2 hover:text-accent transition-colors"
                  >
                    tableturnerr.com
                  </Link>{" "}
                  and provides restaurant marketing services including website
                  design, SEO, branding, Google Ads management, and Google
                  Business Profile optimization. This Privacy Policy explains how
                  we collect, use, disclose, and safeguard your information when
                  you visit our website or engage our services.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  2. Information We Collect
                </h2>

                <h3 className="font-display font-medium text-lg text-charcoal mt-5 mb-2">
                  2.1 Information You Provide
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-charcoal">Contact forms:</strong>{" "}
                    Name, email address, phone number, restaurant name, and any
                    details you include in your message.
                  </li>
                  <li>
                    <strong className="text-charcoal">
                      Service engagements:
                    </strong>{" "}
                    Business information necessary to perform our marketing
                    services, such as restaurant details, branding assets, menu
                    content, and access credentials for platforms like Google
                    Business Profile.
                  </li>
                  <li>
                    <strong className="text-charcoal">Blog comments:</strong>{" "}
                    If you interact with our blog, we may collect your name and
                    email address.
                  </li>
                </ul>

                <h3 className="font-display font-medium text-lg text-charcoal mt-5 mb-2">
                  2.2 Information Collected Automatically
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-charcoal">Usage data:</strong>{" "}
                    Pages visited, time spent on pages, referring URLs, and
                    navigation paths.
                  </li>
                  <li>
                    <strong className="text-charcoal">Device data:</strong>{" "}
                    Browser type, operating system, device type, screen
                    resolution, and IP address.
                  </li>
                  <li>
                    <strong className="text-charcoal">
                      Cookies and similar technologies:
                    </strong>{" "}
                    We use cookies, pixels, and local storage to improve your
                    experience and analyze site traffic. See Section 6 for
                    details.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  3. How We Use Your Information
                </h2>
                <p className="mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Respond to inquiries and provide customer support.
                  </li>
                  <li>
                    Deliver and manage our restaurant marketing services.
                  </li>
                  <li>
                    Send service-related communications, project updates, and
                    invoices.
                  </li>
                  <li>
                    Improve our website, services, and user experience.
                  </li>
                  <li>
                    Analyze website traffic and usage patterns.
                  </li>
                  <li>
                    Comply with legal obligations and protect our rights.
                  </li>
                </ul>
                <p className="mt-3">
                  We do not sell your personal information to third parties.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  4. How We Share Your Information
                </h2>
                <p className="mb-3">
                  We may share your information in the following circumstances:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-charcoal">
                      Service providers:
                    </strong>{" "}
                    Third-party vendors that help us operate our business, such
                    as hosting providers, analytics platforms, email services,
                    and payment processors.
                  </li>
                  <li>
                    <strong className="text-charcoal">
                      Partner platforms:
                    </strong>{" "}
                    When delivering services, we may interact with platforms like
                    Google Ads, Google Business Profile, Owner.com, or ChowNow
                    on your behalf and as authorized by you.
                  </li>
                  <li>
                    <strong className="text-charcoal">
                      Legal requirements:
                    </strong>{" "}
                    When required by law, regulation, legal process, or
                    governmental request.
                  </li>
                  <li>
                    <strong className="text-charcoal">
                      Business transfers:
                    </strong>{" "}
                    In connection with a merger, acquisition, or sale of assets,
                    your information may be transferred as part of that
                    transaction.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  5. Data Retention
                </h2>
                <p>
                  We retain your personal information for as long as necessary to
                  fulfill the purposes outlined in this policy, maintain our
                  business records, comply with legal obligations, resolve
                  disputes, and enforce our agreements. When your data is no
                  longer needed, we securely delete or anonymize it.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  6. Cookies and Tracking Technologies
                </h2>
                <p className="mb-3">
                  Our website uses cookies and similar technologies to:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Remember your preferences and settings.
                  </li>
                  <li>
                    Understand how you use our website.
                  </li>
                  <li>
                    Measure the effectiveness of our marketing efforts.
                  </li>
                </ul>
                <p className="mt-3">
                  You can control cookies through your browser settings. Disabling
                  certain cookies may affect website functionality.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  7. Third-Party Services
                </h2>
                <p>
                  Our website may contain links to third-party websites and
                  services, including social media platforms, partner tools, and
                  analytics providers. We are not responsible for the privacy
                  practices of these third parties. We encourage you to review
                  their privacy policies before providing any personal
                  information.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  8. Data Security
                </h2>
                <p>
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no
                  method of transmission over the internet or electronic storage
                  is completely secure, and we cannot guarantee absolute
                  security.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  9. Your Rights
                </h2>
                <p className="mb-3">
                  Depending on your location, you may have the right to:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Access the personal information we hold about you.
                  </li>
                  <li>
                    Request correction of inaccurate or incomplete data.
                  </li>
                  <li>
                    Request deletion of your personal information.
                  </li>
                  <li>
                    Object to or restrict certain processing of your data.
                  </li>
                  <li>
                    Withdraw consent where processing is based on consent.
                  </li>
                </ul>
                <p className="mt-3">
                  To exercise any of these rights, contact us at{" "}
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
                  10. Children&apos;s Privacy
                </h2>
                <p>
                  Our website and services are not directed at individuals under
                  the age of 16. We do not knowingly collect personal information
                  from children. If we learn that we have collected information
                  from a child under 16, we will take steps to delete that
                  information promptly.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  11. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. When we
                  do, we will revise the &quot;Last updated&quot; date at the top
                  of this page. We encourage you to review this policy
                  periodically to stay informed about how we protect your
                  information.
                </p>
              </section>

              <section>
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  12. Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy or our data
                  practices, contact us at:
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
