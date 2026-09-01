import ProjectsSection from "./ProjectsSection";
import LanguageCards from "./LanguageCard";
import Hero from "./Hero";

export default function Playground() {
  return (
    <div className="relative min-h-screen bg-transparent text-slate-900 transition-colors duration-300 selection:bg-indigo-500 selection:text-white dark:bg-transparent dark:text-slate-100">
      {/* Subtle background ambient glow for dark mode depth */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-125 w-200 -translate-x-1/2 bg-linear-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl dark:from-indigo-600/15 dark:via-purple-600/10" />

      {/* Main page content */}
      <main className="relative z-10 space-y-4 pb-16">
        <Hero />
        <LanguageCards />
        <ProjectsSection />
      </main>
    </div>
  );
}