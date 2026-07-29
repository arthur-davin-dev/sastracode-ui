"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LayoutGrid,
  List,
  ChevronRight,
  CheckCircle2,
  FileText,
  Share2,
} from "lucide-react";
import { EarnedCertificate } from "@/types/certificate";

interface EarnedCertificatesSectionProps {
  certificates: EarnedCertificate[];
}

export function EarnedCertificatesSection({
  certificates,
}: EarnedCertificatesSectionProps) {
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const handleShare = (certId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/certificate/${certId}`);
  };

  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <CardTitle className="text-[18px] font-semibold flex items-center gap-2.5 text-slate-900 dark:text-slate-100">
          <span className="h-7 w-7 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </span>
          វិញ្ញាបនបត្រដែលបានទទួល
        </CardTitle>

        <Link
          href="/certificate"
          className="text-[18px] text-indigo-600 dark:text-indigo-400 flex items-center gap-1 font-medium hover:underline transition-colors"
        >
          មើលទាំងអស់ <ChevronRight className="h-4 w-4" />
        </Link>
      </CardHeader>

      {/* Content Body */}
      <CardContent className="space-y-5 pt-4">
        {/* Controls Bar */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-full p-1">
            <button
              onClick={() => setFilter("all")}
              className={`text-[18px] px-4 py-1.5 rounded-full font-medium transition-all ${
                filter === "all"
                  ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              គ្រប់ភាពតាមខែ
            </button>
            <button
              onClick={() => setFilter("docs")}
              className={`text-[18px] px-4 py-1.5 rounded-full flex items-center gap-2 font-medium transition-all ${
                filter === "docs"
                  ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <FileText className="h-4 w-4" /> ឯកសារមេរៀន
            </button>
          </div>

          {/* Select Limit + View Switcher */}
          <div className="flex items-center gap-3">
            <Select defaultValue="12">
              <SelectTrigger className="w-[120px] h-9 text-[18px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">
                <SelectValue placeholder="ចំនួន" />
              </SelectTrigger>
              <SelectContent className="w-[120px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-[18px]">
                <SelectItem value="12" className="text-[18px]">
                  ចំនួន (12)
                </SelectItem>
                <SelectItem value="8" className="text-[18px]">
                  ចំនួន (8)
                </SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-0.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-lg p-1">
              <Button
                size="icon"
                variant="ghost"
                className={`h-7 w-7 rounded-md transition-colors ${
                  view === "grid"
                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                onClick={() => setView("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className={`h-7 w-7 rounded-md transition-colors ${
                  view === "list"
                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Dynamic Cards Container */}
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              : "flex flex-col gap-4"
          }
        >
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
            >
              <Link href={`/certificate/${cert.id}`} className="block group">
                {view === "grid" ? (
                  /* GRID CARD VIEW */
                  <div className="relative flex flex-col justify-between h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all duration-300">
                    {/* Image & Category Overlay */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800/80 mb-4">
                      <img
                        src={cert.thumbnailUrl}
                        alt={cert.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50 shadow-xs">
                        {cert.category}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="flex-1 space-y-3">
                      <h3 className="text-[18px] font-bold text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {cert.title}
                      </h3>

                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          {cert.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 shrink-0">
                          <CheckCircle2 size={13} />
                          Completed
                        </span>
                      </div>

                      <div className="border-t border-slate-100 dark:border-slate-800/80 my-2" />

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                            Certificate ID
                          </span>
                          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
                            #{cert.certificateId}
                          </span>
                        </div>

                        <button
                          type="button"
                          aria-label="Share Certificate"
                          onClick={(e) => handleShare(cert.id, e)}
                          className="rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* LIST CARD VIEW */
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all duration-300">
                    <div className="relative aspect-[16/10] w-full sm:w-48 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                      <img
                        src={cert.thumbnailUrl}
                        alt={cert.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 rounded-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2 py-0.5 text-[11px] font-semibold text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50">
                        {cert.category}
                      </span>
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      <h3 className="text-[18px] font-bold text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {cert.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {cert.date}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                          <CheckCircle2 size={12} />
                          Completed
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                      <span className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold">
                        ID
                      </span>
                      <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
                        #{cert.certificateId}
                      </span>
                    </div>

                    <button
                      type="button"
                      aria-label="Share Certificate"
                      onClick={(e) => handleShare(cert.id, e)}
                      className="rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}