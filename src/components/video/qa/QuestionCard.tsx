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
import { useTranslation } from "@/hooks/useTranslations";
import { qaField } from "./qa-field-styles";
import type { QuestionResponse } from "@/types/api/qa";

/** Stable DOM id used to scroll a question into view from a `?question=` deep link. */
export function questionAnchorId(questionId: string) {
  return `qa-question-${questionId}`;
}

interface QuestionCardProps {
  question: QuestionResponse;
  /**
   * Opened from a notification deep link: expand the answer thread by default
   * (the viewer can still collapse it). No effect on normal navigation, and
   * no visual change to the card itself.
   */
  autoExpand?: boolean;
}

export function QuestionCard({
  question,
  autoExpand = false,
}: QuestionCardProps) {
  const t = useTranslation();
  const qa = t.qa;
  // `manualExpanded` is the viewer's own toggle; `autoCollapsed` lets them close
  // a deep-link auto-expanded thread. Deriving `expanded` (instead of syncing it
  // in an effect) keeps the auto-expand race-free with async question loading.
  const [manualExpanded, setManualExpanded] = useState(false);
  const [autoCollapsed, setAutoCollapsed] = useState(false);
  const expanded = manualExpanded || (autoExpand && !autoCollapsed);

  const toggleExpanded = () => {
    if (expanded) {
      setManualExpanded(false);
      setAutoCollapsed(true);
    } else {
      setManualExpanded(true);
      setAutoCollapsed(false);
    }
  };
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
        question.isResolved ? qa.questionReopened : qa.questionResolved,
      );
    } catch (error) {
      toast.error(getApiErrorMessage(error, qa.questionUpdateError));
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
      toast.success(qa.questionUpdated);
    } catch (error) {
      toast.error(getApiErrorMessage(error, qa.questionUpdateError));
    }
  }

  const avatarUrl = resolveAvatarUrl(question.user?.avatarFileId);
  const userName = question.user?.userName ?? qa.defaultUser;

  return (
    <div
      id={questionAnchorId(question.id)}
      className="relative scroll-mt-24 rounded-xl border border-slate-200/80 p-4 dark:border-slate-800"
    >
      <div className="min-w-0 flex-1">
        {editing ? (
          <div className="space-y-2 pr-6">
            <input
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              placeholder={qa.titlePlaceholder}
              required
              maxLength={200}
              className={`${qaField} font-semibold`}
            />
            <textarea
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              placeholder={qa.descriptionPlaceholder}
              required
              rows={3}
              maxLength={5000}
              className={`${qaField} resize-none`}
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={saving}
                className="rounded-lg bg-primary-color px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-color/90 disabled:opacity-50"
              >
                {qa.save}
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
                {qa.cancel}
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
                  <CheckCircle2 className="h-3 w-3" /> {qa.resolvedBadge}
                </span>
              ) : (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  {qa.unresolvedBadge}
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
              · {formatRelativeTime(question.createdAt, qa.time)}
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
              onClick={toggleExpanded}
              className="flex items-center gap-1.5 text-xs font-medium text-primary-color transition-colors hover:opacity-80 dark:text-primary-color"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              {expanded
                ? qa.hideAnswers
                : answerCount === 0
                  ? qa.noAnswersYet
                  : `${answerCount} ${qa.answersUnit}`}
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
            aria-label={qa.moreOptions}
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
                  {question.isResolved ? qa.reopenQuestion : qa.markResolved}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(true);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Pencil className="h-3.5 w-3.5" /> {qa.editQuestion}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
