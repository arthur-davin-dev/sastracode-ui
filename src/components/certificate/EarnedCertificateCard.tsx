"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Share2 } from "lucide-react";
import Link from "next/link";
import { EarnedCertificate } from "@/types/certificate";

export function EarnedCertificateCard({ certificate }: { certificate: EarnedCertificate }) {
  return (
    <Link href={`/certificate/${certificate.id}`}>
      <Card className="min-width: 240px  width: 240px shrink-0  shadow-sm flex flex-col
      overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300
      ">
        <div className="relative">
          <img src={certificate.thumbnailUrl} alt={certificate.title} className="w-full h-40 object-cover" />
          <span className="absolute top-2 left-2 text-xs bg-white/90 px-2 py-0.5 rounded-md font-medium">
            {certificate.category}
          </span>
        </div>

        <CardContent className="p-4 space-y-2 flex-1 flex flex-col">
          <p className="text-content font-medium line-clamp-2 min-height: 40px"> 
            {certificate.title}
          </p>

          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{certificate.date}</p>
            <Badge className="bg-green-50 text-green-600 text-xs gap-1 hover:bg-green-50">
              <CheckCircle2 className="h-3 w-3" /> ជាបញ្ចប់
            </Badge>
          </div>

          <div className="flex items-center justify-between pt-2 border-t mt-auto">
            <span className="text-xs text-muted-foreground">ID: #{certificate.certificateId}</span>
            <Share2 className="h-3 w-3 text-muted-foreground cursor-pointer" />
          </div>
        </CardContent>
      </Card>  
    </Link>
    );  
}