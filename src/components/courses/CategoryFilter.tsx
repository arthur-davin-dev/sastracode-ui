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

  // for momentum
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;

    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
    }

    // track speed for momentum
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (e.pageX - lastX.current) / dt;
    }
    lastX.current = e.pageX;
    lastTime.current = now;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
      }
    });
  };

  const startMomentum = () => {
    const decay = 0.95; // closer to 1 = glides longer, lower = stops sooner

    const step = () => {
      if (!scrollRef.current || Math.abs(velocity.current) < 0.02) {
        momentumId.current = null;
        return;
      }
      scrollRef.current.scrollLeft -= velocity.current * 16;
      velocity.current *= decay;
      momentumId.current = requestAnimationFrame(step);
    };

    momentumId.current = requestAnimationFrame(step);
  };

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

  const handleClickCapture = (e: React.MouseEvent) => {
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
      className="category-scroll flex flex-1 min-w-0 items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none pb-3 cursor-grab active:cursor-grabbing select-none"
    >
      {categories.map(({ id, label }) => {
        const isActive = active.includes(id);
        const count = counts[id] ?? 0;

        return (
          <Button
            key={id}
            onClick={() => onToggle(id)}
            variant={isActive ? "default" : "outline"}
            className={`h-9 flex-shrink-0 whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors duration-300 ${
              isActive
                ? "bg-indigo-800 dark:bg-indigo-600 text-white hover:bg-indigo-900 dark:hover:bg-indigo-500 border-transparent shadow-sm"
                : "border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {isActive ? `${label} (${count})` : label}
          </Button>
        );
      })}
    </div>
  );
}