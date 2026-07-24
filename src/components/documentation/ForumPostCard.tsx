import Link from "next/link";
import { ForumPost } from "@/types/course";

interface ForumPostCardProps {
  post: ForumPost;
}

const badgeStyles: Record<ForumPost["type"], string> = {
  post: "bg-slate-800 text-white",
  sql: "bg-sky-100 text-sky-700",
};

export default function ForumPostCard({ post }: ForumPostCardProps) {
  return (
    <Link
      href={post.href}
      className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-2">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${badgeStyles[post.type]}`}
        >
          {post.type === "sql" ? "SQL" : "អ្នក"}
        </span>
        <span className="text-xs text-slate-400">{post.timeAgo}</span>
      </div>

      <h3 className="text-sm font-semibold text-slate-800">{post.title}</h3>
      <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">
        {post.excerpt}
      </p>
    </Link>
  );
}
