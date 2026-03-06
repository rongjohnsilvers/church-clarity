"use client";

import { useState } from "react";
import { churchData, nonAffirmingChurchData } from "@/lib/church-data";

const churches = [churchData, nonAffirmingChurchData];

// ─── Types & config ───────────────────────────────────────────────────────────

type Position = "Affirming" | "Non-Affirming" | "Egalitarian" | "Non-Egalitarian";
type ClarityLevel = "Clear" | "Unclear" | "Undisclosed";

function parseScore(score: string): { position: Position | null; clarity: ClarityLevel } {
  if (score === "Undisclosed") return { position: null, clarity: "Undisclosed" };
  const [clarity, position] = score.split(": ");
  return { clarity: clarity as ClarityLevel, position: position as Position };
}

const positionConfig: Record<string, { label: string; description: string; activeClasses: string; inactiveClasses: string }> = {
  Affirming:        { label: "Affirming",        description: "No restrictions on LGBTQ+ people in any role",       activeClasses: "border-blue-600 bg-blue-600 text-white",     inactiveClasses: "border-blue-200 bg-blue-50 text-blue-600" },
  "Non-Affirming":  { label: "Non-Affirming",    description: "Restricts LGBTQ+ people from some or all roles",    activeClasses: "border-blue-600 bg-blue-600 text-white",     inactiveClasses: "border-blue-200 bg-blue-50 text-blue-600" },
  Egalitarian:      { label: "Egalitarian",      description: "No restrictions on women in any leadership role",    activeClasses: "border-purple-600 bg-purple-600 text-white", inactiveClasses: "border-purple-200 bg-purple-50 text-purple-700" },
  "Non-Egalitarian":{ label: "Non-Egalitarian",  description: "Restricts women from some leadership positions",    activeClasses: "border-purple-600 bg-purple-600 text-white", inactiveClasses: "border-purple-200 bg-purple-50 text-purple-700" },
};
// Contrast notes:
// Active: white on blue-600 = 4.8:1 ✓; white on purple-600 = 5.4:1 ✓
// Inactive: blue-600 on blue-50 ≈ 4.7:1 ✓; purple-700 on purple-50 ≈ 6.6:1 ✓

const clarityConfig: Record<ClarityLevel, { steps: number; label: string; barColor: string; textColor: string; description: string }> = {
  Clear: {
    steps: 3,
    label: "Clear",
    barColor: "bg-emerald-500",
    textColor: "text-emerald-700",
    description: "Prominently stated on their main website or demonstrated through leadership representation",
  },
  Unclear: {
    steps: 2,
    label: "Unclear",
    barColor: "bg-amber-400",
    textColor: "text-amber-600",
    description: "Policy is implied or buried, but not prominently communicated to visitors",
  },
  Undisclosed: {
    steps: 1,
    label: "Undisclosed",
    barColor: "bg-gray-400",
    textColor: "text-gray-600",
    description: "No conclusive evidence available; visitors cannot tell from the church's public presence",
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ClarityMeter({ level }: { level: ClarityLevel }) {
  const config = clarityConfig[level];
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          aria-hidden="true"
          className={`h-2 rounded-full ${step <= config.steps ? config.barColor : "bg-gray-200"} ${step === 1 ? "w-4" : step === 2 ? "w-5" : "w-6"}`}
        />
      ))}
      <span className={`text-xs font-semibold ml-1 ${config.textColor}`}>{config.label}</span>
    </div>
  );
}

// Affirming/Egalitarian always left, Non-Affirming/Non-Egalitarian always right
const positionOrder: Record<Position, [Position, Position]> = {
  "Affirming":       ["Affirming",    "Non-Affirming"],
  "Non-Affirming":   ["Affirming",    "Non-Affirming"],
  "Egalitarian":     ["Egalitarian",  "Non-Egalitarian"],
  "Non-Egalitarian": ["Egalitarian",  "Non-Egalitarian"],
};

