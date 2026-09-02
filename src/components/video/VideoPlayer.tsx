"use client";

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  title: string;
  autoplay?: boolean;
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

export function VideoPlayer({
  src,
  poster,
  title,
  autoplay = false,
}: VideoPlayerProps) {
  if (!src) {
    return (
      <div className="flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 px-6 text-center shadow-sm">
        <div>
          <p className="text-lg font-semibold text-white">
            វីដេអូមិនអាចប្រើបានទេ
          </p>
          <p className="mt-2 text-sm text-gray-300">
            សូមបន្ថែម URL វីដេអូទៅមេរៀននេះ ដើម្បីចាប់ផ្ដើមចាក់។
          </p>
        </div>
      </div>
    );
  }

  const youtubeVideoId = getYouTubeVideoId(src);

  if (youtubeVideoId) {
    const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=${
      autoplay ? "1" : "0"
    }&rel=0`;

    return (
      <div className="aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-sm dark:border-slate-800">
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
      >
        <source src={src} />
        កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រការចាក់វីដេអូ HTML ទេ។
      </video>
    </div>
  );
}

