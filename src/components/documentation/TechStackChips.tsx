"use client";

import Link from "next/link";
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
        const cleanLabel = option.label.toLowerCase().trim();

        const lessonIdMap: Record<string, string> = {
          "html": "html-elements",       // Maps "html" -> /lessons/html-elements
          "html elements": "html-elements",
          "html tables": "html-tables",
          "css": "css-flexbox",
          "java": "java-oop",
          "python": "python-intro",
          "javascript": "javascript-basics",
          "js": "javascript-basics"
        };

        // If the label matches a shortcut in the dictionary, use it. Otherwise, fall back to the formatted label.
        const targetSlug = lessonIdMap[cleanLabel] || cleanLabel.replace(/\s+/g, "-");

        return (
          <li key={option.id}>
            <Link
              href={`/documentation/lessons/${targetSlug}`}
              className="group flex items-center gap-2 rounded-full border border-slate-100 bg-white px-5 py-2.5 text-sm font-medium font-khmer text-slate-700 transition-all duration-200 hover:border-blue-300 hover:text-blue-700 hover:bg-slate-50/50"
            >
              {/* Dynamic Logo Replacement */}
              <div className="relative h-7 w-7 shrink-0 transition-transform duration-200 group-hover:scale-110">
                <Image
                  src={iconUrl}
                  alt={`${option.label} logo`}
                  fill
                  className="object-contain"
                  unoptimized 
                />
              </div>
              
              <span className="text-[16px]">{option.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}