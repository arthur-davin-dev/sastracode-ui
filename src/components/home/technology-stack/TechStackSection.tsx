"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslations";


/**
 * TechStackSection
 * A responsive hub-and-spoke diagram with smooth orbiting animations
 * All outside icons orbit around the center simultaneously
 */

export type StackNode = {
  icon: React.ReactNode;
  /** x position in the internal 900x650 coordinate space */
  x: number;
  /** y position in the internal 900x650 coordinate space */
  y: number;
  /** ring/border color for this node's circle */
  ring?: string;
  /** orbit speed multiplier (default: 1) */
  orbitSpeed?: number;
  /** orbit radius multiplier (default: 1) */
  orbitRadius?: number;
};

const CANVAS_W = 900;
const CANVAS_H = 650;
const CENTER = { x: 438, y: 413 };

const defaultNodes: StackNode[] = [
  {
    icon: <img src="/home/technology-stack/html5-svgrepo-com.svg" alt="html" />,
    x: 331,
    y: 285,
    ring: "#2f6fed",
    orbitSpeed: 1.0,
    orbitRadius: 1.0
  },
  {
    icon: <img src="/home/technology-stack/css3-svgrepo-com.svg" alt="css" />,
    x: 438,
    y: 259,
    ring: "#e14e2c",
    orbitSpeed: 1.0,
    orbitRadius: 1.0
  },
  {
    icon: <img src="/home/technology-stack/java-svgrepo-com.svg" alt="java" />,
    x: 548,
    y: 285,
    ring: "#2f6fed",
    orbitSpeed: 1.0,
    orbitRadius: 1.0
  },
  {
    icon: <img src="/home/technology-stack/javascript.png" alt="javascript" />,
    x: 274,
    y: 386,
    ring: "#e14e2c",
    orbitSpeed: 1.0,
    orbitRadius: 1.0
  },
  {
    icon: <img src="/home/technology-stack/laravel-svgrepo-com.svg" alt="laravel" />,
    x: 609,
    y: 386,
    ring: "#e0b400",
    orbitSpeed: 1.0,
    orbitRadius: 1.0
  },
  {
    icon: <img src="/home/technology-stack/mysql-logo-svgrepo-com.svg" alt="mySql" />,
    x: 294,
    y: 499,
    ring: "#3aa876",
    orbitSpeed: 1.0,
    orbitRadius: 1.0
  },
  {
    icon: <img src="/home/technology-stack/python-svgrepo-com.svg" alt="python" />,
    x: 382,
    y: 573,
    ring: "#38bdf8",
    orbitSpeed: 1.0,
    orbitRadius: 1.0
  },
  {
    icon: <img src="/home/technology-stack/tailwind.svg" alt="tailwind" />,
    x: 497,
    y: 573,
    ring: "#2f6fed",
    orbitSpeed: 1.0,
    orbitRadius: 1.0
  },
  {
    icon: <img src="/home/technology-stack/vue.svg" alt="vue" />,
    x: 586,
    y: 499,
    ring: "#e0793c",
    orbitSpeed: 1.0,
    orbitRadius: 1.0
  },
];

