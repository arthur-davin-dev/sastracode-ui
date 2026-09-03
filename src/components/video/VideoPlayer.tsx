"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "@/hooks/useTranslations";

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  title: string;
  autoplay?: boolean;
  /** Fired once the current video reaches its end (native <video> or YouTube). */
  onEnded?: () => void;
}

function getYouTubeVideoId(src: string) {
  try {
    const url = new URL(src);

    if (url.hostname === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0];
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
        return videoId;
      }
    }
  } catch {
    return null;
  }

  return null;
}

/* ------------------------------------------------------------------ *
 * YouTube IFrame API
 *
 * A plain <iframe> embed gives no "video ended" signal, so autoplay of
 * the next lesson can't be wired to it. The IFrame Player API does — we
 * load its script once (module-scoped promise) and listen for the
 * ENDED player state.
 * ------------------------------------------------------------------ */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youTubeApiPromise: Promise<void> | null = null;

function loadYouTubeIframeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (youTubeApiPromise) return youTubeApiPromise;

  youTubeApiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };

    if (
      !document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      )
    ) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  });

  return youTubeApiPromise;
}

function YouTubePlayer({
  videoId,
  title,
  autoplay,
  onEnded,
}: {
  videoId: string;
  title: string;
  autoplay: boolean;
  onEnded?: () => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  // Latest onEnded without re-creating the player when the callback identity
  // changes (it's an inline arrow in the parent).
  const onEndedRef = useRef(onEnded);
  // Autoplay only matters at creation time; toggling it later must not reload
  // the video mid-watch.
  const autoplayRef = useRef(autoplay);

  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);

  useEffect(() => {
    let cancelled = false;

    loadYouTubeIframeApi().then(() => {
      if (cancelled || !mountRef.current || !window.YT?.Player) return;

      playerRef.current = new window.YT.Player(mountRef.current, {
        videoId,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          autoplay: autoplayRef.current ? 1 : 0,
          rel: 0,
          playsinline: 1,
          origin:
            typeof window !== "undefined" ? window.location.origin : undefined,
        },
        events: {
          onStateChange: (event: { data: number }) => {
            if (event.data === window.YT?.PlayerState?.ENDED) {
              onEndedRef.current?.();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [videoId]);

  return (
    <div className="aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-sm dark:border-slate-800">
      {/* The API replaces this node with its own <iframe>. */}
      <div key={videoId} ref={mountRef} className="h-full w-full" title={title} />
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function VideoPlayer({
  src,
  poster,
  title,
  autoplay = false,
  onEnded,
}: VideoPlayerProps) {
  const t = useTranslation();

  if (!src) {
    return (
      <div className="flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 px-6 text-center shadow-sm">
        <div>
          <p className="text-lg font-semibold text-white">
            {t.lessonPlayer.video.unavailableTitle}
          </p>
          <p className="mt-2 text-sm text-gray-300">
            {t.lessonPlayer.video.unavailableDescription}
          </p>
        </div>
      </div>
    );
  }

  const youtubeVideoId = getYouTubeVideoId(src);

  if (youtubeVideoId) {
    return (
      <YouTubePlayer
        videoId={youtubeVideoId}
        title={title}
        autoplay={autoplay}
        onEnded={onEnded}
      />
    );
  }

  return (
    <div className="aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-sm dark:border-slate-800">
      <video
        key={src}
        className="h-full w-full"
        controls
        playsInline
        preload="metadata"
        poster={poster}
        autoPlay={autoplay}
        aria-label={title}
        onEnded={onEnded}
      >
        <source src={src} />
        {t.lessonPlayer.video.notSupported}
      </video>
    </div>
  );
}
