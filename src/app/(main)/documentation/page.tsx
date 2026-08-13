import Hero from "@/components/documentation/Hero";
import DocumentationTutorials from "@/components/documentation/DocumentationTutorials";
import ScrollReveal from "@/components/home/ScrollReveal";

export default function DocumentationHomePage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <ScrollReveal>
        <Hero />
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 sm:px-6 lg:px-8">
          <DocumentationTutorials />
        </div>
      </ScrollReveal>
    </main>
  );
}
