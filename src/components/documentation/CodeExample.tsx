"use client";

import { div } from "framer-motion/client";

export default function CodeExample({
  filename,
  code,
}: {
  filename: string;
  code: string;
}) {
  if (!code) return null;
  return (
    <>
    <div className="text-[#1E1E1E] bg-gray-100 overflow-hidden mb-6 border  border-2" style={{ borderRadius: 16 }}>
      <div className="flex items-center gap-1.5 px-4 pt-6 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <span className="ml-2 text-[18px] text-gray-400">{filename}</span>
      </div>
      <pre className="p-4 text-[16px] overflow-x-auto">{code}</pre>
      
    </div>
    <div className=" pb-4">
        <button
          className="px-4 py-2 text-[16px] font-medium text-white"
          style={{ background: "#002455", borderRadius: 16 }}
        >
          ដំណើរការកូដ
        </button>
      </div>
    </>
  );
}
