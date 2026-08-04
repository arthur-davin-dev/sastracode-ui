"use client";

import { useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipForward,
  Volume2,
  VolumeX,
  Settings,
  PictureInPicture2,
  Maximize,
  Captions,
} from "lucide-react";

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  title: string;
  autoplay?: boolean;
}

function getYouTubeVideoId(src: string): string | null {
  try {
    const url = new URL(src);

    if (url.hostname === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] ?? null;
    }

    if (
      url.hostname === "youtube.com" ||
      url.hostname === "www.youtube.com" ||
      url.hostname === "m.youtube.com"
    ) {
      if (url.pathname === "/watch") {
        return url.searchParams.get("v");
      }

      const [, type, videoId] = url.pathname.split("/");

      if (type === "embed" || type === "shorts") {
        return videoId || null;
      }
    }
  } catch {
    return null;
  }

  return null;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function VideoPlayer({
  src,
  poster,
  title,
  autoplay = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);

  if (!src) {
    return (
      <div className="flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-gray-900 px-6 text-center">
        <div>
          <p className="text-lg font-semibold text-white">Video unavailable</p>
          <p className="mt-2 text-sm text-gray-300">
            Add a video URL to this lesson to start playing it.
          </p>

          <button
            type="button"
            disabled
            aria-label="Video unavailable"
            className="mx-auto mt-5 flex h-14 w-14 cursor-not-allowed items-center justify-center rounded-full bg-white/15 opacity-60 backdrop-blur-md sm:h-16 sm:w-16"
          >
            <Play className="h-6 w-6 translate-x-0.5 fill-white text-white" />
          </button>
        </div>
      </div>
    );
  }

  const youtubeVideoId = getYouTubeVideoId(src);

  if (youtubeVideoId) {
    const embedUrl =
      `https://www.youtube-nocookie.com/embed/${youtubeVideoId}` +
      `?autoplay=${autoplay ? "1" : "0"}&rel=0`;

    return (
      <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-lg">
        <iframe
          key={embedUrl}
          className="h-full w-full border-0"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  const progressPercent =
    duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  const togglePlay = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  const skipForward = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.currentTime = Math.min(video.currentTime + 10, video.duration || 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const changePlaybackRate = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const rates = [1, 1.25, 1.5, 2, 0.5, 0.75];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];

    video.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const toggleCaptions = () => {
    const video = videoRef.current;

    if (!video || video.textTracks.length === 0) {
      return;
    }

    const nextEnabled = !captionsEnabled;

    for (let index = 0; index < video.textTracks.length; index += 1) {
      video.textTracks[index].mode = nextEnabled ? "showing" : "disabled";
    }

    setCaptionsEnabled(nextEnabled);
  };

  const openPictureInPicture = async () => {
    const video = videoRef.current;

    if (!video || !document.pictureInPictureEnabled) {
      return;
    }

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch {
      // Picture-in-picture may not be supported by the browser or video.
    }
  };

  const toggleFullscreen = async () => {
    const player = playerRef.current;

    if (!player) {
      return;
    }

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await player.requestFullscreen();
      }
    } catch {
      // Fullscreen may be blocked by the browser.
    }
  };

  const handleSeek = (value: number) => {
    const video = videoRef.current;

    if (!video || duration <= 0) {
      return;
    }

    const nextTime = (value / 100) * duration;

    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return (
    <div
      ref={playerRef}
      className="group relative aspect-video overflow-hidden rounded-2xl bg-slate-950 shadow-lg"
    >
      <video
        ref={videoRef}
        key={src}
        className="h-full w-full object-contain"
        playsInline
        preload="metadata"
        poster={poster}
        autoPlay={autoplay}
        muted={isMuted}
        aria-label={title}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(event) => {
          setCurrentTime(event.currentTarget.currentTime);
        }}
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration);
        }}
        onDurationChange={(event) => {
          setDuration(event.currentTarget.duration);
        }}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={src} />
        Your browser does not support HTML video.
      </video>

      {!isPlaying && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="absolute top-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300 sm:text-sm">
              Introduction to
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white sm:text-4xl">
              {title}
            </h2>
          </div>

          <button
            type="button"
            aria-label="Play video"
            onClick={togglePlay}
            className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-transform duration-200 hover:scale-105 hover:bg-white/25 sm:h-16 sm:w-16"
          >
            <Play className="h-6 w-6 translate-x-0.5 fill-white text-white" />
          </button>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/50 to-transparent px-4 pb-3 pt-10 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progressPercent}
          onChange={(event) => handleSeek(Number(event.target.value))}
          aria-label="Video progress"
          className="mb-2.5 h-1.5 w-full cursor-pointer accent-indigo-500"
        />

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="transition hover:text-indigo-300"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-white" />
              ) : (
                <Play className="h-4 w-4 fill-white" />
              )}
            </button>

            <button
              type="button"
              onClick={skipForward}
              aria-label="Skip forward 10 seconds"
              className="transition hover:text-indigo-300"
            >
              <SkipForward className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="transition hover:text-indigo-300"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>

            <span className="text-xs tabular-nums text-white/80">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={toggleCaptions}
              aria-label="Toggle captions"
              className={
                captionsEnabled
                  ? "text-indigo-300"
                  : "transition hover:text-indigo-300"
              }
            >
              <Captions className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={changePlaybackRate}
              aria-label={`Playback speed ${playbackRate}x`}
              title={`Playback speed: ${playbackRate}x`}
              className="flex items-center gap-1 transition hover:text-indigo-300"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden text-xs sm:inline">
                {playbackRate}x
              </span>
            </button>

            <button
              type="button"
              onClick={openPictureInPicture}
              aria-label="Picture in Picture"
              className="transition hover:text-indigo-300"
            >
              <PictureInPicture2 className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Fullscreen"
              className="transition hover:text-indigo-300"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
