"use client";

import React from "react";
import { useTranslation } from "@/hooks/useTranslations";

const TECH_ITEMS = [
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
];

export default function TechStack() {
  const currentT = useTranslation();

  const displayItems = [
    ...TECH_ITEMS,
    ...TECH_ITEMS,
    ...TECH_ITEMS,
    ...TECH_ITEMS,
    ...TECH_ITEMS,
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-rtl {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        /* Pauses movement ONLY when hovering over an individual item */
        .animate-marquee-rtl:has(.tech-item:hover) {
          animation-play-state: paused !important;
        }
      `}</style>

      <section className="relative w-full overflow-hidden py-10">
        {/* Header */}
        <div className="mb-8 text-center px-4">
          <h2 className="text-2xl font-bold tracking-tight text-primary-color sm:text-3xl font-khmer">
            {currentT["tech-stack"]?.title}
          </h2>
          <p className="mt-2 text-sm text-primary-color font-khmer">
            {currentT["tech-stack"]?.subtitle}
          </p>
        </div>

        {/* Edge Fade Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-linear-to-r from-[#fafbfc] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-linear-to-l from-[#fafbfc] to-transparent" />

        {/* Marquee Track */}
        <div className="animate-marquee-rtl py-4">
          {displayItems.map((item, index) => (
            <div
              key={index}
              className="tech-item group mx-7 flex shrink-0 cursor-pointer flex-col items-center justify-center gap-2.5 transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-110"
            >
              {/* Icon Container */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition-all duration-200 group-hover:border-slate-200 group-hover:shadow-lg">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="h-8 w-8 object-contain"
                />
              </div>
              {/* Title Label */}
              <span className="text-xs font-medium text-primary-color transition-colors duration-200 group-hover:font-semibold group-hover:text-slate-900">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}