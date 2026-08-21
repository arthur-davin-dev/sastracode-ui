// components/CustomLogoLoop.tsx
import React from "react";
import LogoLoop from '@/components/home/technology-stack/LogoLoop'

type Logo = {
  title: string;
  src: string;
  alt?: string;
};

interface CustomLogoLoopProps {
  logos: Logo[];
  direction?: "left" | "right";
  className?: string;
}

export const CustomLogoLoop: React.FC<CustomLogoLoopProps> = ({
  logos,
  direction = "right",
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Render the reactbit LogoLoop once with all logos */}
      <LogoLoop direction={direction} logos={logos} />

      {/* Render titles below each logo */}
      <div className="flex gap-6 mt-4">
        {logos.map((logo, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-sm font-medium">{logo.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
