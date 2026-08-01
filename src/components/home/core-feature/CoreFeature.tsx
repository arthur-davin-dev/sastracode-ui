// CoreFeatures.tsx
"use client"

import { useTranslation } from "@/hooks/useTranslations";
import Link from "next/link";

// Static per-card visuals — not language dependent
const cardStyles = [
  {
    iconBg: "border-cyan-500/15 dark:border-cyan-400/20 bg-[#e0f7fd] dark:bg-cyan-950/30",
    icon: "/home/svg/icon-doc.svg",
    linkColor: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300",
    arrow: "/home/svg/arrow-blue.svg",
    href: "/documentation",
  },
  {
    iconBg: "border-blue-600/15 dark:border-blue-400/20 bg-blue-100 dark:bg-blue-950/30",
    icon: "/home/svg/icon-playground.svg",
    linkColor: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300",
    arrow: "/home/svg/arrow-blue.svg",
    href: "/playground/editor/",
  },
  {
    iconBg: "border-violet-600/15 dark:border-violet-400/20 bg-violet-100 dark:bg-violet-950/30",
    icon: "/home/svg/icon-ai.svg",
    linkColor: "text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300",
    arrow: "assets/svg/home/arrow-purple.svg",
    href: "#3",
  },
  {
    iconBg: "border-cyan-500/15 dark:border-cyan-400/20 bg-[#e0f7fd] dark:bg-cyan-950/30",
    icon: "/home/svg/icon-quiz.svg",
    linkColor: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300",
    arrow: "assets/home/svg/arrow-blue.svg",
    href: "#4",
  },
  {
    iconBg: "border-blue-600/15 dark:border-blue-400/20 bg-blue-100 dark:bg-blue-950/30",
    icon: "/home/svg/icon-video.svg",
    linkColor: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300",
    arrow: "/home/svg/arrow-blue.svg",
    href: "/playlists",
  },
  {
    iconBg: "border-violet-600/15 dark:border-violet-400/20 bg-violet-100 dark:bg-violet-950/30",
    icon: "/home/svg/icon-roadmap.svg",
    linkColor: "text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300",
    arrow: "/home/svg/arrow-purple.svg",
    href: "#6",
  },
];

export default function CoreFeatures() {
  const currentT = useTranslation();

  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-6 sm:py-20 lg:pt-20 lg:pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="inline-block rounded-full border border-blue-600/15 dark:border-blue-400/20 bg-blue-100 dark:bg-blue-950/30 px-5 py-2 font-khmer text-sm font-bold uppercase text-navy dark:text-blue-300 transition-colors duration-300">
            {currentT.coreFeature.badge}
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            <span className="text-[#0d1b3e] dark:text-white">{currentT.coreFeature.headingPrefix}</span>
            <span className="gradient-features dark:bg-gradient-to-r dark:from-purple-400 dark:to-blue-400 dark:bg-clip-text dark:text-transparent">
              {currentT.coreFeature.headingHighlight}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-khmer text-base leading-7 text-slate-body dark:text-gray-400 transition-colors duration-300">
            {currentT.coreFeature.description}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {currentT.coreFeature.cards.map((card, i) => {
            const style = cardStyles[i];
            // Define colors for each card
            const cardColors = [
              { // Courses - Blue
                bg: 'bg-blue-50 dark:bg-blue-950/30',
                border: 'border-blue-200 dark:border-blue-800',
                iconBg: 'bg-blue-100 dark:bg-blue-900/50',
                iconColor: 'text-blue-600 dark:text-blue-400',
                titleColor: 'text-blue-700 dark:text-blue-300',
                linkColor: 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300',
                shadow: 'hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30'
              },
              { // Challenges - Purple
                bg: 'bg-purple-50 dark:bg-purple-950/30',
                border: 'border-purple-200 dark:border-purple-800',
                iconBg: 'bg-purple-100 dark:bg-purple-900/50',
                iconColor: 'text-purple-600 dark:text-purple-400',
                titleColor: 'text-purple-700 dark:text-purple-300',
                linkColor: 'text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300',
                shadow: 'hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30'
              },
              { // Events - Green
                bg: 'bg-green-50 dark:bg-green-950/30',
                border: 'border-green-200 dark:border-green-800',
                iconBg: 'bg-green-100 dark:bg-green-900/50',
                iconColor: 'text-green-600 dark:text-green-400',
                titleColor: 'text-green-700 dark:text-green-300',
                linkColor: 'text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300',
                shadow: 'hover:shadow-green-200/50 dark:hover:shadow-green-900/30'
              },
              { // Tools - Orange
                bg: 'bg-orange-50 dark:bg-orange-950/30',
                border: 'border-orange-200 dark:border-orange-800',
                iconBg: 'bg-orange-100 dark:bg-orange-900/50',
                iconColor: 'text-orange-600 dark:text-orange-400',
                titleColor: 'text-orange-700 dark:text-orange-300',
                linkColor: 'text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300',
                shadow: 'hover:shadow-orange-200/50 dark:hover:shadow-orange-900/30'
              }
            ];

            const colors = cardColors[i] || cardColors[0];

            return (
              <article
                key={card.title}
                className={`rounded-[22px] border ${colors.border} ${colors.bg} p-8 shadow-[0_4px_10px_rgba(13,27,62,0.07)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.3)]
            transition-all duration-300 hover:-translate-y-2 hover:shadow-lg ${colors.shadow}`}
              >
                <div
                  className={`flex size-[52px] items-center justify-center rounded-[14px] border ${colors.border} ${colors.iconBg} transition-colors duration-300`}
                >
                  <img src={style.icon} alt="" className={`size-[22px] ${colors.iconColor}`} />
                </div>
                <h3 className={`mt-5 text-2xl font-extrabold ${colors.titleColor} transition-colors duration-300`}>
                  {card.title}
                </h3>
                <p className="mt-3 font-khmer text-base leading-6 text-slate-body dark:text-gray-400 transition-colors duration-300">
                  {card.description}
                </p>
                <Link
                  href={style.href}
                  className={`mt-5 inline-flex items-center gap-1.5 text-xs font-bold transition-colors duration-300 ${colors.linkColor}`}
                >
                  {currentT.coreFeature.cta}
                  <img src={style.arrow} alt="" className={`size-[13px] ${colors.iconColor}`} />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}