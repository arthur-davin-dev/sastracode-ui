"use client";

interface LeaderboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function LeaderboardTabs({ activeTab, onTabChange }: LeaderboardTabsProps) {
  const tabs = [
    { id: "Global", label: "សកល (Global)" },
    { id: "Daily", label: "ប្រចាំថ្ងៃ (Daily)" },
    { id: "Weekly", label: "ប្រចាំសប្តាហ៍ (Weekly)" },
    { id: "Course", label: "តាមវគ្គសិក្សា (Course)" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 p-1.5 bg-slate-100/80 dark:bg-slate-900/80 border-2 border-slate-200/60 dark:border-slate-800 rounded-3xl shadow-inner">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative px-6 py-3 rounded-2xl text-lg font-bold transition-all duration-300 select-none
              ${
                isActive
                  ? "bg-yellow-400 text-primary-color shadow-md shadow-yellow-400/30 scale-105"
                  : "text-primary-color opacity-80 hover:opacity-100 hover:bg-white dark:hover:bg-slate-800 hover:border-red-500/40 border border-transparent"
              }
            `}
          >
            {tab.label}

            {/* Red active dot indicator */}
            {isActive && (
              <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-600 animate-ping" />
            )}
          </button>
        );
      })}
    </div>
  );
}