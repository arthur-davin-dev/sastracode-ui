// components/Showcase.tsx
"use client"

import { useState, useEffect } from "react";
import AnalyticsCard, { AICard, BusinessCard, LiveCoding, NormalCard } from "../floatingCard/cards/AllCard";
import FloatingCard from "../floatingCard/FloatingCard";
import HeroCharacter from "./HeroCharacter";
import { current } from "@reduxjs/toolkit";
import { useTranslation } from "@/hooks/useTranslations";

const CANVAS_W = 1216;
const CANVAS_H = 440;

const pctX = (v: number) => `${(v / CANVAS_W) * 100}%`;
const pctY = (v: number) => `${(v / CANVAS_H) * 100}%`;

const widthClamp = (w: number, minPx: number) =>
  `clamp(${minPx}px, ${(w / CANVAS_W) * 100}%, ${w}px)`;

// Floating animation variants with different delays and durations
const floatingAnimations = [
  {
    name: 'float1',
    duration: '3s',
    delay: '0s',
    yOffset: [-12, 12, -12],
    xOffset: [0, 6, 0]
  },
  {
    name: 'float2',
    duration: '4s',
    delay: '0.5s',
    yOffset: [-15, 15, -15],
    xOffset: [0, -8, 0]
  },
  {
    name: 'float3',
    duration: '3.5s',
    delay: '1s',
    yOffset: [-10, 10, -10],
    xOffset: [5, -5, 5]
  },
  {
    name: 'float4',
    duration: '4.5s',
    delay: '0.3s',
    yOffset: [-18, 18, -18],
    xOffset: [0, 10, 0]
  },
  {
    name: 'float5',
    duration: '3.2s',
    delay: '0.8s',
    yOffset: [-14, 14, -14],
    xOffset: [-6, 6, -6]
  },
  {
    name: 'float6',
    duration: '5s',
    delay: '0.2s',
    yOffset: [-20, 20, -20],
    xOffset: [8, -8, 8]
  },
  {
    name: 'float7',
    duration: '3.8s',
    delay: '1.2s',
    yOffset: [-11, 11, -11],
    xOffset: [0, -5, 0]
  },
  {
    name: 'float8',
    duration: '4.2s',
    delay: '0.6s',
    yOffset: [-16, 16, -16],
    xOffset: [-7, 7, -7]
  },
  {
    name: 'float9',
    duration: '3.6s',
    delay: '0.9s',
    yOffset: [-13, 13, -13],
    xOffset: [4, -4, 4]
  },
];

