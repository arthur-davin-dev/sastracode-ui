export function KeyPoint({ summary }: { summary: string }) {
  if (!summary) return null;

  return (
    <div className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 font-khmer transition-colors duration-300">
      <h3 className="mb-2 text-xl sm:text-2xl font-bold text-[#002455] dark:text-blue-400">
        គន្លឹះសំខាន់
      </h3>
      <p className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
        {summary}
      </p>
    </div>
  );
}