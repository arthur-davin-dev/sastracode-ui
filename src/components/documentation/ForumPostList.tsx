"use client";

import { ForumPost } from "@/types/course";
import ForumPostCard from "./ForumPostCard";

interface ForumPostListProps {
  title: string;
  posts: ForumPost[];
}

export default function ForumPostList({ title, posts }: ForumPostListProps) {
  return (
    <section className="flex flex-col gap-6">
      
      {/* Header with Title and Chat/Forum Icon */}
      <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
        {/* Forum Header Logo/Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
            />
          </svg>
        </div>
        
        <h2 className=" text-[24px] font-bold text-slate-800 tracking-tight sm:text-2xl">
          {title}
        </h2>
      </div>

      {/* Clean Grid with Card Interaction Layout */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="transition-all duration-300 ease-out hover:-translate-y-1"
            style={{
              animation: `fadeInUp 0.4s ease-out both ${index * 0.07}s`,
            }}
          >
            <ForumPostCard post={post} />
          </div>
        ))}
      </div>

      {/* Global CSS Inject for Staggered Initial Load Animation */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
    </section>
  );
}