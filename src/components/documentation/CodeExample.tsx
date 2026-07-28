"use client";

export default function CodeExample({
  filename,
  code,
}: {
  filename: string;
  code: string;
}) {
  if (!code) return null;
  return (
    <div className="bg-[#1E1E1E] text-gray-100 overflow-hidden mb-6" style={{ borderRadius: 16 }}>
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs text-gray-400">ឧទាហរណ៍ {filename}</span>
      </div>
      <pre className="p-4 text-sm overflow-x-auto">{code}</pre>
      <div className="px-4 pb-4">
        <button
          className="px-4 py-2 text-sm font-medium text-white"
          style={{ background: "#002455", borderRadius: 16 }}
        >
          ដំណើរការកូដ
        </button>
      </div>
    </div>
  );
}
