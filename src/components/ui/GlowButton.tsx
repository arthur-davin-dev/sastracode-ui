
"use client";

import { ButtonHTMLAttributes } from "react";

export default function GlowButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div className="relative inline-block group">
      {/* layer 3: blurred glow clone behind the button */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#7c3aed,#8b5cf6,#6366f1,#06b6d4)]
          blur-xl opacity-60 transition-opacity duration-300 group-hover:opacity-90"
      />

     <button
        className={`relative rounded-full border border-white/20 px-7 py-3 font-semibold text-white
            /* Gradient background with continuous 5s smooth idle loop animation */
            bg-[linear-gradient(135deg,#002455,#DC0000,#002455,#DC0000)] bg-[length:300%_300%]
            animate-[gradientShift_6s_ease_infinite]
            /* Inset 3D highlights + Ambient red glow */
            shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.25),0_0_20px_rgba(220,0,0,0.45)]
            transition-all duration-300
            /* Enhanced interaction on hover */
            hover:-translate-y-0.5
            hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),inset_0_-1px_2px_rgba(0,0,0,0.25),0_0_35px_rgba(220,0,0,0.75)]
            active:translate-y-0 ${className}`}
        {...props}
        >
        {children}
    </button>
    </div>
  );
}