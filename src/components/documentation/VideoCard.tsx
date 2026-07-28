import { Play } from "lucide-react";

export default function VideoCard({
  instructor,
}: {
  instructor: { videoTitle: string; videoSubtitle: string; studentsLabel: string };
}) {
  if (!instructor.videoTitle) return null;
  return (
    <div
      className="bg-white border border-gray-200 p-4 mb-6 flex items-center gap-4"
      style={{ borderRadius: 16 }}
    >
      <div
        className="w-24 h-16 flex items-center justify-center shrink-0"
        style={{ background: "#002455", borderRadius: 16 }}
      >
        <Play className="text-white" size={22} />
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{instructor.videoTitle}</div>
        <div className="text-xs text-gray-500">{instructor.videoSubtitle}</div>
      </div>
      <button
        className="text-xs px-3 py-1.5 text-white"
        style={{ background: "#002455", borderRadius: 16 }}
      >
        មើលវីដេអូ
      </button>
    </div>
  );
}
