"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";

interface CategoryOption {
  id: string;
  label: string;
}

interface CategoryFilterProps {
  categories: CategoryOption[];
  active: string[];
  counts: Record<string, number>;
  onToggle: (categoryId: string) => void;
}

export function CategoryFilter({
  categories,
  active,
  counts,
  onToggle,
}: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasDragged = useRef(false);
  const rafId = useRef<number | null>(null);

  /*
   * ===============================
   * MOMENTUM
   * ===============================
   */
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const momentumId = useRef<number | null>(null);

  const stopMomentum = () => {
    if (momentumId.current) {
      cancelAnimationFrame(momentumId.current);
      momentumId.current = null;
    }
  };

  /*
   * ===============================
   * MOUSE DOWN
   * ===============================
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;

    stopMomentum();

    isDown.current = true;
    hasDragged.current = false;

    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;

    scrollRef.current.style.scrollBehavior = "auto";

    velocity.current = 0;
    lastX.current = e.pageX;
    lastTime.current = Date.now();
  };

  /*
   * ===============================
   * MOUSE MOVE
   * ===============================
   */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;

    e.preventDefault();

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;

    /*
     * Detect dragging so clicking a category
     * after dragging doesn't trigger it.
     */
    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
    }

    /*
     * Calculate drag velocity for momentum.
     */
    const now = Date.now();
    const dt = now - lastTime.current;

    if (dt > 0) {
      velocity.current = (e.pageX - lastX.current) / dt;
    }

    lastX.current = e.pageX;
    lastTime.current = now;

    /*
     * Update horizontal scroll.
     */
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft =
          scrollLeft.current - walk;
      }
    });
  };

  /*
   * ===============================
   * START MOMENTUM
   * ===============================
   */
  const startMomentum = () => {
    const decay = 0.95;

    const step = () => {
      if (
        !scrollRef.current ||
        Math.abs(velocity.current) < 0.02
      ) {
        momentumId.current = null;
        return;
      }

      scrollRef.current.scrollLeft -=
        velocity.current * 16;

      velocity.current *= decay;

      momentumId.current =
        requestAnimationFrame(step);
    };

    momentumId.current =
      requestAnimationFrame(step);
  };

  /*
   * ===============================
   * STOP DRAGGING
   * ===============================
   */
  const stopDragging = () => {
    if (!isDown.current) return;

    isDown.current = false;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }

    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = "";
    }

    startMomentum();
  };

  /*
   * Prevent category click when
   * user was dragging.
   */
  const handleClickCapture = (
    e: React.MouseEvent,
  ) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onClickCapture={handleClickCapture}
      className="
        category-scroll
        flex
        min-w-0
        flex-1
        items-center
        gap-2
        overflow-x-auto
        pb-3
        select-none
        cursor-grab
        active:cursor-grabbing

        sm:gap-3
      "
    >
      {categories.map(({ id, label }) => {
        const isActive = active.includes(id);
        const count = counts[id] ?? 0;

        return (
          <Button
            key={id}
            type="button"
            onClick={() => onToggle(id)}
            variant={isActive ? "default" : "outline"}
            className={`
              h-9
              flex-shrink-0
              whitespace-nowrap
              rounded-full
              px-4
              text-sm
              font-medium
              transition-all
              duration-300

              ${
                isActive
                  ? `
                    border-primary-color
                    bg-primary-color
                    text-white

                    shadow-sm

                    hover:bg-primary-color
                    hover:text-white
                    hover:opacity-90

                    dark:border-primary-color
                    dark:bg-primary-color
                    dark:text-white

                    dark:hover:bg-primary-color
                    dark:hover:text-white
                    dark:hover:opacity-90
                  `
                  : `
                    border-slate-200/80
                    bg-white/70
                    text-slate-600

                    hover:border-primary-color/40
                    hover:bg-primary-color/5
                    hover:text-primary-color

                    dark:border-slate-800
                    dark:bg-slate-900/80
                    dark:text-slate-300

                    dark:hover:border-primary-color/50
                    dark:hover:bg-primary-color/10
                    dark:hover:text-primary-color
                  `
              }
            `}
          >
            {isActive
              ? `${label} (${count})`
              : label}
          </Button>
        );
      })}
    </div>
  );
}