// Orbiting node component with smooth animation
const OrbitingNode = ({
  node,
  index,
  totalNodes
}: {
  node: StackNode;
  index: number;
  totalNodes: number;
}) => {
  const pct = (v: number, total: number) => `${(v / total) * 100}%`;

  // Calculate orbit data
  const dx = node.x - CENTER.x;
  const dy = node.y - CENTER.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const startAngle = Math.atan2(dy, dx);
  const speed = node.orbitSpeed || 1;
  const radiusMultiplier = node.orbitRadius || 1;

  // Motion values for smooth animation
  const angle = useMotionValue(startAngle);
  const [isHovered, setIsHovered] = useState(false);

  // Animate the angle continuously
  useAnimationFrame((time, delta) => {
    const angleSpeed = 0.0005 * speed; // Speed factor
    angle.set(angle.get() + delta * angleSpeed);
  });

  // Calculate position based on current angle
  const x = useTransform(angle, (currentAngle) => {
    return CENTER.x + (distance * radiusMultiplier * Math.cos(currentAngle));
  });

  const y = useTransform(angle, (currentAngle) => {
    return CENTER.y + (distance * radiusMultiplier * Math.sin(currentAngle));
  });

  // Convert to percentage strings
  const xPct = useTransform(x, (val) => pct(val, CANVAS_W));
  const yPct = useTransform(y, (val) => pct(val, CANVAS_H));

  return (
    <motion.div
      className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 bg-white shadow-md dark:bg-slate-800 dark:shadow-xl transition-colors duration-300"
      style={{
        left: xPct,
        top: yPct,
        width: "9%",
        aspectRatio: "1 / 1",
        borderColor: node.ring ?? "#2f4fd6",
        zIndex: 10,
        cursor: "pointer",
      }}
      whileHover={{
        scale: 1.2,
        zIndex: 50,
        boxShadow:
          "0 0 35px rgba(96,165,250,.45), 0 10px 35px rgba(0,0,0,.45)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex h-[60%] w-[60%] items-center justify-center">
        {node.icon}
      </div>
    </motion.div>
  );
};

export default function TechStackSection({
  // badge = "UNDER THE HOOD",
  // heading = "Technology Stack",
  // subtitle = "Modern technologies powering a next-generation learning experience.",
  nodes = defaultNodes,
  centerLabel = "SastraCode",
  centerIcon,
  mascot,
  lineColor = "#f0a8a3",
}: {
  badge?: string;
  heading?: string;
  subtitle?: string;
  nodes?: StackNode[];
  centerLabel?: string;
  centerIcon?: React.ReactNode;
  mascot?: React.ReactNode;
  lineColor?: string;
}) {
  const [isClient, setIsClient] = useState(false);
  const pct = (v: number, total: number) => `${(v / total) * 100}%`;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentT = useTranslation();
  if (!isClient) {
    // Return a static version for SSR
    return (
      <section className="w-full overflow-hidden bg-white px-4 py-14 sm:px-8 dark:bg-gray-900 transition-colors duration-300">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="mb-4 rounded-full border border-[#c9d3f5] dark:border-blue-700 bg-[#eef1fd] dark:bg-blue-950 px-4 py-1 text-[11px] font-semibold tracking-wide text-[#3a52c9] dark:text-blue-300 transition-colors duration-300">
            {currentT.technologyStack.badge}
          </span>
          <h2 className="text-3xl font-extrabold text-[#0c1c4a] dark:text-white sm:text-4xl transition-colors duration-300">
            {currentT.technologyStack.title1}
          </h2>
          <p className="mt-3 text-sm text-[#4a5578] dark:text-gray-300 sm:text-base transition-colors duration-300">
            {currentT.technologyStack.description}
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-225" style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full overflow-hidden bg-white px-4 py-14 sm:px-8 dark:bg-gray-900 transition-colors duration-300">
      {/* header */}
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="mb-4 rounded-full border border-[#c9d3f5] dark:border-blue-700 bg-[#eef1fd] dark:bg-blue-950 px-4 py-1 text-[11px] font-semibold tracking-wide text-[#3a52c9] dark:text-blue-300 transition-colors duration-300">
          {currentT.technologyStack.badge}
        </span>
        <h2 className="text-3xl font-extrabold text-[#0c1c4a] dark:text-white sm:text-4xl transition-colors duration-300">
          {currentT.technologyStack.title1}
        </h2>
        <p className="mt-3 text-sm text-[#4a5578] dark:text-gray-300 sm:text-base transition-colors duration-300">
          {currentT.technologyStack.description}
        </p>
      </div>

      {/* diagram */}
      <div
        className="relative mx-auto w-full max-w-225"
        style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}
      >
        {/* Connecting lines - animated with pulse */}
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none"
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          preserveAspectRatio="none"
        >
          {nodes.map((n, i) => (
            <line
              key={i}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={n.x}
              y2={n.y}
              stroke={lineColor}
              strokeWidth="1.5"
              strokeDasharray="5 5"
              opacity="0.4"
              className="dark:opacity-30"
            >
              <animate
                attributeName="opacity"
                values="0.2;0.6;0.2"
                dur={`${3 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </line>
          ))}
        </svg>

        {/* Center hub - pulsing glow */}
        <style>{`
          @keyframes pulse-glow {
            0%, 100% { 
              box-shadow: 0 0 20px rgba(47, 79, 214, 0.3), 0 0 60px rgba(47, 79, 214, 0.1);
              transform: scale(1);
            }
            50% { 
              box-shadow: 0 0 40px rgba(47, 79, 214, 0.5), 0 0 80px rgba(47, 79, 214, 0.2);
              transform: scale(1.05);
            }
          }
          .center-hub {
            animation: pulse-glow 3s ease-in-out infinite;
          }
          @keyframes float-mascot {
            0%, 100% { transform: translateY(-5px) rotate(-2deg); }
            50% { transform: translateY(5px) rotate(2deg); }
          }
          .mascot-float {
            animation: float-mascot 4s ease-in-out infinite;
          }
          .dark .center-hub {
            animation: pulse-glow-dark 3s ease-in-out infinite;
          }
          @keyframes pulse-glow-dark {
            0%, 100% { 
              box-shadow: 0 0 20px rgba(96, 165, 250, 0.3), 0 0 60px rgba(96, 165, 250, 0.1);
              transform: scale(1);
            }
            50% { 
              box-shadow: 0 0 40px rgba(96, 165, 250, 0.5), 0 0 80px rgba(96, 165, 250, 0.2);
              transform: scale(1.05);
            }
          }
        `}</style>

        <div
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 bg-white shadow-lg dark:bg-slate-900 dark:border-blue-500 dark:shadow-blue-900/30 transition-colors duration-300"
          style={{
            left: pct(CENTER.x, CANVAS_W),
            top: pct(CENTER.y, CANVAS_H),
            width: "13%",
            aspectRatio: "1 / 1",
            borderColor: "#2f4fd6",
            zIndex: 30,
          }}
        >
          <div className="center-hub flex flex-col items-center justify-center gap-0.5 px-1 text-center w-full h-full rounded-full">
            {centerIcon}
            <span className="text-[10px] font-bold leading-tight text-[#0c1c4a] dark:text-white sm:text-xs md:text-sm transition-colors duration-300">
              {centerLabel}
            </span>
          </div>
        </div>

        {/* Orbiting nodes */}
        {nodes.map((node, index) => (
          <OrbitingNode
            key={index}
            node={node}
            index={index}
            totalNodes={nodes.length}
          />
        ))}

        {/* Mascot - floating up and down */}
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
            <div className="mascot-float">
              {mascot}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}