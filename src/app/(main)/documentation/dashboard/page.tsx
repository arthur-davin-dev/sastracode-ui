import Link from "next/link";
import DocsShell from "@/components/documentation/DocsShell";
import TodayLessonHero from "@/components/documentation/TodayLessonHero";
import ContinueLearningCard from "@/components/documentation/ContinueLearningCard";
import SavedLessonCard from "@/components/documentation/SavedLessonCard";
import { continueLearningCards, savedLessons } from "@/lib/data/documentation";

export default function DashboardPage() {
  return (
    <DocsShell>
      <div className="flex flex-col gap-10">
        <TodayLessonHero
          title="លំហាត់សរសេរកូដ Java កម្រិតខ្ពស់"
          description="ស្វែងយល់ពីបច្ចេកទេសសរសេរកូដ Java កម្រិតខ្ពស់ រួមមាន Exception Handling, Collections Framework, Generics, និង Stream API ដើម្បីបង្កើតកម្មវិធីដែលមានប្រសិទ្ធភាព និងងាយស្រួលថែទាំ។"
          percent={25}
          href="/documentation/java"
        />

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">បានសិក្សាថ្មីៗ</h2>
            <Link href="/documentation/search" className="text-xs font-medium text-primary hover:underline">
              មើលទាំងអស់ ›
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {continueLearningCards.map((card) => (
              <ContinueLearningCard key={card.id} card={card} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-base font-bold text-foreground">មេរៀនដែលបានរក្សាទុក</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {savedLessons.map((card) => (
              <SavedLessonCard key={card.id} card={card} />
            ))}
          </div>
        </section>
      </div>
    </DocsShell>
  );
}
