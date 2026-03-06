import { churchData } from "@/lib/church-data";

// ─── Score badge config ───────────────────────────────────────────────────────
type BadgeStyle = { bg: string; text: string; border: string; dot: string };

const lgbtqBadgeStyles: Record<string, BadgeStyle> = {
  "Clear: Affirming": {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-300",
    dot: "bg-emerald-500",
  },
  "Unclear: Affirming": {
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-300",
    dot: "bg-amber-500",
  },
  "Clear: Non-Affirming": {
    bg: "bg-red-50",
    text: "text-red-800",
    border: "border-red-300",
    dot: "bg-red-500",
  },
  "Unclear: Non-Affirming": {
    bg: "bg-orange-50",
    text: "text-orange-800",
    border: "border-orange-300",
    dot: "bg-orange-400",
  },
  Undisclosed: {
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-300",
    dot: "bg-gray-400",
  },
};

const womenBadgeStyles: Record<string, BadgeStyle> = {
  "Clear: Egalitarian": {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-300",
    dot: "bg-emerald-500",
  },
  "Unclear: Egalitarian": {
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-300",
    dot: "bg-amber-500",
  },
  "Clear: Non-Egalitarian": {
    bg: "bg-red-50",
    text: "text-red-800",
    border: "border-red-300",
    dot: "bg-red-500",
  },
  "Unclear: Non-Egalitarian": {
    bg: "bg-orange-50",
    text: "text-orange-800",
    border: "border-orange-300",
    dot: "bg-orange-400",
  },
  Undisclosed: {
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-300",
    dot: "bg-gray-400",
  },
};

// ─── Score plain-language descriptions ───────────────────────────────────────
const lgbtqDescriptions: Record<string, { headline: string; detail: string }> = {
  "Clear: Affirming": {
    headline: "This church fully welcomes LGBTQ+ people — and says so clearly.",
    detail:
      "LGBTQ+ individuals can be hired, ordained, married, and serve in leadership here. The church communicates this openly on its main website.",
  },
  "Unclear: Affirming": {
    headline: "This church appears to welcome LGBTQ+ people, but hasn't said so clearly.",
    detail:
      "Based on available evidence, there are no restrictions on LGBTQ+ individuals. However, the church does not prominently state this — so it's hard to know for certain.",
  },
  "Clear: Non-Affirming": {
    headline: "This church restricts LGBTQ+ participation — and says so clearly.",
    detail:
      "This church has explicit policies limiting LGBTQ+ individuals from marriage, ordination, or certain roles. These restrictions are stated openly.",
  },
  "Unclear: Non-Affirming": {
    headline: "This church appears to restrict LGBTQ+ people, but hasn't said so clearly.",
    detail:
      "There is evidence of restrictive policies, but the church does not communicate them prominently. Visitors may not know until they ask.",
  },
};

