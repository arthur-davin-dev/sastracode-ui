"use client";

import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, CheckCircle2, Hourglass, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CertificateStatsRowProps {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  lockedCourses: number;
}

export function CertificateStatsRow({
  totalCourses,
  completedCourses,
  inProgressCourses,
  lockedCourses,
}: CertificateStatsRowProps) {
  const stats = [
    {
      icon: GraduationCap,
      value: totalCourses,
      label: "វិញ្ញាបនបត្រដែលទទួលបាន",
      tag: "សរុប",
      color: "yellow",
    },
    {
      icon: CheckCircle2,
      value: completedCourses,
      label: "វគ្គសិក្សាបានបញ្ចប់",
      tag: "ត្រូវបាន",
      color: "red",
    },
    {
      icon: Hourglass,
      value: inProgressCourses,
      label: "វគ្គសិក្សាកំពុងបន្ត",
      tag: "កំពុងសិក្សា",
      color: "orange",
    },
    {
      icon: Lock,
      value: lockedCourses,
      label: "វគ្គសិក្សាជាប់សោ",
      tag: "មិនទាន់មាន",
      color: "gray",
    },
  ];

  const colorMap = {
    yellow: {
      tag: "bg-init-color/20 text-primary-color dark:text-init-color border border-init/50",
      bar: "bg-init-color",
      iconBg: "bg-yellow-400/20 text-red-600 border border-yellow-400/50",
    },
    red: {
      tag: "bg-red-600/10 text-red-600 dark:text-red-400 border border-red-600/30",
      bar: "bg-red-600",
      iconBg: "bg-red-600/10 text-red-600 dark:text-red-400 border border-red-600/30",
    },
    orange: {
      tag: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30",
      bar: "bg-orange-500",
      iconBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30",
    },
    gray: {
      tag: "bg-primary-color dark:bg-primary-color text-white  border border-primary-color dark:border-slate-700",
      bar: "bg-primary-color/80 dark:bg-slate-600",
      iconBg: "bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700",
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => {
        const c = colorMap[stat.color as keyof typeof colorMap];
        return (
          <Card
            key={i}
            className="group relative overflow-hidden rounded-3xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            {/* Top Accent Gradient Ribbon */}
            <div className="absolute top-0 left-0 w-full h-1.5 " />

            <CardContent className="p-6 space-y-4">
              {/* Header: Icon & Tag Badge */}
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "h-12 w-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs",
                    c.iconBg
                  )}
                >
                  <stat.icon className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <span
                  className={cn(
                    "text-lg font-bold px-3.5 py-1 rounded-full shadow-xs",
                    c.tag
                  )}
                >
                  {stat.tag}
                </span>
              </div>

              {/* Value (text-2xl & text-primary-color) */}
              <div className="text-2xl font-extrabold text-primary-color dark:text-white pt-1">
                {stat.value}
              </div>

              {/* Label (text-lg & text-primary-color) */}
              <div className="text-lg font-medium text-primary-color dark:text-white opacity-80 leading-snug">
                {stat.label}
              </div>
            </CardContent>

            {/* Bottom Color Bar */}
            <span
              className={cn(
                "absolute inset-x-0 bottom-0 h-1.5 transition-all duration-300 group-hover:h-2",
                c.bar
              )}
            />
          </Card>
        );
      })}
    </div>
  );
}