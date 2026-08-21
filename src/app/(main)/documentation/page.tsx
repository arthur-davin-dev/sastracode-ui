import Hero from "@/components/documentation/Hero";
import DocumentationTutorials from "@/components/documentation/DocumentationTutorials";
import ScrollReveal from "@/components/home/ScrollReveal";
import { NetworkBackground } from "@/components/common/NetworkBackground";

export default function DocumentationHomePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <NetworkBackground />

      <div className="relative z-10">
        <ScrollReveal>
          <Hero />
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 sm:px-6 lg:px-8">
            <DocumentationTutorials />
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}