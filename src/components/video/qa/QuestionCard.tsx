"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, MessageCircle, MoreHorizontal, Pencil } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnswerThread } from "./AnswerThread";
import { VoteButton } from "./VoteButton";
import {
  useGetAnswersQuery,
  useResolveQuestionMutation,
  useRetractQuestionVoteMutation,
  useUpdateQuestionMutation,
  useVoteQuestionMutation,
} from "@/redux/api/qa-api";
import {
  formatRelativeTime,
  getApiErrorMessage,
  initialsFromName,
  resolveAvatarUrl,
} from "@/lib/qa/qa-utils";
import { useQaPermissions } from "@/lib/qa/use-qa-permissions";
import type { QuestionResponse } from "@/types/api/qa";

interface QuestionCardProps {
  question: QuestionResponse;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(question.title ?? "");
  const [draftContent, setDraftContent] = useState(question.content ?? "");

  const { isQuestionOwner } = useQaPermissions();
  const owner = isQuestionOwner(question);

  const [resolveQuestion, { isLoading: resolving }] = useResolveQuestionMutation();
  const [updateQuestion, { isLoading: saving }] = useUpdateQuestionMutation();
  const [voteQuestion] = useVoteQuestionMutation();
  const [retractQuestionVote] = useRetractQuestionVoteMutation();
  const { data: answerMeta } = useGetAnswersQuery({
    questionId: question.id,
    sort: "newest",
    page: 0,
    size: 1,
  });
  const answerCount = answerMeta?.totalElements ?? 0;

  async function handleResolveToggle() {
    setMenuOpen(false);
    try {
      await resolveQuestion(question.id).unwrap();
      toast.success(
        question.isResolved ? "សំណួរនេះត្រូវបានបើកឡើងវិញ" : "សំណួរនេះត្រូវបានដោះស្រាយ",
      );
    } catch (error) {
      toast.error(getApiErrorMessage(error, "មិនអាចធ្វើបច្ចុប្បន្នភាពសំណួរបានទេ"));
    }
  }

  async function handleSaveEdit() {
    if (!draftTitle.trim() || !draftContent.trim()) return;
    try {
      await updateQuestion({
        questionId: question.id,
        title: draftTitle.trim(),
        content: draftContent.trim(),
      }).unwrap();
      setEditing(false);
      toast.success("បានកែប្រែសំណួរ");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "មិនអាចកែប្រែសំណួរបានទេ"));
    }
  }

  const avatarUrl = resolveAvatarUrl(question.user?.avatarFileId);
  const userName = question.user?.userName ?? "អ្នកប្រើប្រាស់";

  return (
    <div className="relative rounded-xl border border-slate-200/80 p-4 transition-colors dark:border-slate-800">
      <div className="min-w-0 flex-1">
        {editing ? (
          <div className="space-y-2 pr-6">
            <input
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              placeholder="ចំណងជើងសំណួរ..."
              required
              maxLength={200}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-primary-color focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <textarea
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              placeholder="ពិពណ៌នាលម្អិតអំពីសំណួររបស់អ្នក..."
              required
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
                  setDraftTitle(question.title ?? "");
                  setDraftContent(question.content ?? "");
                }}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                បោះបង់
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2 pr-6">
              <h3 className="text-[15px] font-semibold text-slate-900 dark:text-slate-100">
                {question.title}
              </h3>
              {question.isResolved ? (
                <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> បានដោះស្រាយ
                </span>
              ) : (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  មិនទាន់ដោះស្រាយ
                </span>
              )}
            </div>
            <p className="mt-1 text-sm whitespace-pre-wrap text-slate-500 dark:text-slate-400">
              {question.content}
            </p>
          </>
        )}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Avatar size="sm" className="shrink-0">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={userName} />}
              <AvatarFallback>{initialsFromName(userName)}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {userName}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              · {formatRelativeTime(question.createdAt)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <VoteButton
              count={question.upvoteCount ?? 0}
              onVote={() => voteQuestion(question.id).unwrap()}
              onRetractVote={() => retractQuestionVote(question.id).unwrap()}
            />
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-medium text-primary-color transition-colors hover:opacity-80 dark:text-primary-color"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              {expanded
                ? "លាក់ចម្លើយ"
                : answerCount === 0
                  ? "មិនទាន់មានចម្លើយ"
                  : `${answerCount} ចម្លើយ`}
            </button>
          </div>
        </div>

        {expanded && (
          <AnswerThread
            questionId={question.id}
            canAcceptAnswers={owner && !question.isResolved}
          />
        )}
      </div>

      {owner && (
        <div className="absolute top-3 right-3">
          <button
            type="button"
            aria-label="ជម្រើសបន្ថែម"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded p-1 text-slate-400 transition-colors hover:text-primary-color dark:hover:text-primary-color"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 z-20 mt-1 w-48 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                <button
                  type="button"
                  onClick={handleResolveToggle}
                  disabled={resolving}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {question.isResolved ? "បើកសំណួរឡើងវិញ" : "សម្គាល់ថាបានដោះស្រាយ"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(true);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Pencil className="h-3.5 w-3.5" /> កែប្រែសំណួរ
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
