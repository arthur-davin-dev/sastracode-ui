"use client";
import { useCallback, useMemo, useSyncExternalStore } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

const subscribeToTheme = (onStoreChange: () => void) => {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => observer.disconnect();
};

const getThemeSnapshot = () => document.documentElement.classList.contains("dark");
const getServerThemeSnapshot = () => false;

export function NetworkBackground() {
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particleColor = isDark ? "#ffffff" : "#000000";

  const options = useMemo(() => ({
    fullScreen: { enable: false },
    background: { color: "transparent" },
    fpsLimit: 60,
    particles: {
      number: { value: 50 },
      paint: {
        fill: {
          enable: true,
          color: { value: particleColor },
        },
      },
      links: {
        enable: true,
        color: particleColor,
        opacity: isDark ? 0.35 : 0.55,
        width: 1,
        distance: 140,
      },
      move: { enable: true, speed: 0.3 },
      opacity: { value: isDark ? 0.6 : 0.8 },
      size: { value: 2 },
    },
  }), [particleColor, isDark]);

  const themeKey = isDark ? "dark" : "light";

  return (
    <ParticlesProvider init={init}>
      <Particles
        key={themeKey}
        id={`network-bg-${themeKey}`}
        options={options}
        className="absolute inset-0 -z-10 pointer-events-none"
      />
    </ParticlesProvider>
  );
}
