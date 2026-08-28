"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Reveals its <StaggerItem> children one after another as the group
 * scrolls into view.
 */
export function Stagger({
  children,
  className,
  gap = 0.1,
  delay = 0,
  amount = 0.2,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  /** seconds between each child */
  gap?: number;
  /** seconds before the first child */
  delay?: number;
  amount?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  distance = 24,
  duration = 0.5,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: distance },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduceMotion ? 0 : duration, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
