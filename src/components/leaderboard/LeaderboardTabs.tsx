"use client";

interface LeaderboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function LeaderboardTabs({ activeTab, onTabChange }: LeaderboardTabsProps) {
  const tabs = ["Global", "Daily", "Weekly", "Course", "Course"];

  return (
    <div className="flex gap-2">
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
            activeTab === tab
              ? "bg-yellow-400 border-yellow-400 text-white font-medium"
              : "border-input text-muted-foreground hover:bg-muted"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}