"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface TiltedCardProps {
  children: React.ReactNode;
  containerWidth?: string;
  containerHeight?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  className?: string;
}

const springConfig = { damping: 30, stiffness: 100, mass: 2 };

export default function TiltedCard({
  children,
  containerWidth = "100%",
  containerHeight = "auto",
  rotateAmplitude = 3,
  scaleOnHover = 1.00,
  className = "",
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);
  const scale = useSpring(1, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => scale.set(scaleOnHover)}
      onMouseLeave={handleMouseLeave}
      style={{ width: containerWidth, height: containerHeight }}
      className={`[perspective:900px] ${className}`}
    >
      <motion.div
        style={{ rotateX, rotateY, scale }}
        className="[transform-style:preserve-3d]"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}