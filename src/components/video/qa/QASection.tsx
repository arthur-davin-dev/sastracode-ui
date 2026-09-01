"use client";

import { useState, type FormEvent } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuestionCard } from "./QuestionCard";
import { useCreateQuestionMutation, useGetVideoQuestionsQuery } from "@/redux/api/qa-api";
import { useGetMyProfileQuery } from "@/redux/service/profile-api";
import { useVideoQnaSocket } from "@/hooks/useVideoQnaSocket";
import { getApiErrorMessage, initialsFromName } from "@/lib/qa/qa-utils";
import { QUESTION_PAGE_SIZE } from "@/lib/qa/qa-constants";
import type { QuestionSort } from "@/types/api/qa";

type ViewTab = "all" | "open" | "resolved" | "upvoted";
type SortOption = Extract<QuestionSort, "newest" | "oldest">;

interface QASectionProps {
  videoId: string;
}

const TABS: { key: ViewTab; label: string }[] = [
  { key: "all", label: "សំណួរទាំងអស់" },
  { key: "open", label: "មិនទាន់ដោះស្រាយ" },
  { key: "resolved", label: "បានដោះស្រាយ" },
  { key: "upvoted", label: "និយមបំផុត" },
];

export function QASection({ videoId }: QASectionProps) {
  const { data: session, status } = useSession();
  const { data: profile } = useGetMyProfileQuery(undefined, {
    skip: status !== "authenticated",
  });

  // Live updates: refresh question/answer/vote caches as other viewers act.
  useVideoQnaSocket(videoId);
  const [tab, setTab] = useState<ViewTab>("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [page, setPage] = useState(0);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftDescription, setDraftDescription] = useState("");

  const resolved = tab === "open" ? false : tab === "resolved" ? true : undefined;
  const effectiveSort: QuestionSort = tab === "upvoted" ? "popular" : sort;

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetVideoQuestionsQuery({
    videoId,
    resolved,
    sort: effectiveSort,
    page,
    size: QUESTION_PAGE_SIZE,
  });

  // Lightweight count-only requests to populate the tab badges. They share
  // the same "Question/LIST" cache tag, so they stay in sync automatically.
  const { data: allCounts } = useGetVideoQuestionsQuery({
    videoId,
    resolved: undefined,
    sort: "newest",
    page: 0,
    size: 1,
  });
  const { data: openCounts } = useGetVideoQuestionsQuery({
    videoId,
    resolved: false,
    sort: "newest",
    page: 0,
    size: 1,
  });
  const { data: resolvedCounts } = useGetVideoQuestionsQuery({
    videoId,
    resolved: true,
    sort: "newest",
    page: 0,
    size: 1,
  });

  const [createQuestion, { isLoading: posting }] = useCreateQuestionMutation();

  function changeTab(next: ViewTab) {
    setTab(next);
    setPage(0);
  }

  function changeSort(next: SortOption) {
    setSort(next);
    setTab((current) => (current === "upvoted" ? "all" : current));
    setPage(0);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const title = draftTitle.trim();
    const description = draftDescription.trim();
    if (!title || !description) return;

    try {
      await createQuestion({
        videoId,
        title,
        content: description,
      }).unwrap();
      setDraftTitle("");
      setDraftDescription("");
      // Jump back to the default view so the new question is guaranteed
      // to be visible, regardless of whichever tab/sort was active.
      setTab("all");
      setSort("newest");
      setPage(0);
      toast.success("សំណួររបស់អ្នកត្រូវបានផ្ញើ");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "មិនអាចផ្ញើសំណួរបានទេ"));
    }
  }

  const questions = data?.content ?? [];
  const openCount = openCounts?.totalElements ?? 0;
  const resolvedCount = resolvedCounts?.totalElements ?? 0;
  const totalCount = allCounts?.totalElements ?? openCount + resolvedCount;
  const userName =
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
    profile?.username ||
    session?.user?.name ||
    "អ្នកប្រើប្រាស់";
  const avatarSrc = profile?.avatarUrl || session?.user?.image || undefined;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          សំណួរ ({totalCount})
        </h2>
        <select
          value={sort}
          onChange={(e) => changeSort(e.target.value as SortOption)}
          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-color/30 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
        >
          <option value="newest">ថ្មីបំផុត</option>
          <option value="oldest">ចាស់បំផុត</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="mb-5 flex gap-3">
        <Avatar size="default" className="mt-1 shrink-0">
          {avatarSrc && <AvatarImage src={avatarSrc} alt={userName} />}
          <AvatarFallback>{initialsFromName(userName)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2.5">
          <input
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            placeholder="ចំណងជើងសំណួរ..."
            required
            maxLength={200}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-primary-color focus:bg-white dark:focus:bg-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-primary-color"
          />
          <textarea
            value={draftDescription}
            onChange={(e) => setDraftDescription(e.target.value)}
            placeholder="ពិពណ៌នាលម្អិតអំពីសំណួររបស់អ្នក..."
            required
            rows={3}
            maxLength={5000}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-primary-color focus:bg-white dark:focus:bg-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-primary-color"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setDraftTitle("");
                setDraftDescription("");
              }}
              disabled={posting || (!draftTitle.trim() && !draftDescription.trim())}
              className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              បោះបង់
            </button>
            <button
              type="submit"
              disabled={posting || !draftTitle.trim() || !draftDescription.trim()}
              className="shrink-0 rounded-full bg-primary-color px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-color/90 disabled:opacity-50"
            >
              {posting ? "កំពុងផ្ញើ..." : "សួរសំណួរ"}
            </button>
          </div>
        </div>
      </form>

      <div className="mb-5 flex items-center gap-5 border-b border-slate-100 dark:border-slate-800/60">
        {TABS.map(({ key, label }) => {
          const count = key === "open" ? openCount : key === "resolved" ? resolvedCount : null;
          const active = tab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => changeTab(key)}
              className={`flex items-center gap-1.5 border-b-2 pb-2.5 text-sm font-medium transition-colors ${
                active
                  ? "border-primary-color text-primary-color dark:border-primary-color dark:text-primary-color"
                  : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              {label}
              {count !== null && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${
                    active
                      ? "bg-primary-color/10 text-primary-color dark:bg-primary-color/20 dark:text-primary-color"
                      : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 py-8 text-sm text-slate-400">
          <Loader2 className="h-4 w-4 animate-spin" /> កំពុងផ្ទុកសំណួរ...
        </div>
      ) : isError ? (
        <p className="py-8 text-center text-sm text-red-500 dark:text-red-400">
          {getApiErrorMessage(error, "មិនអាចផ្ទុកសំណួរបានទេ។ សូមចូលគណនីជាមុនសិន។")}
        </p>
      ) : questions.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400 dark:text-slate-500">
          មិនទាន់មានសំណួរសម្រាប់វីដេអូនេះទេ។ សួរសំណួរដំបូងរបស់អ្នក!
        </p>
      ) : (
        <div className="space-y-3">
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      )}

      {data && data.totalPages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={data.first || isFetching}
            className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> មុន
          </button>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            ទំព័រ {page + 1} នៃ {data.totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            disabled={data.last || isFetching}
            className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300"
          >
            បន្ទាប់ <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
