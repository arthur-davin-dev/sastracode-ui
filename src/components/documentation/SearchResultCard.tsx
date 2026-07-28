import { SearchResultItem } from "@/types/documentation";
import { LevelBadge } from "./ui";

export default function SearchResultCard({ result }: { result: SearchResultItem }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-start 
                    transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-md cursor-pointer">
      
      {/* LEFT ACCENT ICON CONTAINER */}
      <div className="flex h-11 w-11 rounded-[16px] shrink-0 items-center justify-center bg-accent p-2">
        <img 
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" 
          alt="Java Logo" 
          className="w-full h-full object-contain" 
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-[20px] font-semibold text-foreground">{result.title}</h3>
        <p className="text-[16px] leading-relaxed text-muted-foreground">{result.description}</p>

        <div className="mt-1 flex flex-wrap items-center gap-3">
          <span className="rounded-[16px] bg-muted px-3.5 py-2 text-[16px] font-semibold text-foreground">
            {result.category}
          </span>
          <button className="rounded-[16px] bg-[#002455] px-5 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#002455]/90">
            កម្រិតមូលដ្ឋាន
          </button>
        </div>
      </div>

      <LevelBadge level={result.level} />
    </div>
  );
}