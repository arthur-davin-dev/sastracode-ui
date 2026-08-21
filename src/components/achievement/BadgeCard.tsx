// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Card, CardContent } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Button } from "@/components/ui/button";
// import { Lock, Sparkles } from "lucide-react";
// import { AchievementBadge } from "@/types/achievement";

// export function BadgeCard({ badge }: { badge: AchievementBadge }) {
//   const router = useRouter();
//   const isClaimable = badge.progressPercent >= 100; // Updated standard claimable threshold (100%)

//   const cardContent = (
//     <Card
//       className={`group relative h-full rounded-3xl border-2 transition-all duration-300 overflow-hidden ${
//         badge.locked
//           ? "bg-slate-50/80 border-slate-200 dark:bg-slate-800/40 dark:border-slate-800 opacity-80"
//           : "bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-primary-color hover:-translate-y-1.5"
//       }`}
//     >
//       {/* Background Accent Glow for unlocked badges */}
//       {!badge.locked && (
//         <div className="absolute -top-12 -right-12 h-28 w-28 rounded-full bg-yellow-400/20 blur-2xl group-hover:bg-blue-600/20 transition-all duration-500" />
//       )}

//       <CardContent className="flex flex-col items-center justify-between gap-4 p-6 text-center h-full relative z-10">
        
//         {/* Badge Icon Header Container */}
//         <div className="relative">
//           <div
//             className={`h-20 w-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-inner ${
//               badge.locked
//                 ? "bg-slate-200/80 dark:bg-slate-800 text-slate-400"
//                 : "bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-500 text-slate-950 shadow-amber-300/50 group-hover:scale-105"
//             }`}
//           >
//             {badge.locked ? (
//               <Lock className="h-8 w-8 text-slate-400 dark:text-slate-500" />
//             ) : (
//               <img
//                 src={badge.iconUrl || "/images/Margin3.png"}
//                 className="h-12 w-12 object-contain filter drop-shadow-md"
//                 alt={badge.name}
//               />
//             )}
//           </div>
          
//         </div>

//         {/* Title (set to text-2xl & text-primary-color) */}
//         <div className="space-y-1">
//           <h3 className="text-2xl font-bold text-primary-color dark:text-white transition-colors duration-300 line-clamp-1">
//             {badge.locked ? "មិនទាន់ដោះសោ" : badge.name}
//           </h3>

//           {!badge.locked && (
//             /* Points Content (set to text-lg) */
//             <p className="text-lg font-semibold text-red-600 dark:text-red-400 transition-colors duration-300">
//               +{badge.points} ពិន្ទុ
//             </p>
//           )}
//         </div>

//         {/* Action / Progress Footer */}
//         <div className="w-full mt-auto pt-2">
//           {isClaimable && !badge.locked ? (
//             <Button
//               size="lg"
//               className="w-full h-12 rounded-2xl bg-yellow-500 hover:bg-yellow-300 text-primary-color text-lg font-bold shadow-md transition-all duration-300 hover:scale-[1.02]"
//               onClick={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 // Claim handler logic
//               }}
//             >
//               ទទួលបាន
//             </Button>
//           ) : (
//             <div className="space-y-2">
//               <div className="relative w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
//                 <div
//                   className={`h-full transition-all duration-500 rounded-full ${
//                     badge.locked ? "bg-slate-300 dark:bg-slate-700" : "bg-red-500"
//                   }`}
//                   style={{ width: `${Math.min(badge.progressPercent, 100)}%` }}
//                 />
//               </div>

//               {/* Status Labels (set to text-lg) */}
//               <div className="flex justify-between items-center w-full text-lg font-medium text-slate-600 dark:text-slate-400">
//                 <span>{badge.progressPercent}%</span>
//                 <span>នៅសល់ {badge.remaining}</span>
//               </div>
//             </div>
//           )}
//         </div>

//       </CardContent>
//     </Card>
//   );

//   if (badge.locked) {
//     return cardContent;
//   }

//   if (isClaimable) {
//     return (
//       <div
//         className="cursor-pointer h-full"
//         onClick={() => router.push(`/achivement/${badge.id}`)}
//       >
//         {cardContent}
//       </div>
//     );
//   }

//   return (
//     <Link href={`/achivement/${badge.id}`} className="block h-full">
//       {cardContent}
//     </Link>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LockKeyhole,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { AchievementBadge } from "@/types/achievement";

