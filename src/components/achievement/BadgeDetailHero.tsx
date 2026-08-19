// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Award, Sparkles } from "lucide-react";
// import { BadgeDetail } from "@/types/achievement";

// export function BadgeDetailHero({ badge }: { badge: BadgeDetail }) {
//   return (
//     <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl  transition-all duration-300">
      
//       {/* Decorative Background Ambient Glows */}
//       <div className="absolute -top-16 -left-16 h-44 w-44 rounded-full bg-yellow-400/20 blur-3xl" />
//       <div className="absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-blue-600/10 blur-3xl" />

//       <CardContent className="relative z-10 flex flex-col items-center text-center p-8 md:p-10 space-y-4">
        
//         {/* Badge Icon Box with Ambient Glow */}
//         <div className="relative group my-2">
//           <div className="absolute inset-0 rounded-3xl blur-xl group-hover:bg-yellow-400/20 transition-all duration-500" />
          
//           <div className="relative h-28 w-28 rounded-3xl  flex items-center justify-center p-4 border-1 border-init-color group-hover:scale-105 transition-transform duration-300">
//             <img 
//               src={badge.iconUrl || "/images/Margin3.png"} 
//               alt={badge.name} 
//               className="h-20 w-20 object-contain filter drop-shadow-md" 
//             />
//           </div>

//         </div>

//         {/* Category Pill Badge (Yellow Accent Background with Red Text Highlight) */}
//         <Badge className="px-4 py-4 rounded-xl  text-red-600 dark:text-yellow-300 border border-yellow-400/40 text-lg font-bold shadow-xs flex items-center gap-3">
//           <Award className="h-10 w-10 text-yellow-500 " />
//           <span>មេដាយសមិទ្ធផល</span>
//         </Badge>

//         {/* Badge Title (text-2xl & text-primary-color) */}
//         <h2 className="text-2xl font-bold text-primary-color dark:text-white transition-colors duration-300 leading-snug">
//           {badge.name}
//         </h2>

//         {/* Badge Description (text-lg) */}
//         <p className="text-lg font-medium text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed transition-colors duration-300">
//           {badge.description}
//         </p>

//       </CardContent>
//     </Card>
//   );
// }


"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Check,
  CheckCircle2,
  LockKeyhole,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { BadgeDetail } from "@/types/achievement";

