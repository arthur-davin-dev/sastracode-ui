import Link from "next/link";
import { CheckCircle2, BookOpen } from "lucide-react";
import { ContinueLearningCard as ContinueLearningCardType } from "@/types/documentation";

export default function ContinueLearningCard({ card }: { card: ContinueLearningCardType }) {
  const isComplete = card.progressPercent >= 100;

  return (
    <Link
      href={card.href}
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card "
    >
      <div className="relative flex h-28 w-full items-center justify-center bg-gradient-to-br from-accent to-primary/10">
        <BookOpen className="h-8 w-8 text-primary/70" />
      </div>

      <div className="flex flex-col gap-1.5 p-4">
        <span className="text-[10px] font-bold uppercase tracking-wide text-primary">{card.category}</span>
        <h3 className="text-sm font-semibold text-foreground">{card.title}</h3>

        <div className="mt-1 flex items-center gap-2">
          {isComplete ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success">
              <CheckCircle2 className="h-3.5 w-3.5" /> បានបញ្ចប់
            </span>
          ) : (
            <span className="text-[11px] font-semibold text-muted-foreground">{card.progressPercent}% PROGRESS</span>
          )}
        </div>
      </div>
    </Link>
  );
}
