import Image from "next/image";
import { ThumbsUp, MoreVertical } from "lucide-react";
import { Comment } from "@/types/lesson-player";

interface DiscussionSectionProps {
  comments: Comment[];
  totalCount: number;
}

export function DiscussionSection({ comments, totalCount }: DiscussionSectionProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-colors duration-300">
      {/* Header & Filter */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          មតិយោបល់ ({totalCount})
        </h2>
        <select className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500">
          <option>Newest First</option>
          <option>Oldest First</option>
          <option>Most Liked</option>
        </select>
      </div>

      {/* New Comment Input */}
      <div className="mb-6 flex items-start gap-3">
<<<<<<< HEAD
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-200">
          <Image src="/assets/images/Davin.DNG" alt="You" fill className="object-cover" />
=======
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <Image src="/assets/images/current-user.png" alt="You" fill className="object-cover" />
>>>>>>> 0d9eb9f9439272ef5da7417ae3d9d69c50e19e22
        </div>
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <input
            type="text"
            placeholder="សរសេរមតិយោបល់..."
            className="flex-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none transition-colors focus:border-indigo-500 dark:focus:border-indigo-400"
          />
          <button className="shrink-0 rounded-lg bg-indigo-600 dark:bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
            Post Comment
          </button>
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-5">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <Image src={comment.authorAvatar} alt={comment.authorName} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {comment.authorName}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {comment.postedAt}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {comment.content}
              </p>
              <div className="mt-1.5 flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
                <button className="flex items-center gap-1 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                  <ThumbsUp className="h-3 w-3" />
                  {comment.likeCount}
                </button>
                <button className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                  Reply
                </button>
                <button aria-label="More options" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                  <MoreVertical className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show All Comments */}
      {totalCount > comments.length && (
        <button className="mt-5 w-full text-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
          មើលមតិយោបល់ទាំងអស់ ({totalCount})
        </button>
      )}
    </div>
  );
}