export function BadgeCard({ badge }: { badge: AchievementBadge }) {
  const router = useRouter();

  const progress = Math.min(
    Math.max(badge.progressPercent ?? 0, 0),
    100
  );

  const isClaimable = progress >= 100 && !badge.locked;

  const handleOpenDetail = () => {
    router.push(`/achivement/${badge.id}`);
  };

  return (
    <Card
      role="link"
      tabIndex={0}
      onClick={handleOpenDetail}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpenDetail();
        }
      }}
      className={`
        group relative h-full cursor-pointer overflow-hidden
        rounded-3xl border
        transition-all duration-300

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary-color
        focus-visible:ring-offset-2

        ${
          badge.locked
            ? `
              border-slate-200
              bg-white
              hover:-translate-y-1
              hover:border-primary-color/40
              hover:shadow-lg

              dark:border-slate-800
              dark:bg-slate-900
            `
            : `
              border-slate-200
              bg-white
              shadow-sm
              hover:-translate-y-1.5
              hover:border-primary-color
              hover:shadow-xl

              dark:border-slate-800
              dark:bg-slate-900
            `
        }
      `}
    >
      {/* Background decoration */}
      <div
        className={`
          pointer-events-none
          absolute -right-10 -top-10
          h-28 w-28 rounded-full blur-3xl
          transition-all duration-500

          ${
            badge.locked
              ? "bg-slate-300/20"
              : "bg-yellow-400/20 group-hover:bg-primary-color/20"
          }
        `}
      />

      <CardContent className="relative z-10 flex h-full flex-col items-center p-5 text-center">
        {/* Badge Image */}
        <div className="relative mb-4">
          <div
            className={`
              flex h-20 w-20 items-center justify-center
              rounded-2xl border
              transition-all duration-300

              ${
                badge.locked
                  ? `
                    border-slate-200
                    bg-slate-100
                    dark:border-slate-700
                    dark:bg-slate-800
                  `
                  : `
                    border-slate-200
                    shadow-sm
                    group-hover:scale-105
                  `
              }
            `}
          >
            {/* Always show real badge image */}
            <img
              src={badge.iconUrl || "/images/Margin3.png"}
              alt={badge.name}
              className={`
                h-12 w-12 object-contain
                transition-all duration-300

                ${
                  badge.locked
                    ? "opacity-60 grayscale"
                    : "drop-shadow-md"
                }
              `}
            />
          </div>

          {/* Lock overlay */}
          {badge.locked && (
            <div
              className="
                absolute -bottom-2 -right-2
                flex h-8 w-8 items-center justify-center
                rounded-full
                border-[3px] border-white
                bg-slate-800
                text-white
                shadow-md

                dark:border-slate-900
              "
            >
              <LockKeyhole className="h-4 w-4" />
            </div>
          )}

          {/* Unlocked indicator */}
          {!badge.locked && (
            <div
              className="
                absolute -bottom-2 -right-2
                flex h-8 w-8 items-center justify-center
                rounded-full
                border-[3px] border-white
                bg-green-500
                text-white
                shadow-md

                dark:border-slate-900
              "
            >
              <CheckCircle2 className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Badge name */}
        <h3
          className="
            line-clamp-1
            text-xl font-bold
            text-primary-color
            dark:text-white
          "
        >
          {badge.name}
        </h3>

        {/* Points */}
        <div className="mt-1 flex items-center justify-center gap-1.5">
          <Sparkles className="h-4 w-4 text-yellow-500" />

          <p className="text-base font-semibold text-red-500 dark:text-red-400">
            +{badge.points} ពិន្ទុ
          </p>
        </div>

        {/* Bottom section */}
        <div className="mt-auto w-full pt-5">
          {isClaimable ? (
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                // TODO: call claim badge API
                console.log("Claim badge:", badge.id);
              }}
              className="
                h-11 w-full
                rounded-xl
                bg-primary-color
                font-bold
                text-white
                shadow-sm
                transition-all duration-300
                hover:scale-[1.02]
                hover:opacity-90
              "
            >
              {/* <Sparkles className="mr-2 h-4 w-4" /> */}
              ទទួលបានមេដាយ
            </Button>
          ) : (
            <>
              {/* Progress */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  វឌ្ឍនភាព
                </span>

                <span className="text-sm font-bold text-primary-color dark:text-blue-400">
                  {progress}%
                </span>
              </div>

              {/* Progress bar */}
              <div
                className="
                  h-2 w-full overflow-hidden
                  rounded-full
                  bg-slate-100
                  dark:bg-slate-800
                "
              >
                <div
                  className={`
                    h-full rounded-full
                    transition-all duration-700

                    ${
                      badge.locked
                        ? "bg-primary-color"
                        : "bg-green-500"
                    }
                  `}
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              {/* Footer */}
              <div className="mt-3 flex items-center justify-between">
                {badge.locked ? (
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    នៅសល់{" "}
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {badge.remaining}
                    </span>
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    បានដោះសោ
                  </span>
                )}

                <div
                  className="
                    flex items-center gap-1
                    text-sm font-semibold
                    text-primary-color
                    transition-all duration-300
                    group-hover:gap-2
                    dark:text-blue-400
                  "
                >
                  លម្អិត

                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}