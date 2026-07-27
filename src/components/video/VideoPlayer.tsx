import { Play, SkipForward, Volume2, Settings, PictureInPicture2, Maximize, Captions } from "lucide-react";

interface VideoPlayerProps {
  thumbnailTitle: string;
  currentTime: string;
  totalTime: string;
  progressPercent: number;
}

export function VideoPlayer({
  thumbnailTitle,
  currentTime,
  totalTime,
  progressPercent,
}: VideoPlayerProps) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-900">
      <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary-color via-primary-color/90 to-slate-900">
        <div className="text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-blue-200 font-(family-name:--font-sans)">
            Introduction to
          </p>
          <h2 className="text-5xl font-bold text-white sm:text-6xl">
            {thumbnailTitle}
          </h2>
        </div>
        <button
          type="button"
          aria-label="Play video"
          className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition hover:bg-white/25"
        >
          <Play className="h-6 w-6 fill-white text-white" />
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-4 pb-3 pt-8">
        <div className="mb-2 h-1 w-full overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <Play className="h-4 w-4 fill-white" />
            <SkipForward className="h-4 w-4" />
            <Volume2 className="h-4 w-4" />
            <span className="text-xs tabular-nums text-white/80">
              {currentTime} / {totalTime}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Captions className="h-4 w-4" />
            <Settings className="h-4 w-4" />
            <PictureInPicture2 className="h-4 w-4" />
            <Maximize className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}