"use client";

import Image from "next/image";

type LogoItem = {
  name: string;
  imgSrc: string; // Now accepts full browser URLs
  positionClass: string;
};

// Example using direct browser links from a popular dev icon CDN
const outerLogos: LogoItem[] = [
  { 
    name: "HTML", 
    imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", 
    positionClass: "top-[-28px] left-1/2 -translate-x-1/2" 
  },
  { 
    name: "JS", 
    imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", 
    positionClass: "top-1/2 right-[-28px] -translate-y-1/2" 
  },
  { 
    name: "Python", 
    imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", 
    positionClass: "bottom-[-28px] left-[20%]" 
  },
];

const innerLogos: LogoItem[] = [
  { 
    name: "Java", 
    imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", 
    positionClass: "top-[10%] left-[-28px]" 
  },
  { 
    name: "CSS", 
    imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", 
    positionClass: "bottom-[-20px] right-[10%]" 
  },
];

export default function HeroVisual() {
  return (
    <div className="relative mx-auto h-80 w-80 sm:h-96 sm:w-96 animate-bob">
      {/* Character avatar */}
      <div className="absolute inset-0 rounded-full overflow-hidden shadow-[0_20px_40px_rgba(30,100,200,0.15)] bg-gradient-to-br from-sky-100 to-blue-200 z-0">
        <Image
          src="/images/doc-hero.png"
          alt="សិស្សសាស្ត្រាកូដកំពុងកាន់កុំព្យូទ័រយួរដៃ"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Outer orbit */}
      <div className="absolute top-1/2 left-1/2 w-[110%] h-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow z-20">
        {outerLogos.map((logo) => (
          <div
            key={logo.name}
            className={`absolute w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center p-3 animate-counter-spin ${logo.positionClass}`}
          >
            <div className="relative w-full h-full ">
              <Image
                src={logo.imgSrc}
                alt={`${logo.name} logo`}
                fill
                className=" object-cover relative w-full h-full"
                unoptimized // Optional: Skip Next.js optimization processing for external SVGs
              />
            </div>
          </div>
        ))}
      </div>

      {/* Inner orbit */}
      <div className="absolute top-1/2 left-1/2 w-[85%] h-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow-reverse z-30">
        {innerLogos.map((logo) => (
          <div
            key={logo.name}
            className={`absolute w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center p-3 animate-counter-spin-reverse ${logo.positionClass}`}
          >
            <div className="relative w-full h-full">
              <Image
                src={logo.imgSrc}
                alt={`${logo.name} logo`}
                fill
                className="object-contain"
                unoptimized // Optional: Skip Next.js optimization processing for external SVGs
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}