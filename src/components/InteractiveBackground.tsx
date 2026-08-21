"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface InteractiveBackgroundProps {
  children?: ReactNode;
  speed?: number;
  density?: number;
  enableMouseGlow?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function InteractiveBackground({
  children,
  speed = 1.0,
  density = 100,
  enableMouseGlow = true,
}: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

    const mouse = { x: -9999, y: -9999, active: false };

    const particles: Particle[] = [];

    // Detect light vs dark theme so particle/line colors stay visible
    // against either background. Assumes a `dark` class on <html>
    // (standard for next-themes / Tailwind dark mode toggles).
    const updateTheme = () => {
      const root = document.documentElement;
      isDark =
        root.classList.contains("dark") && !root.classList.contains("light");
      //canvas.style.backgroundColor = isDark ? "transparent" : "#ffffff";
      canvas.style.backgroundColor = "transparent";
    };

    let isDark = false;
    updateTheme();

    const colors = () =>
      isDark
        ? {
            particle: "rgba(180, 200, 255, 0.7)",
            line: (opacity: number) => `rgba(150, 180, 255, ${opacity * 0.3})`,
            glow: [
              "rgba(120, 170, 255, 0.18)",
              "rgba(120, 170, 255, 0)",
            ] as const,
          }
        : {
            particle: "rgba(60, 90, 200, 0.55)",
            line: (opacity: number) => `rgba(70, 100, 210, ${opacity * 0.28})`,
            glow: [
              "rgba(70, 100, 220, 0.14)",
              "rgba(70, 100, 220, 0)",
            ] as const,
          };

    const themeObserver = new MutationObserver(() => {
      updateTheme();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < density; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5 * speed,
          vy: (Math.random() - 0.5) * 0.5 * speed,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const MAX_LINK_DIST = 120;
    const MOUSE_REPEL_DIST = 100;
    const MOUSE_GLOW_RADIUS = 180;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const palette = colors();

      // Mouse glow
      if (enableMouseGlow && mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          MOUSE_GLOW_RADIUS,
        );
        gradient.addColorStop(0, palette.glow[0]);
        gradient.addColorStop(1, palette.glow[1]);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MOUSE_GLOW_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repel
        if (enableMouseGlow && mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_REPEL_DIST && dist > 0.01) {
            const force = (MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = palette.particle;
        ctx.fill();
      }

      // Constellation lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_LINK_DIST) {
            const opacity = 1 - dist / MAX_LINK_DIST;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = palette.line(opacity);
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      themeObserver.disconnect();
    };
  }, [speed, density, enableMouseGlow]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 top-0 left-0 w-full h-full pointer-events-none z-0"
      />
      {children}
    </>
  );
}
