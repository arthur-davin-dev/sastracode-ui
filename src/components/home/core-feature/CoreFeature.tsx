// CoreFeatures.tsx
"use client";

import { useTranslation } from "@/hooks/useTranslations";
import Link from "next/link";

// Static per-card visuals — not language dependent
const cardStyles = [
  {
    iconBg:
      "border-cyan-500/15 dark:border-cyan-400/20 bg-[#e0f7fd] dark:bg-cyan-950/30",
    icon: "/home/svg/icon-doc.svg",
    linkColor:
      "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300",
    arrow: "/home/svg/arrow-blue.svg",
    href: "/documentation",
  },
  {
    iconBg:
      "border-blue-600/15 dark:border-blue-400/20 bg-blue-100 dark:bg-blue-950/30",
    icon: "/home/svg/icon-playground.svg",
    linkColor:
      "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300",
    arrow: "/home/svg/arrow-blue.svg",
    href: "/playground",
  },
  {
    iconBg:
      "border-violet-600/15 dark:border-violet-400/20 bg-violet-100 dark:bg-violet-950/30",
    icon: "/home/svg/icon-ai.svg",
    linkColor:
      "text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300",
    arrow: "assets/svg/home/arrow-purple.svg",
    href: "/documentation",
  },
  {
    iconBg:
      "border-cyan-500/15 dark:border-cyan-400/20 bg-[#e0f7fd] dark:bg-cyan-950/30",
    icon: "/home/svg/icon-quiz.svg",
    linkColor:
      "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300",
    arrow: "assets/home/svg/arrow-blue.svg",
    href: "/quiz",
  },
  {
    iconBg:
      "border-blue-600/15 dark:border-blue-400/20 bg-blue-100 dark:bg-blue-950/30",
    icon: "/home/svg/icon-video.svg",
    linkColor:
      "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300",
    arrow: "/home/svg/arrow-blue.svg",
    href: "/courses",
  },
  {
    iconBg:
      "border-violet-600/15 dark:border-violet-400/20 bg-violet-100 dark:bg-violet-950/30",
    icon: "/home/svg/icon-roadmap.svg",
    linkColor:
      "text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300",
    arrow: "/home/svg/arrow-purple.svg",
    href: undefined,
  },
];

export default function CoreFeatures() {
  const currentT = useTranslation();

  return (
    <section className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10 py-6 sm:py-20 lg:pt-20 lg:pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-block rounded-full border border-blue-600/15 dark:border-blue-400/20 bg-blue-100 dark:bg-blue-950/30 px-5 py-2 font-khmer text-sm font-bold uppercase text-primary-color dark:text-blue-300 transition-colors duration-300">
            {currentT.coreFeature.badge}
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            <span className="text-primary-color dark:text-white">
              {currentT.coreFeature.headingPrefix}
            </span>
            <span className="text-secondary-color gradient-features dark:bg-gradient-to-r dark:from-purple-400 dark:to-blue-400 dark:bg-clip-text dark:text-transparent">
              {currentT.coreFeature.headingHighlight}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-khmer text-primary-color leading-7 text-slate-body dark:text-gray-400 transition-colors duration-300">
            {currentT.coreFeature.description}
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 px-1 sm:px-2 lg:px-3">
          {currentT.coreFeature.cards.map((card, i) => {
            const style = cardStyles[i];
            const isClickable = !!style.href;
            const CardWrapper = isClickable ? Link : "div";
            // Define colors for each card
            const cardColors = [
              {
                // Courses - Blue
                bg: "bg-blue-50 dark:bg-blue-950/30",
                border: "border-blue-200 dark:border-blue-800",
                iconBg: "bg-blue-100 dark:bg-blue-900/50",
                iconColor: "text-blue-600 dark:text-blue-400",
                titleColor: "text-blue-700 dark:text-blue-300",
                linkColor:
                  "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300",
                shadow:
                  "hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30",
              },
              {
                // Challenges - Purple
                bg: "bg-purple-50 dark:bg-purple-950/30",
                border: "border-purple-200 dark:border-purple-800",
                iconBg: "bg-purple-100 dark:bg-purple-900/50",
                iconColor: "text-purple-600 dark:text-purple-400",
                titleColor: "text-purple-700 dark:text-purple-300",
                linkColor:
                  "text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300",
                shadow:
                  "hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30",
              },
              {
                // Events - Green
                bg: "bg-green-50 dark:bg-green-950/30",
                border: "border-green-200 dark:border-green-800",
                iconBg: "bg-green-100 dark:bg-green-900/50",
                iconColor: "text-green-600 dark:text-green-400",
                titleColor: "text-green-700 dark:text-green-300",
                linkColor:
                  "text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300",
                shadow:
                  "hover:shadow-green-200/50 dark:hover:shadow-green-900/30",
              },
              {
                // Tools - Orange
                bg: "bg-orange-50 dark:bg-orange-950/30",
                border: "border-orange-200 dark:border-orange-800",
                iconBg: "bg-orange-100 dark:bg-orange-900/50",
                iconColor: "text-orange-600 dark:text-orange-400",
                titleColor: "text-orange-700 dark:text-orange-300",
                linkColor:
                  "text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300",
                shadow:
                  "hover:shadow-orange-200/50 dark:hover:shadow-orange-900/30",
              },
            ];

            const colors = cardColors[i] || cardColors[0];

            return (
              <CardWrapper
                key={card.title}
                href={isClickable ? style.href : undefined}
                className={`block rounded-[20px] border ${colors.border} ${colors.bg} p-4 pt-4 pb-4 sm:p-5 sm:pt-5 sm:pb-5 shadow-[0_4px_10px_rgba(13,27,62,0.07)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.3)]
            transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${colors.shadow} ${
              isClickable ? "cursor-pointer" : "cursor-default"
            }`}
              >
                <article className="h-full">
                  <div
                    className={`flex size-[40px] sm:size-[42px] items-center justify-center rounded-[14px] border ${colors.border} ${colors.iconBg} transition-colors duration-300`}
                  >
                    <img
                      src={style.icon}
                      alt=""
                      className={`size-[18px] sm:size-[20px] ${colors.iconColor}`}
                    />
                  </div>
                  <h3
                    className={`mt-4 text-xl sm:text-[1.4rem] font-extrabold ${colors.titleColor} transition-colors duration-300`}
                  >
                    {card.title}
                  </h3>
                  <p className="mt-2.5 font-khmer text-sm sm:text-[15px] leading-6 text-primary-color dark:text-gray-400 transition-colors duration-300">
                    {card.description}
                  </p>
                  {isClickable ? (
                    <span
                      className={`mt-5 inline-flex items-center gap-1.5 text-xs font-bold transition-colors duration-300 ${colors.linkColor}`}
                    >
                      {currentT.coreFeature.cta}
                      <img
                        src={style.arrow}
                        alt=""
                        className={`size-[13px] ${colors.iconColor}`}
                      />
                    </span>
                  ) : null}
                </article>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
