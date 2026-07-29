import {
  Play,
  SkipForward,
  Volume2,
  Settings,
  PictureInPicture2,
  Maximize,
  Captions,
} from "lucide-react";

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
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-950 shadow-lg">
      {/* Video Thumbnail & Center Play Button */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950 p-6">
        <div className="text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-300 sm:text-sm">
            Introduction to
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-5xl lg:text-6xl">
            {thumbnailTitle}
          </h2>
        </div>
        <button
          type="button"
          aria-label="Play video"
          className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-transform duration-200 hover:scale-105 hover:bg-white/25 sm:h-16 sm:w-16"
        >
          <Play className="h-6 w-6 fill-white text-white translate-x-0.5" />
        </button>
      </div>

      {/* Video Controls Bar */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-3 pt-10">
        {/* Progress Bar */}
        <div className="group mb-2.5 h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-white/20 transition-all hover:h-2">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <button aria-label="Play" className="transition hover:text-indigo-300">
              <Play className="h-4 w-4 fill-white" />
            </button>
            <button aria-label="Next lesson" className="transition hover:text-indigo-300">
              <SkipForward className="h-4 w-4" />
            </button>
            <button aria-label="Volume" className="transition hover:text-indigo-300">
              <Volume2 className="h-4 w-4" />
            </button>
            <span className="text-xs tabular-nums text-white/80">
              {currentTime} / {totalTime}
            </span>
          </div>

          <div className="flex items-center gap-3.5 sm:gap-4">
            <button aria-label="Captions" className="transition hover:text-indigo-300">
              <Captions className="h-4 w-4" />
            </button>
            <button aria-label="Settings" className="transition hover:text-indigo-300">
              <Settings className="h-4 w-4" />
            </button>
            <button aria-label="Picture in Picture" className="transition hover:text-indigo-300">
              <PictureInPicture2 className="h-4 w-4" />
            </button>
            <button aria-label="Fullscreen" className="transition hover:text-indigo-300">
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}