export function BadgeDetailHero({
  badge,
}: {
  badge: BadgeDetail;
}) {
  /**
   * ============================
   * PROGRESS
   * ============================
   */

  const completionProgress = Math.min(
    Math.max(badge.completionPercent ?? 0, 0),
    100
  );

  const xpProgress = Math.min(
    Math.max(badge.xpProgressPercent ?? 0, 0),
    100
  );

  /**
   * ============================
   * REQUIREMENTS
   * ============================
   */

  const requirements = badge.requirements ?? [];

  const totalRequirements = requirements.length;

  const completedRequirements = requirements.filter(
    (requirement) => requirement.completed
  ).length;

  const hasRequirements = totalRequirements > 0;

  const allRequirementsCompleted = hasRequirements
    ? requirements.every(
        (requirement) => requirement.completed
      )
    : true;

  /**
   * ============================
   * LOCK CONDITION
   * ============================
   *
   * IMPORTANT:
   *
   * 0%   -> LOCK
   * 20%  -> LOCK
   * 99%  -> LOCK
   *
   * 100% + requirements complete -> EARNED
   *
   * We DO NOT use earnedDate to decide this.
   */

  const isEarned =
    completionProgress >= 100 &&
    allRequirementsCompleted;

  const isLocked = !isEarned;

  return (
    <Card
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* ================================= */}
      {/* BACKGROUND DECORATION */}
      {/* ================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -left-20
          -top-20
          h-52
          w-52
          rounded-full
          bg-yellow-400/15
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -right-20
          h-52
          w-52
          rounded-full
          bg-primary-color/10
          blur-3xl
        "
      />

      <CardContent className="relative z-10 p-6 md:p-10">
        <div
          className="
            mx-auto
            flex
            max-w-2xl
            flex-col
            items-center
            text-center
          "
        >
          {/* ================================= */}
          {/* BADGE IMAGE */}
          {/* ================================= */}

          <div className="group relative mb-5">
            {/* Glow */}

            <div
              className={`
                absolute
                inset-0
                rounded-full
                blur-2xl
                transition-all
                duration-500

                ${
                  isLocked
                    ? `
                      bg-slate-300/20
                      dark:bg-slate-700/20
                    `
                    : `
                      bg-yellow-400/20
                      group-hover:bg-yellow-400/30
                    `
                }
              `}
            />

            {/* Image Container */}

            <div
              className={`
                relative
                flex
                h-32
                w-32
                items-center
                justify-center
                rounded-3xl
                border
                transition-all
                duration-300
                group-hover:scale-105

                ${
                  isLocked
                    ? `
                      border-slate-200
                      bg-slate-100

                      dark:border-slate-700
                      dark:bg-slate-800
                    `
                    : `
                      border-yellow-200

                      bg-gradient-to-br
                      from-yellow-50
                      via-white
                      to-yellow-100

                      shadow-md
                      shadow-yellow-500/10

                      dark:border-yellow-500/20
                      dark:from-slate-800
                      dark:via-slate-900
                      dark:to-yellow-950/30
                    `
                }
              `}
            >
              {/* ALWAYS SHOW REAL BADGE IMAGE */}

              <img
                src={
                  badge.iconUrl ||
                  "/images/Margin3.png"
                }
                alt={badge.name}
                className={`
                  h-24
                  w-24
                  object-contain
                  transition-all
                  duration-300

                  ${
                    isLocked
                      ? `
                        grayscale
                        opacity-50
                      `
                      : `
                        drop-shadow-md
                      `
                  }
                `}
              />

              {/* Locked Overlay */}

              {isLocked && (
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-3xl
                    bg-slate-900/[0.03]

                    dark:bg-black/10
                  "
                />
              )}
            </div>

            {/* ================================= */}
            {/* LOCK ICON */}
            {/* ================================= */}

            {isLocked && (
              <div
                className="
                  absolute
                  -bottom-3
                  -right-3

                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-full

                  border-4
                  border-white

                  bg-slate-800
                  text-white

                  shadow-lg

                  dark:border-slate-900
                "
              >
                <LockKeyhole className="h-5 w-5" />
              </div>
            )}

            {/* ================================= */}
            {/* EARNED ICON */}
            {/* ================================= */}

            {isEarned && (
              <div
                className="
                  absolute
                  -bottom-3
                  -right-3

                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-full

                  border-4
                  border-white

                  bg-green-500
                  text-white

                  shadow-lg

                  dark:border-slate-900
                "
              >
                <CheckCircle2 className="h-5 w-5" />
              </div>
            )}
          </div>

          {/* ================================= */}
          {/* CATEGORY */}
          {/* ================================= */}

          <Badge
            variant="outline"
            className="
              mb-4

              flex
              items-center
              gap-2

              rounded-full

              border-yellow-300
              bg-yellow-50

              px-4
              py-2

              text-sm
              font-bold
              text-yellow-700

              dark:border-yellow-500/30
              dark:bg-yellow-500/10
              dark:text-yellow-300
            "
          >
            <Award className="h-4 w-4" />

            {badge.category || "មេដាយសមិទ្ធផល"}
          </Badge>

          {/* ================================= */}
          {/* BADGE NAME */}
          {/* ================================= */}

          <h1
            className="
              text-2xl
              font-bold
              text-primary-color

              md:text-3xl

              dark:text-white
            "
          >
            {badge.name}
          </h1>

          {/* ================================= */}
          {/* LOCK / EARNED STATUS */}
          {/* ================================= */}

          <div className="mt-3">
            {isLocked ? (
              <Badge
                variant="outline"
                className="
                  flex
                  items-center
                  gap-2

                  rounded-full

                  border-slate-300
                  bg-slate-100

                  px-4
                  py-2

                  font-semibold
                  text-slate-600

                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-300
                "
              >
                <LockKeyhole className="h-4 w-4" />

                មិនទាន់ទទួលបាន
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="
                  flex
                  items-center
                  gap-2

                  rounded-full

                  border-green-200
                  bg-green-50

                  px-4
                  py-2

                  font-semibold
                  text-green-600

                  dark:border-green-500/20
                  dark:bg-green-500/10
                  dark:text-green-400
                "
              >
                <CheckCircle2 className="h-4 w-4" />

                បានទទួលមេដាយ
              </Badge>
            )}
          </div>

          {/* ================================= */}
          {/* XP REWARD */}
          {/* ================================= */}

          <div
            className="
              mt-4
              flex
              items-center
              gap-2
            "
          >
            <Sparkles className="h-5 w-5 text-yellow-500" />

            <span
              className="
                text-lg
                font-bold
                text-red-500

                dark:text-red-400
              "
            >
              +{badge.xpReward} XP
            </span>
          </div>

          {/* ================================= */}
          {/* DESCRIPTION */}
          {/* ================================= */}

          {badge.description && (
            <p
              className="
                mt-4
                max-w-xl

                text-base
                leading-7
                text-slate-600

                dark:text-slate-400
              "
            >
              {badge.description}
            </p>
          )}

          {/* ================================= */}
          {/* MAIN PROGRESS */}
          {/* ================================= */}

          {isLocked && (
            <div className="mt-7 w-full">
              <div
                className="
                  mb-2
                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    text-sm
                    font-medium
                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  វឌ្ឍនភាព
                </span>

                <span
                  className="
                    text-sm
                    font-bold
                    text-primary-color

                    dark:text-blue-400
                  "
                >
                  {completionProgress}%
                </span>
              </div>

              {/* Progress Bar */}

              <div
                className="
                  h-2.5
                  w-full
                  overflow-hidden
                  rounded-full

                  bg-slate-100

                  dark:bg-slate-800
                "
              >
                <div
                  className="
                    h-full
                    rounded-full
                    bg-primary-color

                    transition-all
                    duration-700
                  "
                  style={{
                    width: `${completionProgress}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* ================================= */}
          {/* REQUIREMENTS */}
          {/* ================================= */}

          {requirements.length > 0 && (
            <div
              className="
                mt-7
                w-full

                rounded-2xl

                border
                border-slate-200

                bg-slate-50/70

                p-5
                text-left

                dark:border-slate-800
                dark:bg-slate-800/40
              "
            >
              {/* Header */}

              <div
                className="
                  mb-5
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center

                    rounded-xl

                    bg-primary-color/10
                    text-primary-color

                    dark:bg-blue-500/10
                    dark:text-blue-400
                  "
                >
                  <Target className="h-5 w-5" />
                </div>

                <div>
                  <h3
                    className="
                      font-bold
                      text-slate-900

                      dark:text-white
                    "
                  >
                    លក្ខខណ្ឌដើម្បីទទួលបាន
                  </h3>

                  <p
                    className="
                      mt-0.5
                      text-sm
                      text-slate-500

                      dark:text-slate-400
                    "
                  >
                    {completedRequirements}/
                    {totalRequirements} បានបញ្ចប់
                  </p>
                </div>
              </div>

              {/* ================================= */}
              {/* REQUIREMENT LIST */}
              {/* ================================= */}

              <div className="space-y-3">
                {requirements.map(
                  (requirement) => (
                    <div
                      key={requirement.id}
                      className={`
                        flex
                        items-start
                        gap-3

                        rounded-xl
                        border
                        p-4

                        transition-all
                        duration-200

                        ${
                          requirement.completed
                            ? `
                              border-green-200
                              bg-green-50/70

                              dark:border-green-500/20
                              dark:bg-green-500/5
                            `
                            : `
                              border-slate-200
                              bg-white

                              dark:border-slate-700
                              dark:bg-slate-900/50
                            `
                        }
                      `}
                    >
                      {/* Requirement status */}

                      <div
                        className={`
                          mt-0.5

                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center

                          rounded-full

                          ${
                            requirement.completed
                              ? `
                                bg-green-500
                                text-white
                              `
                              : `
                                bg-slate-800
                                text-white

                                dark:bg-slate-700
                              `
                          }
                        `}
                      >
                        {requirement.completed ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <LockKeyhole className="h-3.5 w-3.5" />
                        )}
                      </div>

                      {/* Requirement Content */}

                      <div className="min-w-0 flex-1">
                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            justify-between
                            gap-2
                          "
                        >
                          <h4
                            className="
                              font-semibold
                              text-slate-900

                              dark:text-white
                            "
                          >
                            {requirement.title}
                          </h4>

                          {requirement.progress && (
                            <span
                              className={`
                                rounded-full

                                px-2.5
                                py-1

                                text-xs
                                font-semibold

                                ${
                                  requirement.completed
                                    ? `
                                      bg-green-100
                                      text-green-700

                                      dark:bg-green-500/10
                                      dark:text-green-400
                                    `
                                    : `
                                      bg-slate-100
                                      text-slate-600

                                      dark:bg-slate-800
                                      dark:text-slate-400
                                    `
                                }
                              `}
                            >
                              {requirement.progress}
                            </span>
                          )}
                        </div>

                        {requirement.description && (
                          <p
                            className="
                              mt-1

                              text-sm
                              leading-6
                              text-slate-500

                              dark:text-slate-400
                            "
                          >
                            {requirement.description}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* ================================= */}
          {/* XP PROGRESS */}
          {/* ================================= */}

          {isLocked && (
            <div
              className="
                mt-5

                flex
                w-full
                items-center
                justify-between

                rounded-xl

                bg-slate-50

                px-4
                py-3

                dark:bg-slate-800/50
              "
            >
              <span
                className="
                  text-sm
                  text-slate-500

                  dark:text-slate-400
                "
              >
                XP Progress
              </span>

              <span
                className="
                  text-sm
                  font-bold
                  text-primary-color

                  dark:text-blue-400
                "
              >
                {xpProgress}%
              </span>
            </div>
          )}

          {/* ================================= */}
          {/* EARNED INFORMATION */}
          {/* ================================= */}

          {isEarned && (
            <div
              className="
                mt-6

                flex
                items-center
                gap-2

                rounded-xl

                bg-green-50

                px-4
                py-3

                text-sm
                font-medium
                text-green-700

                dark:bg-green-500/10
                dark:text-green-400
              "
            >
              <Trophy className="h-4 w-4" />

              {badge.earnedDate ? (
                <span>
                  ទទួលបាននៅ{" "}
                  {new Date(
                    badge.earnedDate
                  ).toLocaleDateString()}
                </span>
              ) : (
                <span>
                  បានទទួលមេដាយនេះ
                </span>
              )}
            </div>
          )}

          {/* ================================= */}
          {/* TOTAL EARNERS */}
          {/* ================================= */}

          {typeof badge.totalEarners ===
            "number" && (
            <p
              className="
                mt-4
                text-sm
                text-slate-500

                dark:text-slate-400
              "
            >
              អ្នកប្រើប្រាស់{" "}
              {badge.totalEarners.toLocaleString()} នាក់
              បានទទួលមេដាយនេះ
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}