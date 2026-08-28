"use client";

import React from "react";
import { Bot, FileText, Gamepad2, Trophy, FlaskConical } from "lucide-react";

import styles from "./PlatformShowcase.module.css";
import { useTranslation } from "@/hooks/useTranslations";

const FEATURE_ICONS = [FileText, Bot, Gamepad2, Trophy];

const DESKTOP_POSITIONS = [
  { left: "5.63%", top: "19.5%", width: "32.3%", height: "22%" },
  { left: "61.88%", top: "19.5%", width: "32.3%", height: "22%" },
  { left: "4.45%", top: "46.3%", width: "31.3%", height: "22%" },
  { left: "64.06%", top: "46.3%", width: "31.3%", height: "22%" },
];

const SECTION_POSITIONS = [
  { left: "5.63%", top: "16.5%", width: "32.3%", height: "28%" },
  { left: "61.88%", top: "16.5%", width: "32.3%", height: "28%" },
  { left: "4.45%", top: "43.3%", width: "31.3%", height: "28%" },
  { left: "64.06%", top: "43.3%", width: "31.3%", height: "28%" },
];

const CONNECTOR_PATHS = [
  "M485,250 L510,250 Q610,250 610,350 L610,525", // Path 1 (100px huge curve radius)
  "M792,250 L770,250 Q670,250 670,350 L670,525", // Path 2 (100px huge curve radius)
  // "M458,470 L558,470 Q570,470 570,485 L570,586",
  // "M820,470 L722,470 Q710,470 710,485 L710,586",
  "M458,470 L520,470 Q570,470 570,520 L570,586", // Path 3 (Increased curve radius)
  "M820,470 L760,470 Q710,470 710,520 L710,586", // Path 4 (Increased curve radius)
];

type ShowcaseFeature = { title: string; description: string };

