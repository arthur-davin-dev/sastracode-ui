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
    icon: <img src="/home/technology-stack/laravel-svgrepo-com.svg" alt="laravel" className="w-7 h-7 object-contain" />,
    name: "Vue",
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
    icon: <img src="/home/technology-stack/vue.svg" alt="vue" className="w-7 h-7 object-contain" />,
    name: "vue",
  },
];

// Duplicate data for seamless infinite scrolling
const marqueeItems = [...technologies, ...technologies, ...technologies];

export default function WavyStack() {
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

      {/* Fade Edges seamlessly matched to #002455 */}
      <div 
        className="absolute inset-y-0 left-0 w-16 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to right, #002455 0%, rgba(0, 36, 85, 0) 100%)',
        }}
      />
      <div 
        className="absolute inset-y-0 right-0 w-16 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to left, #002455 0%, rgba(0, 36, 85, 0) 100%)',
        }}
      />
    </div>
  );
}