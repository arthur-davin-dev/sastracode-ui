"use client";

import React, { useState } from "react";
import { PlayCircle, Clock, Code2, Award } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslations";

const icons = [PlayCircle, Clock, Code2, Award];

const gridPosition = [
  "sm:col-start-1 sm:row-start-1", // 01
  "sm:col-start-2 sm:row-start-1", // 02
  "sm:col-start-2 sm:row-start-2", // 03
  "sm:col-start-1 sm:row-start-2", // 04
];

export default function FeaturesProcess() {
  const [activeStep, setActiveStep] = useState<number>(1);
  
  // useTranslation directly returns the locale translation object
  const currentT = useTranslation();

  // Extract featuresProcess section safely from locale
  const featuresData = currentT?.featuresProcess;
  const steps = featuresData?.steps || [];

  return (
    <section className="w-full py-16 transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-primary-color sm:text-3xl dark:text-white">
            {featuresData?.header?.title}
          </h2>
          <p className="mt-2 text-xs text-primary-color sm:text-sm dark:text-slate-400">
            {featuresData?.header?.subtitle}
          </p>
        </div>

        {/* Snake Connector Grid Container */}
        <div className="relative mt-16 min-h-145">
          {/* Mobile Connector (Bigger, bolder stroke line) */}
          <svg
            className="pointer-events-none absolute inset-0 z-0 block h-full w-full sm:hidden"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M 140,80 L 140,920"
              className="connector-path connector-path-mobile"
            />
          </svg>

          {/* SVG Dotted Path (Original Desktop & Tablet Snake Path) */}
          <svg
            className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full sm:block"
            viewBox="0 0 1000 580"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="
                M 200,230 
                L 200,290 Q 200,310 220,310 
                L 475,310 Q 495,310 495,290 
                L 495,50 Q 495,30 515,30 
                L 535,30 
                L 740,30 Q 760,30 760,50 
                L 760,310 Q 760,330 740,330 
                L 535,330 Q 495,330 495,350 
                L 495,530 Q 495,550 475,550 
                L 140,550 Q 120,550 120,530 
                L 120,490
              "
              className="connector-path"
            />
          </svg>

          {/* 4 Cards Grid */}
          <div className="relative z-10 grid grid-cols-1 gap-x-20 gap-y-16 sm:grid-cols-2 sm:grid-rows-2">
            {steps.map((step: any, index: number) => {
              const Icon = icons[index] || PlayCircle;
              const isActive = activeStep === step.id;

              return (
                <div
                  key={step.id || index}
                  className={`relative ${gridPosition[index]} pt-6 pl-6`}
                  onMouseEnter={() => setActiveStep(step.id)}
                >
                  {/* Primary Color Rounded Badge */}
                  <div
                    className={`absolute left-4 top-4 z-0 h-20 w-20 rounded-3xl bg-linear-to-br bg-primary-color to-indigo-800 p-3 text-white shadow-md transition-transform duration-300 dark:bg-primary-color dark:to-indigo-700 ${
                      isActive ? "scale-105" : ""
                    }`}
                  >
                    <span className="text-lg font-bold tracking-tight">
                      {step.stepLabel}
                    </span>
                  </div>

                  {/* Main Card Component */}
                  <div
                    className={`relative z-10 ml-8 mt-6 flex flex-col justify-between rounded-2xl border bg-white p-5 transition-all duration-300 dark:bg-slate-900 ${
                      isActive
                        ? "scale-105 border-slate-200 shadow-xl shadow-indigo-500/10 dark:border-slate-800"
                        : "border-slate-200 shadow-lg shadow-slate-200/50 dark:border-slate-800 dark:shadow-none"
                    }`}
                  >
                    {/* Glassmorphic Blue Glow Corner Accent */}
                    <div className="pointer-events-none absolute left-0 top-0 h-20 w-20 overflow-hidden rounded-tl-2xl">
                      <div className="h-full w-full bg-linear-to-br from-indigo-600/40 via-indigo-500/10 to-transparent blur-sm" />
                    </div>

                    <div>
                      {/* Top Row: Icon + Badge Pill */}
                      <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-primary-color dark:bg-indigo-950/60 dark:text-primary-color">
                          <Icon className="h-8 w-8 stroke-2" />
                        </div>
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-primary-color dark:bg-primary-color dark:text-white">
                          {step.badge}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="mt-5 text-base font-extrabold uppercase tracking-wider text-primary-color dark:text-white">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-primary-color dark:text-white">
                        {step.description}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .connector-path {
          stroke: #475569;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-dasharray: 0 9;
          opacity: 0.85;
          animation: dash-run 3s linear infinite;
        }
        .connector-path-mobile {
          stroke-width: 8;
          stroke-linecap: round;
          stroke-dasharray: 0 20;
          opacity: 0.85;
          animation: dash-run-mobile 3s linear infinite;
        }
        .dark .connector-path,
        .dark .connector-path-mobile {
          stroke: #94a3b8;
        }
        @keyframes dash-run {
          to {
            stroke-dashoffset: -90;
          }
        }
        @keyframes dash-run-mobile {
          to {
            stroke-dashoffset: -200;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .connector-path,
          .connector-path-mobile {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}