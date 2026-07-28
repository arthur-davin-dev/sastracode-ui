import { Card } from "@/components/ui/card";

const languages = [
  {
    name: "HTML",
    desc: "Structure & Markup",
    icon: "🌐",
    bg: "bg-orange-100 dark:bg-orange-950/60",
  },
  {
    name: "CSS",
    desc: "Styles & Layouts",
    icon: "🎨",
    bg: "bg-blue-100 dark:bg-blue-950/60",
  },
  {
    name: "JavaScript",
    desc: "Logic & Interactivity",
    icon: "⚡",
    bg: "bg-yellow-100 dark:bg-yellow-950/60",
  },
  {
    name: "Python",
    desc: "Data & Automation",
    icon: "🐍",
    bg: "bg-emerald-100 dark:bg-emerald-950/60",
  },
  {
    name: "Java",
    desc: "Enterprise & Backend",
    icon: "☕",
    bg: "bg-rose-100 dark:bg-rose-950/60",
  },
];

export default function LanguageCards() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10 transition-colors duration-300">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {languages.map((lang) => (
          <Card
            key={lang.name}
            className="p-4 flex flex-col gap-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-md dark:hover:border-slate-700 transition-all cursor-pointer"
          >
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center text-lg ${lang.bg} transition-colors duration-300`}
            >
              {lang.icon}
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 transition-colors duration-300">
              {lang.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">
              {lang.desc}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}