export default function PlatformShowcase({
  features: featuresProp,
  variant = "banner",
}: {
  features?: ShowcaseFeature[];
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
      {/* DESKTOP LAYOUT */}
      <div className={desktopWrapperClass}>
        <div
          className={`${styles.stageContainer} ${variant === "section" ? styles.stageSection : ""
            } relative w-full mx-auto overflow-hidden`}
        >
          <header className={`${styles.heroHeader} absolute top-[3.2%] left-0 right-0 text-center`} />

          {/* Connector lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
            viewBox="0 0 1280 820"
            preserveAspectRatio="none"
          >
            {/* Base background line */}
            <g>
              {CONNECTOR_PATHS.map((d) => (
                <path key={d} className={styles.connectorLine} d={d} />
              ))}
            </g>

            {/* Outer glow background */}
            <g>
              {CONNECTOR_PATHS.map((d) => (
                <path key={d} className={styles.connectorGlow} d={d} />
              ))}
            </g>

            {/* Moving Light Flash / Pulse along the path */}
            <g>
              {CONNECTOR_PATHS.map((d, i) => (
                <path
                  key={d}
                  className={styles.connectorFlash}
                  style={{ animationDelay: `${i * 0.45}s` }}
                  d={d}
                />
              ))}
            </g>
          </svg>

          {/* Desktop Feature Cards */}
          {features.map((feature, i) => {
            const Icon = FEATURE_ICONS[i];

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
                  z-[2]
                  transition-all
                  duration-300
                  ease-in-out
                `}
              >
                <div className={`${styles.cardIconCircle} shrink-0 rounded-full flex items-center justify-center`}>
                  <Icon className="text-white" strokeWidth={2} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className={`${styles.cardTitle} text-balance ${variant === "section" ? "" : "line-clamp-1"}`}>
                    {feature.title}
                  </h3>

                  <span className={`${styles.cardDescription} text-balance ${variant === "section" ? "line-clamp-3" : "line-clamp-2"}`}>
                    {feature.description}
                  </span>
                </div>
              </div>
            );
          })}

          {/* 3D CONCENTRIC ENERGY STAGE PLATFORM */}
          <svg
            className={`
            ${styles.domeGlowSvg}
            absolute
            left-1/2
            top-[80%]
            -translate-x-1/2
            -translate-y-1/2
            z-[1]
            pointer-events-none
            overflow-visible
          `}
            viewBox="0 0 1000 450"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Light Mode Radial Gradients (Fade outer-to-inner / less visible to visible) */}
              <radialGradient id="tier1LightGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b8cff" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#3b8cff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#3b8cff" stopOpacity="0.15" />
              </radialGradient>

              <radialGradient id="tier2LightGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
                <stop offset="80%" stopColor="#2563eb" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.2" />
              </radialGradient>

              <radialGradient id="tier3LightGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.3" />
              </radialGradient>

              {/* Dark Mode Linear Gradients */}
              <linearGradient id="tier1Top" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--ps-tier1-stop1)" stopOpacity="0.95" />
                <stop offset="100%" stopColor="var(--ps-tier1-stop2)" stopOpacity="0.98" />
              </linearGradient>

              <linearGradient id="tier2Top" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--ps-tier2-stop1)" stopOpacity="0.98" />
                <stop offset="100%" stopColor="var(--ps-tier2-stop2)" stopOpacity="1" />
              </linearGradient>

              <radialGradient id="baseGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--ps-stage-glow-start)" stopOpacity="0.55" />
                <stop offset="50%" stopColor="var(--ps-stage-glow-mid)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0757ff" stopOpacity="0" />
              </radialGradient>

              {/* Light Mode Shadow Filter (tier1 only) — plain blur, applied to a
                  dedicated solid shape below, since feDropShadow reads the source's
                  alpha and tier1's light-mode fill/stroke are too translucent for
                  a drop-shadow to read from directly. */}
              <filter id="tier1ShadowBlurLight" x="-50%" y="-50%" width="200%" height="220%">
                <feGaussianBlur stdDeviation="11" />
              </filter>

              {/* Dark Mode Shadow Filters */}
              <filter id="tier1Shadow" x="-50%" y="-50%" width="200%" height="220%">
                <feDropShadow dx="0" dy="22" stdDeviation="12" floodColor="var(--ps-tier1-shadow-dark)" floodOpacity="0.85" />
                <feDropShadow dx="0" dy="-12" stdDeviation="14" floodColor="var(--ps-tier1-shadow-light)" floodOpacity="1" />
              </filter>

              <filter id="tier2Shadow" x="-30%" y="-30%" width="160%" height="180%">
                <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.75" />
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#020a24" floodOpacity="0.6" />
              </filter>

              <filter id="tier3Shadow" x="-30%" y="-40%" width="160%" height="200%">
                <feDropShadow dx="0" dy="8" stdDeviation="5" floodColor="var(--ps-tier3-shadow-dark)" />
                <feDropShadow dx="0" dy="-5" stdDeviation="6" floodColor="var(--ps-tier3-shadow-light)" />
              </filter>
            </defs>

            {/* Outer Glow Ellipse */}
            <ellipse cx="500" cy="225" rx="460" ry="120" fill="url(#baseGlow)" />

            {/* Tier 1 dedicated shadow shape — solid fill so the blur is actually
                visible; only shown in light mode (hidden in dark mode via CSS,
                since dark mode gets its shadow from tier1Group's own filter). */}
            <ellipse
              className={styles.tier1ShadowOnly}
              cx="500"
              cy="241"
              rx="380"
              ry="88"
              fill="#1d4ed8"
              filter="url(#tier1ShadowBlurLight)"
            />

            {/* Tier 1 (Outer Ring - Softest visibility with shadow) */}
            <g id="3d-tier-1" className={styles.tier1Group}>
              <ellipse cx="500" cy="225" rx="390" ry="95" fill="var(--ps-tier1-fill)" />
              <ellipse
                cx="500"
                cy="225"
                rx="390"
                ry="95"
                fill="none"
                stroke="var(--ps-tier1-stroke)"
                strokeWidth="2.5"
                strokeOpacity="0.85"
              />
            </g>

            {/* Tier 2 (Middle Ring - Medium visibility) */}
            <g id="3d-tier-2" className={styles.tier2Group}>
              <ellipse cx="500" cy="210" rx="270" ry="66" fill="var(--ps-tier2-fill)" />
              <ellipse
                cx="500"
                cy="210"
                rx="270"
                ry="66"
                fill="none"
                stroke="var(--ps-tier2-stroke)"
                strokeWidth="2"
                strokeOpacity="0.95"
              />
            </g>

            {/* Tier 3 (Inner Ring - Highest visibility) */}
            <g id="3d-tier-3" className={styles.tier3Group}>
              <ellipse cx="500" cy="195" rx="150" ry="37" fill="var(--ps-tier3-fill)" />
              <ellipse
                cx="500"
                cy="195"
                rx="150"
                ry="37"
                fill="none"
                stroke="rgba(244, 248, 255, 0.9)"
                strokeWidth="2"
                strokeOpacity="0.95"
              />
            </g>
          </svg>
          <div
            className={`
              ${styles.centerEmblem}
              absolute
              left-1/2
              top-[70%] /* Shifted down from top-[62.5%] */
              -translate-x-1/2
              -translate-y-1/2
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

      {/* MOBILE LAYOUT */}
      {/* MOBILE LAYOUT */}
      <div className="sm:hidden w-full px-4 py-6">
        <div className={styles.mobileTimelineContainer}>
          {/* Central Vertical Track Line */}
          <div className={styles.mobileStemLine} />

          {/* Top Main Emblem Node */}
          <div className={styles.mobileTopNode}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-white"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>

          {/* Vertical Worm animation container */}
          <div className={styles.mobileVerticalWormTrack}>
            <div className={styles.mobileVerticalWorm} />
          </div>

          {/* Feature Card Rows */}
          <div className="space-y-5 pt-6">
            {features.map((feature, i) => {
              const Icon = FEATURE_ICONS[i];

              return (
                <div key={feature.title} className={styles.mobileTimelineRow}>
                  {/* Junction Dot */}
                  <div className={styles.mobileTimelineDot} />

                  {/* Horizontal Branch Base Line */}
                  <div className={styles.mobileBranchLine} />

                  {/* Horizontal Shoot Worm */}
                  <div
                    className={styles.mobileBranchWorm}
                    style={{ animationDelay: `${0.55 + i * 0.55}s` }}
                  />

                  {/* Feature Card */}
                  <div className={styles.mobileFeatureCard}>
                    <div className={`${styles.mobileIconCircle} shrink-0`}>
                      <Icon className="text-white w-5 h-5" strokeWidth={2} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className={styles.mobileCardTitle}>{feature.title}</h3>
                      <span className={styles.mobileCardDesc}>{feature.description}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}