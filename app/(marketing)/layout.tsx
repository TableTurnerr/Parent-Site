import SiteNav from "@/app/components/site/SiteNav";
import SiteFooter from "@/app/components/site/SiteFooter";
import WelcomePopup from "@/app/components/site/WelcomePopup";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteNav />
      <main id="main">{children}</main>
      <SiteFooter />
      <WelcomePopup />
    </>
  );
}
