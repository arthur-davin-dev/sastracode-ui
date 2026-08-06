// CodeWindow.tsx
export default function CodeWindow() {
  return (
    <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
      <div className="relative rounded-2xl border border-white/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 p-px backdrop-blur-sm transition-colors duration-300">
        {/* <!-- Window chrome --> */}
        <div className="flex items-center justify-between border-b border-white/20 dark:border-gray-700/30 px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="size-2 sm:size-2.5 rounded-full bg-red-400"></span>
            <span className="size-2 sm:size-2.5 rounded-full bg-yellow-400"></span>
            <span className="size-2 sm:size-2.5 rounded-full bg-green-400"></span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 opacity-40">
            <span className="size-3 sm:size-4 rounded border border-gray-800 dark:border-gray-400"></span>
            <span className="size-3 sm:size-4 rounded bg-gray-800 dark:bg-gray-400"></span>
            <span className="size-3 sm:size-4 rounded-full border border-gray-800 dark:border-gray-400"></span>
          </div>
        </div>

        {/* <!-- Code --> */}
        <div className="space-y-0 p-4 sm:p-6 lg:p-8 font-mono text-[10px] sm:text-[11px] lg:text-[13px] leading-[18px] sm:leading-[21px] overflow-x-auto">
          <p className="whitespace-nowrap">
            <span className="text-orange-500">document</span>
            <span className="text-gray-700 dark:text-gray-300">.</span>
            <span className="text-blue-600 dark:text-blue-400">addEventListener</span>
            <span className="text-gray-700 dark:text-gray-300">(</span>
            <span className="text-green-600 dark:text-green-400">"DOMContentLoaded"</span>
            <span className="text-gray-700 dark:text-gray-300">, () =&gt; {"{"}</span>
          </p>
          <p className="pl-2 sm:pl-4 whitespace-nowrap">
            <span className="text-purple-600 dark:text-purple-400">let</span>
            <span className="text-gray-700 dark:text-gray-300"> count = </span>
            <span className="text-blue-500 dark:text-blue-400">0</span>
            <span className="text-gray-700 dark:text-gray-300">;</span>
          </p>
          <p className="pl-2 sm:pl-4 whitespace-nowrap">
            <span className="text-purple-600 dark:text-purple-400">const</span>
            <span className="text-gray-700 dark:text-gray-300"> button = </span>
            <span className="text-blue-600 dark:text-blue-400">docuseElement</span>
            <span className="text-gray-700 dark:text-gray-300">();</span>
          </p>
          <p className="pl-2 sm:pl-4 opacity-50 text-gray-700 dark:text-gray-400 whitespace-nowrap">..</p>
          <p className="pl-2 sm:pl-4 whitespace-nowrap">
            <span className="text-gray-700 dark:text-gray-300">button.</span>
            <span className="text-blue-600 dark:text-blue-400">addEventListener</span>
            <span className="text-gray-700 dark:text-gray-300">(</span><span className="text-green-600 dark:text-green-400">"click"</span><span className="text-gray-700 dark:text-gray-300">, () =&gt; {"{"}</span>
          </p>
          <p className="pl-4 sm:pl-8 text-gray-700 dark:text-gray-300 whitespace-nowrap">quiz.<span className="text-blue-600 dark:text-blue-400">neettotocker</span>++;</p>
          <p className="pl-4 sm:pl-8 text-gray-700 dark:text-gray-300 whitespace-nowrap">button.textContent = <span className="text-green-600 dark:text-green-400">`clsseroqust`</span>;</p>
          <p className="pl-2 sm:pl-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">{"}"});</p>
          <p className="pl-2 sm:pl-4 opacity-50 text-gray-700 dark:text-gray-400 whitespace-nowrap">..</p>
          <p className="pl-2 sm:pl-4 whitespace-nowrap">
            <span className="text-orange-500">document</span>
            <span className="text-gray-700 dark:text-gray-300">.body.</span>
            <span className="text-blue-600 dark:text-blue-400">appendChild</span>
            <span className="text-gray-700 dark:text-gray-300">(button);</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 whitespace-nowrap">{"}"});</p>
          <div className="flex items-center gap-3 pt-4 sm:pt-6 lg:pt-8 opacity-60">
            <span className="rounded border border-gray-400 dark:border-gray-500 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] text-gray-700 dark:text-gray-300">Body</span>
            <span className="font-bold text-gray-700 dark:text-gray-300 text-xs sm:text-sm">B</span>
            <span className="italic text-gray-700 dark:text-gray-300 text-xs sm:text-sm">I</span>
            <span className="h-4 w-px bg-gray-400 dark:bg-gray-500"></span>
            <span className="h-2 w-12 sm:w-20 rounded-full bg-gray-200 dark:bg-gray-600"></span>
          </div>
        </div>
      </div>

      {/* <!-- Floating CSS card --> */}
      <div className="absolute -bottom-2 -right-1 sm:-bottom-4 sm:-right-2 w-36 sm:w-44 lg:w-72 rounded-xl border border-white/80 dark:border-gray-700/80 bg-white/70 dark:bg-gray-800/70 p-2 sm:p-3 lg:p-6 shadow-lg backdrop-blur-sm transition-colors duration-300">
        <pre className="font-mono text-[7px] sm:text-[9px] lg:text-xs leading-snug whitespace-pre-wrap break-words overflow-x-auto">
          <span className="font-bold text-[#6a1b9e] dark:text-purple-400">.course-title {"{"}</span>
          <span className="text-gray-700 dark:text-gray-300">color: </span>
          <span className="text-[#6a1b9e] dark:text-purple-400">#6a1b9e;</span>
          <span className="text-gray-400 dark:text-gray-500">/* deep purple */</span>
          <span className="text-gray-700 dark:text-gray-300">font-family: 'Inter', sans-serif;</span>
          <span className="text-gray-700 dark:text-gray-300">font-size: 24px;</span>
          <span className="font-bold text-[#6a1b9e] dark:text-purple-400">{"}"}</span>

          <span className="font-bold text-[#6a1b9e] dark:text-purple-400">.lesson-card {"{"}</span>
          <span className="text-gray-700 dark:text-gray-300">border-color: </span>
          <span className="text-[#6a1b9e] dark:text-purple-400">#d1c4e9;</span>
          <span className="text-gray-400 dark:text-gray-500">/* soft violet */</span>
          <span className="font-bold text-[#6a1b9e] dark:text-purple-400">{"}"}</span>
        </pre>
      </div>

      {/* <!-- Chart icon --> */}
      <div className="absolute -bottom-4 left-2 sm:-bottom-6 sm:left-6 lg:-bottom-10 lg:left-16 rounded-xl border border-violet-200/50 dark:border-violet-800/50 bg-white/70 dark:bg-gray-800/70 p-2 sm:p-2.5 lg:p-4 shadow-lg backdrop-blur-sm transition-colors duration-300">
        <img src="assets/home/svg/chart-icon.svg" alt="" className="size-5 sm:size-7 lg:size-10" />
      </div>
    </div>
  );
}

