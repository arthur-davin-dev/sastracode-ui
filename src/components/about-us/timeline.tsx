"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslations";

// Container animation
const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

// Individual item animation
const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 14,
    },
  },
};

// Desktop horizontal line
const lineVariants: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 0.8,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Mobile vertical line
const verticalLineVariants: Variants = {
  hidden: {
    scaleY: 0,
    opacity: 0,
  },
  visible: {
    scaleY: 1,
    opacity: 0.8,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Timeline() {
  const { timeline } = useTranslation();

  return (
    <section className="w-full overflow-hidden px-4 py-12 font-sans text-slate-900 transition-colors duration-300 dark:text-slate-100 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          className="mb-12 text-center sm:mb-16"
          initial={{
            opacity: 0,
            y: -20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <span className="mb-3 inline-block rounded-full border border-blue-200 bg-blue-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 shadow-xs dark:border-blue-800/40 dark:bg-blue-950/60 dark:text-blue-400">
            {timeline.badge}
          </span>

          <h2 className="font-khmer flex flex-wrap items-center justify-center gap-2 text-2xl font-extrabold tracking-tight sm:gap-3 sm:text-3xl lg:text-4xl">
            <span>{timeline.heading.prefix}</span>

            <motion.span
              className="inline-block font-extrabold text-red-600 dark:text-red-500"
              whileHover={{
                scale: 1.05,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              {timeline.heading.highlight}
            </motion.span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop Horizontal Line */}
          <motion.div
            className="absolute left-[8%] right-[8%] top-5 z-0 hidden h-0.5 origin-left bg-linear-to-r from-teal-400 via-blue-500 to-indigo-500 dark:from-teal-500 dark:via-blue-400 dark:to-indigo-400 lg:block"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.5,
            }}
            variants={lineVariants}
          />

          {/* Mobile Vertical Line */}
          <motion.div
            className="absolute bottom-5 left-5 top-5 z-0 w-0.5 origin-top bg-linear-to-b from-teal-400 via-blue-500 to-indigo-500 dark:from-teal-500 dark:via-blue-400 dark:to-indigo-400 sm:left-6 lg:hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={verticalLineVariants}
          />

          {/* Steps */}
          <motion.div
            className="font-khmer relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={containerVariants}
          >
            {timeline.steps.map((step) => (
              <motion.div
                key={step.number}
                className="group flex flex-row items-start gap-4 sm:gap-6 lg:flex-col lg:items-center lg:gap-0"
                variants={itemVariants}
              >
                {/* Number */}
                <motion.div
                  className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-md shadow-blue-500/20 ring-4 ring-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-500 dark:bg-blue-500 dark:ring-slate-950 dark:group-hover:bg-blue-400 sm:h-12 sm:w-12 sm:text-base lg:mb-6 lg:h-10 lg:w-10 lg:text-sm"
                  whileHover={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                >
                  {step.number}
                </motion.div>

                {/* Card */}
                <motion.div
                  className="h-fit w-full grow rounded-2xl border border-slate-200/80 bg-slate-50 p-4 text-left shadow-xs transition-all duration-300 group-hover:border-blue-300 group-hover:shadow-xl group-hover:shadow-blue-500/5 dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-none dark:group-hover:border-slate-700 dark:group-hover:shadow-blue-500/10 sm:p-5 lg:text-center"
                  whileHover={{
                    y: -6,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <h3 className="mb-2 text-base font-bold text-slate-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400 sm:text-lg">
                    {step.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}