"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Share2 } from "lucide-react";
import { EarnedCertificate } from "@/types/certificate";

export function EarnedCertificateCard({
  certificate,
}: {
  certificate: EarnedCertificate;
}) {
  return (
    <Link href={`/certificate/${certificate.id}`}>
      <Card
        className="
          group
          w-[320px]
          shrink-0
          overflow-hidden
          rounded-3xl
          bg-background
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-2xl
          cursor-pointer
        "
      >
        {/* Thumbnail */}
        <div className="relative overflow-hidden">
          <img
            src={certificate.thumbnailUrl}
            alt={certificate.title}
            className="
              h-48
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />

          {/* Category */}
          <Badge
            className="
              absolute
              left-4
              top-4
              rounded-full
              bg-init-color/95
              px-3
              py-4
              text-lg
              font-semibold
              text-primary-color
              dark:bg-slate-200/95
              dark:text-primary-100 
              shadow
              hover:bg-white
            "
          >
            {certificate.category}
          </Badge>
        </div>

        {/* Content */}
        <CardContent className="flex h-full flex-col gap-5 p-6">
          {/* Title */}
          <h2
            className="
              min-height: 72px
              line-clamp-2
              text-lg
              text-primary-color
              dark:text-primary-100
              font-bold
              leading-tight
              tracking-tight
            "
          >
            {certificate.title}
          </h2>

          {/* Date + Status */}
          <div className="flex items-center justify-between">
            <span className="text-lg text-primary-color text-muted-foreground">
              {certificate.date}
            </span>

            <Badge
              className="
                rounded-full
                bg-green-100
                px-3
                py-4
                text-lg
                font-medium
                text-green-700
                hover:bg-green-100
              "
            >
              <CheckCircle2 className="mr-1 h-4 w-4" />
              Completed
            </Badge>
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between border-t pt-5">
            <div>
              <p className="text-lg text-primary-color uppercase tracking-wider text-muted-foreground">
                Certificate ID
              </p>
              <p className="text-primary-color text-lg font-semibold">
                #{certificate.certificateId}
              </p>
            </div>

            <button
              onClick={(e) => e.preventDefault()}
              className="
                text-primary-color
                dark:text-primary-100
                hover:text-primary-600
                rounded-full
                border
                p-2.5
                transition-colors
                hover:bg-muted
              "
            >
              <Share2 className="h-6 w-6" />
            </button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}