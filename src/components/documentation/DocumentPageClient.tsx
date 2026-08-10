"use client";

import {
  useGetTutorialDocumentQuery,
  type DocumentBlock,
} from "@/redux/api/tutorial-api";
import { AlertCircle, BookOpen, LoaderCircle } from "lucide-react";
import { signIn } from "next-auth/react";

interface DocumentPageClientProps {
  tutorialId: string;
}

function renderBlockData(data: Record<string, unknown>) {
  const heading = data.title ?? data.heading ?? data.question;
  const text = data.content ?? data.text ?? data.description ?? data.explanation;
  const code = data.code;

  return (
    <div className="space-y-3">
      {typeof heading === "string" && <h4 className="text-xl font-semibold text-slate-900 dark:text-white">{heading}</h4>}
      {typeof text === "string" && <p className="whitespace-pre-wrap leading-7 text-slate-700 dark:text-slate-300">{text}</p>}
      {typeof code === "string" && <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-100"><code>{code}</code></pre>}
      {heading === undefined && text === undefined && code === undefined && (
        <pre className="overflow-x-auto rounded-xl bg-slate-100 p-4 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-300">{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}

function BlockList({ blocks }: { blocks: DocumentBlock[] }) {
  return (
    <div className="space-y-5">
      {[...blocks].sort((a, b) => a.orderIndex - b.orderIndex).map((block) => (
        <article key={block.id} data-block-type={block.type} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {renderBlockData(block.data)}
        </article>
      ))}
    </div>
  );
}

export default function DocumentPageClient({ tutorialId }: DocumentPageClientProps) {
  const { data: response, error, isLoading, isFetching, refetch } =
    useGetTutorialDocumentQuery(tutorialId, { skip: !tutorialId });

  if (isLoading) {
    return <div className="flex min-h-[60vh] items-center justify-center gap-3 text-slate-600 dark:text-slate-300"><LoaderCircle className="size-6 animate-spin" /><span>Loading document…</span></div>;
  }

  if (error) {
    const status = "status" in error ? error.status : "FETCH_ERROR";
    const isUnauthorized = status === 401;
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <AlertCircle className="mb-4 size-10 text-red-500" />
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">{isUnauthorized ? "Sign in to read this document" : "Unable to load document"}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{isUnauthorized ? "This tutorial document requires an authenticated account." : `Request failed with status ${String(status)}. Confirm that the tutorial exists and try again.`}</p>
        <button
          type="button"
          onClick={() => isUnauthorized ? signIn("keycloak", { redirectTo: window.location.href }) : refetch()}
          className="mt-5 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          {isUnauthorized ? "Sign in to continue" : "Try again"}
        </button>
      </div>
    );
  }

  const document = response?.data;
  const sections = [...(document?.sections ?? [])].sort((a, b) => a.orderIndex - b.orderIndex);

  if (!document || sections.length === 0) {
    return <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center text-slate-600 dark:text-slate-300"><BookOpen className="mb-4 size-10" /><h1 className="text-xl font-semibold text-slate-900 dark:text-white">This document is empty</h1><p className="mt-2">No sections have been published yet.</p></div>;
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {isFetching && <p className="mb-4 text-sm text-slate-500">Refreshing…</p>}
      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="mb-5 border-b border-slate-200 pb-3 text-2xl font-bold text-slate-950 dark:border-slate-800 dark:text-white">{section.title}</h2>
            <div className="space-y-8">
              <BlockList blocks={section.blocks ?? []} />
              {[...(section.subsections ?? [])].sort((a, b) => a.orderIndex - b.orderIndex).map((subsection) => (
                <section key={subsection.id} id={subsection.id} className="scroll-mt-24 space-y-4 border-l-2 border-blue-200 pl-5 dark:border-blue-900">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{subsection.title}</h3>
                  <BlockList blocks={subsection.blocks ?? []} />
                </section>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
