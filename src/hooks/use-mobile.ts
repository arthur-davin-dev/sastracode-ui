import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<
    boolean | undefined
  >(undefined);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    );

    const updateMobileState = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    mediaQuery.addEventListener("change", updateMobileState);

    // This update intentionally runs after the component mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateMobileState,
      );
    };
  }, []);

  return Boolean(isMobile);
}