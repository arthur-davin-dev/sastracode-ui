'use client';

import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  Circle,
  GripVertical,
  Plus,
  Trash2,
} from 'lucide-react';

// Generate a unique ID for React keys
const createId = () => {
  if (
    typeof globalThis.crypto !== 'undefined' &&
    typeof globalThis.crypto.randomUUID === 'function'
  ) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
};

// Create default options for a new question
const createDefaultOptions = () => [
  {
    id: createId(),
    value: 'Option 1',
  },
  {
    id: createId(),
    value: 'Option 2',
  },
  {
    id: createId(),
    value: 'Option 3',
  },
  {
    id: createId(),
    value: 'Option 4',
  },
];

// Initial quiz data
const initialData = {
  blocks: [
    {
      id: 'quiz-block-1',
      type: 'QUIZ',
      position: 0,
      data: {
        question: 'Question one',
        options: [
          {
            id: 'quiz-block-1-option-1',
            value: 'A',
          },
          {
            id: 'quiz-block-1-option-2',
            value: 'B',
          },
          {
            id: 'quiz-block-1-option-3',
            value: 'C',
          },
          {
            id: 'quiz-block-1-option-4',
            value: 'D',
          },
        ],
        correctAnswerIndex: 0,
      },
    },
    {
      id: 'quiz-block-2',
      type: 'QUIZ',
      position: 1,
      data: {
        question: 'Question two',
        options: [
          {
            id: 'quiz-block-2-option-1',
            value: 'A',
          },
          {
            id: 'quiz-block-2-option-2',
            value: 'B',
          },
          {
            id: 'quiz-block-2-option-3',
            value: 'C',
          },
          {
            id: 'quiz-block-2-option-4',
            value: 'D',
          },
        ],
        correctAnswerIndex: 2,
      },
    },
  ],
};

