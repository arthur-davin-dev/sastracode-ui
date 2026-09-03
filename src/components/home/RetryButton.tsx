"use client";

import { useRouter } from "next/navigation";

export default function RetryButton({ label }: { label: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.refresh()}
      className="mt-3 rounded-xl bg-primary-color px-4 py-2 text-sm font-bold text-white"
    >
      {label}
    </button>
  );
}
