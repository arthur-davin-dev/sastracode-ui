import Link from "next/link";
import { Star, Clock3 } from "lucide-react";
import { SavedLessonCard as SavedLessonCardType } from "@/types/documentation";

export default function SavedLessonCard({ card }: { card: SavedLessonCardType }) {
  return (
    <Link
      href={card.href}
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="relative flex h-24 w-full items-center justify-center bg-gradient-to-br from-primary to-[#0a1f45]">
        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-warning text-white">
          <Star className="h-3.5 w-3.5 fill-current" />
        </span>
      </div>

      <div className="flex flex-col gap-1.5 p-4">
        <span className="text-[10px] font-bold uppercase tracking-wide text-primary">{card.category}</span>
        <h3 className="text-sm font-semibold text-foreground">{card.title}</h3>
        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <Clock3 className="h-3 w-3" /> {card.readingTimeLabel}
        </span>
      </div>
    </Link>
  );
}