export default function Showcase() {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

 const currentT = useTranslation();

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Add keyframes for floating animations to the document head (only on desktop)
  useEffect(() => {
    if (screenSize === 'desktop') {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes float1 {
          0%, 100% { transform: translateY(-12px) translateX(0px); }
          50% { transform: translateY(12px) translateX(6px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(-15px) translateX(0px); }
          50% { transform: translateY(15px) translateX(-8px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(10px) translateX(-5px); }
        }
        @keyframes float4 {
          0%, 100% { transform: translateY(-18px) translateX(0px); }
          50% { transform: translateY(18px) translateX(10px); }
        }
        @keyframes float5 {
          0%, 100% { transform: translateY(-14px) translateX(-6px); }
          50% { transform: translateY(14px) translateX(6px); }
        }
        @keyframes float6 {
          0%, 100% { transform: translateY(-20px) translateX(8px); }
          50% { transform: translateY(20px) translateX(-8px); }
        }
        @keyframes float7 {
          0%, 100% { transform: translateY(-11px) translateX(0px); }
          50% { transform: translateY(11px) translateX(-5px); }
        }
        @keyframes float8 {
          0%, 100% { transform: translateY(-16px) translateX(-7px); }
          50% { transform: translateY(16px) translateX(7px); }
        }
        @keyframes float9 {
          0%, 100% { transform: translateY(-13px) translateX(4px); }
          50% { transform: translateY(13px) translateX(-4px); }
        }
        .floating-card {
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .floating-card:hover {
          animation-play-state: paused;
        }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [screenSize]);

  // Desktop Layout - with floating animations
  const DesktopLayout = () => (
    <div
      className="relative mx-auto w-full max-w-[1216px]"
      style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}
    >
      {/* Decorative connector lines - updated for dark mode */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <img
          src="/assets/home/svg/bot_connection_line.svg"
          alt=""
          className="w-[40%] h-auto dark:opacity-50"
        />
        <img
          src="/assets/home/image/center-dot-float.png"
          alt=""
          className="-mt-[10%] w-[1%] h-auto dark:opacity-50"
        />
        <img
          src="/assets/home/svg/top_connection_line.svg"
          alt=""
          className="mt-[6%] w-[40%] h-auto dark:opacity-50"
        />
      </div>

      {/* Cards with floating animations - Card components themselves handle dark mode */}
      <div
        className="absolute z-10 floating-card"
        style={{
          left: pctX(40),
          top: pctY(-60),
          width: widthClamp(240, 118),
          animationName: 'float1',
          animationDuration: '3s',
          animationDelay: '0s',
        }}
      >
        <BusinessCard variant="grid" />
      </div>

      <div
        className="absolute z-10 floating-card"
        style={{
          left: pctX(350),
          top: pctY(0),
          width: widthClamp(140, 76),
          animationName: 'float2',
          animationDuration: '4s',
          animationDelay: '0.5s',
        }}
      >
        <NormalCard variant="grid" text={currentT.showCase.floatCard.text1} imagePath="/home/float-card/play.svg" />
      </div>

      <div
        className="absolute z-10 floating-card"
        style={{
          right: pctX(350),
          top: pctY(0),
          width: widthClamp(140, 76),
          animationName: 'float3',
          animationDuration: '3.5s',
          animationDelay: '1s',
        }}
      >
        <NormalCard variant="grid" text={currentT.showCase.floatCard.text3} imagePath="/home/float-card/stars.svg" />
      </div>

      <div
        className="absolute z-10 floating-card"
        style={{
          left: pctX(250),
          top: pctY(280),
          width: widthClamp(140, 76),
          animationName: 'float4',
          animationDuration: '4.5s',
          animationDelay: '0.3s',
        }}
      >
        <NormalCard variant="grid" text={currentT.showCase.floatCard.text4} imagePath="/home/float-card/networkData.svg" />
      </div>

      <div
        className="absolute z-10 floating-card"
        style={{
          left: pctX(530),
          top: pctY(260),
          width: widthClamp(160, 84),
          animationName: 'float5',
          animationDuration: '3.2s',
          animationDelay: '0.8s',
        }}
      >
        <NormalCard variant="grid" text={currentT.showCase.floatCard.text5} imagePath="/home/float-card/time.svg" />
      </div>

      <div
        className="absolute z-10 floating-card"
        style={{
          left: pctX(500),
          top: pctY(55),
          width: widthClamp(160, 84),
          animationName: 'float6',
          animationDuration: '5s',
          animationDelay: '0.2s',
        }}
      >
        <NormalCard variant="grid" text={currentT.showCase.floatCard.text2} />
      </div>

      <div
        className="absolute z-10 floating-card"
        style={{
          left: pctX(90),
          top: pctY(150),
          width: widthClamp(190, 108),
          animationName: 'float7',
          animationDuration: '3.8s',
          animationDelay: '1.2s',
        }}
      >
        <LiveCoding
          variant="grid"
          text={currentT.showCase.floatCard.liveCoding}
          className="shadow-[0_4px_6px_rgba(0,0,0,0.25)] dark:shadow-[0_4px_6px_rgba(255,255,255,0.1)]"
        />
      </div>

      <div
        className="absolute z-10 floating-card"
        style={{
          right: pctX(170),
          top: pctY(320),
          width: widthClamp(240, 118),
          animationName: 'float8',
          animationDuration: '4.2s',
          animationDelay: '0.6s',
        }}
      >
        <AICard
          variant="grid"
          text={currentT.showCase.floatCard.aiCard}
          className="flex-col px-4 shadow-[0_4px_6px_rgba(0,0,0,0.25)] dark:shadow-[0_4px_6px_rgba(255,255,255,0.1)]"
        />
      </div>

      <div
        className="absolute z-10 floating-card"
        style={{
          right: pctX(0),
          top: pctY(90),
          width: widthClamp(200, 100),
          animationName: 'float9',
          animationDuration: '3.6s',
          animationDelay: '0.9s',
        }}
      >
        <AnalyticsCard variant="grid" />
      </div>
    </div>
  );

  // Tablet Layout - Grid-based scattered (non-overlapping)
  const TabletLayout = () => {
    const gridConfig = {
      rows: 4,
      cols: 4,
      cards: {
        business: { colStart: 1, colEnd: 3, rowStart: 1, rowEnd: 2, offset: 'translate(10px, 15px)' },
        start: { colStart: 3, colEnd: 4, rowStart: 1, rowEnd: 2, offset: 'translate(15px, 5px)' },
        explore: { colStart: 4, colEnd: 5, rowStart: 1, rowEnd: 2, offset: 'translate(-10px, 20px)' },
        online: { colStart: 1, colEnd: 2, rowStart: 3, rowEnd: 4, offset: 'translate(12px, -5px)' },
        learn: { colStart: 2, colEnd: 4, rowStart: 3, rowEnd: 4, offset: 'translate(-5px, 10px)' },
        practice: { colStart: 4, colEnd: 5, rowStart: 3, rowEnd: 4, offset: 'translate(-15px, 8px)' },
        liveCoding: { colStart: 1, colEnd: 3, rowStart: 2, rowEnd: 3, offset: 'translate(8px, -10px)' },
        ai: { colStart: 3, colEnd: 5, rowStart: 2, rowEnd: 3, offset: 'translate(-12px, 5px)' },
        analytics: { colStart: 2, colEnd: 4, rowStart: 4, rowEnd: 5, offset: 'translate(10px, 0px)' },
      }
    };

    const getCardStyle = (card: any) => ({
      gridColumn: `${card.colStart} / ${card.colEnd}`,
      gridRow: `${card.rowStart} / ${card.rowEnd}`,
    });

    const getTransform = (offset: string) => `translate(${offset}) scale(1)`;

    return (
      <div className="mx-auto max-w-4xl px-2">
        <div
          className="relative mx-auto"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridConfig.cols}, 1fr)`,
            gridTemplateRows: `repeat(${gridConfig.rows}, minmax(100px, auto))`,
            gap: '16px',
            minHeight: '520px',
          }}
        >
          {/* Decorative lines - updated for dark mode */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center z-0 opacity-20 dark:opacity-10">
            <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-500 to-transparent"></div>
            <div className="w-1 h-1 rounded-full bg-purple-300 dark:bg-purple-500 my-4"></div>
            <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-500 to-transparent"></div>
          </div>

          <div
            className="z-10 transition-all duration-500 hover:scale-105 hover:z-20"
            style={{
              ...getCardStyle(gridConfig.cards.business),
              transform: getTransform(gridConfig.cards.business.offset),
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <BusinessCard variant="grid" />
            </div>
          </div>

          <div
            className="z-10 transition-all duration-500 hover:scale-105 hover:z-20"
            style={{
              ...getCardStyle(gridConfig.cards.start),
              transform: getTransform(gridConfig.cards.start.offset),
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <NormalCard variant="grid" text={currentT.showCase.floatCard.text1} imagePath="/home/float-card/play.svg" />
            </div>
          </div>

          <div
            className="z-10 transition-all duration-500 hover:scale-105 hover:z-20"
            style={{
              ...getCardStyle(gridConfig.cards.explore),
              transform: getTransform(gridConfig.cards.explore.offset),
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <NormalCard variant="grid" text={currentT.showCase.floatCard.text3} imagePath="/home/float-card/stars.svg" />
            </div>
          </div>

          <div
            className="z-10 transition-all duration-500 hover:scale-105 hover:z-20"
            style={{
              ...getCardStyle(gridConfig.cards.online),
              transform: getTransform(gridConfig.cards.online.offset),
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <NormalCard variant="grid" text={currentT.showCase.floatCard.text4} imagePath="/home/float-card/networkData.svg" />
            </div>
          </div>

          <div
            className="z-10 transition-all duration-500 hover:scale-105 hover:z-20"
            style={{
              ...getCardStyle(gridConfig.cards.learn),
              transform: getTransform(gridConfig.cards.learn.offset),
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <NormalCard variant="grid" text={currentT.showCase.floatCard.text5} imagePath="/home/float-card/time.svg" />
            </div>
          </div>

          <div
            className="z-10 transition-all duration-500 hover:scale-105 hover:z-20"
            style={{
              ...getCardStyle(gridConfig.cards.practice),
              transform: getTransform(gridConfig.cards.practice.offset),
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <NormalCard variant="grid" text={currentT.showCase.floatCard.text2} />
            </div>
          </div>

          <div
            className="z-10 transition-all duration-500 hover:scale-105 hover:z-20"
            style={{
              ...getCardStyle(gridConfig.cards.liveCoding),
              transform: getTransform(gridConfig.cards.liveCoding.offset),
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <LiveCoding
                variant="grid"
                text="រៀនគ្រប់ទីកន្លែងបានគ្រប់ពេល"
                className="shadow-[0_4px_6px_rgba(0,0,0,0.25)] dark:shadow-[0_4px_6px_rgba(255,255,255,0.1)]"
              />
            </div>
          </div>

          <div
            className="z-10 transition-all duration-500 hover:scale-105 hover:z-20"
            style={{
              ...getCardStyle(gridConfig.cards.ai),
              transform: getTransform(gridConfig.cards.ai.offset),
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <AICard
                variant="grid"
                text="AI ជំនួយការសិក្សា ជួយអ្នក"
                className="flex-col px-4 shadow-[0_4px_6px_rgba(0,0,0,0.25)] dark:shadow-[0_4px_6px_rgba(255,255,255,0.1)]"
              />
            </div>
          </div>

          <div
            className="z-10 transition-all duration-500 hover:scale-105 hover:z-20"
            style={{
              ...getCardStyle(gridConfig.cards.analytics),
              transform: getTransform(gridConfig.cards.analytics.offset),
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <AnalyticsCard variant="grid" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden pb-40 bg-white dark:bg-gray-900 py-6 lg:pt-20 pb-3.5 transition-colors duration-300">
      {/* Background Blur - updated for dark mode */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full blur-[140px] bg-purple-100/30 dark:bg-purple-900/20" />
      <div className="absolute right-[-80px] top-32 h-56 w-56 sm:h-72 sm:w-72 lg:h-96 lg:w-96 rounded-full blur-[140px] bg-blue-100/30 dark:bg-blue-900/20" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Mobile: Simple grid */}
        {screenSize === 'mobile' && <FloatingCard />}

        {/* Tablet: Grid-based scattered */}
        {screenSize === 'tablet' && <TabletLayout />}

        {/* Desktop: Original absolute floating with animations */}
        {screenSize === 'desktop' && <DesktopLayout />}

        <HeroCharacter />
      </div>
    </section>
  );
}