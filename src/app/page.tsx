import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Church Clarity</h1>
          <p className="text-sm text-gray-500 mt-1">Church detail page redesign — two versions</p>
        </div>

        <div className="space-y-4">
          <Link
            href="/v1"
            className="group block bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all px-6 py-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Version 1</p>
                <h2 className="text-base font-semibold text-gray-900">Evidence-First Cards</h2>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  Score badges with plain-language explanations. Policy questions show exactly how the score was determined, with a callout explaining why a church can be egalitarian but still &ldquo;Unclear.&rdquo;
                </p>
              </div>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors mt-1 flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">Color-coded badges</span>
              <span className="text-xs bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full">Plain-language summaries</span>
              <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">Why Unclear? callout</span>
            </div>
          </Link>

          <Link
            href="/v2"
            className="group block bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all px-6 py-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Version 2</p>
                <h2 className="text-base font-semibold text-gray-900">Two-Axis Clarity Design</h2>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  Separates <strong>Position</strong> (what the church allows) from <strong>Clarity</strong> (how openly they communicate it) using a spectrum bar and side-by-side axis panels. Policy evidence in a clean table.
                </p>
              </div>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors mt-1 flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">Score spectrum</span>
              <span className="text-xs bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full">Position vs Clarity split</span>
              <span className="text-xs bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full">Clarity meter visual</span>
            </div>
          </Link>

          <Link
            href="/v3"
            className="group block bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all px-6 py-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Version 3</p>
                <h2 className="text-base font-semibold text-gray-900">Drawer Evidence Design</h2>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  Consistent card style throughout. Each policy shows Position + Clarity at a glance, with policy evidence hidden behind an expandable drawer. No spectrum scale.
                </p>
              </div>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors mt-1 flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full">Expandable evidence drawer</span>
              <span className="text-xs bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full">Position vs Clarity</span>
              <span className="text-xs bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full">No spectrum</span>
            </div>
          </Link>
        </div>

        <p className="text-xs text-center text-gray-400 mt-6">
          All versions use the same church data: <strong>City Church SF</strong> (Affirming) or <strong>Cornerstone Nashville</strong> (Non-Affirming)
        </p>
      </div>
    </div>
  );
}
