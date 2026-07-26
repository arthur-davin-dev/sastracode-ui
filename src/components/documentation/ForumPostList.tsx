import { ForumPost } from "@/types/course";
import ForumPostCard from "./ForumPostCard";

interface ForumPostListProps {
  title: string;
  posts: ForumPost[];
}

export default function ForumPostList({ title, posts }: ForumPostListProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-base font-semibold text-slate-800 font-khmer text-[24px]">{title}</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <ForumPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
} 
