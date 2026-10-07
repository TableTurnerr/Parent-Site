import SiteNav from "@/app/components/site/SiteNav";
import SiteFooter from "@/app/components/site/SiteFooter";
import MarketingThemeProvider from "@/app/components/site/MarketingThemeProvider";

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
      <main id="main">{children}</main>
      <SiteFooter />
    </MarketingThemeProvider>
  );
}
