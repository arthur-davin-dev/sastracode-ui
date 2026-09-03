"use client";

import Image from "next/image";
import { outerLogos, innerLogos } from "@/lib/data/documentation";

export default function HeroVisual() {
  return (
    <div
      className="
        relative mx-auto
        h-[300px] w-[300px]
        sm:h-[400px] sm:w-[400px]
        md:h-[480px] md:w-[480px]
        lg:h-[540px] lg:w-[540px]
        pointer-events-none
        select-none
        animate-bob
      "
    >
      {/* =========================================================
          SOFT BLUE HALO
      ========================================================== */}
      <div
        className="
          absolute
          left-1/2 top-[54%]
          z-0
          h-[90%] w-[90%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(147,197,253,0.45)_0%,rgba(191,219,254,0.25)_50%,transparent_72%)]
          blur-2xl
        "
      />

      {/* =========================================================
          BACK PORTAL
          Everything here stays behind the girls/laptop
      ========================================================== */}
      <svg
        viewBox="0 0 500 500"
        className="
          absolute
          left-1/2 top-[54%]
          z-[1]
          h-[104%] w-[104%]
          -translate-x-1/2
          -translate-y-1/2
          overflow-visible
        "
      >
        <defs>
          <filter
            id="portalGlow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="5" result="blur" />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient
            id="portalGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#dbeafe" />
            <stop offset="70%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* outer faint circle */}
        <circle
          cx="250"
          cy="250"
          r="205"
          fill="none"
          stroke="#dbeafe"
          strokeWidth="1.5"
          opacity="0.38"
        />

        {/* second ring */}
        <circle
          cx="250"
          cy="250"
          r="190"
          fill="none"
          stroke="#bfdbfe"
          strokeWidth="2"
          opacity="0.45"
        />

        {/* white glowing ring */}
        <circle
          cx="250"
          cy="250"
          r="177"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          opacity="0.6"
          filter="url(#portalGlow)"
        />

        {/* main blue ring */}
        <circle
          cx="250"
          cy="250"
          r="165"
          fill="none"
          stroke="url(#portalGradient)"
          strokeWidth="4"
          opacity="0.95"
          filter="url(#portalGlow)"
        />

        {/* inner white ring */}
        <circle
          cx="250"
          cy="250"
          r="155"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.7"
          opacity="0.72"
          filter="url(#portalGlow)"
        />

        {/* top-left decorative arc */}
        <path
          d="M 96 215 A 170 170 0 0 1 230 83"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.55"
          filter="url(#portalGlow)"
        />

        {/* top-right decorative arc */}
        <path
          d="M 286 84 A 170 170 0 0 1 410 210"
          fill="none"
          stroke="#bfdbfe"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.55"
          filter="url(#portalGlow)"
        />

        {/* light particles */}
        <circle
          cx="120"
          cy="120"
          r="4"
          fill="white"
          opacity="0.9"
          filter="url(#portalGlow)"
        />

        <circle
          cx="380"
          cy="118"
          r="4"
          fill="white"
          opacity="0.9"
          filter="url(#portalGlow)"
        />

        <circle
          cx="425"
          cy="265"
          r="3"
          fill="#dbeafe"
          opacity="0.9"
          filter="url(#portalGlow)"
        />
      </svg>

      {/* =========================================================
          GIRLS + LAPTOP IMAGE

          NEW: mask added so any part of the photo that falls
          outside the portal circle (like the skirt at the bottom
          corners) fades to transparent instead of showing a hard
          rectangle edge.

          Center of the fade (50% 54%) matches the portal circle's
          own center. Adjust the two percent numbers below (35%
          and 55%) if you want the fade to start sooner/later:
          - 35% = where fade starts (fully visible before this)
          - 55% = where it's fully gone (invisible after this)
      ========================================================== */}
      <div
        className="absolute inset-0 z-10"
        style={{
          WebkitMaskImage:
            "linear-gradient(black 60%, transparent 80%), radial-gradient(circle at 50% 100%, black 0%, transparent 15%), radial-gradient(circle at 50% 54%, black 0%, black 10%, transparent 42%)",
          maskImage:
            "linear-gradient(black 60%, transparent 80%), radial-gradient(circle at 50% 100%, black 0%, transparent 15%), radial-gradient(circle at 50% 54%, black 0%, black 10%, transparent 42%)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        <Image
          src="/images/doc-hero-image-transparent.png"
          alt="សិស្សសាស្ត្រាកូដកំពុងកាន់កុំព្យូទ័រយួរដៃ"
          fill
          priority
          sizes="
            (max-width: 640px) 300px,
            (max-width: 768px) 400px,
            (max-width: 1024px) 480px,
            540px
          "
          className="
            object-contain
            object-center
            drop-shadow-[0_20px_30px_rgba(37,99,235,0.15)]
          "
        />
      </div>

      {/* =========================================================
          NEW — LOWER PORTAL SOFT BLUR

          This is the only new effect.

          z-[15]:
          girls = z-10
          blur  = z-15
          front ring = z-20

          So the blur blends into the front portal nicely.
      ========================================================== */}
      <div
        className="
          absolute
          left-1/2
          top-[76%]
          z-[15]

          h-[34%]
          w-[82%]

          -translate-x-1/2
          -translate-y-1/2

          rounded-[50%]

          bg-[radial-gradient(ellipse_at_center,rgba(147,197,253,0.42)_0%,rgba(191,219,254,0.30)_32%,rgba(219,234,254,0.17)_53%,rgba(255,255,255,0.06)_67%,transparent_80%)]

          blur-[45px]
          opacity-90
        "
      />

      {/* Extra very-soft wide glow around bottom */}
      <div
        className="
          absolute
          left-1/2
          top-[79%]
          z-[14]

          h-[24%]
          w-[95%]

          -translate-x-1/2
          -translate-y-1/2

          rounded-[50%]

          bg-[radial-gradient(ellipse_at_center,rgba(191,219,254,0.24)_0%,rgba(219,234,254,0.13)_45%,transparent_75%)]

          blur-[55px]
          opacity-80
        "
      />

      {/* =========================================================
          FRONT PORTAL

          Keep current good version.
          Mask removes portal part crossing laptop.
      ========================================================== */}
      <svg
        viewBox="0 0 500 500"
        className="
          absolute
          left-1/2 top-[54%]
          z-20
          h-[104%] w-[104%]
          -translate-x-1/2
          -translate-y-1/2
          overflow-visible
        "
      >
        <defs>
          {/* strong front glow */}
          <filter
            id="frontGlow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="6" result="blur" />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* front portal gradient */}
          <linearGradient
            id="frontGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="20%" stopColor="#bfdbfe" />
            <stop offset="45%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#ffffff" />
            <stop offset="80%" stopColor="#bfdbfe" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>

          {/* =====================================================
              LAPTOP MASK

              WHITE = show portal
              BLACK = hide portal
          ====================================================== */}
          <mask
            id="frontPortalLaptopMask"
            x="0"
            y="0"
            width="500"
            height="500"
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
          >
            {/* everything visible by default */}
            <rect
              x="0"
              y="0"
              width="500"
              height="500"
              fill="white"
            />

            {/* current good laptop cutout */}
            <path
              d="
                M 72 286
                L 143 286
                L 167 299
                L 181 318
                L 169 336
                L 130 337
                L 96 326
                L 76 310
                Z
              "
              fill="black"
            />

            {/* small extra cutout around remaining laptop overlap */}
            <path
              d="
                M 62 292
                L 100 292
                L 113 318
                L 101 340
                L 76 336
                L 62 316
                Z
              "
              fill="black"
            />
          </mask>
        </defs>

        {/* all front portal lines use laptop mask */}
        <g mask="url(#frontPortalLaptopMask)">
          {/* main bright front ring */}
          <path
            d="M 92 300 A 165 165 0 0 0 408 300"
            fill="none"
            stroke="url(#frontGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#frontGlow)"
          />

          {/* inner white ring */}
          <path
            d="M 103 305 A 155 155 0 0 0 397 305"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.9"
            filter="url(#frontGlow)"
          />

          {/* subtle outer blue ring */}
          <path
            d="M 82 293 A 175 175 0 0 0 418 293"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.35"
            filter="url(#frontGlow)"
          />
        </g>
      </svg>

      {/* =========================================================
          FLOATING LIGHTS
      ========================================================== */}
      <span
        className="
          absolute
          left-[21%] top-[24%]
          z-30
          h-2 w-2
          rounded-full
          bg-white
          shadow-[0_0_10px_3px_rgba(147,197,253,0.9)]
          animate-pulse
        "
      />

      <span
        className="
          absolute
          right-[20%] top-[27%]
          z-30
          h-1.5 w-1.5
          rounded-full
          bg-white
          shadow-[0_0_10px_3px_rgba(147,197,253,0.8)]
          animate-pulse
        "
      />

      <span
        className="
          absolute
          right-[13%] bottom-[30%]
          z-30
          h-2 w-2
          rounded-full
          bg-blue-100
          shadow-[0_0_12px_4px_rgba(96,165,250,0.75)]
          animate-pulse
        "
      />

      {/* =========================================================
          OUTER LOGOS
      ========================================================== */}
      <div
        className="
          absolute
          left-1/2 top-1/2
          z-40
          h-[108%] w-[108%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
        "
      >
        <div className="absolute inset-0 animate-spin-slow">
          {outerLogos.map((logo) => (
            <div key={logo.name} className={`absolute ${logo.positionClass}`}>
              <div
                className={`
                  flex
                  h-12 w-12
                  sm:h-14 sm:w-14
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/70
                  bg-white/90
                  p-2.5
                  sm:p-3
                  shadow-[0_8px_30px_rgba(59,130,246,0.15)]
                  backdrop-blur-md
                  dark:border-slate-700
                  dark:bg-slate-900/90
                  animate-counter-spin
                `}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={logo.imgSrc}
                    alt={`${logo.name} logo`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================
          INNER LOGOS
      ========================================================== */}
      <div
        className="
          absolute
          left-1/2 top-1/2
          z-40
          h-[84%] w-[84%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
        "
      >
        <div className="absolute inset-0 animate-spin-slow-reverse">
          {innerLogos.map((logo) => (
            <div key={logo.name} className={`absolute ${logo.positionClass}`}>
              <div
                className={`
                  flex
                  h-12 w-12
                  sm:h-14 sm:w-14
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/70
                  bg-white/90
                  p-2.5
                  sm:p-3
                  shadow-[0_8px_30px_rgba(59,130,246,0.15)]
                  backdrop-blur-md
                  dark:border-slate-700
                  dark:bg-slate-900/90
                  animate-counter-spin-reverse
                `}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={logo.imgSrc}
                    alt={`${logo.name} logo`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}