export default function QuizBlockEditor() {
  const [payload, setPayload] = useState(initialData);

  // Update one block without directly changing state
  const updateBlock = (blockId, updateFunction) => {
    setPayload((currentPayload) => ({
      ...currentPayload,
      blocks: currentPayload.blocks.map((block) =>
        block.id === blockId
          ? updateFunction(block)
          : block,
      ),
    }));
  };

  // Change question
  const handleQuestionChange = (
    blockId,
    question,
  ) => {
    updateBlock(blockId, (block) => ({
      ...block,
      data: {
        ...block.data,
        question,
      },
    }));
  };

  // Change option text
  const handleOptionChange = (
    blockId,
    optionId,
    value,
  ) => {
    updateBlock(blockId, (block) => ({
      ...block,
      data: {
        ...block.data,
        options: block.data.options.map((option) =>
          option.id === optionId
            ? {
                ...option,
                value,
              }
            : option,
        ),
      },
    }));
  };

  // Select correct answer
  const handleSetCorrectAnswer = (
    blockId,
    optionId,
  ) => {
    updateBlock(blockId, (block) => {
      const optionIndex =
        block.data.options.findIndex(
          (option) => option.id === optionId,
        );

      if (optionIndex === -1) {
        return block;
      }

      return {
        ...block,
        data: {
          ...block.data,
          correctAnswerIndex: optionIndex,
        },
      };
    });
  };

  // Add option
  const handleAddOption = (blockId) => {
    updateBlock(blockId, (block) => {
      const optionNumber =
        block.data.options.length + 1;

      const newOption = {
        id: createId(),
        value: `Option ${optionNumber}`,
      };

      return {
        ...block,
        data: {
          ...block.data,
          options: [
            ...block.data.options,
            newOption,
          ],
        },
      };
    });
  };

  // Remove option
  const handleRemoveOption = (
    blockId,
    optionId,
  ) => {
    updateBlock(blockId, (block) => {
      // Keep at least two options
      if (block.data.options.length <= 2) {
        return block;
      }

      const removedOptionIndex =
        block.data.options.findIndex(
          (option) => option.id === optionId,
        );

      if (removedOptionIndex === -1) {
        return block;
      }

      const updatedOptions =
        block.data.options.filter(
          (option) => option.id !== optionId,
        );

      let correctAnswerIndex =
        block.data.correctAnswerIndex;

      // Reset when the correct option is removed
      if (
        removedOptionIndex ===
        block.data.correctAnswerIndex
      ) {
        correctAnswerIndex = 0;
      }

      // Move the index left when an earlier option is removed
      if (
        removedOptionIndex <
        block.data.correctAnswerIndex
      ) {
        correctAnswerIndex -= 1;
      }

      return {
        ...block,
        data: {
          ...block.data,
          options: updatedOptions,
          correctAnswerIndex,
        },
      };
    });
  };

  // Add question block
  const handleAddBlock = () => {
    setPayload((currentPayload) => {
      const newBlock = {
        id: createId(),
        type: 'QUIZ',
        position: currentPayload.blocks.length,
        data: {
          question: '',
          options: createDefaultOptions(),
          correctAnswerIndex: 0,
        },
      };

      return {
        ...currentPayload,
        blocks: [
          ...currentPayload.blocks,
          newBlock,
        ],
      };
    });
  };

  // Remove question block
  const handleRemoveBlock = (blockId) => {
    setPayload((currentPayload) => {
      const updatedBlocks =
        currentPayload.blocks
          .filter(
            (block) => block.id !== blockId,
          )
          .map((block, index) => ({
            ...block,
            position: index,
          }));

      return {
        ...currentPayload,
        blocks: updatedBlocks,
      };
    });
  };

  // Create the exact JSON structure for your backend
  const apiPayload = useMemo(() => {
    return {
      blocks: payload.blocks.map(
        (block, blockIndex) => ({
          type: block.type,
          position: blockIndex,
          data: {
            question: block.data.question.trim(),
            options: block.data.options.map(
              (option) => option.value.trim(),
            ),
            correctAnswerIndex:
              block.data.correctAnswerIndex,
          },
        }),
      ),
    };
  }, [payload]);

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Quiz Builder
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Configure your quiz questions and
              answers
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddBlock}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
            Add Question Block
          </button>
        </header>

        {/* Empty State */}
        {payload.blocks.length === 0 && (
          <section className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="font-semibold text-slate-800">
              No questions added
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add your first quiz question to begin.
            </p>

            <button
              type="button"
              onClick={handleAddBlock}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Add First Question
            </button>
          </section>
        )}

        {/* Question List */}
        <section className="space-y-6">
          {payload.blocks.map(
            (block, blockIndex) => {
              return (
                <article
                  key={block.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
                >
                  {/* Question Header */}
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-5 w-5 text-slate-400" />

                      <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700">
                        Question #{blockIndex + 1}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveBlock(block.id)
                      }
                      title="Delete question"
                      aria-label={`Delete question ${
                        blockIndex + 1
                      }`}
                      className="rounded-md p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Question Input */}
                  <div className="mb-6">
                    <label
                      htmlFor={`question-${block.id}`}
                      className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-600"
                    >
                      Question Title
                    </label>

                    <input
                      id={`question-${block.id}`}
                      type="text"
                      value={block.data.question}
                      onChange={(event) =>
                        handleQuestionChange(
                          block.id,
                          event.target.value,
                        )
                      }
                      placeholder="Enter your question here..."
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-600">
                      Options &amp; Correct Answer
                    </p>

                    {block.data.options.map(
                      (option, optionIndex) => {
                        const isCorrect =
                          block.data
                            .correctAnswerIndex ===
                          optionIndex;

                        return (
                          <div
                            key={option.id}
                            className="flex items-center gap-3"
                          >
                            {/* Correct Answer Selector */}
                            <button
                              type="button"
                              onClick={() =>
                                handleSetCorrectAnswer(
                                  block.id,
                                  option.id,
                                )
                              }
                              title={
                                isCorrect
                                  ? 'Correct answer'
                                  : 'Mark as correct'
                              }
                              aria-label={`Mark option ${
                                optionIndex + 1
                              } as correct`}
                              className={`shrink-0 transition-colors ${
                                isCorrect
                                  ? 'text-emerald-500'
                                  : 'text-slate-300 hover:text-slate-400'
                              }`}
                            >
                              {isCorrect ? (
                                <CheckCircle2 className="h-6 w-6 fill-emerald-50 text-emerald-500" />
                              ) : (
                                <Circle className="h-6 w-6" />
                              )}
                            </button>

                            {/* Option Input */}
                            <input
                              type="text"
                              value={option.value}
                              onChange={(event) =>
                                handleOptionChange(
                                  block.id,
                                  option.id,
                                  event.target.value,
                                )
                              }
                              placeholder={`Option ${
                                optionIndex + 1
                              }`}
                              className={`min-w-0 flex-1 rounded-lg border px-3.5 py-2 text-sm focus:outline-none focus:ring-2 ${
                                isCorrect
                                  ? 'border-emerald-200 bg-emerald-50/50 text-emerald-950 focus:border-emerald-500 focus:ring-emerald-500/20'
                                  : 'border-slate-200 bg-white text-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                              }`}
                            />

                            {/* Remove Option */}
                            {block.data.options.length >
                              2 && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveOption(
                                    block.id,
                                    option.id,
                                  )
                                }
                                title="Remove option"
                                aria-label={`Remove option ${
                                  optionIndex + 1
                                }`}
                                className="rounded-md p-1.5 text-slate-300 transition-colors hover:bg-rose-50 hover:text-rose-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        );
                      },
                    )}

                    {/* Add Option */}
                    <button
                      type="button"
                      onClick={() =>
                        handleAddOption(block.id)
                      }
                      className="mt-2 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Option
                    </button>
                  </div>
                </article>
              );
            },
          )}
        </section>

        {/* JSON Output */}
        <section className="border-t border-slate-200 pt-6">
          <h2 className="mb-2 text-sm font-semibold text-slate-700">
            Live API JSON Output
          </h2>

          <pre className="max-h-[500px] overflow-auto rounded-xl bg-slate-900 p-4 font-mono text-xs leading-5 text-slate-200">
            {JSON.stringify(apiPayload, null, 2)}
          </pre>
        </section>
      </div>
    </main>
  );
}