"use client";

interface NotificationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  counts: { all: number; unread: number };
}

export function NotificationTabs({ activeTab, onTabChange, counts }: NotificationTabsProps) {
  const tabs = [
    { key: "all", label: `ទាំងអស់ (${counts.all})` },
    { key: "unread", label: `មិនទាន់អាន (${counts.unread})` },
    { key: "recent", label: "ថ្មីៗ" },
    { key: "recommendation", label: "ការណែនាំ" },
  ];

  return (
    <div className="flex gap-2 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === tab.key
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}