import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import type { ClientReport } from "@/lib/report-schema";
import { HeroBlock, SectionRenderer } from "./sections";
import { ReportSidebar, ReportRail } from "./report-sidebar";
import { ReportActions } from "./report-actions";
import "./report.css";

export function ReportRendererBody({
  report,
  leftSlot,
}: {
  report: ClientReport;
  leftSlot?: React.ReactNode;
}) {
  const navSections = report.sections.map((s) => ({
    id: s.id,
    label: s.title,
  }));

  return (
    <div className="report-page">
      <div className="meta-strip">
        <div className="meta-strip-inner">
          {leftSlot}
          <div className="meta-strip-text">
            Digital Presence Report
            <span className="dot" />
            Prepared for {report.client.name}
            <span className="dot" />
            {report.client.preparedDate}
          </div>
          <div className="meta-strip-right">
            <span className="meta-strip-by">
              By {report.client.preparedBy ?? "Tableturnerr"}
            </span>
            <ReportActions title={report.client.name} />
          </div>
        </div>
      </div>

      <div className="shell">
        <ReportSidebar
          overallGrade={report.hero.overallGrade}
          graderScore={report.hero.graderScore}
          ratings={report.ratings}
          preparedDate={report.client.preparedDate}
          sections={navSections}
        />

        <main className="main">
          <HeroBlock
            hero={report.hero}
            preparedDate={report.client.preparedDate}
          />
          {report.sections.map((section, i) => (
            <SectionRenderer
              key={section.id}
              section={section}
              index={i + 1}
            />
          ))}
        </main>

        <ReportRail sections={navSections} />
      </div>
    </div>
  );
}

export function ReportRenderer({ report }: { report: ClientReport }) {
  return (
    <>
      <Navbar variant="static" />
      {/* Spacer for the fixed Navbar (h-16 mobile, h-20 desktop) */}
      <div className="h-16 md:h-20" aria-hidden="true" />
      <ReportRendererBody report={report} />
      <Footer />
    </>
  );
}
