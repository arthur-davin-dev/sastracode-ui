import Image from "next/image";
import { ThumbsUp, MoreVertical } from "lucide-react";
import { Comment } from "@/types/lesson-player";

interface DiscussionSectionProps {
  comments: Comment[];
  totalCount: number;
}

export function DiscussionSection({ comments, totalCount }: DiscussionSectionProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900 font-(family-name:--font-sans)">
          មតិយោបល់ ({totalCount})
        </h2>
        <select className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs text-gray-500">
          <option>Newest First</option>
          <option>Oldest First</option>
          <option>Most Liked</option>
        </select>
      </div>

      <div className="mb-6 flex items-start gap-3">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-200">
          <Image src="/assets/images/current-user.png" alt="You" fill className="object-cover" />
        </div>
        <div className="flex flex-1 items-center gap-2 text-primary-color">
          <input
            type="text"
            placeholder="សរសេរមតិយោបល់..."
            className="flex-1 rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-primary-color font-(family-name:--font-sans)"
          />
          <button className="shrink-0 rounded-lg bg-primary-color px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-color/90">
            Post Comment
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-200">
              <Image src={comment.authorAvatar} alt={comment.authorName} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">{comment.authorName}</span>
                <span className="text-xs text-gray-400">{comment.postedAt}</span>
              </div>
              <p className="mt-1 text-sm text-gray-600 font-(family-name:--font-sans)">
                {comment.content}
              </p>
              <div className="mt-1.5 flex items-center gap-4 text-xs text-gray-400">
                <button className="flex items-center gap-1 hover:text-primary-color">
                  <ThumbsUp className="h-3 w-3" />
                  {comment.likeCount}
                </button>
                <button className="hover:text-primary-color">Reply</button>
                <button aria-label="More options" className="hover:text-primary-color">
                  <MoreVertical className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalCount > comments.length && (
        <button className="mt-5 w-full text-center text-sm font-medium text-primary-color hover:underline">
          មើលមតិយោបល់ទាំងអស់ ({totalCount})
        </button>
      )}
    </div>
  );
}