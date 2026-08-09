import Hero from "@/components/documentation/Hero";
import TutorialGrid from "@/components/documentation/TutorialGrid";

export default function DocumentationHomePage() {
  return (
    <main className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      <Hero />
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <TutorialGrid />
      </div>
    </main>
  );
}
