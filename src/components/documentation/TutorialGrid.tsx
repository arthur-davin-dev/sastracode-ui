"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { useListTutorialsQuery } from "@/redux/api/tutorial-api";
import {
  useAddBookmarkMutation,
  useGetMyBookmarksQuery,
  useRemoveBookmarkMutation,
} from "@/redux/service/bookmarkApi";

function TutorialCover({ fileId, title }: { fileId?: string; title: string }) {
  const [failed, setFailed] = useState(false);
  const normalizedFileId = fileId?.trim();
  const src = normalizedFileId && !failed
    ? `/api/files/${encodeURIComponent(normalizedFileId)}`
    : "/images/doc-hero.png";

  return (
    <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
      <Image
        src={src}
        alt={`${title} cover`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function TutorialBookmark({ tutorialId }: { tutorialId: string }) {
  const { data } = useGetMyBookmarksQuery("TUTORIAL");
  const [addBookmark, addState] = useAddBookmarkMutation();
  const [removeBookmark, removeState] = useRemoveBookmarkMutation();
  const bookmark = data?.data?.content?.find((item) => item.itemId === tutorialId);
  const loading = addState.isLoading || removeState.isLoading;

  async function toggleBookmark() {
    try {
      if (bookmark) {
        await removeBookmark(bookmark.id).unwrap();
        toast.success("Tutorial removed from bookmarks.");
      } else {
        await addBookmark({ itemType: "TUTORIAL", itemId: tutorialId }).unwrap();
        toast.success("Tutorial saved to bookmarks.");
      }
    } catch {
      toast.error("Please sign in to save this tutorial.");
    }
  }

  return <button type="button" onClick={toggleBookmark} disabled={loading} aria-label={bookmark ? "Remove tutorial bookmark" : "Bookmark tutorial"} aria-pressed={Boolean(bookmark)} className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-primary-color shadow-md transition hover:scale-105 disabled:opacity-60 dark:bg-slate-900/95 dark:text-blue-400">
    <Bookmark className="h-5 w-5" fill={bookmark ? "currentColor" : "none"} />
  </button>;
}

export default function TutorialGrid() {
  const { data, isLoading, isFetching, error, refetch } = useListTutorialsQuery({
    status: "PUBLISHED",
    page: 0,
    size: 12,
    sort: "publishedAt,desc",
  });

  if (isLoading) return <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading tutorials">{Array.from({ length: 6 }, (_, i) => <div key={i} className="h-80 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />)}</div>;
  if (error) return <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"><p>Unable to load tutorials right now.</p><button className="mt-3 font-semibold underline" type="button" onClick={() => refetch()}>Try again</button></div>;

  const tutorials = data?.data?.content ?? [];
  if (!tutorials.length) return <p className="rounded-2xl bg-white p-8 text-center text-slate-500 dark:bg-slate-900">No published tutorials yet.</p>;

  return <section className="space-y-6" aria-busy={isFetching}>
    <div className="flex items-center justify-between"><h2 className="font-khmer text-2xl font-bold text-primary-color dark:text-blue-300">Tutorials</h2><span className="text-sm text-slate-500">{data?.data?.totalElements ?? tutorials.length} available</span></div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{tutorials.map((tutorial) => <article key={tutorial.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <TutorialBookmark tutorialId={tutorial.id} />
      <TutorialCover fileId={tutorial.coverFileId} title={tutorial.title} />
      <div className="flex flex-1 flex-col p-6">
        <span className="mb-3 w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">{tutorial.level}</span>
        <h3 className="text-xl font-bold text-primary-color dark:text-white">{tutorial.title}</h3>
        <p className="mt-2 line-clamp-2 min-h-12 flex-1 overflow-hidden text-base leading-6 text-slate-700 text-ellipsis dark:text-slate-300">{tutorial.summary || "Open this tutorial to start learning."}</p>
        <Link className="mt-6 rounded-xl bg-primary-color px-4 py-3 text-center text-sm font-semibold text-white hover:opacity-90 dark:bg-blue-600" href={`/documentation/lessons/${tutorial.id}`}>Read tutorial</Link>
      </div>
    </article>)}</div>
  </section>;
}
