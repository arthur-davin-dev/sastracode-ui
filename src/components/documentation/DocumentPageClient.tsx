"use client";

import { useGetTutorialDocumentQuery } from "@/redux/api/tutorial-api";
import { AlertCircle, BookOpen, LoaderCircle } from "lucide-react";

interface DocumentPageClientProps {
  tutorialId: string;
}

function renderBlockData(data: Record<string, unknown>) {
  const heading = data.title ?? data.heading ?? data.question;
  const text = data.content ?? data.text ?? data.description ?? data.explanation;
  const code = data.code;

  return (
    <div className="space-y-3">
      {typeof heading === "string" && (
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{heading}</h3>
      )}
      {typeof text === "string" && (
        <p className="whitespace-pre-wrap leading-7 text-slate-700 dark:text-slate-300">{text}</p>
      )}
      {typeof code === "string" && (
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-100">
          <code>{code}</code>
        </pre>
      )}
      {heading === undefined && text === undefined && code === undefined && (
        <pre className="overflow-x-auto rounded-xl bg-slate-100 p-4 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-300">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default function DocumentPageClient({ tutorialId }: DocumentPageClientProps) {
  const { data: response, error, isLoading, isFetching, refetch } =
    useGetTutorialDocumentQuery(tutorialId, { skip: !tutorialId });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-3 text-slate-600 dark:text-slate-300">
        <LoaderCircle className="size-6 animate-spin" />
        <span>Loading document…</span>
      </div>
    );
  }

  if (error) {
    const status = "status" in error ? error.status : "FETCH_ERROR";

    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <AlertCircle className="mb-4 size-10 text-red-500" />
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Unable to load document</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Request failed with status {String(status)}. Sign in and confirm that the URL contains a tutorial UUID.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-5 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    );
  }

  const document = response?.data;
  const sections = [...(document?.sections ?? [])].sort((a, b) => a.orderIndex - b.orderIndex);

  if (!document || sections.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center text-slate-600 dark:text-slate-300">
        <BookOpen className="mb-4 size-10" />
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">This document is empty</h1>
        <p className="mt-2">No sections have been published yet.</p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {isFetching && <p className="mb-4 text-sm text-slate-500">Refreshing…</p>}
      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="mb-5 border-b border-slate-200 pb-3 text-2xl font-bold text-slate-950 dark:border-slate-800 dark:text-white">
              {section.title}
            </h2>
            <div className="space-y-5">
              {[...section.blocks]
                .sort((a, b) => a.orderIndex - b.orderIndex)
                .map((block) => (
                  <article
                    key={block.id}
                    data-block-type={block.type}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    {renderBlockData(block.data)}
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
