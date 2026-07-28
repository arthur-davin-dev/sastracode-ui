"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NotificationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  counts: { all: number; unread: number };
}

export function NotificationTabs({
  activeTab,
  onTabChange,
  counts,
}: NotificationTabsProps) {
  const tabs = [
    { key: "all", label: "ទាំងអស់", count: counts.all },
    { key: "unread", label: "មិនទាន់អាន", count: counts.unread },
    { key: "recent", label: "ថ្មីៗ" },
    { key: "recommendation", label: "ការណែនាំ" },
  ];

  return (
    <div className="relative overflow-x-auto no-scrollbar rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 p-2 border-2 border-slate-200/60 dark:border-slate-800 shadow-sm">
      <div className="flex items-center gap-2 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={cn(
                "relative flex items-center gap-2.5 px-6 py-2 rounded-xl text-lg font-bold transition-all duration-300 select-none",
                isActive
                  ? "text-primary-color shadow-md"
                  : "text-primary-color hover:opacity-100 hover:bg-slate-200/60 dark:hover:bg-slate-700/50"
              )}
            >
              {/* Animated Tab Background for Active State */}
              {isActive && (
                <motion.div
                  layoutId="activeNotificationTab"
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl  "
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Tab Label (text-lg) */}
              <span className="relative z-10">{tab.label}</span>

              {/* Count Badge (Highlighted in Red Secondary / Yellow Accent) */}
              {tab.count !== undefined && (
                <span
                  className={cn(
                    "relative z-10 px-2.5 py-0.5 rounded-full text-lg font-extrabold transition-all duration-300",
                    isActive
                      ? "bg-red-600 text-white shadow-xs"
                      : "bg-yellow-400/20 text-red-600 dark:text-yellow-400  "
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}