function PositionBadges({ position }: { position: Position | null }) {
  if (!position) return <span className="text-sm text-gray-600 italic">Unknown</span>;
  const [left, right] = positionOrder[position];
  return (
    <div className="flex flex-wrap gap-2">
      {[left, right].map((p) => {
        const isActive = p === position;
        const cfg = positionConfig[p];
        return (
          <div key={p} className={`inline-flex items-center px-3 py-1 rounded-md border ${isActive ? cfg.activeClasses : cfg.inactiveClasses}`}>
            <span className={`text-sm ${isActive ? "font-semibold" : ""}`}>
              {cfg.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function PolicySection({
  category,
  score,
  policyQuestions,
  clarityGap,
}: {
  category: string;
  score: string;
  policyQuestions: { question: string; answer: boolean; sourceNote: string }[];
  clarityGap?: string;
}) {
  const [open, setOpen] = useState(false);
  const { clarity, position } = parseScore(score);
  const clarityDef = clarityConfig[clarity];
  const positionDef = position ? positionConfig[position] : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 pt-6 pb-5">
        {/* gray-600 on white = 5.74:1 ✓ */}
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-4">{category}</p>

        {/* Two-axis score display */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
            {/* gray-600 on white = 5.74:1 ✓ */}
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Position</p>
            <PositionBadges position={position} />
            {positionDef && (
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">{positionDef.description}</p>
            )}
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
            {/* gray-600 on white = 5.74:1 ✓ */}
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Clarity</p>
            <ClarityMeter level={clarity} />
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">{clarityDef.description}</p>
          </div>
        </div>

        {/* Drawer trigger */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-5 w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
        >
          {/* gray-600 on white = 5.74:1 ✓ */}
          <span className="text-xs font-semibold text-gray-600">
            Policy evidence <span className="text-gray-500 font-normal">({policyQuestions.length} questions)</span>
          </span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Drawer */}
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[800px]" : "max-h-0"}`}>
        <div className="border-t border-gray-100 px-2 pb-4">
          {clarityGap && (
            <div className="mx-2 mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div>
                <p className="text-xs font-semibold text-amber-800 mb-1">Why &ldquo;Unclear&rdquo; if all answers are Yes?</p>
                <p className="text-xs text-amber-700 leading-relaxed">{clarityGap}</p>
              </div>
            </div>
          )}
          <table className="w-full">
            <tbody>
              {policyQuestions.map((q, i) => (
                <tr key={i} className="group border-b border-gray-100 last:border-0">
                  <td className="py-3.5 pl-4 pr-3 w-8">
                    {/* gray-500 on white = 4.6:1 ✓ */}
                    <span className="text-xs font-mono text-gray-500 group-hover:text-gray-600" aria-hidden="true">{i + 1}</span>
                  </td>
                  <td className="py-3.5 pr-4">
                    <p className="text-sm text-gray-700 leading-snug">{q.question}</p>
                    {/* gray-600 on white = 5.74:1 ✓ */}
                    <p className="text-xs text-gray-600 mt-0.5 flex items-center gap-1">
                      <svg className="w-3 h-3 flex-shrink-0" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      {q.sourceNote}
                    </p>
                  </td>
                  <td className="py-3.5 pr-4 text-right">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      q.answer ? "bg-gray-100 text-gray-700" : "bg-gray-900 text-white"
                    }`}>
                      {q.answer ? (
                        <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      {q.answer ? "Yes" : "No"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function V3Page() {
  const [selected, setSelected] = useState(0);
  const [fabOpen, setFabOpen] = useState(false);
  const { name, location, denomination, lastUpdated, lgbtq, womenInLeadership } = churches[selected];

  return (
    <div className="min-h-screen bg-[#f5f4f2]">
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

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        {/* Church header — styled like policy sections */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-6">
          {/* gray-600 on white = 5.74:1 ✓ */}
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-4">Church</p>
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          <p className="text-sm text-gray-500 mt-1.5 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location} · {denomination}
          </p>
          {/* gray-600 on white = 5.74:1 ✓ */}
          <p className="text-xs text-gray-600 mt-4">Last updated {lastUpdated}</p>
        </div>

        {/* Policy sections with drawers */}
        <PolicySection
          category="LGBTQ+ Policy"
          score={lgbtq.score}
          policyQuestions={lgbtq.policyQuestions}
        />

        <PolicySection
          category="Women in Leadership Policy"
          score={womenInLeadership.score}
          policyQuestions={womenInLeadership.policyQuestions}
          clarityGap={"clarityGap" in womenInLeadership ? womenInLeadership.clarityGap : undefined}
        />

        {/* Footer — gray-600 on #f5f4f2 ≈ 5.74:1 ✓ */}
        <p className="text-xs text-center text-gray-600 pb-6">
          Scores are based on publicly available information.{" "}
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
            Score definitions
          </a>
        </p>
      </main>

      {/* Floating church switcher */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {fabOpen && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-1.5 flex flex-col gap-1 w-56">
            {churches.map((church, i) => (
              <button
                key={church.id}
                onClick={() => { setSelected(i); setFabOpen(false); }}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 ${
                  selected === i ? "bg-gray-900 text-white" : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${selected === i ? "bg-white" : "bg-gray-300"}`} aria-hidden="true" />
                <div className="min-w-0">
                  <p className="font-medium truncate leading-tight">{church.name}</p>
                  {/* On dark bg (selected): gray-400 on gray-900 ≈ 6.4:1 ✓; on white bg (unselected): gray-600 on white = 5.74:1 ✓ */}
                  <p className={`text-xs truncate ${selected === i ? "text-gray-400" : "text-gray-600"}`}>
                    {church.lgbtq.score.includes("Non-Affirming") ? "Non-Affirming" : "Affirming"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
        <button
          onClick={() => setFabOpen((o) => !o)}
          className="w-12 h-12 rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-700 transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          aria-label="Switch church"
          aria-expanded={fabOpen}
        >
          {fabOpen ? (
            <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
