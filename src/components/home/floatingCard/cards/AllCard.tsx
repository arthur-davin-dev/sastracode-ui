// AllCard.tsx
import Image from "next/image";
import { Props } from "./ClassNameProps";
import { useTranslation } from "@/hooks/useTranslations";


type Variant = "floating" | "grid";
type VariantProps = { variant?: Variant };

export function BusinessCard({ className, variant = "floating" }: Props & VariantProps) {
  const base =
    variant === "grid"
      ? "relative w-full"
      : "absolute w-40 sm:w-48 md:w-52 lg:w-60";

  const currentT = useTranslation();

  return (
    <div
      className={`${base}
      rounded-2xl
      lg:rounded-[28px]
      p-3
      sm:p-4 
      bg-[#121A2F] dark:bg-[#1a2444] 
      shadow-lg 
      transition-colors duration-300 
      ${className ?? ""}`}
    >
      {/* Profile */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
        <div className="relative h-6 w-6
          sm:h-7 sm:w-7
          lg:h-8 lg:w-8 shrink-0 overflow-hidden rounded-full border-2 border-white/20"
        >
          <Image
            src="/profile.jpg"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[9px] sm:text-[11px] lg:text-xs text-gray-400 dark:text-gray-500">
            M.Hossein Moradi
          </p>
          <h2 className="break-words text-[9px] sm:text-[11px] lg:text-xs font-bold leading-tight text-white dark:text-gray-100">
            {currentT.showCase.floatCard.businessCard}
          </h2>
        </div>
      </div>

      {/* Tag */}
      <div className="mt-1.5 sm:mt-2 flex items-center gap-2 sm:gap-3 rounded-xl bg-[#3B4559] dark:bg-[#2a3344] px-2 py-1 transition-colors duration-300">
        <div className="h-3 w-3 shrink-0 rounded-[3px] bg-[#F5C518]" />

        <span className="min-w-0 break-words text-[9px] sm:text-[11px] lg:text-xs text-gray-300 dark:text-gray-400">
          College Case Studies
        </span>
      </div>
    </div>
  );
}

export function LiveCoding({ className, text, variant = "floating" }: Props & VariantProps) {
  const base =
    variant === "grid"
      ? "relative w-full"
      : "absolute w-[170px] sm:w-[210px] lg:w-auto";
  const currentT = useTranslation();

  return (
    <div
      className={`${base}
        flex
        items-center
        justify-between
        gap-1
        px-2
        sm:px-3
        py-2
        rounded-xl 
        bg-white/80 dark:bg-gray-800/80 
        backdrop-blur-sm
        shadow-lg dark:shadow-gray-900/50
        transition-colors duration-300 
        ${className ?? ""}`}
    >
      {/* Left Icon */}
      <div className="flex h-8
        w-8
        sm:h-9
        sm:w-9
        lg:h-10
        lg:w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 shadow-sm transition-colors duration-300"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 dark:text-gray-400"
        >
          <path
            d="M5 8H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M7 12H17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M9 16H15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col items-center">
        <h2 className="break-words text-center text-[9px] sm:text-[11px] lg:text-xs leading-tight text-gray-500 dark:text-gray-300 transition-colors duration-300">
          {currentT.showCase.floatCard.liveCoding}
        </h2>

        <button className="mt-2 rounded-full bg-[#0E2D66] dark:bg-blue-600 px-2 sm:px-4 py-1 text-[9px] sm:text-xs font-medium text-white transition-all duration-300 hover:bg-[#163a82] dark:hover:bg-blue-700">
          Live Coding
        </button>
      </div>
    </div>
  )
}

export function AICard({ text, className, variant = "floating" }: Props & VariantProps) {
  const base =
    variant === "grid"
      ? "relative w-full"
      : "absolute w-[180px] sm:w-[220px] lg:w-auto";
  const currentT = useTranslation();
  return (
    <div className={`${base} 
      p-2 sm:p-3 
      gap-1.5 sm:gap-2 
      rounded-xl 
      bg-gradient-to-br from-purple-50 to-blue-50 
      dark:from-gray-800 dark:to-gray-900
      shadow-lg dark:shadow-gray-900/50
      transition-colors duration-300 
      flex 
      ${className ?? ""}`}
    >
      <p className="min-w-0 flex-1 break-words text-[9px] sm:text-xs lg:text-sm text-gray-700 dark:text-gray-200 transition-colors duration-300">
        {text}
      </p>
      <div className="shrink-0 self-end mr-2.5 px-2 sm:px-3 lg:px-4 rounded-xl text-[9px] sm:text-xs text-amber-50 bg-black dark:bg-gray-700 transition-colors duration-300">
        <p>24 hours</p>
      </div>
    </div>
  )
}

export function NormalCard({
  className,
  imagePath,
  text,
  imageClassName,
  variant = "floating",
}: Props & VariantProps) {
  const base = variant === "grid" ? "relative w-full justify-center" : "absolute";
  const wrap = variant === "grid" ? "whitespace-normal text-center" : "whitespace-nowrap";

  const currentT = useTranslation();
  return (
    <div
      className={`
        ${base}
        flex items-center gap-2
        rounded-xl
        bg-white dark:bg-gray-800
        px-3 py-2
        shadow-[0_4px_6px_rgba(0,0,0,0.25)] 
        dark:shadow-[0_4px_6px_rgba(0,0,0,0.5)]
        text-[10px]
        sm:text-xs
        lg:text-sm
        ${wrap}
        transition-all duration-300
        hover:shadow-[0_6px_12px_rgba(0,0,0,0.3)]
        dark:hover:shadow-[0_6px_12px_rgba(0,0,0,0.6)]
        ${className ?? ""}
      `}
    >
      {imagePath && (
        <Image
          src={imagePath}
          alt=""
          width={20}
          height={20}
          className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${imageClassName ?? ""}`}
        />
      )}
      <span className="min-w-0 break-words text-gray-800 dark:text-gray-200 transition-colors duration-300">
        {text}
      </span>
    </div>
  )
}

export default function AnalyticsCard({
  variant = "floating",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const base =
    variant === "grid"
      ? "relative w-full"
      : "absolute right-0 top-0 w-[170px] sm:w-[200px] lg:w-auto";

  const currentT = useTranslation();
  return (
    <div
      className={`${base} 
        rounded-2xl
        lg:rounded-3xl 
        bg-white dark:bg-gray-800 
        p-3 sm:p-4 lg:p-6 
        shadow-2xl dark:shadow-gray-900/50
        transition-colors duration-300 
        ${className ?? ""}`}
    >
      <svg className="w-full h-auto" viewBox="0 0 220 90">
        <path
          d="M10 50
             C50 20,
             80 80,
             120 40
             S180 30,
             210 45"
          fill="none"
          stroke="#000000"
          className="dark:stroke-gray-400"
          strokeWidth="2"
        />
        {/* Add some data points for better visualization */}
        <circle cx="10" cy="50" r="3" fill="#4F46E5" className="dark:fill-purple-400" />
        <circle cx="120" cy="40" r="3" fill="#4F46E5" className="dark:fill-purple-400" />
        <circle cx="210" cy="45" r="3" fill="#4F46E5" className="dark:fill-purple-400" />
      </svg>

      <div className="mt-2 sm:mt-3 lg:mt-4 flex items-center justify-between gap-1">
        <span className="min-w-0 break-words text-[9px] sm:text-xs lg:text-sm text-gray-400 dark:text-gray-500 transition-colors duration-300">
          {currentT.showCase.floatCard.analyticCard}
        </span>

        <span className="shrink-0 text-xs sm:text-base font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">
          28 / 35
        </span>
      </div>

      {/* Progress bar for better analytics */}
      <div className="mt-2 w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden transition-colors duration-300">
        <div
          className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-500"
          style={{ width: '80%' }}
        />
      </div>
    </div>
  );
}