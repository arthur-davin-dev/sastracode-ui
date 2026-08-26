"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
   <button
  onClick={scrollToTop}
  className={`fixed bottom-6 right-6 z-50 rounded-full p-3.5 text-white shadow-lg transition-all duration-300 ease-in-out cursor-pointer ${
    isVisible
      ? "opacity-100 scale-100"
      : "opacity-0 scale-50 pointer-events-none"
  } bg-primary-color hover:bg-primary-color/90 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-color/30 active:scale-95`}
  aria-label="Scroll to top"
>
  <IoIosArrowUp size={20} />
</button>
  );
}