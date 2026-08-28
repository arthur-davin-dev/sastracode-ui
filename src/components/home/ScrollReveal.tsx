"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, (d: number) => { x?: number; y?: number }> = {
  up: (d) => ({ y: d }),
  down: (d) => ({ y: -d }),
  left: (d) => ({ x: d }),
  right: (d) => ({ x: -d }),
  none: () => ({}),
};

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 28,
  duration = 0.55,
  blur = false,
  scale,
  amount = 0.16,
  once = true,
  className,
}: {
  children: ReactNode;
  /** stagger this block after siblings (seconds) */
  delay?: number;
  /** slide-in direction as the block enters the viewport */
  direction?: Direction;
  /** slide-in travel distance in px */
  distance?: number;
  /** transition length in seconds */
  duration?: number;
  /** also de-blur on reveal */
  blur?: boolean;
  /** start scale (e.g. 0.96) — omit to keep scale untouched */
  scale?: number;
  /** portion of the block that must be visible to trigger (0–1) */
  amount?: number;
  /** animate only the first time it enters */
  once?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const off = OFFSET[direction](distance);

  const hidden = {
    opacity: 0,
    ...off,
    ...(scale !== undefined ? { scale } : {}),
    ...(blur ? { filter: "blur(8px)" } : {}),
  };

  const visible = {
    opacity: 1,
    x: 0,
    y: 0,
    ...(scale !== undefined ? { scale: 1 } : {}),
    ...(blur ? { filter: "blur(0px)" } : {}),
  };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : hidden}
      whileInView={visible}
      viewport={{ once, amount }}
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
