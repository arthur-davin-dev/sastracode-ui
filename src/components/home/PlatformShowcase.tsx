"use client";

import React from "react";
import { Bot, FileText, Gamepad2, Trophy } from "lucide-react";

import styles from "./PlatformShowcase.module.css";
import { useTranslation } from "@/hooks/useTranslations";

const FEATURE_ICONS = [FileText, Bot, Gamepad2, Trophy];

const DESKTOP_POSITIONS = [
  { left: "5.63%", top: "19.5%", width: "32.3%", height: "22%" },
  { left: "61.88%", top: "19.5%", width: "32.3%", height: "22%" },
  { left: "4.45%", top: "46.3%", width: "31.3%", height: "22%" },
  { left: "64.06%", top: "46.3%", width: "31.3%", height: "22%" },
];

/* "section" variant: same left/width as desktop (keeps the connector wires
   aligned) but taller cards so titles wrap in full (no ellipsis) and
   descriptions are never clipped */
const SECTION_POSITIONS = [
  { left: "5.63%", top: "16.5%", width: "32.3%", height: "28%" },
  { left: "61.88%", top: "16.5%", width: "32.3%", height: "28%" },
  { left: "4.45%", top: "43.3%", width: "31.3%", height: "28%" },
  { left: "64.06%", top: "43.3%", width: "31.3%", height: "28%" },
];

const CONNECTOR_PATHS = [
  "M485,250 L595,250 Q610,250 610,265 L610,486",
  "M792,250 L685,250 Q670,250 670,265 L670,486",
  "M458,470 L558,470 Q570,470 570,485 L570,586",
  "M820,470 L722,470 Q710,470 710,485 L710,586",
];

type ShowcaseFeature = { title: string; description: string };

