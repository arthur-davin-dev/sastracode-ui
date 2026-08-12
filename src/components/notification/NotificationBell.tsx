// "use client";

// import Link from "next/link";
// import { Bell, CheckCheck } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { useState } from "react";

// import {
//   useGetMyNotificationsQuery,
//   useGetUnreadNotificationCountQuery,
//   useMarkAllNotificationsReadMutation,
//   useMarkNotificationReadMutation,
// } from "@/redux/service/notificationApi";

// function relativeTime(value: string) {
//   const timestamp = new Date(value).getTime();
//   const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
//   if (seconds < 60) return "Just now";
//   if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
//   if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
//   return `${Math.floor(seconds / 86400)}d ago`;
// }

// export default function NotificationBell() {
//   const { status } = useSession();
//   const [open, setOpen] = useState(false);
//   const enabled = status === "authenticated";
//   const { data: unreadCount = 0 } = useGetUnreadNotificationCountQuery(undefined, {
//     skip: !enabled,
//     pollingInterval: 60_000,
//   });
//   const { data, isLoading } = useGetMyNotificationsQuery(
//     { isRead: false, size: 5 },
//     { skip: !enabled },
//   );
//   const [markRead] = useMarkNotificationReadMutation();
//   const [markAllRead, { isLoading: markingAll }] =
//     useMarkAllNotificationsReadMutation();

//   if (!enabled) return null;

//   return (
//     <div className="relative">
//       <button
//         type="button"
//         aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
//         aria-expanded={open}
//         onClick={() => setOpen((value) => !value)}
//         className="relative rounded-2xl border border-slate-200 bg-slate-100 p-3 text-primary-color transition-all hover:bg-yellow-400/20 dark:border-slate-700 dark:bg-slate-800"
//       >
//         <Bell className="h-5 w-5" />
//         {unreadCount > 0 && (
//           <span className="absolute -right-1.5 -top-1.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
//             {unreadCount > 99 ? "99+" : unreadCount}
//           </span>
//         )}
//       </button>

//       {open && (
//         <div className="absolute right-0 top-full z-50 mt-3 w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
//           <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
//             <div>
//               <p className="font-bold text-slate-950 dark:text-white">New notifications</p>
//               <p className="text-xs text-slate-500 dark:text-slate-400">{unreadCount} unread</p>
//             </div>
//             {unreadCount > 0 && (
//               <button
//                 type="button"
//                 disabled={markingAll}
//                 onClick={() => markAllRead()}
//                 className="flex items-center gap-1 text-xs font-semibold text-primary-color disabled:opacity-50"
//               >
//                 <CheckCheck className="h-4 w-4" /> Mark all read
//               </button>
//             )}
//           </div>

//           <div className="max-h-96 overflow-y-auto p-2">
//             {isLoading ? (
//               <div className="space-y-2 p-2">
//                 {[1, 2, 3].map((item) => <div key={item} className="h-20 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />)}
//               </div>
//             ) : !data?.content.length ? (
//               <p className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">You are all caught up.</p>
//             ) : (
//               data.content.map((item) => (
//                 <Link
//                   key={item.notificationReceiverId}
//                   href={item.deepLink || "/notifications"}
//                   onClick={() => {
//                     markRead(item.notificationReceiverId);
//                     setOpen(false);
//                   }}
//                   className="block rounded-xl border-l-4 border-red-500 px-3 py-3 hover:bg-slate-50 dark:hover:bg-slate-800"
//                 >
//                   <div className="flex items-start justify-between gap-3">
//                     <p className="line-clamp-1 text-sm font-bold text-slate-900 dark:text-white">{item.title}</p>
//                     <span className="shrink-0 text-[11px] text-slate-500">{relativeTime(item.deliveredAt)}</span>
//                   </div>
//                   <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600 dark:text-slate-300">{item.content}</p>
//                 </Link>
//               ))
//             )}
//           </div>

//           <Link href="/notifications" onClick={() => setOpen(false)} className="block border-t border-slate-200 p-3 text-center text-sm font-bold text-primary-color hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
//             View all notifications
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { Bell, CheckCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

import {
  useGetMyNotificationsQuery,
  useGetUnreadNotificationCountQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "@/redux/service/notificationApi";

function relativeTime(value: string) {
  const timestamp = new Date(value).getTime();
  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function NotificationBell() {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const enabled = status === "authenticated";
  const { data: unreadCount = 0 } = useGetUnreadNotificationCountQuery(
    undefined,
    {
      skip: !enabled,
      pollingInterval: 60_000,
    },
  );
  const { data, isLoading } = useGetMyNotificationsQuery(
    { isRead: false, size: 5 },
    { skip: !enabled },
  );
  const [markRead] = useMarkNotificationReadMutation();
  const [markAllRead, { isLoading: markingAll }] =
    useMarkAllNotificationsReadMutation();

  if (!enabled) return null;

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="relative rounded-2xl border border-slate-200 bg-slate-100 p-3 text-primary-color transition-all hover:bg-yellow-400/20 dark:border-slate-700 dark:bg-slate-800"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          {/* mobile backdrop so tapping outside closes it */}
          <div
            className="fixed inset-0 z-40 sm:hidden"
            onClick={() => setOpen(false)}
          />

          <div
            className="
              fixed inset-x-3 top-[calc(env(safe-area-inset-top)+4.25rem)] z-50
              max-h-[75vh] overflow-hidden rounded-2xl border border-slate-200
              bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900
              sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3
              sm:w-[24rem] sm:max-h-none
            "
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
              <div>
                <p className="font-bold text-slate-950 dark:text-white">
                  New notifications
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {unreadCount} unread
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  type="button"
                  disabled={markingAll}
                  onClick={() => markAllRead()}
                  className="flex shrink-0 items-center gap-1 text-xs font-semibold text-primary-color disabled:opacity-50"
                >
                  <CheckCheck className="h-4 w-4" /> Mark all read
                </button>
              )}
            </div>

            <div className="max-h-[calc(75vh-8rem)] overflow-y-auto p-2 sm:max-h-96">
              {isLoading ? (
                <div className="space-y-2 p-2">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-20 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800"
                    />
                  ))}
                </div>
              ) : !data?.content.length ? (
                <p className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  You are all caught up.
                </p>
              ) : (
                data.content.map((item) => (
                  <Link
                    key={item.notificationReceiverId}
                    href={item.deepLink || "/notifications"}
                    onClick={() => {
                      markRead(item.notificationReceiverId);
                      setOpen(false);
                    }}
                    className="block rounded-xl border-l-4 border-red-500 px-3 py-3 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="line-clamp-1 text-sm font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </p>
                      <span className="shrink-0 text-[11px] text-slate-500">
                        {relativeTime(item.deliveredAt)}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
                      {item.content}
                    </p>
                  </Link>
                ))
              )}
            </div>

            <Link
              href="/notifications"
              onClick={() => setOpen(false)}
              className="block border-t border-slate-200 p-3 text-center text-sm font-bold text-primary-color hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
            >
              View all notifications
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
