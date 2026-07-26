import Link from "next/link";
import { ForumPost } from "@/types/course";

interface ForumPostCardProps {
  post: ForumPost;
}

// Custom configuration to match the exact badge appearance in the image
const badgeConfig: Record<ForumPost["type"], { bg: string; textColor: string; label: string }> = {
  post: { bg: "bg-[#1e2229]", textColor: "text-sky-400", label: "Rct" },
  sql: { bg: "bg-[#1e2229]", textColor: "text-cyan-400", label: "SQL" },
};

export default function ForumPostCard({ post }: ForumPostCardProps) {
  const badge = badgeConfig[post.type] || badgeConfig.post;

  return (
    <Link
      href={post.href}
      className="group flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-6  transition-all hover:border-slate-300"
    >
      {/* Left Side: Large Rounded Category Icon */}
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-sans text-[16px] font-bold ${badge.bg} ${badge.textColor}`}
      >
        {badge.label}
      </div>

      {/* Middle: Content Column */}
      <div className="flex flex-1 flex-col gap-2 font-khmer">
        {/* Meta Row (Level & Time) */}
        <div className="flex items-center gap-2 text-[14px]">
          <span className="rounded-full bg-amber-50 px-3 py-1 font-medium text-amber-600">
            មធ្យម
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            ⏱ { "៤៥ នាទី"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[18px] font-bold leading-snug text-[#0f2942]">
          {post.title}
        </h3>

        {/* Excerpt / Description */}
        <p className="line-clamp-2 text-[18px] leading-relaxed text-slate-500">
          {post.excerpt}
        </p>
      </div>

      {/* Right Side: Action Chevron Arrow */}
      <div className="flex self-center pl-2 text-slate-400 transition-transform group-hover:translate-x-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}