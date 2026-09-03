"use client";

import { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/qa/qa-utils";
import { useTranslation } from "@/hooks/useTranslations";
import type { VoteResponse } from "@/types/api/qa";

interface VoteButtonProps {
  count: number;
  onVote: () => Promise<VoteResponse>;
  onRetractVote: () => Promise<VoteResponse>;
}

/**
 * Upvote / like control for a single answer.
 *
 * The answers list endpoint does not report whether the current user has
 * already voted, so the initial pressed state is derived from this
 * session's clicks. After every successful call the authoritative vote
 * count and state are taken from the VoteResponse (`score` / `status`),
 * which also prevents duplicate votes from inflating the count. Backend
 * rules remain the source of truth — a rejected vote surfaces as a toast.
 */
export function VoteButton({ count, onVote, onRetractVote }: VoteButtonProps) {
  const qa = useTranslation().qa;
  const [result, setResult] = useState<{ score: number; voted: boolean } | null>(null);
  const [pending, setPending] = useState(false);

  const voted = result?.voted ?? false;
  const displayCount = result?.score ?? count;

  async function handleClick() {
    if (pending) return;
    setPending(true);
    try {
      const response = voted ? await onRetractVote() : await onVote();
      setResult({ score: response.score, voted: response.status });
    } catch (error) {
      toast.error(getApiErrorMessage(error, qa.voteError));
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-pressed={voted}
      aria-label={voted ? qa.retractVoteAria : qa.upvoteAria}
      className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
        voted
          ? "bg-primary-color/10 text-primary-color dark:bg-primary-color/10 dark:text-primary-color"
          : "text-slate-400 hover:text-primary-color dark:text-slate-500 dark:hover:text-primary-color"
      }`}
    >
      <ThumbsUp className={`h-3.5 w-3.5 ${voted ? "fill-current" : ""}`} />
      {displayCount}
    </button>
  );
}
