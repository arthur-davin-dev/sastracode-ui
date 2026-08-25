import React from "react";

import styles from "./PlatformShowcase.module.css";

export default function PlatformShowcase() {
  return (
    <>
      {/* =========================================================
          DESKTOP / TABLET
          ========================================================= */}

      <div className="hidden sm:block bg-transparent scale-100 lg:scale-[1.15] lg:origin-center mt-8 lg:-mt-24">
        <div className={`${styles.stageContainer} relative w-full mx-auto overflow-hidden`}>

          <header className={`${styles.heroHeader} absolute top-[3.6%] left-0 right-0 text-center`} />


          {/* Connector lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
            viewBox="0 0 1280 720"
            preserveAspectRatio="none"
          >
            {/* Glow */}
            <g>
              <path
                className={styles.connectorGlow}
                d="M485,247 L595,247 Q610,247 610,262 L610,430"
              />

              <path
                className={styles.connectorGlow}
                d="M792,247 L685,247 Q670,247 670,262 L670,430"
              />

              <path
                className={styles.connectorGlow}
                d="M458,417 L558,417 Q570,417 570,432 L570,530"
              />

              <path
                className={styles.connectorGlow}
                d="M820,417 L722,417 Q710,417 710,432 L710,530"
              />
            </g>


            {/* Normal line */}
            <g>
              <path
                className={styles.connectorLine}
                d="M485,247 L595,247 Q610,247 610,262 L610,430"
              />

              <path
                className={styles.connectorLine}
                d="M792,247 L685,247 Q670,247 670,262 L670,430"
              />

              <path
                className={styles.connectorLine}
                d="M458,417 L558,417 Q570,417 570,432 L570,530"
              />

              <path
                className={styles.connectorLine}
                d="M820,417 L722,417 Q710,417 710,432 L710,530"
              />
            </g>
          </svg>


          {/* =====================================================
              CARD 1
              ===================================================== */}

          <div
            className={`
              ${styles.featureCard}
              absolute
              left-[5.63%]
              top-[24.3%]
              w-[32.3%]
              h-[20.1%]
              flex
              items-center
              justify-center

              bg-white/15
              dark:bg-white/[0.04]

              border
              border-white/30
              dark:border-white/10

              backdrop-blur-2xl
              backdrop-saturate-150

              shadow-[0_8px_32px_rgba(0,0,0,0.08)]
              dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]

              ring-1
              ring-inset
              ring-white/20
              dark:ring-white/[0.06]

              z-[2]
              transition-all
              duration-300
              ease-in-out

              hover:bg-white/25
              hover:border-white/50
              hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]

              dark:hover:bg-white/[0.08]
              dark:hover:border-white/20

              hover:-translate-y-0.5
            `}
          >
            <div className={`${styles.cardIconCircle} shrink-0 rounded-full flex items-center justify-center`}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#eaf1ff]"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
            </div>

            <div>
              <h3 className="text-sm lg:text-base font-normal text-slate-600 dark:text-slate-300 text-balance line-clamp-2">
                រៀនតាមរយៈមេរៀនវីដេអូ
              </h3>
            </div>
          </div>


          {/* =====================================================
              CARD 2
              ===================================================== */}

          <div
            className={`
              ${styles.featureCard}
              absolute
              left-[61.88%]
              top-[24.3%]
              w-[32.3%]
              h-[20.1%]
              flex
              items-center
              justify-center
              bg-white/40
              border
              border-white/60
              dark:bg-[rgba(13,19,38,0.55)]
              dark:border-[rgba(94,148,255,0.20)]
              backdrop-blur-xl
              z-[2]
              transition-all
              duration-250
              ease-in-out
              hover:bg-white/55
              hover:border-slate-300
              dark:hover:border-[rgba(110,160,255,0.45)]
              dark:hover:bg-[rgba(16,23,46,0.75)]
              hover:-translate-y-0.5
            `}
          >
            <div className={`${styles.cardIconCircle} shrink-0 rounded-full flex items-center justify-center`}>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#eaf1ff]"
              >
                <circle cx="12" cy="8" r="6" />

                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>

            </div>

            <div>
              <h3 className="text-sm lg:text-base font-normal text-slate-600 dark:text-slate-300 text-balance line-clamp-2">
                ទទួលបានស្លាកជំនាញ
              </h3>
            </div>
          </div>


          {/* =====================================================
              CARD 3
              ===================================================== */}

          <div
            className={`
              ${styles.featureCard}
              absolute
              left-[4.45%]
              top-[47.9%]
              w-[31.3%]
              h-[20.1%]
              flex
              items-center
              justify-center
              bg-white/40
              border
              border-white/60
              dark:bg-[rgba(13,19,38,0.55)]
              dark:border-[rgba(94,148,255,0.20)]
              backdrop-blur-xl
              z-[2]
              transition-all
              duration-250
              ease-in-out
              hover:bg-white/55
              hover:border-slate-300
              dark:hover:border-[rgba(110,160,255,0.45)]
              dark:hover:bg-[rgba(16,23,46,0.75)]
              hover:-translate-y-0.5
            `}
          >
            <div className={`${styles.cardIconCircle} shrink-0 rounded-full flex items-center justify-center`}>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#eaf1ff]"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>

            </div>

            <div>
              <h3 className="text-sm lg:text-base font-normal text-slate-600 dark:text-slate-300 text-balance line-clamp-2">
                ជជែក និងទំនាក់ទំនង
              </h3>
            </div>
          </div>


          {/* =====================================================
              CARD 4
              ===================================================== */}

          <div
            className={`
              ${styles.featureCard}
              absolute
              left-[64.06%]
              top-[47.9%]
              w-[31.3%]
              h-[20.1%]
              flex
              items-center
              justify-center
              bg-white/40
              border
              border-white/60
              dark:bg-[rgba(13,19,38,0.55)]
              dark:border-[rgba(94,148,255,0.20)]
              backdrop-blur-xl
              z-[2]
              transition-all
              duration-250
              ease-in-out
              hover:bg-white/55
              hover:border-slate-300
              dark:hover:border-[rgba(110,160,255,0.45)]
              dark:hover:bg-[rgba(16,23,46,0.75)]
              hover:-translate-y-0.5
            `}
          >
            <div className={`${styles.cardIconCircle} shrink-0 rounded-full flex items-center justify-center`}>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#eaf1ff]"
              >
                <path d="M8 21h8" />

                <path d="M12 17v4" />

                <path d="M7 4h10v5a5 5 0 0 1-10 0z" />

                <path d="M17 5h3a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4" />

                <path d="M7 5H4a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4" />
              </svg>

            </div>

            <div>
              <h3 className="text-sm lg:text-base font-normal text-slate-600 dark:text-slate-300 text-balance line-clamp-2">
                ទទួលបានវិញ្ញាបនបត្របញ្ជាក់
              </h3>
            </div>
          </div>


          {/* =====================================================
              DESKTOP BOTTOM GLOW
              ===================================================== */}

          <svg
            className={`
              ${styles.domeGlowSvg}
              absolute
              left-1/2
              top-[76.5%]
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
              top-[59.7%]
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
              MOBILE FEATURE 1
              ===================================================== */}

          <div className={styles.mobileFlowRow}>

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

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#eaf1ff]"
                >
                  <circle cx="12" cy="12" r="10" />

                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>

              </div>


              <h3
                className="
                  min-w-0
                  text-[12px]
                  min-[375px]:text-[13px]
                  font-normal
                  leading-[1.7]
                  text-slate-600
                  dark:text-slate-300
                  break-words
                "
              >
                រៀនតាមរយៈមេរៀនវីដេអូ
              </h3>

            </div>

          </div>


          {/* =====================================================
              MOBILE FEATURE 2
              ===================================================== */}

          <div className={styles.mobileFlowRow}>

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

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#eaf1ff]"
                >
                  <circle cx="12" cy="8" r="6" />

                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>

              </div>


              <h3
                className="
                  min-w-0
                  text-[12px]
                  min-[375px]:text-[13px]
                  font-normal
                  leading-[1.7]
                  text-slate-600
                  dark:text-slate-300
                  break-words
                "
              >
                ទទួលបានស្លាកជំនាញ
              </h3>

            </div>

          </div>


          {/* =====================================================
              MOBILE FEATURE 3
              ===================================================== */}

          <div className={styles.mobileFlowRow}>

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

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#eaf1ff]"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>

              </div>


              <h3
                className="
                  min-w-0
                  text-[12px]
                  min-[375px]:text-[13px]
                  font-normal
                  leading-[1.7]
                  text-slate-600
                  dark:text-slate-300
                  break-words
                "
              >
                ជជែក និងទំនាក់ទំនង
              </h3>

            </div>

          </div>


          {/* =====================================================
              MOBILE FEATURE 4
              ===================================================== */}

          <div className={styles.mobileFlowRow}>

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

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#eaf1ff]"
                >
                  <path d="M8 21h8" />

                  <path d="M12 17v4" />

                  <path d="M7 4h10v5a5 5 0 0 1-10 0z" />

                  <path d="M17 5h3a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4" />

                  <path d="M7 5H4a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4" />
                </svg>

              </div>


              <h3
                className="
                  min-w-0
                  text-[12px]
                  min-[375px]:text-[13px]
                  font-normal
                  leading-[1.7]
                  text-slate-600
                  dark:text-slate-300
                  break-words
                "
              >
                ទទួលបានវិញ្ញាបនបត្របញ្ជាក់
              </h3>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}