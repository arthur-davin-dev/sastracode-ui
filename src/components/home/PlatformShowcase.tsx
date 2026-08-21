"use client";

import Image from "next/image";
import { BookOpen, Gamepad2, Trophy, Sparkles } from "lucide-react";
import { forwardRef, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "@/hooks/useTranslations";


interface FeatureCardProps {
  icon: ReactNode;
  title: string;
}

const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(function FeatureCard(
  { icon, title },
  ref,
) {
  return (
    <div
      ref={ref}
      className="relative z-10 w-[48%] min-w-0 flex-none flex items-center gap-3 rounded-xl border-2 border-blue-500/60 bg-white/[0.03] px-3.5 py-3.5 backdrop-blur-sm shadow-[0_0_16px_rgba(59,130,246,0.25)]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-indigo-500 to-indigo-700 text-white shadow-[0_0_0_4px_rgba(99,102,241,0.15)] sm:h-12 sm:w-12">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-white sm:text-base">{title}</h3>
    </div>
  );
});

interface LinePaths {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
}

const featureIcons = [
  <BookOpen size={20} key="docs" />,
  <Sparkles size={20} key="ai" />,
  <Gamepad2 size={20} key="practice" />,
  <Trophy size={20} key="progress" />,
];

export function PlatformShowcase() {
  const currentT = useTranslation();

  const features = currentT.platformShowcase.features.map((f, i) => ({
    icon: featureIcons[i],
    title: f.title,
  }));

  const stackRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);

  const [paths, setPaths] = useState<LinePaths | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const stack = stackRef.current;
      const tl = topLeftRef.current;
      const tr = topRightRef.current;
      const bl = bottomLeftRef.current;
      const br = bottomRightRef.current;
      const hub = hubRef.current;
      if (!stack || !tl || !tr || !bl || !br || !hub) return;

      const sRect = stack.getBoundingClientRect();
      const point = (el: HTMLElement, edge: "bottom" | "top") => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - sRect.left,
          y: (edge === "bottom" ? r.bottom : r.top) - sRect.top,
        };
      };

      const hubP = point(hub, "top");

      const topRowBottom = Math.max(point(tl, "bottom").y, point(tr, "bottom").y);
      const bottomRowTop = Math.min(point(bl, "top").y, point(br, "top").y);
      const bottomRowBottom = Math.max(point(bl, "bottom").y, point(br, "bottom").y);

      const r = 10;
      const s = 5;

      const topGapY = (topRowBottom + bottomRowTop) / 2;
      const bottomGapY = bottomRowBottom + (hubP.y - bottomRowBottom) * 0.35;

      const linePath = (
        start: { x: number; y: number },
        laneY: number,
        laneX: number,
      ) => {
        const goingRight = laneX > start.x;
        return [
          `M${start.x} ${start.y}`,
          `L${start.x} ${laneY - r}`,
          `Q${start.x} ${laneY}, ${start.x + (goingRight ? r : -r)} ${laneY}`,
          `L${laneX + (goingRight ? -r : r)} ${laneY}`,
          `Q${laneX} ${laneY}, ${laneX} ${laneY + r}`,
          `L${laneX} ${hubP.y}`,
        ].join(" ");
      };

      setPaths({
        topLeft: linePath(point(tl, "bottom"), topGapY - s, hubP.x - 0.5 * s),
        topRight: linePath(point(tr, "bottom"), topGapY + s, hubP.x + 0.5 * s),
        bottomLeft: linePath(point(bl, "bottom"), bottomGapY - s, hubP.x - 1.5 * s),
        bottomRight: linePath(point(br, "bottom"), bottomGapY + s, hubP.x + 1.5 * s),
      });
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (stackRef.current) ro.observe(stackRef.current);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [currentT]);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-indigo-900/40 bg-gradient-to-b from-[#0B1020] via-[#0E1530] to-[#0B1020] px-6 py-6 sm:px-8 sm:py-8">
      <div ref={stackRef} className="relative flex flex-col items-center gap-5">
        <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible">
          <defs>
            <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {paths && (
            <>
              <path d={paths.topLeft} stroke="#60a5fa" strokeOpacity="0.85" strokeWidth="1.5" fill="none" filter="url(#lineGlow)" />
              <path d={paths.topRight} stroke="#60a5fa" strokeOpacity="0.85" strokeWidth="1.5" fill="none" filter="url(#lineGlow)" />
              <path d={paths.bottomLeft} stroke="#60a5fa" strokeOpacity="0.85" strokeWidth="1.5" fill="none" filter="url(#lineGlow)" />
              <path d={paths.bottomRight} stroke="#60a5fa" strokeOpacity="0.85" strokeWidth="1.5" fill="none" filter="url(#lineGlow)" />
            </>
          )}
        </svg>

        <div className="flex w-full justify-center gap-2 sm:gap-3">
          <FeatureCard ref={topLeftRef} {...features[0]} />
          <FeatureCard ref={topRightRef} {...features[1]} />
        </div>

        <div className="flex w-full justify-center gap-8 sm:gap-16">
          <FeatureCard ref={bottomLeftRef} {...features[2]} />
          <FeatureCard ref={bottomRightRef} {...features[3]} />
        </div>

        // After
        <div className="relative z-10 mt-4 flex items-center justify-center">
          <svg
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            width="420"
            height="180"
            viewBox="0 0 420 180"
          >
            <defs>
              <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" />
              </filter>
            </defs>
            <ellipse cx="210" cy="90" rx="200" ry="70" fill="none" stroke="#3b82f6" strokeOpacity="0.18" strokeWidth="2" filter="url(#ringGlow)" />
            <ellipse cx="210" cy="90" rx="150" ry="52" fill="none" stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="2" filter="url(#ringGlow)" />
            <ellipse cx="210" cy="90" rx="100" ry="35" fill="none" stroke="#60a5fa" strokeOpacity="0.45" strokeWidth="2" filter="url(#ringGlow)" />
            <ellipse cx="210" cy="90" rx="55" ry="20" fill="rgba(59,130,246,0.4)" filter="url(#ringGlow)" />
          </svg>

          <div
            ref={hubRef}
            className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white sm:h-[72px] sm:w-[72px]"
          >
            <Image src="/images/sastraCode.png" alt="SastraCode" width={44} height={44} />
          </div>
        </div>
      </div>
    </div>
  );
}