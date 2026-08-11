// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { Play } from "lucide-react";

// interface UpNextCardProps {
//   thumbnail: string;
//   title: string;
//   description: string;
//   lessonPosition: string;
//   duration: string;
//   autoplay: boolean;
//   onAutoplayChange: (value: boolean) => void;
//   href?: string;
// }

// export function UpNextCard({
//   thumbnail,
//   title,
//   description,
//   lessonPosition,
//   duration,
//   autoplay,
//   onAutoplayChange,
//   href,
// }: UpNextCardProps) {
//   return (
//     <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-colors duration-300">
//       {/* Header & Autoplay Toggle */}
//       <div className="mb-4 flex items-center justify-between">
//         <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 font-(family-name:--font-sans)">
//           បន្ទាប់
//         </h2>
//         <div className="flex items-center gap-2">
//           <span className="text-xs text-slate-500 dark:text-slate-400">Autoplay</span>
//           <button
//             type="button"
//             role="switch"
//             aria-checked={autoplay}
//             onClick={() => onAutoplayChange(!autoplay)}
//             className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
//               autoplay ? "bg-indigo-600 dark:bg-indigo-500" : "bg-slate-200 dark:bg-slate-700"
//             }`}
//           >
//             <span className="sr-only">Toggle autoplay</span>
//             <span
//               className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out ${
//                 autoplay ? "translate-x-4.5" : "translate-x-0.5"
//               }`}
//             />
//           </button>
//         </div>
//       </div>

//       {/* Lesson Details */}
//       <div className="flex gap-3">
//         <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-primary-color">
//           <Image
//             src={thumbnail}
//             alt=""
//             fill
//             sizes="96px"
//             className="object-cover"
//           />
//           <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1 text-[10px] text-white">
//             {duration}
//           </span>
//         </div>
//         <div className="flex-1 min-w-0">
//           <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
//             {title}
//           </p>
//           <p className="mt-0.5 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
//             {description}
//           </p>
//           <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{lessonPosition}</p>
//         </div>
//       </div>

//       {href ? (
//         <Link
//           href={href}
//           className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-color py-2.5 text-sm font-semibold text-white hover:bg-primary-color/90"
//         >
//           <Play className="h-3.5 w-3.5 fill-white" />
//           ដំណេីរការមេរៀនបន្ទាប់
//         </Link>
//       ) : (
//         <button
//           type="button"
//           disabled
//           className="mt-4 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-gray-300 py-2.5 text-sm font-semibold text-white"
//         >
//           មិនមានមេរៀនបន្ទាប់
//         </button>
//       )}
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

interface UpNextCardProps {
  thumbnail?: string | null;
  title: string;
  description: string;
  lessonPosition: string;
  duration: string;
  autoplay: boolean;
  onAutoplayChange: (value: boolean) => void;
  href?: string;
}

const FALLBACK_THUMBNAIL = "/assets/images/HTML & CSS.jpg";

function getValidImageUrl(src?: string | null): string {
  if (!src) {
    return FALLBACK_THUMBNAIL;
  }

  const value = src.trim();

  if (!value) {
    return FALLBACK_THUMBNAIL;
  }

  if (value.startsWith("/")) {
    return value;
  }

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  return FALLBACK_THUMBNAIL;
}

export function UpNextCard({
  thumbnail,
  title,
  description,
  lessonPosition,
  duration,
  autoplay,
  onAutoplayChange,
  href,
}: UpNextCardProps) {
  const safeThumbnail = getValidImageUrl(thumbnail);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          បន្ទាប់
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Autoplay
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={autoplay}
            onClick={() => onAutoplayChange(!autoplay)}
            className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
              autoplay
                ? "bg-indigo-600 dark:bg-indigo-500"
                : "bg-slate-200 dark:bg-slate-700"
            }`}
          >
            <span className="sr-only">Toggle autoplay</span>

            <span
              className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
                autoplay
                  ? "translate-x-[18px]"
                  : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Lesson info */}
      <div className="flex gap-3">
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
          <Image
            src={safeThumbnail}
            alt={title}
            fill
            sizes="96px"
            className="object-cover"
          />

          {duration && (
            <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
              {duration}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </p>

          <p className="mt-0.5 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>

          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            {lessonPosition}
          </p>
        </div>
      </div>

      {/* Next lesson button */}
      {href ? (
        <Link
          href={href}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#002455] py-2.5 text-sm font-semibold text-white transition hover:bg-[#003b80] dark:bg-indigo-600 dark:hover:bg-indigo-500"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          ដំណើរការមេរៀនបន្ទាប់
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="mt-4 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-slate-300 py-2.5 text-sm font-semibold text-white dark:bg-slate-700"
        >
          មិនមានមេរៀនបន្ទាប់
        </button>
      )}
    </div>
  );
}
