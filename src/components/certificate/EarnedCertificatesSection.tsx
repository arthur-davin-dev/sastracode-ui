"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutGrid, List, ChevronRight, CheckCircle2, FileText } from "lucide-react";
import { EarnedCertificateCard } from "@/components/certificate/EarnedCertificateCard";
import { EarnedCertificate } from "@/types/certificate";

interface EarnedCertificatesSectionProps {
  certificates: EarnedCertificate[];
}

export function EarnedCertificatesSection({ certificates }: EarnedCertificatesSectionProps) {
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sub-title font-semibold flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
          </span>
          វិញ្ញាបនបត្រដែលបានទទួល
        </CardTitle>
        <a href="#" className="text-content text-blue-600 flex items-center gap-1 hover:underline"> 
          មើលទាំងអស់ <ChevronRight className="h-3 w-3" />
        </a>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 border rounded-full p-1">
            <button
              onClick={() => setFilter("all")}
              className={`text-content px-4 py-1.5 rounded-full transition-colors ${
                filter === "all" ? "bg-blue-600 text-white" : "text-muted-foreground"
              }`}
            >
              គ្រប់ភាពតាមខែ
            </button>
            <button
              onClick={() => setFilter("docs")}
              className={`text-content px-4 py-1.5 rounded-full flex items-center gap-1 transition-colors ${
                filter === "docs" ? "bg-blue-600 text-white" : "text-muted-foreground"
              }`}
            >
              <FileText className="h-3 w-3" /> ឯកសារមេរៀន
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Select defaultValue="12">
              <SelectTrigger className="w-[110px] h-8 text-content">
                <SelectValue placeholder="ចំនួន" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">ចំនួន(12)</SelectItem>
                <SelectItem value="8">ចំនួន(8)</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-1 border rounded-md p-0.5">
              <Button size="icon" variant="ghost" className={`h-7 w-7 ${view === "grid" ? "bg-blue-50 text-blue-600" : ""}`} onClick={() => setView("grid")}>
                <LayoutGrid className="h-3.5 w-3.5" />
              </Button>
              <Button size="icon" variant="ghost" className={`h-7 w-7 ${view === "list" ? "bg-blue-50 text-blue-600" : ""}`} onClick={() => setView("list")}>
                <List className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <EarnedCertificateCard certificate={cert} />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}