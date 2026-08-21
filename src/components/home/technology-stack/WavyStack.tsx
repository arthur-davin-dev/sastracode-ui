'use client';

import React from 'react';
import { motion } from 'framer-motion';

// 1. Original technology array items
const technologies = [
  {
    icon: <img src="/home/technology-stack/html5-svgrepo-com.svg" alt="html" className="w-7 h-7 object-contain" />,
    name: "Html",
  },
  {
    icon: <img src="/home/technology-stack/css3-svgrepo-com.svg" alt="css" className="w-7 h-7 object-contain" />,
    name: "CSS",
  },
  {
    icon: <img src="/home/technology-stack/java-svgrepo-com.svg" alt="java" className="w-7 h-7 object-contain" />,
    name: "Java",
  },
  {
    icon: <img src="/home/technology-stack/javascript.png" alt="javascript" className="w-7 h-7 object-contain" />,
    name: "Javascript",
  },
  {
    icon: <img src="/home/technology-stack/spring-boot.svg" alt="Spring Boot" />,
    name:"Spring Boot",

  },
  {
    icon: <img src="/home/technology-stack/mysql-logo-svgrepo-com.svg" alt="mySql" className="w-7 h-7 object-contain" />,
    name: "MySql",
  },
  {
    icon: <img src="/home/technology-stack/python-svgrepo-com.svg" alt="python" className="w-7 h-7 object-contain" />,
    name: "Python",
  },
  {
    icon: <img src="/home/technology-stack/tailwind.svg" alt="tailwind" className="w-7 h-7 object-contain" />,
    name: "Tailwind",
  },
  {
    icon: <img src="/home/technology-stack/next-js.svg" alt="NextJs" />,
    name:"NextJs",

  },
];

// Duplicate data for seamless infinite scrolling
const marqueeItems = [...technologies, ...technologies, ...technologies];

export function LeftWavyStack() {
  return (
    <div 
      className="relative w-full overflow-hidden py-4 border-y-2"
      style={{
        backgroundColor: '#002455', // Primary Color
        borderColor: '#f1b012',     // Init Color (Border)
      }}
    >
      {/* ========================================== */}
      {/* THE MARQUEE STRIP                          */}
      {/* ========================================== */}
      <motion.div
        className="flex gap-16 w-max items-center cursor-pointer"
        animate={{
          x: ["0%", "-33.33%"],
        }}
        /* Pauses animation when hovered over, resumes when mouse leaves */
        whileHover={{
          animationPlayState: "paused",
        }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {marqueeItems.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex items-center gap-3 rounded-xl px-3 py-2 transition-all duration-300 hover:scale-110 border border-transparent hover:border-[#dc0000]"
          >
            {/* Icon / Logo wrapper */}
            <div className="flex items-center justify-center w-8 h-8 shrink-0">
              {item.icon}
            </div>

            {/* High-Contrast White Text */}
            <span className="font-semibold text-white whitespace-nowrap text-base tracking-wide">
              {item.name}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Fade Edges (Optional: Gives a smooth fade-out effect on the sides) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-white to-transparent dark:from-slate-950" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-white to-transparent dark:from-slate-950" />
    </div>
  );
}

export function RightWavyStack() {
  return (
    <div className="relative w-full overflow-hidden py-2">

      {/* ========================================== */}
      {/* THE MARQUEE STRIP                             */}
      {/* ========================================== */}
      <motion.div
        className="flex gap-30 w-max"
        animate={{
           x: ["-33.33%", "0%"], // Start from negative, end at 0
        }}
        transition={{
          x: {
            duration: 30, // Adjust speed (Lower = faster)
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {marqueeItems.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex items-center gap-4  rounded-xl px-2 py-3 transition-all hover:scale-105 hover:shadow-md"
          >
            {/* Icon / Logo wrapper */}
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full text-xl font-bold"
              // style={{ backgroundColor: `${item.color}20`, color: item.color }} // 20 = 12% opacity
            >
              {item.icon}
            </div>

            {/* Text */}
            <span className="font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap text-base">
              {item.name}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Fade Edges (Optional: Gives a smooth fade-out effect on the sides) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-white to-transparent dark:from-slate-950" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-white to-transparent dark:from-slate-950" />
    </div>
  );
}
