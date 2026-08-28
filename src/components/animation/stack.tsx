"use client";

import { useState, useEffect } from "react";
import OrbitImages from "@/components/animation/tech-stack";

const techIcons = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", 
   //itemSize: 84, // Bigger size for HTML
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
];

export default function StackPage() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <main className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-8 transition-colors duration-300">
      <div className="w-full max-w-6xl">
        <OrbitImages
          images={techIcons}
          shape="ellipse"
          responsive={true}
          showPath={true}
          pathWidth={2}
          baseWidth={1600}
          radiusX={680}
          radiusY={230}
          itemSize={96}
          duration={40}
          rotation={-6}
          autoRotateImage={false}
          centerContent={
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                My Tech Stack
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Technologies I work with daily
              </p>
            </div>
          }
        />
      </div>
    </main>
  );
}