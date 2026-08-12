"use client";

import Image from "next/image";
import Link from "next/link";
import { TechOption } from "@/types/course";

interface TechStackChipsProps {
  options: TechOption[];
}

export default function TechStackChips({ options }: TechStackChipsProps) {
  const getIconUrl = (label: string) => {
    const cleanLabel = label.toLowerCase().trim();
    if (cleanLabel.includes("html"))
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
    if (cleanLabel.includes("css"))
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
    if (cleanLabel === "java")
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg";
    if (cleanLabel === "javascript" || cleanLabel === "js")
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
    if (cleanLabel === "python")
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${cleanLabel}/${cleanLabel}-original.svg`;
  };

  return (
    <ul className="flex flex-wrap items-center gap-3">
      {options.map((option) => {
        const iconUrl = getIconUrl(option.label);
        const chip = (
          <span className="group flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white px-5 py-2.5 text-base font-medium text-slate-700 font-khmer shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-600 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-400 dark:shadow-slate-950/50">
            <span className="relative h-6 w-6 shrink-0 transition-transform duration-300 ease-out group-hover:scale-110">
              <Image
                src={iconUrl}
                alt={`${option.label} logo`}
                fill
                className="object-contain"
                unoptimized
              />
            </span>
            <span>{option.label}</span>
          </span>
        );

        return (
          <li key={option.id}>
            {option.href ? (
              <Link
                href={option.href}
                className="inline-block"
                aria-label={`Open ${option.label} lessons`}
              >
                {chip}
              </Link>
            ) : (
              chip
            )}
          </li>
        );
      })}
    </ul>
  );
}
