import {
  type ReportSection,
  type ReportHero,
  type LetterGrade,
} from "@/lib/report-schema";
import { InlineMarkdown } from "./inline";
import { KeywordGroupsList } from "./keyword-accordion";
import {
  CollapsibleSection,
  CollapsibleProblem,
} from "./collapsible-section";

const num2 = (i: number) => String(i).padStart(2, "0");

function toneForGrade(grade: LetterGrade | string): string {
  const c = (grade || "").charAt(0).toUpperCase();
  if (c === "A") return "green";
  if (c === "B") return "lime";
  if (c === "C") return "amber";
  if (c === "D") return "orange";
  return "rose";
}

// ─── Hero ────────────────────────────────────────────────────────────────

export function HeroBlock({
  hero,
  preparedDate,
}: {
  hero: ReportHero;
  preparedDate: string;
}) {
  const letter = hero.overallGrade.charAt(0);
  const modifier = hero.overallGrade.slice(1);

  return (
    <header className="hero">
      <div className="hero-eyebrow">
        <span>Digital Presence Report</span>
        <span>{preparedDate}</span>
      </div>
      <h1>{hero.title}</h1>
      {hero.subtitle && <p className="hero-sub">{hero.subtitle}</p>}

      {hero.narrative && hero.narrative.length > 0 && (
        <div className="hero-narrative">
          {hero.narrative.map((p, i) => (
            <p key={i}>
              <InlineMarkdown text={p} />
            </p>
          ))}
        </div>
      )}

      <div className="verdict">
        <div className="grade-card">
          <div className="grade-card-top">
            <span>Overall Grade</span>
            <span>{preparedDate}</span>
          </div>
          <div className="grade-letter">
            <span>{letter}</span>
            {modifier && <span className="grade-modifier">{modifier}</span>}
          </div>
          <div className="grade-card-bottom">
            <span>Online Presence</span>
            {typeof hero.graderScore === "number" && (
              <span className="grade-score">
                {hero.graderScore}
                <small>/100</small>
              </span>
            )}
          </div>
        </div>

        <div className="verdict-body">
          <p className="verdict-headline">
            <strong>
              <InlineMarkdown text={hero.verdict} />
            </strong>
          </p>
          {typeof hero.monthlyRevenueLoss === "number" && (
            <div className="verdict-stat">
              <div className="verdict-stat-value">
                ${hero.monthlyRevenueLoss.toLocaleString()}
              </div>
              <div className="verdict-stat-label">
                Estimated monthly revenue left on the table
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── Scorecard ───────────────────────────────────────────────────────────

function ScorecardSectionBody({
  section,
}: {
  section: Extract<ReportSection, { type: "scorecard" }>;
}) {
  return (
    <>
      <div className="scorecard-grid">
        {section.items.map((it, i) => (
          <div key={i} className="scorecard-tile">
            <div className="scorecard-tile-top">
              <div className="scorecard-area">{it.area}</div>
              <div className="scorecard-grade" data-tone={toneForGrade(it.grade)}>
                {it.grade}
              </div>
            </div>
            <p className="scorecard-summary">
              <InlineMarkdown text={it.summary} />
            </p>
          </div>
        ))}
      </div>
      {section.footnote && (
        <div className="callout">
          <InlineMarkdown text={section.footnote} />
        </div>
      )}
    </>
  );
}

// ─── Narrative ───────────────────────────────────────────────────────────

function NarrativeSectionBody({
  section,
}: {
  section: Extract<ReportSection, { type: "narrative" }>;
}) {
  return (
    <>
      <div style={{ maxWidth: "65ch" }}>
        {section.body.map((p, i) => (
          <p
            key={i}
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: "var(--rp-warm-900)",
              margin: "0 0 14px",
            }}
          >
            <InlineMarkdown text={p} />
          </p>
        ))}
      </div>
      {section.callout && (
        <div className="callout">
          <InlineMarkdown text={section.callout} />
        </div>
      )}
    </>
  );
}

// ─── Generic table ───────────────────────────────────────────────────────

function TableSectionBody({
  section,
}: {
  section: Extract<ReportSection, { type: "table" }>;
}) {
  return (
    <>
      <div className="report-table-wrap">
        <table className="report-table">
          <thead>
            <tr>
              {section.headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => {
                  const isFirst = j === 0;
                  const isNum = j > 0 && /^[~\d$*]/.test(String(cell));
                  const cls =
                    isFirst && section.emphasizeFirstColumn
                      ? "emphasize"
                      : isNum
                        ? "num"
                        : "";
                  return (
                    <td key={j} className={cls}>
                      <InlineMarkdown text={cell} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {section.callout && (
        <div className="callout">
          <InlineMarkdown text={section.callout} />
        </div>
      )}
    </>
  );
}

// ─── Reviews ─────────────────────────────────────────────────────────────

function ReviewsSectionBody({
  section,
}: {
  section: Extract<ReportSection, { type: "reviews" }>;
}) {
  return (
    <>
      <div className="reviews-grid">
        {section.platforms.map((p, i) => (
          <div key={i} className="review-tile">
            <div className="review-platform">{p.platform}</div>
            <div className="review-rating">{p.rating ?? "—"}</div>
            <div className="review-stars">★★★★☆</div>
            <div className="review-count">{p.reviews ?? "—"} reviews</div>
          </div>
        ))}
      </div>
      {(section.loved?.length || section.complaints?.length) && (
        <div className="reviews-split">
          {section.loved && section.loved.length > 0 && (
            <div className="reviews-col loved">
              <h4>
                <span className="pip" /> What Customers Love
              </h4>
              <ul>
                {section.loved.map((l, i) => (
                  <li key={i}>
                    <InlineMarkdown text={l} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {section.complaints && section.complaints.length > 0 && (
            <div className="reviews-col complaints">
              <h4>
                <span className="pip" /> Common Complaints
              </h4>
              <ul>
                {section.complaints.map((l, i) => (
                  <li key={i}>
                    <InlineMarkdown text={l} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {section.recommendation && (
        <div className="callout">
          <strong>Our recommendation. </strong>
          <InlineMarkdown text={section.recommendation} />
        </div>
      )}
    </>
  );
}

// ─── Problems ────────────────────────────────────────────────────────────

function ProblemListSectionBody({
  section,
}: {
  section: Extract<ReportSection, { type: "problems" }>;
}) {
  return (
    <div>
      {section.items.map((it, i) => (
        <CollapsibleProblem
          key={i}
          number={it.number ?? i + 1}
          title={it.title}
          defaultOpen={false}
        >
          {(it.body || []).map((p, pi) => (
            <p key={pi}>
              <InlineMarkdown text={p} />
            </p>
          ))}
          {it.bullets && it.bullets.length > 0 && (
            <ul>
              {it.bullets.map((b, bi) => (
                <li key={bi}>
                  <InlineMarkdown text={b} />
                </li>
              ))}
            </ul>
          )}
        </CollapsibleProblem>
      ))}
    </div>
  );
}

// ─── Competition ─────────────────────────────────────────────────────────

function CompetitionSectionBody({
  section,
}: {
  section: Extract<ReportSection, { type: "competition" }>;
}) {
  return (
    <>
      <div className="competitor-list">
        {section.competitors.map((c, i) => (
          <div
            key={i}
            className={`competitor-row ${c.isYou ? "is-you" : ""}`}
          >
            <div className="competitor-rank">{c.rank ?? `#${i + 1}`}</div>
            <div className="competitor-name">
              {c.name}
              {c.isYou && <span className="you-tag">You</span>}
            </div>
            <div className="competitor-style">{c.style ?? "—"}</div>
            <div className="competitor-rating">
              {c.rating ? `${c.rating}★` : "—"}
            </div>
            <div className="competitor-known">
              {c.knownFor ? <InlineMarkdown text={c.knownFor} /> : "—"}
            </div>
          </div>
        ))}
      </div>

      {section.searchPosition && section.searchPosition.length > 0 && (
        <>
          <h3 className="section-sub">Where you currently rank for key searches</h3>
          <div className="report-table-wrap">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Search</th>
                  <th>Map Pack</th>
                  <th>Organic</th>
                </tr>
              </thead>
              <tbody>
                {section.searchPosition.map((r, i) => (
                  <tr key={i}>
                    <td className="emphasize">{r.search}</td>
                    <td className="num">
                      <InlineMarkdown text={r.map} />
                    </td>
                    <td className="num">
                      <InlineMarkdown text={r.organic} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {section.rivalCallouts && section.rivalCallouts.length > 0 && (
        <div className="rival-grid">
          {section.rivalCallouts.map((r, i) => (
            <div key={i} className="rival">
              <h4>{r.title}</h4>
              {r.body.map((p, pi) => (
                <p key={pi}>
                  <InlineMarkdown text={p} />
                </p>
              ))}
            </div>
          ))}
        </div>
      )}

      {section.winLose && section.winLose.length > 0 && (
        <div className="win-lose">
          <div className="wl-col win">
            <h4>Where You Win</h4>
            <ul className="wl-list">
              {section.winLose
                .filter((w) => w.winning)
                .map((w, i) => (
                  <li key={i} className="wl-item">
                    <div className="wl-area">{w.area}</div>
                    <div className="wl-detail">
                      <InlineMarkdown text={w.winning ?? ""} />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="wl-col lose">
            <h4>Where You Lose</h4>
            <ul className="wl-list">
              {section.winLose
                .filter((w) => w.losing)
                .map((w, i) => (
                  <li key={i} className="wl-item">
                    <div className="wl-area">{w.area}</div>
                    <div className="wl-detail">
                      <InlineMarkdown text={w.losing ?? ""} />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}

      {section.opportunity && (
        <>
          <h3 className="section-sub">The opportunity nobody is competing for</h3>
          {section.opportunity.intro && (
            <p
              className="section-intro"
              style={{ fontSize: 15, marginBottom: 20 }}
            >
              <InlineMarkdown text={section.opportunity.intro} />
            </p>
          )}
          <div className="report-table-wrap">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Opportunity</th>
                  <th>Competition</th>
                  <th>Can You Own It?</th>
                </tr>
              </thead>
              <tbody>
                {section.opportunity.rows.map((r, i) => (
                  <tr key={i}>
                    <td className="emphasize">{r.opportunity}</td>
                    <td>
                      <InlineMarkdown text={r.competition} />
                    </td>
                    <td>
                      <InlineMarkdown text={r.canOwn} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {section.opportunity.bottomLine && (
            <div className="callout">
              <InlineMarkdown text={section.opportunity.bottomLine} />
            </div>
          )}
        </>
      )}
    </>
  );
}

// ─── Keywords ────────────────────────────────────────────────────────────

function KeywordsSectionBody({
  section,
}: {
  section: Extract<ReportSection, { type: "keywords" }>;
}) {
  return (
    <>
      <KeywordGroupsList groups={section.groups} />

      {section.totals && (
        <>
          <h3 className="section-sub">The total opportunity</h3>
          <div className="kw-totals">
            <table className="report-table">
              <thead>
                <tr>
                  {section.totals.headers.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.totals.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((c, ci) => (
                      <td
                        key={ci}
                        className={ci === 0 ? "emphasize" : "num"}
                      >
                        <InlineMarkdown text={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {section.totals.summary && (
            <div className="callout">
              <InlineMarkdown text={section.totals.summary} />
            </div>
          )}
        </>
      )}
    </>
  );
}

// ─── Action plan ─────────────────────────────────────────────────────────

function ActionPlanSectionBody({
  section,
}: {
  section: Extract<ReportSection, { type: "actionPlan" }>;
}) {
  return (
    <>
      <table className="ap-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Action</th>
            <th>Impact</th>
            <th>Timeline</th>
          </tr>
        </thead>
        <tbody>
          {section.items.map((it) => (
            <tr key={it.priority}>
              <td className="ap-priority">{num2(it.priority)}</td>
              <td>
                <span className="ap-category" data-cat={it.category}>
                  {it.category}
                </span>
              </td>
              <td className="ap-action">
                <InlineMarkdown text={it.action} />
              </td>
              <td className="ap-impact">
                <InlineMarkdown text={it.impact} />
              </td>
              <td className="ap-timeline">{it.timeline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

// ─── Success metrics ─────────────────────────────────────────────────────

function SuccessMetricsSectionBody({
  section,
}: {
  section: Extract<ReportSection, { type: "successMetrics" }>;
}) {
  return (
    <>
      <div className="metrics-list">
        {section.items.map((m, i) => (
          <div key={i} className="metric-row">
            <div className="metric-name">{m.metric}</div>
            <div className="metric-now">{m.now}</div>
            <div className="metric-target">{m.target}</div>
          </div>
        ))}
      </div>
      {section.callout && (
        <div className="callout">
          <InlineMarkdown text={section.callout} />
        </div>
      )}
    </>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────

function CtaSectionBlock({
  section,
  index,
}: {
  section: Extract<ReportSection, { type: "cta" }>;
  index: number;
}) {
  return (
    <section className="section" id={section.id}>
      <div className="section-num">
        <span>{`Section ${num2(index)}`}</span>
      </div>
      <div className="cta-block">
        <div className="cta-block-eyebrow">
          Tableturnerr · Restaurant marketing, done right
        </div>
        <h2>{section.title}</h2>
        {section.body.map((p, i) => (
          <p key={i}>
            <InlineMarkdown text={p} />
          </p>
        ))}
        {(section.primary || section.secondary) && (
          <div className="cta-actions">
            {section.primary && (
              <a
                className="rp-btn rp-btn-primary"
                href={section.primary.href ?? "https://tableturnerr.com/contact"}
              >
                {section.primary.label}
                <span className="rp-btn-arrow">→</span>
              </a>
            )}
            {section.secondary && (
              <a
                className="rp-btn rp-btn-secondary"
                href={section.secondary.href ?? "https://tableturnerr.com"}
              >
                {section.secondary.label}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Dispatcher ─────────────────────────────────────────────────────────

function SectionBody({ section }: { section: ReportSection }) {
  switch (section.type) {
    case "narrative":
      return <NarrativeSectionBody section={section} />;
    case "scorecard":
      return <ScorecardSectionBody section={section} />;
    case "table":
      return <TableSectionBody section={section} />;
    case "reviews":
      return <ReviewsSectionBody section={section} />;
    case "problems":
      return <ProblemListSectionBody section={section} />;
    case "competition":
      return <CompetitionSectionBody section={section} />;
    case "keywords":
      return <KeywordsSectionBody section={section} />;
    case "actionPlan":
      return <ActionPlanSectionBody section={section} />;
    case "successMetrics":
      return <SuccessMetricsSectionBody section={section} />;
    default:
      return null;
  }
}

function getSectionIntro(section: ReportSection): string | undefined {
  if ("intro" in section && typeof section.intro === "string") {
    return section.intro;
  }
  return undefined;
}

export function SectionRenderer({
  section,
  index,
}: {
  section: ReportSection;
  index: number;
}) {
  if (section.type === "cta") {
    return <CtaSectionBlock section={section} index={index} />;
  }

  // Problems section is expanded by default; everything else is collapsed.
  const defaultOpen = section.type === "problems";

  return (
    <CollapsibleSection
      id={section.id}
      index={index}
      title={section.title}
      intro={getSectionIntro(section)}
      defaultOpen={defaultOpen}
    >
      <SectionBody section={section} />
    </CollapsibleSection>
  );
}
