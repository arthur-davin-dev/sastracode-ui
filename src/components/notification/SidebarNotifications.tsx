"use client";

import Link from "next/link";
import { Bell, ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

import {
  useGetMyNotificationsQuery,
  useGetUnreadNotificationCountQuery,
  useMarkNotificationReadMutation,
} from "@/redux/service/notificationApi";
import { resolveNotificationHref } from "@/lib/notifications/notification-href";

export default function SidebarNotifications({
  collapsed,
  active,
  onNavigate,
}: {
  collapsed: boolean;
  active: boolean;
  onNavigate: () => void;
}) {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const enabled = status === "authenticated";
  const { data: count = 0 } = useGetUnreadNotificationCountQuery(undefined, { skip: !enabled });
  const { data } = useGetMyNotificationsQuery({ isRead: false, size: 3 }, { skip: !enabled || !open });
  const [markRead] = useMarkNotificationReadMutation();

  if (!enabled) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`flex w-full items-center gap-3.5 rounded-2xl px-4 py-3 text-lg font-bold text-primary-color ${active ? "bg-init-color/20" : "hover:bg-slate-100 dark:hover:bg-slate-800"}`}
      >
        <span className="relative shrink-0">
          <Bell size={24} />
          {count > 0 && <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-red-600 px-1 text-center text-[10px] text-white">{count > 99 ? "99+" : count}</span>}
        </span>
        {!collapsed && <><span className="min-w-0 flex-1 truncate text-left">ការរំលឹក</span><ChevronDown size={18} className={open ? "rotate-180" : ""} /></>}
      </button>

      {open && !collapsed && (
        <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-200 pl-3 dark:border-slate-700">
          {!data?.content.length ? (
            <p className="px-3 py-3 text-sm text-slate-500">No new notifications</p>
          ) : data.content.map((item) => (
            <Link
              key={item.notificationReceiverId}
              href={resolveNotificationHref(item)}
              onClick={() => { markRead(item.notificationReceiverId); onNavigate(); }}
              className="block rounded-xl px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <p className="line-clamp-1 text-sm font-bold text-primary-color">{item.title}</p>
              <p className="line-clamp-1 text-xs text-slate-500 dark:text-slate-400">{item.content}</p>
            </Link>
          ))}
          <Link href="/notifications" onClick={onNavigate} className="block px-3 py-2 text-sm font-bold text-primary-color">View all</Link>
        </div>
      )}
    </div>
  );
}
