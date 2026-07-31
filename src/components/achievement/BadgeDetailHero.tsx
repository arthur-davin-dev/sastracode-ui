"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Sparkles } from "lucide-react";
import { BadgeDetail } from "@/types/achievement";

export function BadgeDetailHero({ badge }: { badge: BadgeDetail }) {
  return (
    <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl  transition-all duration-300">
      
      {/* Decorative Background Ambient Glows */}
      <div className="absolute -top-16 -left-16 h-44 w-44 rounded-full bg-yellow-400/20 blur-3xl" />
      <div className="absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-blue-600/10 blur-3xl" />

      <CardContent className="relative z-10 flex flex-col items-center text-center p-8 md:p-10 space-y-4">
        
        {/* Badge Icon Box with Ambient Glow */}
        <div className="relative group my-2">
          <div className="absolute inset-0 rounded-3xl blur-xl group-hover:bg-yellow-400/20 transition-all duration-500" />
          
          <div className="relative h-28 w-28 rounded-3xl  flex items-center justify-center p-4 border-1 border-init-color group-hover:scale-105 transition-transform duration-300">
            <img 
              src={badge.iconUrl || "/images/Margin3.png"} 
              alt={badge.name} 
              className="h-20 w-20 object-contain filter drop-shadow-md" 
            />
          </div>

        </div>

        {/* Category Pill Badge (Yellow Accent Background with Red Text Highlight) */}
        <Badge className="px-4 py-4 rounded-xl  text-red-600 dark:text-yellow-300 border border-yellow-400/40 text-lg font-bold shadow-xs flex items-center gap-3">
          <Award className="h-10 w-10 text-yellow-500 " />
          <span>មេដាយសមិទ្ធផល</span>
        </Badge>

        {/* Badge Title (text-2xl & text-primary-color) */}
        <h2 className="text-2xl font-bold text-primary-color dark:text-white transition-colors duration-300 leading-snug">
          {badge.name}
        </h2>

        {/* Badge Description (text-lg) */}
        <p className="text-lg font-medium text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed transition-colors duration-300">
          {badge.description}
        </p>

      </CardContent>
    </Card>
  );
}