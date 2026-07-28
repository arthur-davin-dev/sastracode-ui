"use client";

import Image from "next/image";
import Link from "next/link";
import { PromoBannerData } from "@/types/course";

interface PromoBannerProps {
  data: PromoBannerData;
}

export default function PromoBanner({ data }: PromoBannerProps) {
  // Python browser image CDN link
  const pythonLogoUrl =
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";

  return (
    <section className="group relative overflow-hidden rounded-2xl border border-blue-900 bg-gradient-to-br from-slate-950 to-blue-950 px-6 py-8 font-khmer transition-all duration-300 ease-in-out hover:border-blue-800 sm:px-10">
      {/* Subtle decorative background glow that grows on hover */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:bg-blue-500/15" />

      <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto]">
        {/* Left Side Content */}
        <div className="z-10 flex flex-col items-start gap-3">
          <span className="rounded-full bg-red-500 px-3 py-1 text-[16px] font-medium tracking-wide text-white transition-transform duration-300 group-hover:-translate-y-0.5">
            {data.badge}
          </span>

          <h2 className="text-[24px] font-bold text-white transition-colors duration-300 group-hover:text-blue-200 sm:text-2xl">
            {data.title}
          </h2>

          <p className="max-w-md text-[18px] leading-relaxed text-blue-100/70">
            {data.description}
          </p>

          <Link
            href={data.href}
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-[18px] font-semibold text-blue-950 transition-all duration-300 ease-in-out hover:bg-blue-50 active:scale-[0.98]"
          >
            <span>{data.ctaLabel}</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Right Side Visuals (Featuring the Python Brand Asset) */}
        <div className="relative mx-auto hidden h-32 w-48 items-center justify-center sm:flex">
          {/* Main graphic container that floats up on hover */}
          <div className="relative h-24 w-24 transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-105">
            <Image
              src={pythonLogoUrl}
              alt="Python Programming Logo"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
