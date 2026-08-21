"use client";

import { motion } from "framer-motion";

interface LeaderboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function LeaderboardTabs({ activeTab, onTabChange }: LeaderboardTabsProps) {
  const tabs = [
    { id: "GLOBAL", label: "សកល (Global)" },
    { id: "DAILY", label: "ប្រចាំថ្ងៃ (Daily)" },
    { id: "WEEKLY", label: "ប្រចាំសប្តាហ៍ (Weekly)" },
    { id: "MONTHLY", label: "ប្រចាំខែ (Monthly)" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-colors duration-200 select-none flex-1 sm:flex-none text-center
              ${
                isActive
                  ? "text-white dark:text-slate-950"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }
            `}
          >
            {/* Smooth Pill Background Indicator */}
            {isActive && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-primary-color rounded-xl shadow-xs"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            <span className="relative z-10">{tab.label}</span>

            {/* Active Ping Dot */}
            {isActive && (
              <span className="absolute top-1.5 right-1.5 z-10 h-2 w-2 rounded-full bg-red-600" />
            )}
          </button>
        );
      })}
    </div>
  );
}
