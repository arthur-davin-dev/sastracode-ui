import Link from "next/link";
import { trackTabs, trackTocGroups } from "@/lib/data/lessions";
import { TrackSlug } from "@/types/course";

export default function DocsSidebar({
  activeTrack,
  activeLessonId,
}: {
  activeTrack: TrackSlug;
  activeLessonId: string;
}) {
  const groups = trackTocGroups[activeTrack];

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-200 p-4 hidden md:block">
      <div className="flex gap-2 mb-4 flex-wrap">
        {trackTabs.map((tab) => (
          <Link
            key={tab.slug}
            href={tab.href}
            className="text-xs px-2 py-1"
            style={{
              background: tab.slug === activeTrack ? "#002455" : "#EEF1F5",
              color: tab.slug === activeTrack ? "white" : "#555",
              borderRadius: 16,
            }}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      <nav className="space-y-4">
        {groups.map((group) => (
          <div key={group.id}>
            <div className="px-3 text-xs text-gray-400 mb-1">{group.label}</div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = item.id === activeLessonId;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="block px-3 py-2 text-sm"
                    style={{
                      background: active ? "#002455" : "transparent",
                      color: active ? "white" : "#333",
                      borderRadius: 16,
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
