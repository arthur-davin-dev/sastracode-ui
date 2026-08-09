"use client";

import Link from "next/link";
import { useListTutorialsQuery } from "@/redux/api/tutorial-api";

export default function TutorialGrid() {
  const { data, isLoading, isFetching, error, refetch } = useListTutorialsQuery({ status: "PUBLISHED", page: 0, size: 12, sort: "publishedAt,desc" });

  if (isLoading) return <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading tutorials">{Array.from({ length: 6 }, (_, i) => <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />)}</div>;
  if (error) return <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"><p>Unable to load tutorials right now.</p><button className="mt-3 font-semibold underline" type="button" onClick={() => refetch()}>Try again</button></div>;

  const tutorials = data?.data?.content ?? [];
  if (!tutorials.length) return <p className="rounded-2xl bg-white p-8 text-center text-slate-500 dark:bg-slate-900">No published tutorials yet.</p>;

  return <section className="space-y-6" aria-busy={isFetching}>
    <div className="flex items-center justify-between"><h2 className="font-khmer text-2xl font-bold text-[#002455] dark:text-blue-300">Tutorials</h2><span className="text-sm text-slate-500">{data?.data?.totalElements ?? tutorials.length} available</span></div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{tutorials.map((tutorial) => <article key={tutorial.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <span className="mb-3 w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">{tutorial.level}</span>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tutorial.title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{tutorial.summary || "Open this tutorial to start learning."}</p>
      <Link className="mt-6 rounded-xl bg-[#002455] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-900 dark:bg-blue-600" href={`/documentation/lessons/${tutorial.id}`}>Read tutorial</Link>
    </article>)}</div>
  </section>;
}
