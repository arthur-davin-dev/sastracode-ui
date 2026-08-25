import React from "react";

export default function PlatformShowcase() {
  return (
    <>
      <style>{`
        /* =========================================================
           DESKTOP / TABLET
           ========================================================= */

        .stage-container {
          container-type: inline-size;
          aspect-ratio: 1280 / 720;
          border-radius: 1.2cqw;
        }

        .hero-header {
          padding: 0 4cqw;
        }

        .feature-card {
          gap: 1.15cqw;
          padding: 1.55cqw 1.7cqw;
          border-radius: 1.15cqw;

          box-shadow:
            0 0.6cqw 2cqw rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.03);
        }

        .card-icon-circle {
          width: 6.5cqw;
          height: 6.5cqw;

          background: radial-gradient(
            circle at 32% 28%,
            #4c86ff,
            #2a56d6 65%,
            #1c3fa8
          );

          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.06) inset,
            0 0.5cqw 1.4cqw rgba(45, 100, 240, 0.45);
        }

        .card-icon-circle svg {
          width: 3.2cqw;
          height: 3.2cqw;
        }

        .connector-line {
          fill: none;
          stroke: rgba(110, 163, 255, 0.55);
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .connector-glow {
          fill: none;
          stroke: rgba(90, 140, 255, 0.9);
          stroke-width: 5;
          opacity: 0.18;
          filter: blur(2px);
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .dome-glow-svg {
          width: 78cqw;
          height: 29.3cqw;
        }

        .center-emblem {
          width: 10.2cqw;
          height: 10.2cqw;
          border-radius: 22%;

          background: linear-gradient(
            160deg,
            #4c82fb 0%,
            #2f66e6 55%,
            #1e46b8 100%
          );

          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.08) inset,
            0 0.4cqw 0.6cqw rgba(255, 255, 255, 0.12) inset,
            0 1.2cqw 3cqw rgba(45, 100, 240, 0.55),
            0 0 8cqw rgba(63, 125, 251, 0.35);
        }

        .center-emblem svg {
          width: 4.6cqw;
          height: 4.6cqw;
        }


        /* =========================================================
           MOBILE
           Layout:
           
           [ <> ]
              |
              |------ [ Feature 1 ]
              |
              |------ [ Feature 2 ]
              |
              |------ [ Feature 3 ]
              |
              |------ [ Feature 4 ]
           ========================================================= */

        .mobile-flow {
          position: relative;

          width: 100%;
          max-width: 430px;

          margin-left: auto;
          margin-right: auto;

          padding-top: 8px;
          padding-bottom: 8px;
        }


        /* Main vertical connector line */
        .mobile-flow::before {
          content: "";

          position: absolute;

          left: 27px;
          top: 36px;
          bottom: 44px;

          width: 2px;

          border-radius: 999px;

          background: linear-gradient(
            to bottom,
            rgba(75, 132, 255, 0.95),
            rgba(75, 132, 255, 0.55),
            rgba(75, 132, 255, 0.25)
          );

          box-shadow:
            0 0 4px rgba(62, 121, 255, 0.55),
            0 0 10px rgba(62, 121, 255, 0.2);

          z-index: 0;
        }


        /* =========================================================
           MOBILE HUB
           ========================================================= */

        .mobile-hub-wrapper {
          position: relative;

          width: 56px;
          height: 56px;

          display: flex;
          align-items: center;
          justify-content: center;

          z-index: 4;
        }

        .mobile-hub-glow {
          position: absolute;

          left: 50%;
          top: 50%;

          transform: translate(-50%, -50%);

          width: 95px;
          height: 95px;

          border-radius: 9999px;

          background: rgba(59, 130, 246, 0.2);

          filter: blur(18px);

          pointer-events: none;
        }

        .mobile-center-emblem {
          position: relative;

          width: 56px;
          height: 56px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 14px;

          background: linear-gradient(
            160deg,
            #4c82fb 0%,
            #2f66e6 55%,
            #1e46b8 100%
          );

          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.1) inset,
            0 2px 4px rgba(255, 255, 255, 0.14) inset,
            0 8px 22px rgba(45, 100, 240, 0.5),
            0 0 30px rgba(63, 125, 251, 0.38);

          z-index: 5;
        }

        .mobile-center-emblem svg {
          width: 24px;
          height: 24px;
        }


        /* =========================================================
           MOBILE FEATURE ROW
           ========================================================= */

        .mobile-flow-row {
          position: relative;

          display: grid;

          grid-template-columns:
            56px
            minmax(0, 1fr);

          column-gap: 10px;

          align-items: center;

          min-height: 92px;

          z-index: 1;
        }


        /* Horizontal branch */
        .mobile-flow-row::before {
          content: "";

          position: absolute;

          left: 27px;
          top: 50%;

          width: 40px;
          height: 2px;

          transform: translateY(-50%);

          border-radius: 999px;

          background: rgba(83, 137, 255, 0.68);

          box-shadow:
            0 0 4px rgba(60, 120, 255, 0.5),
            0 0 8px rgba(60, 120, 255, 0.2);

          z-index: 0;
        }


        /* Small glowing junction circle */
        .mobile-junction {
          position: absolute;

          left: 23px;
          top: 50%;

          width: 10px;
          height: 10px;

          transform: translateY(-50%);

          border-radius: 50%;

          background: #3972ef;

          border: 2px solid rgba(214, 228, 255, 0.95);

          box-shadow:
            0 0 6px rgba(59, 130, 246, 0.8),
            0 0 12px rgba(59, 130, 246, 0.45);

          z-index: 2;
        }


        /* =========================================================
           MOBILE CARD
           ========================================================= */

        .mobile-feature-card {
          position: relative;

          width: 100%;
          min-width: 0;
          min-height: 76px;

          display: flex;
          align-items: center;

          gap: 12px;

          padding: 11px 13px;

          border-radius: 14px;

          box-shadow:
            0 5px 14px rgba(0, 0, 0, 0.13),
            0 12px 28px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);

          z-index: 3;

          transition:
            transform 200ms ease,
            box-shadow 200ms ease;
        }

        .mobile-feature-card:active {
          transform: scale(0.98);
        }


        /* =========================================================
           MOBILE CARD ICON
           ========================================================= */

        .mobile-icon-circle {
          width: 42px;
          height: 42px;

          flex: 0 0 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: radial-gradient(
            circle at 32% 28%,
            #4c86ff,
            #2a56d6 65%,
            #1c3fa8
          );

          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.08) inset,
            0 4px 10px rgba(45, 100, 240, 0.45);
        }

        .mobile-icon-circle svg {
          width: 20px;
          height: 20px;
        }


        /* =========================================================
           SMALL MOBILE
           ========================================================= */

        @media (max-width: 359px) {
          .mobile-flow::before {
            left: 23px;
          }

          .mobile-hub-wrapper {
            width: 48px;
            height: 48px;
          }

          .mobile-center-emblem {
            width: 48px;
            height: 48px;

            border-radius: 12px;
          }

          .mobile-center-emblem svg {
            width: 21px;
            height: 21px;
          }

          .mobile-flow-row {
            grid-template-columns:
              48px
              minmax(0, 1fr);

            column-gap: 8px;

            min-height: 86px;
          }

          .mobile-flow-row::before {
            left: 23px;
            width: 34px;
          }

          .mobile-junction {
            left: 19px;
          }

          .mobile-feature-card {
            gap: 8px;

            min-height: 72px;

            padding: 9px 10px;

            border-radius: 12px;
          }

          .mobile-icon-circle {
            width: 36px;
            height: 36px;

            flex-basis: 36px;
          }

          .mobile-icon-circle svg {
            width: 17px;
            height: 17px;
          }
        }


        /* =========================================================
           LARGE MOBILE
           ========================================================= */

        @media (min-width: 400px) and (max-width: 639px) {
          .mobile-feature-card {
            min-height: 82px;

            padding: 13px 15px;

            gap: 13px;
          }

          .mobile-icon-circle {
            width: 44px;
            height: 44px;

            flex-basis: 44px;
          }

          .mobile-icon-circle svg {
            width: 21px;
            height: 21px;
          }

          .mobile-flow-row {
            min-height: 96px;
          }
        }
      `}</style>


      {/* =========================================================
          DESKTOP / TABLET
          ========================================================= */}

      <div className="hidden sm:block bg-transparent scale-100 lg:scale-[1.15] lg:origin-center mt-8 lg:-mt-24">
        <div className="stage-container relative w-full mx-auto overflow-hidden">

          <header className="hero-header absolute top-[3.6%] left-0 right-0 text-center" />


          {/* Connector lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
            viewBox="0 0 1280 720"
            preserveAspectRatio="none"
          >
            {/* Glow */}
            <g>
              <path
                className="connector-glow"
                d="M485,247 L595,247 Q610,247 610,262 L610,430"
              />

              <path
                className="connector-glow"
                d="M792,247 L685,247 Q670,247 670,262 L670,430"
              />

              <path
                className="connector-glow"
                d="M458,417 L558,417 Q570,417 570,432 L570,530"
              />

              <path
                className="connector-glow"
                d="M820,417 L722,417 Q710,417 710,432 L710,530"
              />
            </g>


            {/* Normal line */}
            <g>
              <path
                className="connector-line"
                d="M485,247 L595,247 Q610,247 610,262 L610,430"
              />

              <path
                className="connector-line"
                d="M792,247 L685,247 Q670,247 670,262 L670,430"
              />

              <path
                className="connector-line"
                d="M458,417 L558,417 Q570,417 570,432 L570,530"
              />

              <path
                className="connector-line"
                d="M820,417 L722,417 Q710,417 710,432 L710,530"
              />
            </g>
          </svg>


          {/* =====================================================
              CARD 1
              ===================================================== */}

          <div
            className="
    feature-card
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
  "
          >
            <div className="card-icon-circle shrink-0 rounded-full flex items-center justify-center">
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
            className="
              feature-card
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
            "
          >
            <div className="card-icon-circle shrink-0 rounded-full flex items-center justify-center">

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
            className="
              feature-card
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
            "
          >
            <div className="card-icon-circle shrink-0 rounded-full flex items-center justify-center">

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
            className="
              feature-card
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
            "
          >
            <div className="card-icon-circle shrink-0 rounded-full flex items-center justify-center">

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
            className="
              dome-glow-svg
              absolute
              left-1/2
              top-[76.5%]
              -translate-x-1/2
              -translate-y-1/2
              z-[1]
              pointer-events-none
              overflow-visible
            "
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
            className="
              center-emblem
              absolute
              left-1/2
              top-[59.7%]
              -translate-x-1/2
              flex
              items-center
              justify-center
              z-[3]
            "
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

        <div className="mobile-flow">


          {/* =====================================================
              MOBILE HUB
              ===================================================== */}

          <div className="mobile-hub-wrapper">

            <div className="mobile-hub-glow" />

            <div className="mobile-center-emblem">

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

          <div className="mobile-flow-row">

            <span className="mobile-junction" />

            <div />

            <div
              className="
                mobile-feature-card
                bg-white/40
                border
                border-white/60
                dark:bg-[rgba(13,19,38,0.68)]
                dark:border-[rgba(94,148,255,0.20)]
                backdrop-blur-xl
              "
            >

              <div className="mobile-icon-circle">

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

          <div className="mobile-flow-row">

            <span className="mobile-junction" />

            <div />

            <div
              className="
                mobile-feature-card
                bg-white/40
                border
                border-white/60
                dark:bg-[rgba(13,19,38,0.68)]
                dark:border-[rgba(94,148,255,0.20)]
                backdrop-blur-xl
              "
            >

              <div className="mobile-icon-circle">

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

          <div className="mobile-flow-row">

            <span className="mobile-junction" />

            <div />

            <div
              className="
                mobile-feature-card
                bg-white/40
                border
                border-white/60
                dark:bg-[rgba(13,19,38,0.68)]
                dark:border-[rgba(94,148,255,0.20)]
                backdrop-blur-xl
              "
            >

              <div className="mobile-icon-circle">

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

          <div className="mobile-flow-row">

            <span className="mobile-junction" />

            <div />

            <div
              className="
                mobile-feature-card
                bg-white/40
                border
                border-white/60
                dark:bg-[rgba(13,19,38,0.68)]
                dark:border-[rgba(94,148,255,0.20)]
                backdrop-blur-xl
              "
            >

              <div className="mobile-icon-circle">

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