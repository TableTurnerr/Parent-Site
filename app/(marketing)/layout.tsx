import SiteNav from "@/app/components/site/SiteNav";
import SiteFooter from "@/app/components/site/SiteFooter";
import MarketingThemeProvider from "@/app/components/site/MarketingThemeProvider";
import StickyCta from "@/app/components/growth/StickyCta";
import AuditGate from "@/app/components/growth/AuditGate";
import CallWidget from "@/app/components/growth/CallWidget";
import OfferPopup from "@/app/components/growth/OfferPopup";
import Clarity from "@/app/components/analytics/Clarity";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MarketingThemeProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteNav />
      <main id="main" itemScope itemType="https://schema.org/WebPage">{children}</main>
      <SiteFooter />
      <StickyCta />
      <AuditGate />
      <CallWidget />
      <OfferPopup />
      <Clarity />
    </MarketingThemeProvider>
  );
}
