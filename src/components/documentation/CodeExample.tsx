export function CodeExample({
  filename,
  code,
}: {
  filename: string;
  code: string;
}) {
  if (!code) return null;

  return (
    <div className="mb-6 space-y-3 font-khmer">
      {/* Terminal Window Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 shadow-md">
        
        {/* Top Header Bar */}
        <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-950/50 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          {filename && (
            <span className="ml-2 text-sm font-mono text-slate-400">
              {filename}
            </span>
          )}
        </div>

        {/* Code Content Area */}
        <pre className="overflow-x-auto p-4 font-mono text-sm sm:text-base leading-relaxed text-slate-200">
          <code>{code}</code>
        </pre>
      </div>

      {/* Action Button */}
      <div className="flex justify-start">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl bg-[#002455] dark:bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-900 dark:hover:bg-blue-700 active:scale-[0.98]"
        >
          ដំណើរការកូដ
        </button>
      </div>
    </div>
  );
}