export default function PlatformShowcase({
  features: featuresProp,
  variant = "banner",
}: {
  features?: ShowcaseFeature[];
  /** "banner" keeps the courses-banner offset/scale; "section" sits neutrally in a centered block */
  variant?: "banner" | "section";
} = {}) {
  const t = useTranslation();
  const features = featuresProp ?? t.platformShowcase.features;

  const desktopWrapperClass =
    variant === "section"
      ? "hidden sm:block bg-transparent w-full max-w-[840px] mx-auto"
      : "hidden sm:block bg-transparent scale-100 lg:scale-[1.15] lg:origin-center mt-8 lg:-mt-24";

  const cardPositions = variant === "section" ? SECTION_POSITIONS : DESKTOP_POSITIONS;

  return (
    <>
      {/* =========================================================
          DESKTOP / TABLET
          ========================================================= */}

      <div className={desktopWrapperClass}>
        <div
          className={`${styles.stageContainer} ${
            variant === "section" ? styles.stageSection : ""
          } relative w-full mx-auto overflow-hidden`}
        >

          <header className={`${styles.heroHeader} absolute top-[3.2%] left-0 right-0 text-center`} />


          {/* Connector lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
            viewBox="0 0 1280 820"
            preserveAspectRatio="none"
          >
            {/* Glow */}
            <g>
              {CONNECTOR_PATHS.map((d) => (
                <path key={d} className={styles.connectorGlow} d={d} />
              ))}
            </g>

            {/* Normal line */}
            <g>
              {CONNECTOR_PATHS.map((d) => (
                <path key={d} className={styles.connectorLine} d={d} />
              ))}
            </g>

            {/* Flowing current (ចរន្ត) */}
            <g>
              {CONNECTOR_PATHS.map((d) => (
                <path key={d} className={styles.connectorCurrent} d={d} />
              ))}
            </g>

            {/* Traveling spark */}
            <g>
              {CONNECTOR_PATHS.map((d, i) => (
                <circle key={d} className={styles.connectorSpark} r="3.5">
                  <animateMotion
                    dur="1.8s"
                    begin={`${i * 0.45}s`}
                    repeatCount="indefinite"
                    path={d}
                  />
                </circle>
              ))}
            </g>
          </svg>


          {/* =====================================================
              FEATURE CARDS
              ===================================================== */}

          {features.map((feature, i) => {
            const Icon = FEATURE_ICONS[i];
            const isPrimary = i === 0;

            return (
              <div
                key={feature.title}
                style={cardPositions[i]}
                className={`
                  ${styles.featureCard}
                  absolute
                  overflow-hidden
                  flex
                  items-center
                  justify-center

                  border
                  backdrop-saturate-150

                  z-[2]
                  transition-all
                  duration-300
                  ease-in-out

                  hover:-translate-y-0.5

                  ${
                    isPrimary
                      ? `
                        bg-blue-50/90
                        dark:bg-white/[0.04]
                        border-blue-200/70
                        dark:border-white/10
                        backdrop-blur-2xl
                        shadow-[0_10px_30px_-8px_rgba(30,58,138,0.22)]
                        dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]
                        ring-1
                        ring-inset
                        ring-blue-100/70
                        dark:ring-white/[0.06]
                        hover:bg-blue-50
                        hover:border-blue-300/80
                        hover:shadow-[0_16px_40px_-10px_rgba(30,58,138,0.28)]
                        dark:hover:bg-white/[0.08]
                        dark:hover:border-white/20
                      `
                      : `
                        bg-white/90
                        border-slate-200/80
                        dark:bg-[rgba(13,19,38,0.55)]
                        dark:border-[rgba(94,148,255,0.20)]
                        backdrop-blur-xl
                        hover:bg-white
                        hover:border-slate-300
                        dark:hover:border-[rgba(110,160,255,0.45)]
                        dark:hover:bg-[rgba(16,23,46,0.75)]
                      `
                  }
                `}
              >
                <div className={`${styles.cardIconCircle} shrink-0 rounded-full flex items-center justify-center`}>
                  <Icon className="text-[#eaf1ff]" strokeWidth={2} />
                </div>

                <div className="min-w-0">
                  <h3 className={`${styles.cardTitle} text-slate-800 dark:text-slate-200 text-balance ${variant === "section" ? "" : "line-clamp-1"}`}>
                    {feature.title}
                  </h3>

                  <span className={`${styles.cardDescription} text-slate-600 dark:text-slate-400 text-balance ${variant === "section" ? "line-clamp-3" : "line-clamp-2"}`}>
                    {feature.description}
                  </span>
                </div>
              </div>
            );
          })}


          {/* =====================================================
              DESKTOP BOTTOM GLOW
              ===================================================== */}

          <svg
            className={`
              ${styles.domeGlowSvg}
              absolute
              left-1/2
              top-[74%]
              -translate-x-1/2
              -translate-y-1/2
              z-[1]
              pointer-events-none
              overflow-visible
            `}
            viewBox="0 0 800 300"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>

              <filter
                id="b18"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="18" />
              </filter>


              <filter
                id="b9"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="9" />
              </filter>


              <filter
                id="b6"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="6" />
              </filter>


              <filter
                id="b3"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="3" />
              </filter>

            </defs>


            <ellipse
              cx="400"
              cy="150"
              rx="390"
              ry="98"
              fill="#1e46b0"
              opacity="0.28"
              filter="url(#b18)"
            />


            <ellipse
              cx="400"
              cy="150"
              rx="335"
              ry="84"
              fill="#193c96"
              opacity="0.55"
              filter="url(#b9)"
            />


            <ellipse
              cx="400"
              cy="150"
              rx="335"
              ry="84"
              fill="none"
              stroke="#4d7cf0"
              strokeOpacity={0.3}
              strokeWidth={2.5}
              filter="url(#b3)"
            />


            <ellipse
              cx="400"
              cy="147"
              rx="258"
              ry="64"
              fill="#2450c6"
              opacity="0.62"
              filter="url(#b9)"
            />


            <ellipse
              cx="400"
              cy="147"
              rx="258"
              ry="64"
              fill="none"
              stroke="#6b98ff"
              strokeOpacity={0.42}
              strokeWidth={2.5}
              filter="url(#b3)"
            />


            <ellipse
              cx="400"
              cy="144"
              rx="182"
              ry="45"
              fill="#3468e0"
              opacity="0.72"
              filter="url(#b6)"
            />


            <ellipse
              cx="400"
              cy="144"
              rx="182"
              ry="45"
              fill="none"
              stroke="#9db9ff"
              strokeOpacity={0.55}
              strokeWidth={2.5}
              filter="url(#b3)"
            />


            <ellipse
              cx="400"
              cy="140"
              rx="112"
              ry="28"
              fill="#5f8bf8"
              opacity="0.85"
              filter="url(#b6)"
            />


            <ellipse
              cx="400"
              cy="140"
              rx="112"
              ry="28"
              fill="none"
              stroke="#cfe0ff"
              strokeOpacity={0.6}
              strokeWidth={2}
              filter="url(#b3)"
            />


            <ellipse
              cx="400"
              cy="132"
              rx="58"
              ry="15"
              fill="#e4edff"
              opacity="0.9"
              filter="url(#b6)"
            />
          </svg>


          {/* Desktop center hub */}
          <div
            className={`
              ${styles.centerEmblem}
              absolute
              left-1/2
              top-[59.3%]
              -translate-x-1/2
              flex
              items-center
              justify-center
              z-[3]
            `}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#f4f8ff]"
            >
              <polyline points="16 18 22 12 16 6" />

              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>

        </div>
      </div>


      {/* =========================================================
          MOBILE
          ========================================================= */}

      <div className="sm:hidden w-full px-3 min-[380px]:px-4 pt-6 pb-10">

        <div className={styles.mobileFlow}>


          {/* =====================================================
              MOBILE HUB
              ===================================================== */}

          <div className={styles.mobileHubWrapper}>

            <div className={styles.mobileHubGlow} />

            <div className={styles.mobileCenterEmblem}>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#f4f8ff]"
              >
                <polyline points="16 18 22 12 16 6" />

                <polyline points="8 6 2 12 8 18" />
              </svg>

            </div>

          </div>


          {/* =====================================================
              MOBILE FEATURES
              ===================================================== */}

          {features.map((feature, i) => {
            const Icon = FEATURE_ICONS[i];

            return (
              <div key={feature.title} className={styles.mobileFlowRow}>

                <span className={styles.mobileJunction} />

                <div />

                <div
                  className={`
                    ${styles.mobileFeatureCard}
                    bg-white/95
                    border
                    border-slate-200/80
                    dark:bg-[rgba(13,19,38,0.68)]
                    dark:border-[rgba(94,148,255,0.20)]
                    backdrop-blur-xl
                  `}
                >

                  <div className={styles.mobileIconCircle}>
                    <Icon className="text-[#eaf1ff]" strokeWidth={2} size={20} />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="
                        min-w-0
                        text-[12px]
                        min-[375px]:text-[13px]
                        font-semibold
                        leading-[1.4]
                        text-slate-800
                        dark:text-slate-200
                        break-words
                      "
                    >
                      {feature.title}
                    </h3>

                    <span
                      className="
                        mt-0.5
                        block
                        min-w-0
                        text-[11px]
                        min-[375px]:text-[12px]
                        font-normal
                        leading-[1.5]
                        text-slate-600
                        dark:text-slate-400
                        break-words
                        line-clamp-2
                      "
                    >
                      {feature.description}
                    </span>
                  </div>

                </div>

              </div>
            );
          })}

        </div>
      </div>
    </>
  );
}