import Hero from "@/components/documentation/Hero";
import DocumentationTutorials from "@/components/documentation/DocumentationTutorials";

export default function DocumentationHomePage() {
  return (
    <main className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      <Hero />

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 sm:px-6 lg:px-8">
        <DocumentationTutorials />
      </div>
    </main>
  );
}
