"use client";

import Image from "next/image";
import { TechOption } from "@/types/course";

interface TechStackChipsProps {
  options: TechOption[];
}

export default function TechStackChips({ options }: TechStackChipsProps) {
  // Helper function to match technology labels to their official Devicon CDN paths
  const getIconUrl = (label: string) => {
    const cleanLabel = label.toLowerCase().trim();
    if (cleanLabel.includes("html")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
    if (cleanLabel.includes("css")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
    if (cleanLabel === "java") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg";
    if (cleanLabel === "javascript" || cleanLabel === "js") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
    if (cleanLabel === "python") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${cleanLabel}/${cleanLabel}-original.svg`;
  };

  return (
    <ul className="flex flex-wrap items-center gap-3">
      {options.map((option) => {
        const iconUrl = getIconUrl(option.label);

        return (
          <li key={option.id}>
            {/* 
              STATIC HOVER CHIP: 
              - Uses standard `div` (not clickable)
              - Has `cursor-default` so no hand pointer appears.
              - Uses `group`, `hover`, and `transition` for the animations.
            */}
            <div
              className="group flex items-center gap-2 rounded-full border border-slate-100 bg-white px-5 py-2.5 text-sm font-medium font-khmer text-slate-700  cursor-default transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-blue-300 hover:text-blue-700"
            >
              {/* Logo container pulses slightly on group hover */}
              <div className="relative h-6 w-6 shrink-0 transition-transform duration-300 ease-out group-hover:scale-110">
                <Image
                  src={iconUrl}
                  alt={`${option.label} logo`}
                  fill
                  className="object-contain"
                  unoptimized 
                />
              </div>
              
              <span className="text-[16px]">{option.label}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}