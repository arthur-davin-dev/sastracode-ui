import { CheckCircle2 } from "lucide-react";

export default function LearningGoals({ objectives }: { objectives: string[] }) {
  if (!objectives || !objectives.length) return null;

  return (
    <div className="mb-6 space-y-3 font-khmer">
      <h3 className="text-xl font-bold text-[#002455] dark:text-blue-400">
        គោលបំណងនៃការសិក្សា
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {objectives.map((goal, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-base sm:text-lg text-slate-700 dark:text-slate-200 shadow-sm transition-colors duration-300"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500 mt-1" />
            <span className="leading-relaxed">{goal}</span>
          </div>
        ))}
      </div>
    </div>
  );
}