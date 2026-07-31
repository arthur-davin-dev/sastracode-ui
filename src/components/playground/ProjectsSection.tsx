import { Card } from "@/components/ui/card";
import { Code2, LayoutTemplate, Sigma, Database } from "lucide-react";

const projects = [
  {
    title: "Sorting Algorithm Demo",
    desc: "កែសម្រួលកាលពី ២ ម៉ោងមុន",
    lang: "Python",
    icon: Code2,
  },
  {
    title: "Landing Page Prototype",
    desc: "កែសម្រួលកាលពី ៥ ម៉ោងមុន",
    lang: "HTML/CSS",
    icon: LayoutTemplate,
  },
  {
    title: "Calc Logic API",
    desc: "កែសម្រួលកាលពី ១ ថ្ងៃមុន",
    lang: "JavaScript",
    icon: Sigma,
  },
  {
    title: "Database Connector",
    desc: "កែសម្រួលកាលពី ២ ថ្ងៃមុន",
    lang: "Java",
    icon: Database,
  },
];

export default function ProjectsSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10 transition-colors duration-300">
      {/* Header row */}
      <div className="flex justify-end mb-4">
        <a className="text-sm text-indigo-700 dark:text-indigo-400 font-medium hover:underline cursor-pointer flex items-center gap-1 transition-colors duration-300">
          មើលទាំងអស់ →
        </a>
      </div>

      {/* Project cards grid */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <Card
              key={project.title}
              className="flex flex-row items-center gap-4 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-md dark:hover:border-slate-700 transition-all cursor-pointer"
            >
              <div className="h-12 w-12 shrink-0 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center transition-colors duration-300">
                <Icon className="h-5 w-5 text-indigo-800 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">
                  {project.desc} •{" "}
                  <span className="text-indigo-800 dark:text-indigo-400 font-medium">
                    {project.lang}
                  </span>
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Community banner */}
      <div className="rounded-3xl border border-indigo-200/60 dark:border-indigo-900/50 bg-indigo-50/80 dark:bg-indigo-950/40 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors duration-300">
        <p className="text-indigo-950 dark:text-indigo-200 font-medium text-lg max-w-md leading-relaxed transition-colors duration-300">
          Join a community of 10,000+ Khmer developers building the future of
          the local tech ecosystem.
        </p>
        <div className="flex -space-x-3 shrink-0">
          <div className="h-10 w-10 rounded-full bg-orange-300 dark:bg-orange-400 border-2 border-white dark:border-slate-900 shadow-sm" />
          <div className="h-10 w-10 rounded-full bg-blue-300 dark:bg-blue-400 border-2 border-white dark:border-slate-900 shadow-sm" />
          <div className="h-10 w-10 rounded-full bg-slate-400 dark:bg-slate-500 border-2 border-white dark:border-slate-900 shadow-sm" />
          <div className="h-10 w-10 rounded-full bg-indigo-800 dark:bg-indigo-600 text-white border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs font-semibold shadow-sm">
            +2k
          </div>
        </div>
      </div>
    </section>
  );
}