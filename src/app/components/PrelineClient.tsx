"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PrelineClient() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    const initPreline = async () => {
      try {
        const { HSStaticMethods } = await import("preline/non-auto");

        if (!cancelled) {
          HSStaticMethods.autoInit();
        }
      } catch (error) {
        console.error("Failed to initialize Preline:", error);
      }
    };

    initPreline();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
