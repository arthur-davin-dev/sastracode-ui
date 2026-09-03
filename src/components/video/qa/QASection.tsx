"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuestionCard, questionAnchorId } from "./QuestionCard";
import {
  useCreateQuestionMutation,
  useGetAnswersQuery,
  useGetVideoQuestionsQuery,
} from "@/redux/api/qa-api";
import { useGetMyProfileQuery } from "@/redux/service/profile-api";
import { useVideoQnaSocket } from "@/hooks/useVideoQnaSocket";
import { getApiErrorMessage, initialsFromName } from "@/lib/qa/qa-utils";
import {
  DEEPLINK_LOOKUP_SIZE,
  DEFAULT_ANSWER_QUERY,
  QUESTION_PAGE_SIZE,
} from "@/lib/qa/qa-constants";
import { useTranslation } from "@/hooks/useTranslations";
import { qaField } from "./qa-field-styles";
import type { QuestionSort } from "@/types/api/qa";

type ViewTab = "all" | "open" | "resolved";
type SortOption = Extract<QuestionSort, "newest" | "oldest">;

interface QASectionProps {
  videoId: string;
}

const TAB_KEYS: ViewTab[] = ["all", "open", "resolved"];

export function QASection({ videoId }: QASectionProps) {
  const t = useTranslation();
  const qa = t.qa;
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

  // ---- Notification deep link ------------------------------------------------
  // Reached via /courses/{courseSlug}/learn/{videoId}?question={questionId}
  // (this component's `videoId` prop === the learn route's `lessonId`).
  // Active only while the `question` param is present and the user hasn't
  // navigated away from it; the normal page behaviour is untouched otherwise.
  const searchParams = useSearchParams();
  const deepLinkQuestionId = searchParams.get("question") || null;
  // Set (to the current target id) once the user clicks a tab / pager so they
  // can leave the deep-linked view. A new target id !== this re-activates it.
  const [dismissedDeepLinkId, setDismissedDeepLinkId] = useState<string | null>(
    null,
  );

  // Scan the most recent questions to find which page the target lives on.
  const { data: deepLinkLookup } = useGetVideoQuestionsQuery(
    {
      videoId,
      resolved: undefined,
      sort: "newest",
      page: 0,
      size: DEEPLINK_LOOKUP_SIZE,
    },
    { skip: !deepLinkQuestionId },
  );

  const deepLinkIndex =
    deepLinkQuestionId && deepLinkLookup
      ? deepLinkLookup.content.findIndex((q) => q.id === deepLinkQuestionId)
      : -1;
  // Only "active" once the target is actually located among recent questions.
  // A missing / unknown id just falls back to the normal view — no crash.
  const deepLinkActive =
    deepLinkIndex >= 0 && dismissedDeepLinkId !== deepLinkQuestionId;

  const dismissDeepLink = useCallback(() => {
    setDismissedDeepLinkId(deepLinkQuestionId);
  }, [deepLinkQuestionId]);

  // While the deep link is active it drives the query; otherwise the user's
  // own tab/sort/page selection does.
  const resolved = tab === "open" ? false : tab === "resolved" ? true : undefined;
  const effectiveTab: ViewTab = deepLinkActive ? "all" : tab;
  const effectiveResolved = deepLinkActive ? undefined : resolved;
  const effectiveSort: SortOption = deepLinkActive ? "newest" : sort;
  const effectivePage = deepLinkActive
    ? Math.floor(deepLinkIndex / QUESTION_PAGE_SIZE)
    : page;

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetVideoQuestionsQuery({
    videoId,
    resolved: effectiveResolved,
    sort: effectiveSort,
    page: effectivePage,
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

  // Deep link only: pre-load the target question's first page of answers so the
  // scroll below waits until the auto-expanded thread has real content (and its
  // final height) before centring — not the transient "loading answers" state.
  // Same args as `AnswerThread`, so this shares its cache entry (no extra call).
  const { isLoading: deepLinkAnswersLoading } = useGetAnswersQuery(
    { questionId: deepLinkQuestionId ?? "", ...DEFAULT_ANSWER_QUERY },
    { skip: !deepLinkActive || !deepLinkQuestionId },
  );

  const [createQuestion, { isLoading: posting }] = useCreateQuestionMutation();

  function changeTab(next: ViewTab) {
    dismissDeepLink();
    setTab(next);
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
      toast.success(qa.submitSuccess);
    } catch (err) {
      toast.error(getApiErrorMessage(err, qa.submitError));
    }
  }

  // Stable reference so the scroll effect below only re-runs on real changes.
  const questions = useMemo(() => data?.content ?? [], [data]);

  // Smooth-scroll the deep-linked question to the centre once — after its page
  // has loaded, its card is in the DOM, and its auto-expanded answer thread has
  // real content. Works on a cold navigation/reload, not just an in-place URL
  // change. `scrollIntoView({ behavior: "smooth", block: "center" })` matches
  // the in-video deep-link pattern; the retries re-aim it as avatars, images
  // and the answer list finish settling the layout beneath the target (and
  // outlast the browser's own scroll-restoration on reload). Timers live in a
  // ref so a background socket refetch can't cut the sequence short.
  const scrolledForRef = useRef<string | null>(null);
  const scrollTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scrollFrameRef = useRef(0);

  useEffect(
    () => () => {
      scrollTimersRef.current.forEach(clearTimeout);
      cancelAnimationFrame(scrollFrameRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!deepLinkActive || !deepLinkQuestionId) return;
    if (scrolledForRef.current === deepLinkQuestionId) return;
    if (isLoading || deepLinkAnswersLoading) return;
    if (!questions.some((question) => question.id === deepLinkQuestionId)) return;
    if (!document.getElementById(questionAnchorId(deepLinkQuestionId))) return;

    // Cancel anything still pending for a previous target before re-arming.
    scrollTimersRef.current.forEach(clearTimeout);
    cancelAnimationFrame(scrollFrameRef.current);
    scrolledForRef.current = deepLinkQuestionId;

    const scrollToTarget = () => {
      document
        .getElementById(questionAnchorId(deepLinkQuestionId))
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    scrollFrameRef.current = requestAnimationFrame(() =>
      requestAnimationFrame(scrollToTarget),
    );
    scrollTimersRef.current = [250, 600, 1100, 1800].map((delay) =>
      setTimeout(scrollToTarget, delay),
    );
  }, [
    deepLinkActive,
    deepLinkQuestionId,
    isLoading,
    deepLinkAnswersLoading,
    questions,
  ]);

  const openCount = openCounts?.totalElements ?? 0;
  const resolvedCount = resolvedCounts?.totalElements ?? 0;
  const totalCount = allCounts?.totalElements ?? openCount + resolvedCount;
  const userName =
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
    profile?.username ||
    session?.user?.name ||
    qa.defaultUser;
  const avatarSrc = profile?.avatarUrl || session?.user?.image || undefined;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {qa.heading} ({totalCount})
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-5 flex gap-3">
        <Avatar size="default" className="mt-1 shrink-0">
          {avatarSrc && <AvatarImage src={avatarSrc} alt={userName} />}
          <AvatarFallback>{initialsFromName(userName)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-2.5">
          <input
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            placeholder={qa.titlePlaceholder}
            required
            maxLength={200}
            className={qaField}
          />
          <textarea
            value={draftDescription}
            onChange={(e) => setDraftDescription(e.target.value)}
            placeholder={qa.descriptionPlaceholder}
            required
            rows={3}
            maxLength={5000}
            className={`${qaField} resize-none`}
          />
          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setDraftTitle("");
                setDraftDescription("");
              }}
              disabled={posting || (!draftTitle.trim() && !draftDescription.trim())}
              className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {qa.cancel}
            </button>
            <button
              type="submit"
              disabled={posting || !draftTitle.trim() || !draftDescription.trim()}
              className="shrink-0 rounded-full bg-primary-color px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-color/90 disabled:opacity-50"
            >
              {posting ? qa.submitting : qa.submit}
            </button>
          </div>
        </div>
      </form>

      <div className="mb-5 flex items-center gap-5 border-b border-slate-100 dark:border-slate-800/60">
        {TAB_KEYS.map((key) => {
          const label = qa.tabs[key];
          const count = key === "open" ? openCount : key === "resolved" ? resolvedCount : null;
          const active = effectiveTab === key;
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
          <Loader2 className="h-4 w-4 animate-spin" /> {qa.loading}
        </div>
      ) : isError ? (
        <p className="py-8 text-center text-sm text-red-500 dark:text-red-400">
          {getApiErrorMessage(error, qa.loadError)}
        </p>
      ) : questions.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400 dark:text-slate-500">
          {qa.empty}
        </p>
      ) : (
        <div className="space-y-3">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              autoExpand={deepLinkActive && question.id === deepLinkQuestionId}
            />
          ))}
        </div>
      )}

      {data && data.totalPages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              dismissDeepLink();
              setPage(Math.max(0, effectivePage - 1));
            }}
            disabled={data.first || isFetching}
            className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> {qa.previous}
          </button>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {qa.page} {effectivePage + 1} {qa.pageOf} {data.totalPages}
          </span>
          <button
            type="button"
            onClick={() => {
              dismissDeepLink();
              setPage(effectivePage + 1);
            }}
            disabled={data.last || isFetching}
            className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300"
          >
            {qa.next} <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