const womenDescriptions: Record<string, { headline: string; detail: string }> = {
  "Clear: Egalitarian": {
    headline: "Women can lead at every level here — and the church shows it.",
    detail:
      "Women are permitted to preach, be ordained, and serve as senior pastor. The church demonstrates this through actual representation on staff and in governance.",
  },
  "Unclear: Egalitarian": {
    headline: "Women can lead at every level here, but representation hasn't caught up yet.",
    detail:
      "The church's policies place no restrictions on women in leadership. However, women are not yet adequately represented on staff or the governing board — so the openness is harder to verify.",
  },
  "Clear: Non-Egalitarian": {
    headline: "This church restricts women's leadership roles — and says so clearly.",
    detail:
      "Women are explicitly restricted from certain leadership positions such as senior pastor or elder. These restrictions are communicated openly.",
  },
  "Unclear: Non-Egalitarian": {
    headline: "This church appears to restrict women's roles, but hasn't said so clearly.",
    detail:
      "Evidence suggests restrictions on women in leadership, but the church does not communicate this prominently on its website.",
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function PolicyQuestion({
  question,
  answer,
  sourceNote,
}: {
  question: string;
  answer: boolean;
  sourceNote: string;
}) {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
      {/* Answer indicator */}
      <div className="flex-shrink-0 mt-0.5" aria-hidden="true">
        {answer ? (
          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 leading-snug">{question}</p>
        {/* gray-600 on white = 5.74:1 ✓ */}
        <p className="mt-1 text-xs text-gray-600 flex items-center gap-1">
          <svg className="w-3 h-3 flex-shrink-0" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          {sourceNote}
        </p>
      </div>

      <div className="flex-shrink-0 self-start mt-0.5">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${answer ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
          {answer ? "Yes" : "No"}
        </span>
      </div>
    </div>
  );
}

function ScoreSection({
  category,
  score,
  badgeStyle,
  description,
  policyQuestions,
  clarityGap,
}: {
  category: string;
  score: string;
  badgeStyle: BadgeStyle;
  description: { headline: string; detail: string };
  policyQuestions: { question: string; answer: boolean; sourceNote: string }[];
  clarityGap?: string;
}) {
  const [part1, part2] = score.split(": ");
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Card header */}
      <div className="px-6 pt-6 pb-5">
        {/* gray-600 on white = 5.74:1 ✓ */}
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-3">{category}</p>

        {/* Score badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${badgeStyle.bg} ${badgeStyle.border} mb-4`}>
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${badgeStyle.dot}`} aria-hidden="true" />
          <span className={`text-sm font-semibold ${badgeStyle.text}`}>
            <span className="font-normal">{part1}: </span>
            {part2}
          </span>
        </div>

        {/* Plain-language explanation */}
        <h3 className="text-base font-semibold text-gray-900 leading-snug mb-2">
          {description.headline}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description.detail}</p>

        {/* Clarity gap callout */}
        {clarityGap && (
          <div className="mt-4 flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3.5">
            <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong className="font-semibold">Why &ldquo;Unclear&rdquo;?</strong> {clarityGap}
            </p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Policy evidence */}
      <div className="px-6 py-2">
        {/* gray-600 on white = 5.74:1 ✓ */}
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 pt-4 pb-1">
          How we determined this score
        </p>
        {policyQuestions.map((q, i) => (
          <PolicyQuestion key={i} {...q} />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function V1Page() {
  const { name, location, denomination, lastUpdated, lgbtq, womenInLeadership } = churchData;

  const lgbtqStyle = lgbtqBadgeStyles[lgbtq.score] ?? lgbtqBadgeStyles["Undisclosed"];
  const womenStyle = womenBadgeStyles[womenInLeadership.score] ?? womenBadgeStyles["Undisclosed"];
  const lgbtqDesc = lgbtqDescriptions[lgbtq.score];
  const womenDesc = womenDescriptions[womenInLeadership.score];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-sm font-bold tracking-tight text-gray-900">Church Clarity</span>
          {/* gray-600 on white = 5.74:1 ✓ */}
          <a
            href="/"
            className="text-xs text-gray-600 hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 rounded"
          >
            ← Back to search
          </a>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {/* Church header */}
        <div>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
                {/* Decorative separator — hidden from assistive tech */}
                <span aria-hidden="true" className="text-gray-300">·</span>
                {denomination}
              </p>
            </div>
            {/* gray-600 on white = 5.74:1 ✓ */}
            <span className="text-xs text-gray-600 mt-1">Updated {lastUpdated}</span>
          </div>

          {/* Quick summary pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { label: "LGBTQ+ Policy", score: lgbtq.score, style: lgbtqStyle },
              { label: "Women in Leadership", score: womenInLeadership.score, style: womenStyle },
            ].map(({ label, score, style }) => {
              const [p1, p2] = score.split(": ");
              return (
                <div key={label} className={`flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-full border text-xs ${style.bg} ${style.border}`}>
                  <span className={`w-2 h-2 rounded-full ${style.dot}`} aria-hidden="true" />
                  <span className="text-gray-500 font-medium">{label}:</span>
                  <span className={`font-semibold ${style.text}`}>
                    {p1}: {p2}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explainer banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 flex gap-3">
          <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {/* blue-800 on blue-50 = 7.2:1 ✓ */}
          <p className="text-xs text-blue-800 leading-relaxed">
            Each score has two parts: the church&apos;s <strong>position</strong> (Affirming / Non-Affirming, Egalitarian / Non-Egalitarian) and how <strong>clearly</strong> they communicate it (Clear / Unclear). Scroll down to see the exact questions we asked and what the evidence showed.
          </p>
        </div>

        {/* Score cards */}
        <ScoreSection
          category="LGBTQ+ Policy"
          score={lgbtq.score}
          badgeStyle={lgbtqStyle}
          description={lgbtqDesc}
          policyQuestions={lgbtq.policyQuestions}
        />

        <ScoreSection
          category="Women in Leadership Policy"
          score={womenInLeadership.score}
          badgeStyle={womenStyle}
          description={womenDesc}
          policyQuestions={womenInLeadership.policyQuestions}
          clarityGap={womenInLeadership.clarityGap}
        />

        {/* Footer note — gray-600 on white = 5.74:1 ✓ */}
        <p className="text-xs text-center text-gray-600 pb-6">
          Information is collected from publicly available sources.{" "}
          <a
            href="#"
            className="underline hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 rounded"
          >
            Dispute this score
          </a>
          {" · "}
          <a
            href="#"
            className="underline hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 rounded"
          >
            Learn how scores work
          </a>
        </p>
      </main>
    </div>
  );
}
