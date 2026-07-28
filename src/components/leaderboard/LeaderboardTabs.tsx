"use client";

interface LeaderboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function LeaderboardTabs({ activeTab, onTabChange }: LeaderboardTabsProps) {
  const tabs = ["Global", "Daily", "Weekly", "Course"];

  return (
    <div className="flex gap-2">
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-1.5 text-sm rounded-full border transition-colors duration-300 ${
            activeTab === tab
              ? "bg-yellow-400 border-yellow-400 text-slate-950 font-semibold"
              : "border-input text-muted-foreground hover:bg-muted dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}