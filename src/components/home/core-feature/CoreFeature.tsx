// CoreFeatures.tsx
"use client"

import { useTranslation } from "@/hooks/useTranslations";

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
    <section className="bg-white dark:bg-gray-900 px-6 py-10 transition-colors duration-300">
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

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentT.coreFeature.cards.map((card, i) => {
            const style = cardStyles[i];
            return (
              <article
                key={card.title}
                className="rounded-[22px] border border-[rgba(13,27,62,0.09)] dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-[0_4px_10px_rgba(13,27,62,0.07)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.3)]
                transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:hover:shadow-gray-900/50"
              >
                <div
                  className={`flex size-[52px] items-center justify-center rounded-[14px] border transition-colors duration-300 ${style.iconBg}`}
                >
                  <img src={style.icon} alt="" className="size-[22px] dark:brightness-200" />
                </div>
                <h3 className="mt-5 text-2xl font-extrabold text-navy dark:text-white transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="mt-3 font-khmer text-base leading-6 text-slate-body dark:text-gray-400 transition-colors duration-300">
                  {card.description}
                </p>
                <a
                  href={style.href}
                  className={`mt-5 inline-flex items-center gap-1.5 text-xs font-bold transition-colors duration-300 ${style.linkColor}`}
                >
                  {currentT.coreFeature.cta}
                  <img src={style.arrow} alt="" className="size-[13px] dark:brightness-200" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section >
  );
}