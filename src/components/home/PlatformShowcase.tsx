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

const CONNECTOR_PATHS = [
  "M485,250 L595,250 Q610,250 610,265 L610,486",
  "M792,250 L685,250 Q670,250 670,265 L670,486",
  "M458,470 L558,470 Q570,470 570,485 L570,586",
  "M820,470 L722,470 Q710,470 710,485 L710,586",
];

export default function PlatformShowcase() {
  const t = useTranslation();
  const features = t.platformShowcase.features;

  return (
    <>
      {/* =========================================================
          DESKTOP / TABLET
          ========================================================= */}

      <div className="hidden sm:block bg-transparent scale-100 lg:scale-[1.15] lg:origin-center mt-8 lg:-mt-24">
        <div className={`${styles.stageContainer} relative w-full mx-auto overflow-hidden`}>

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
                style={DESKTOP_POSITIONS[i]}
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
                        bg-white/15
                        dark:bg-white/[0.04]
                        border-white/30
                        dark:border-white/10
                        backdrop-blur-2xl
                        shadow-[0_8px_32px_rgba(0,0,0,0.08)]
                        dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]
                        ring-1
                        ring-inset
                        ring-white/20
                        dark:ring-white/[0.06]
                        hover:bg-white/25
                        hover:border-white/50
                        hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
                        dark:hover:bg-white/[0.08]
                        dark:hover:border-white/20
                      `
                      : `
                        bg-white/40
                        border-white/60
                        dark:bg-[rgba(13,19,38,0.55)]
                        dark:border-[rgba(94,148,255,0.20)]
                        backdrop-blur-xl
                        hover:bg-white/55
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
                  <h3 className={`${styles.cardTitle} text-slate-700 dark:text-slate-200 text-balance line-clamp-1`}>
                    {feature.title}
                  </h3>

                  <span className={`${styles.cardDescription} block text-slate-500 dark:text-slate-400 text-balance line-clamp-2`}>
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
                    bg-white/40
                    border
                    border-white/60
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
                        text-slate-700
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
                        text-slate-500
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