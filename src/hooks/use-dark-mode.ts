import { useEffect, useState } from "react";

/**
 * Tracks the site's dark-mode state by observing the `dark` class on
 * `<html>`. The app toggles that class directly (see nav-bar.tsx) instead
 * of going through next-themes' context, so components that need to react
 * to the current theme (e.g. choosing a Monaco editor theme) read the DOM
 * directly rather than relying on a theme provider.
 */
export function useIsDarkMode(): boolean {
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return isDark;
}
