import Hero from "@/components/documentation/Hero";
import CourseProgressCard from "@/components/documentation/CourseProgressCard";
import TutorialCatalogClient from "@/components/documentation/TutorialCatalogClient";
import { currentProgress } from "@/lib/data/courses";

export default function DocumentationHomePage() {
  return (
    <main className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      <Hero />

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-primary-color">Continue learning</h2>
          <CourseProgressCard progress={currentProgress} />
        </section>

        <TutorialCatalogClient />
      </div>
    </main>
  );
}
