"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { AnswerCard } from "./AnswerCard";
import {
  useCreateAnswerMutation,
  useGetAnswersQuery,
} from "@/redux/api/qa-api";
import { getApiErrorMessage } from "@/lib/qa/qa-utils";
import { ANSWER_PAGE_SIZE as PAGE_STEP } from "@/lib/qa/qa-constants";

interface AnswerThreadProps {
  questionId: string;
  /** True only when the viewer owns the question and it is still open, so
   *  an answer may legally be accepted. */
  canAcceptAnswers?: boolean;
}

export function AnswerThread({
  questionId,
  canAcceptAnswers = false,
}: AnswerThreadProps) {
  const [size, setSize] = useState(PAGE_STEP);
  const [draft, setDraft] = useState("");

  const { data, isLoading, isFetching, isError, error } = useGetAnswersQuery({
    questionId,
    sort: "newest",
    page: 0,
    size,
  });
  const [createAnswer, { isLoading: posting }] = useCreateAnswerMutation();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const content = draft.trim();
    if (!content) return;

    try {
      await createAnswer({ questionId, content }).unwrap();
      setDraft("");
      toast.success("បានផ្ញើចម្លើយរបស់អ្នក");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "មិនអាចផ្ញើចម្លើយបានទេ"));
    }
  }

  const answers = data?.content ?? [];
  const hasMore = data ? size < data.totalElements : false;

  return (
    <div className="mt-3 space-y-3 border-t border-slate-100 pt-3 dark:border-slate-800/60">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
        ចម្លើយ ({data?.totalElements ?? 0})
      </p>

      {isLoading ? (
        <div className="flex items-center gap-2 py-3 text-xs text-slate-400">
          <Loader2 className="h-3.5 w-3.5 animate-spin" /> កំពុងផ្ទុកចម្លើយ...
        </div>
      ) : isError ? (
        <p className="py-2 text-xs text-red-500 dark:text-red-400">
          {getApiErrorMessage(error, "មិនអាចផ្ទុកចម្លើយបានទេ")}
        </p>
      ) : answers.length === 0 ? (
        <p className="py-2 text-xs text-slate-400 dark:text-slate-500">
          មិនទាន់មានចម្លើយសម្រាប់សំណួរនេះនៅឡើយទេ។
          សូមចូលរួមចែករំលែកចម្លើយរបស់អ្នក។
        </p>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {answers.map((answer) => (
            <AnswerCard
              key={answer.answerId}
              answer={answer}
              questionId={questionId}
              canAcceptAnswers={canAcceptAnswers}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <button
          type="button"
          onClick={() => setSize((v) => v + PAGE_STEP)}
          disabled={isFetching}
          className="text-xs font-medium text-primary-color hover:underline disabled:opacity-50 dark:text-primary-color"
        >
          {isFetching ? "កំពុងផ្ទុក..." : "មើលចម្លើយបន្ថែម"}
        </button>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-row items-center gap-2 pt-1"
      >
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="សរសេរចម្លើយរបស់អ្នក..."
          rows={2}
          maxLength={5000}
          className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-primary-color focus:bg-white dark:focus:bg-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-primary-color"
        />
        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            type="submit"
            disabled={posting || !draft.trim()}
            className="rounded-lg bg-primary-color px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-primary-color/90 disabled:opacity-50"
          >
            ឆ្លើយ
          </button>
          <button
            type="button"
            onClick={() => setDraft("")}
            disabled={posting || !draft.trim()}
            className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            បោះបង់
          </button>
        </div>
      </form>
    </div>
  );
}
