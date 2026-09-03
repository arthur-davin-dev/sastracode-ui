"use client";

import Link from "next/link";
import { Bell, CheckCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

import {
  useGetMyNotificationsQuery,
  useGetUnreadNotificationCountQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "@/redux/service/notificationApi";
import { resolveNotificationHref } from "@/lib/notifications/notification-href";

export default function Notification() {
  const { status } = useSession();
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [page, setPage] = useState(0);
  const enabled = status === "authenticated";
  const { data, isLoading, isFetching, isError, refetch } =
    useGetMyNotificationsQuery(
      { isRead: filter === "unread" ? false : undefined, page, size: 20 },
      { skip: !enabled },
    );
  const { data: unreadCount = 0 } = useGetUnreadNotificationCountQuery(undefined, {
    skip: !enabled,
  });
  const [markRead] = useMarkNotificationReadMutation();
  const [markAllRead, { isLoading: markingAll }] =
    useMarkAllNotificationsReadMutation();

  if (status === "loading" || isLoading) {
    return <div className="space-y-4 p-6">{[1, 2, 3, 4].map((item) => <div key={item} className="h-32 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />)}</div>;
  }

  if (!enabled) {
    return <div className="m-6 rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-600 dark:border-slate-700 dark:text-slate-300">Please sign in to view your notifications.</div>;
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6">
      <header className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-2xl bg-primary-color/10 p-3 text-primary-color"><Bell className="h-6 w-6" /></span>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-primary-color">Inbox</p>
              <h1 className="text-2xl font-extrabold text-slate-950 dark:text-white">Notifications</h1>
            </div>
          </div>
          <p className="mt-3 text-slate-600 dark:text-slate-300">All announcements and updates delivered by the administration.</p>
        </div>
        <button
          type="button"
          disabled={unreadCount === 0 || markingAll}
          onClick={() => markAllRead()}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-primary-color px-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCheck className="h-5 w-5" /> Mark all as read
        </button>
      </header>

      <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 dark:border-slate-800 dark:bg-slate-900">
        {(["all", "unread"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => { setFilter(tab); setPage(0); }}
            className={`rounded-xl px-4 py-2 text-sm font-bold capitalize ${filter === tab ? "bg-primary-color text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}
          >
            {tab} {tab === "unread" && `(${unreadCount})`}
          </button>
        ))}
      </div>

      {isError ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center dark:border-red-900 dark:bg-red-950/20">
          <p className="font-bold text-red-700 dark:text-red-300">Could not load notifications.</p>
          <button type="button" onClick={() => refetch()} className="mt-4 rounded-xl bg-primary-color px-4 py-2 text-sm font-bold text-white">Try again</button>
        </div>
      ) : !data?.content.length ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-14 text-center dark:border-slate-700 dark:bg-slate-900">
          <Bell className="mx-auto h-10 w-10 text-slate-400" />
          <p className="mt-3 font-bold text-slate-800 dark:text-slate-200">No notifications here.</p>
        </div>
      ) : (
        <div className={`space-y-3 ${isFetching ? "opacity-70" : ""}`} aria-busy={isFetching}>
          {data.content.map((item) => (
            <article key={item.notificationReceiverId} className={`rounded-2xl border bg-white p-5 shadow-sm dark:bg-slate-900 ${item.isRead ? "border-slate-200 dark:border-slate-800" : "border-l-4 border-l-red-500 border-y-slate-200 border-r-slate-200 dark:border-y-slate-800 dark:border-r-slate-800"}`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary-color/10 px-2.5 py-1 text-xs font-bold text-primary-color">{item.type.replaceAll("_", " ")}</span>
                    {!item.isRead && <span className="rounded-full bg-red-100 px-2 py-1 text-[11px] font-bold text-red-700 dark:bg-red-950 dark:text-red-300">New</span>}
                    <time className="text-xs text-slate-500 dark:text-slate-400">{new Date(item.deliveredAt).toLocaleString()}</time>
                  </div>
                  <h2 className="mt-3 text-lg font-bold text-slate-950 dark:text-white">{item.title}</h2>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">{item.content}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {!item.isRead && <button type="button" onClick={() => markRead(item.notificationReceiverId)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-primary-color dark:border-slate-700">Mark read</button>}
                  {item.deepLink && <Link href={resolveNotificationHref(item)} onClick={() => !item.isRead && markRead(item.notificationReceiverId)} className="rounded-lg bg-primary-color px-3 py-2 text-xs font-bold text-white">Open</Link>}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <button type="button" disabled={data.first} onClick={() => setPage((value) => Math.max(0, value - 1))} className="rounded-lg p-2 text-primary-color disabled:opacity-30"><ChevronLeft /></button>
          <span className="text-sm text-slate-600 dark:text-slate-300">Page {data.number + 1} of {data.totalPages}</span>
          <button type="button" disabled={data.last} onClick={() => setPage((value) => value + 1)} className="rounded-lg p-2 text-primary-color disabled:opacity-30"><ChevronRight /></button>
        </div>
      )}
    </div>
  );
}
