// src/components/documentation/SearchResultCard.tsx
import React from "react";
import Link from "next/link";

// 1. Update this interface to match your real data properties
interface SearchResultItem {
  id: string | number;
  title: string;
  description?: string;
  // If your actual items don't have a slug, remove it from here or make it optional:
  slug?: string; 
}

interface SearchResultCardProps {
  result: SearchResultItem; // Matches your exact array type now
}

export default function SearchResultCard({ result }: SearchResultCardProps) {
  // The document endpoint requires the tutorial UUID, not its slug.
  const targetHref = `/documentation/lessons/${result.id}`;

  return (
    <Link 
      href={targetHref}
      className="block p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors shadow-sm"
    >
      <h4 className="text-base font-semibold text-foreground mb-1">
        {result.title}
      </h4>
      {result.description && (
        <p className="text-sm text-muted-foreground line-clamp-2">
          {result.description}
        </p>
      )}
    </Link>
  );
}
