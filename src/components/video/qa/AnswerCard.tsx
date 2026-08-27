"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MoreVertical, CheckCircle2, Pencil } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VoteButton } from "./VoteButton";
import {
  useAcceptAnswerMutation,
  useRetractAnswerVoteMutation,
  useUpdateAnswerMutation,
  useVoteAnswerMutation,
} from "@/redux/api/qa-api";
import {
  getApiErrorMessage,
  initialsFromName,
  resolveAvatarUrl,
} from "@/lib/qa/qa-utils";
import { useQaPermissions } from "@/lib/qa/use-qa-permissions";
import type { AnswerResponse } from "@/types/api/qa";

interface AnswerCardProps {
  answer: AnswerResponse;
  questionId: string;
  /** Viewer owns the question and it is still open — an answer may be accepted. */
  canAcceptAnswers?: boolean;
}

export function AnswerCard({ answer, questionId, canAcceptAnswers = false }: AnswerCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(answer.content ?? "");

  const { isAnswerOwner } = useQaPermissions();
  const owner = isAnswerOwner(answer);
  const canAccept = canAcceptAnswers && !answer.isAccepted;
  const showMenu = owner || canAccept;

  const [voteAnswer] = useVoteAnswerMutation();
  const [retractAnswerVote] = useRetractAnswerVoteMutation();
  const [acceptAnswer, { isLoading: accepting }] = useAcceptAnswerMutation();
  const [updateAnswer, { isLoading: saving }] = useUpdateAnswerMutation();

  async function handleAccept() {
    setMenuOpen(false);
    try {
      await acceptAnswer({ answerId: answer.answerId, questionId }).unwrap();
      toast.success("បានទទួលយកចម្លើយនេះជាចម្លើយត្រឹមត្រូវ");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "មិនអាចទទួលយកចម្លើយបានទេ"));
    }
  }

  async function handleSaveEdit() {
    if (!draft.trim()) return;
    try {
      await updateAnswer({
        answerId: answer.answerId,
        questionId,
        content: draft.trim(),
      }).unwrap();
      setEditing(false);
      toast.success("បានកែប្រែចម្លើយ");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "មិនអាចកែប្រែចម្លើយបានទេ"));
    }
  }

  const avatarUrl = resolveAvatarUrl(answer.user?.avatarFileId);
  const userName = answer.user?.userName ?? "អ្នកប្រើប្រាស់";

  return (
    <div className="flex gap-3 rounded-xl p-3">
      <Avatar size="sm" className="shrink-0">
        {avatarUrl && <AvatarImage src={avatarUrl} alt={userName} />}
        <AvatarFallback>{initialsFromName(userName)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {userName}
          </span>
          {answer.isAccepted && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
              <CheckCircle2 className="h-3 w-3" /> ចម្លើយត្រឹមត្រូវ
            </span>
          )}
        </div>

        {editing ? (
          <div className="mt-2 space-y-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={3}
              maxLength={5000}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-primary-color focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={saving}
                className="rounded-lg bg-primary-color px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-color/90 disabled:opacity-50"
              >
                រក្សាទុក
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setDraft(answer.content ?? "");
                }}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                បោះបង់
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-1 text-sm whitespace-pre-wrap text-slate-600 dark:text-slate-300">
            {answer.content}
          </p>
        )}

        <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <VoteButton
            count={answer.upvoteCount ?? 0}
            onVote={() =>
              voteAnswer({ answerId: answer.answerId, questionId }).unwrap()
            }
            onRetractVote={() =>
              retractAnswerVote({ answerId: answer.answerId, questionId }).unwrap()
            }
          />
          {showMenu && (
            <div className="relative">
              <button
                type="button"
                aria-label="ជម្រើសបន្ថែម"
                onClick={() => setMenuOpen((v) => !v)}
                className="rounded p-1 transition-colors hover:text-primary-color dark:hover:text-primary-color"
              >
                <MoreVertical className="h-3.5 w-3.5" />
              </button>
              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute left-0 z-20 mt-1 w-44 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                    {canAccept && (
                      <button
                        type="button"
                        onClick={handleAccept}
                        disabled={accepting}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> ទទួលយកជាចម្លើយ
                      </button>
                    )}
                    {owner && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(true);
                          setMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <Pencil className="h-3.5 w-3.5" /> កែប្រែ
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
