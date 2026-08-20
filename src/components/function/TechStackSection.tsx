"use client";

import React, { useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useTranslation } from "@/hooks/useTranslations";

export type StackNode = {
  iconSrc?: string;
  fallbackText?: string;
  /** Radius of the circular orbit from the center (in px) */
  radius: number;
  /** Starting angle in degrees (0 to 360) */
  startAngle: number;
  /** Ring/border color for this node's circle */
  ring?: string;
  /** Orbit speed multiplier (default: 1) */
  orbitSpeed?: number;
};

const CANVAS_W = 900;
const CANVAS_H = 650;
const CENTER = { x: 450, y: 325 };

// Safe Image Component that handles broken asset links without showing raw 'alt' text
const NodeIcon = ({ src, label }: { src?: string; label: string }) => {
  const [hasError, setHasError] = useState(!src);

  if (hasError || !src) {
    return (
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
        {label.slice(0, 3)}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      onError={() => setHasError(true)}
      className="h-full w-full object-contain p-1"
    />
  );
};

const defaultNodes: StackNode[] = [
  {
    iconSrc: "/home/technology-stack/html5-svgrepo-com.svg",
    fallbackText: "HTML",
    radius: 180,
    startAngle: 0,
    ring: "#e14e2c", // Swapped to match HTML orange logo
  },
  {
    iconSrc: "/home/technology-stack/css3-svgrepo-com.svg",
    fallbackText: "CSS",
    radius: 180,
    startAngle: 51.4,
    ring: "#2f6fed", // Swapped to match CSS blue logo
  },
  {
    iconSrc: "/home/technology-stack/javascript.png",
    fallbackText: "JS",
    radius: 180,
    startAngle: 102.8,
    ring: "#f7df1e",
  },
  {
    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    fallbackText: "NODE",
    radius: 180,
    startAngle: 154.2,
    ring: "#68a063",
  },
  {
    iconSrc: "/home/technology-stack/java-svgrepo-com.svg",
    fallbackText: "JAVA",
    radius: 180,
    startAngle: 205.6,
    ring: "#2f6fed",
  },
  {
    iconSrc: "/home/technology-stack/tailwind.svg",
    fallbackText: "TW",
    radius: 180,
    startAngle: 257.0,
    ring: "#38bdf8",
  },
  {
    iconSrc: "/home/technology-stack/python-svgrepo-com.svg",
    fallbackText: "PY",
    radius: 180,
    startAngle: 308.4,
    ring: "#2f6fed",
  },
];

const OrbitingNode = ({
  node,
  lineColor,
}: {
  node: StackNode;
  lineColor: string;
}) => {
  const pct = (v: number, total: number) => `${(v / total) * 100}%`;

  // Circular motion math
  const initialRadians = (node.startAngle * Math.PI) / 180;
  const speed = node.orbitSpeed || 0.5;
  const angle = useMotionValue(initialRadians);

  useAnimationFrame((_, delta) => {
    const angleSpeed = 0.0005 * speed;
    angle.set(angle.get() + delta * angleSpeed);
  });

  // Precise circular X and Y calculations
  const x = useTransform(angle, (a) => CENTER.x + node.radius * Math.cos(a));
  const y = useTransform(angle, (a) => CENTER.y + node.radius * Math.sin(a));

  const xPct = useTransform(x, (val) => pct(val, CANVAS_W));
  const yPct = useTransform(y, (val) => pct(val, CANVAS_H));
  const lineRotation = useTransform(angle, (a) => (a * 180) / Math.PI);

  return (
    <>
      {/* Connecting Spoke Line */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: pct(CENTER.x, CANVAS_W),
          top: pct(CENTER.y, CANVAS_H),
          width: `${node.radius}px`,
          height: "1.5px",
          borderRadius: 999,
          background: lineColor,
          opacity: 0.3,
          transformOrigin: "0 50%",
          rotate: lineRotation,
        }}
      />

      {/* Orbiting Node Icon */}
      <motion.div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 bg-white shadow-md dark:bg-slate-800 dark:shadow-xl transition-colors duration-300"
        style={{
          left: xPct,
          top: yPct,
          width: "8%",
          aspectRatio: "1 / 1",
          borderColor: node.ring ?? "#2f4fd6",
          zIndex: 10,
          cursor: "pointer",
        }}
        whileHover={{
          scale: 1.25,
          zIndex: 50,
          boxShadow: "0 0 25px rgba(96,165,250,.5)",
        }}
      >
        <div className="flex h-[65%] w-[65%] items-center justify-center">
          <NodeIcon src={node.iconSrc} label={node.fallbackText || "Tech"} />
        </div>
      </motion.div>
    </>
  );
};

export default function TechStackSection({
  nodes = defaultNodes,
  centerLabel = "SastraCode",
  centerIcon,
  mascot,
  lineColor = "#f0a8a3",
}: {
  nodes?: StackNode[];
  centerLabel?: string;
  centerIcon?: React.ReactNode;
  mascot?: React.ReactNode;
  lineColor?: string;
}) {
  const pct = (v: number, total: number) => `${(v / total) * 100}%`;
  const currentT = useTranslation();

  return (
    <section className="flex w-full overflow-hidden bg-white px-4 py-14 sm:px-8 dark:bg-gray-900 transition-colors duration-300 items-center justify-between">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="mb-4 rounded-full border border-[#c9d3f5] dark:border-blue-700 bg-[#eef1fd] dark:bg-blue-950 px-4 py-1 text-[11px] font-semibold tracking-wide text-[#3a52c9] dark:text-blue-300">
          {currentT.technologyStack.badge}
        </span>
        <h2 className="text-3xl font-extrabold text-[#0c1c4a] dark:text-white sm:text-4xl">
          {currentT.technologyStack.title1}
        </h2>
        <p className="mt-3 text-sm text-[#4a5578] dark:text-gray-300 sm:text-base">
          {currentT.technologyStack.description}
        </p>
      </div>

      <div
        className="relative mx-auto w-full max-w-225"
        style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}
      >
        {/* Orbit Path Guide Line */}
        <div
          className="absolute rounded-full border border-dashed border-slate-300 dark:border-slate-700 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            left: pct(CENTER.x, CANVAS_W),
            top: pct(CENTER.y, CANVAS_H),
            width: `${180 * 2}px`,
            height: `${180 * 2}px`,
            opacity: 0.5,
          }}
        />

        {/* Center Hub */}
        <div
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 bg-white shadow-lg dark:bg-slate-900 dark:border-blue-500"
          style={{
            left: pct(CENTER.x, CANVAS_W),
            top: pct(CENTER.y, CANVAS_H),
            width: "12%",
            aspectRatio: "1 / 1",
            borderColor: "#2f4fd6",
            zIndex: 30,
          }}
        >
          <div className="flex flex-col items-center justify-center gap-0.5 px-1 text-center w-full h-full rounded-full">
            {centerIcon}
            <span className="text-[10px] font-bold leading-tight text-[#0c1c4a] dark:text-white sm:text-xs">
              {centerLabel}
            </span>
          </div>
        </div>

        {/* Orbiting Nodes */}
        {nodes.map((node, index) => (
          <OrbitingNode key={index} node={node} lineColor={lineColor} />
        ))}

        {mascot && (
          <div
            className="absolute hidden -translate-x-1/2 -translate-y-1/2 sm:block"
            style={{
              left: pct(105, CANVAS_W),
              top: pct(487, CANVAS_H),
              width: "12%",
              zIndex: 20,
            }}
          >
            <div>{mascot}</div>
          </div>
        )}
      </div>
    </section>
  );
}