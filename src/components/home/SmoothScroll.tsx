"use client";

import { useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

import "lenis/dist/lenis.css";

/**
 * Wraps a route in Lenis smooth (inertial) scrolling.
 *
 * Mounted on the home page only, so leaving the page unmounts Lenis and
 * restores native scrolling everywhere else. Falls back to native scroll
 * when the user prefers reduced motion.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        // gentle glide — higher = longer coast
        duration: 1.15,
        // easeOutExpo: quick start, soft landing
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
