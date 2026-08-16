"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Calendar, Tag, Users, Sparkles } from "lucide-react";

interface BadgeStatsCardProps {
  completionPercent: number;
  earnedDate: string;
  category: string;
  totalEarners?: number;
}

export function BadgeStatsCard({
  completionPercent,
  earnedDate,
  category,
  totalEarners,
}: BadgeStatsCardProps) {
  // SVG Radial Ring Parameters
  const radius = 48;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - completionPercent / 100);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "សមិទ្ធផលមេដាយ",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("បានចម្លងតំណភ្ជាប់!");
    }
  };

  return (
    <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl hover:border-blue-50 transition-all duration-300">
      
      {/* Background Decorative Ambient Glow */}
      <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full  blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-blue-600/10 blur-3xl" />

      <CardContent className="relative z-10 p-7 space-y-6">
        
        {/* Radial Progress Ring & Title Section */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative h-28 w-28 flex items-center justify-center my-1">
            <svg className="-rotate-90 w-full h-full" viewBox="0 0 110 110">
              {/* Background Circle Track */}
              <circle
                cx="55"
                cy="55"
                r={radius}
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Progress Circle (Red Secondary Color) */}
              <circle
                cx="55"
                cy="55"
                r={radius}
                className="stroke-secondary-color
                 transition-all duration-700 ease-out"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Percent Text (text-2xl) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-secondary-color dark:text-red-400">
                {completionPercent}%
              </span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-primary-color dark:text-white flex items-center gap-1.5">
            <Sparkles className="h-5 w-5 text-init-color fill-init-color" />
            <span>វឌ្ឍនភាពសមិទ្ធផល</span>
          </h3>
        </div>

        {/* Stats Details List (text-lg & text-primary-color) */}
        <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          
          <div className="flex justify-between items-center text-lg">
            <span className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-400">
              <Calendar className="h-5 w-5 text-primary-color" />
              កាលបរិច្ឆេទទទួល
            </span>
            <span className="font-bold text-primary-color dark:text-white">
              {earnedDate}
            </span>
          </div>

          <div className="flex justify-between items-center text-lg">
            <span className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-400">
              <Tag className="h-5 w-5 text-init-color" />
              ប្រភេទ
            </span>
            <span className="font-bold text-primary-color dark:text-white">
              {category}
            </span>
          </div>

          {typeof totalEarners === "number" && (
            <div className="flex justify-between items-center text-lg">
              <span className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-400">
                <Users className="h-5 w-5 text-secondary-color" />
                ចំនួនអ្នកទទួល
              </span>
              <span className="font-bold text-secondary-color dark:text-red-400">
                {totalEarners.toLocaleString()} នាក់
              </span>
            </div>
          )}

        </div>

        {/* Action Button (Blue Primary Base -> Red Secondary Hover) */}
        <Button
          onClick={handleShare}
          className="w-full h-12 rounded-2xl bg-primary-color hover:bg-blue-800 text-white text-lg font-bold shadow-md transition-all duration-300 gap-2"
        >
          <Share2 className="h-5 w-5" />
          <span>ចែករំលែកសមិទ្ធផល</span>
        </Button>

      </CardContent>
    </Card>
  );
}
