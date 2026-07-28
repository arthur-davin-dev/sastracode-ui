import { FileCode2 } from "lucide-react";
import { SearchResultItem } from "@/types/documentation";
import { LevelBadge } from "./ui";

export default function SearchResultCard({ result }: { result: SearchResultItem }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-start">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
        <FileCode2 className="h-5 w-5" />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-sm font-semibold text-foreground">{result.title}</h3>
        <p className="text-xs leading-relaxed text-muted-foreground">{result.description}</p>

        <div className="mt-1 flex flex-wrap items-center gap-3">
          <span className="rounded-2xl bg-muted px-2.5 py-1 text-[11px] font-semibold text-foreground">
            {result.category}
          </span>
          <button className="rounded-2xl bg-primary px-4 py-1.5 text-[11px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            មើលមេរៀន
          </button>
        </div>
      </div>

      <LevelBadge level={result.level} />
    </div>
  );
}
