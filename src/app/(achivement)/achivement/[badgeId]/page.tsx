// import Link from "next/link";
// import { ChevronLeft } from "lucide-react";
// import { notFound, redirect } from "next/navigation";
// import { BadgeDetailHero } from "@/components/achievement/BadgeDetailHero";
// import { BadgeRequirementItem } from "@/components/achievement/BadgeRequirementItem";
// import { XpRewardCard } from "@/components/achievement/XpRewardCard";
// import { BadgeStatsCard } from "@/components/achievement/BadgeStatsCard";
// import { SimilarBadgesCard } from "@/components/achievement/SimilarBadgesCard";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { BadgeDetail } from "@/types/achievement";
// import { BadgeResponse, UserBadgeProgress } from "@/redux/service/achievementApi";
// import { auth } from "@/auth";
// import { backendFetch, parseBackendResponse } from "@/types/server/backend-api";

// interface ApiResponse<T> {
//   success: boolean;
//   message?: string;
//   data: T;
// }

// function formatEarnedDate(earnedAt?: string) {
//   if (!earnedAt) return "Not earned yet";

//   const date = new Date(earnedAt);
//   return Number.isNaN(date.getTime()) ? earnedAt : date.toLocaleDateString();
// }

// export default async function BadgeDetailPage({
//   params,
// }: {
//   params: Promise<{ badgeId: string }>;
// }) {
//   const { badgeId } = await params;
//   const session = await auth();

//   if (!session?.user) {
//     redirect(
//       `/api/auth/login/keycloak?callbackUrl=${encodeURIComponent(`/achivement/${badgeId}`)}`,
//     );
//   }

//   const [badgeResponse, progressResponse] = await Promise.all([
//     backendFetch(`/api/v1/badges/${encodeURIComponent(badgeId)}`),
//     backendFetch("/api/v1/users/me/badges"),
//   ]);

//   if (badgeResponse.status === 404) notFound();
//   if (!badgeResponse.ok) throw new Error("Unable to load badge details.");

//   const badgePayload = (await parseBackendResponse(badgeResponse)) as ApiResponse<BadgeResponse>;
//   if (!badgePayload.success || !badgePayload.data) notFound();

//   const progressPayload = progressResponse.ok
//     ? ((await parseBackendResponse(progressResponse)) as ApiResponse<UserBadgeProgress[]>)
//     : undefined;
//   const userProgress = progressPayload?.data?.find(({ badge }) => badge.id === badgeId);
//   const badgeData = badgePayload.data;
//   const progressPercent = userProgress?.progressPercentage ?? 0;
//   const requirementDescription =
//     badgeData.requirementDescription ?? badgeData.requirementRule?.description ?? "No requirement description available.";

//   const badge: BadgeDetail = {
//     id: badgeData.id,
//     name: badgeData.name,
//     iconUrl: badgeData.iconFileId
//       ? `/api/v1/files/${encodeURIComponent(badgeData.iconFileId)}`
//       : "/images/Margin3.png",
//     points: badgeData.xpReward,
//     description: requirementDescription,
//     xpReward: badgeData.xpReward,
//     xpProgressPercent: progressPercent,
//     completionPercent: progressPercent,
//     earnedDate: formatEarnedDate(userProgress?.earnedAt),
//     category: badgeData.badgeCategory,
//     requirements: [
//       {
//         id: badgeData.id,
//         title: badgeData.name,
//         description: requirementDescription,
//         progress: userProgress
//           ? `${userProgress.currentValue}/${userProgress.targetValue}`
//           : "0/0",
//         completed: userProgress?.earned ?? false,
//       },
//     ],
//     similarBadges: [],
//   };

//   return (
//     <div className="space-y-6 p-6">
//       <Link href="/achivement" className="flex items-center gap-1 text-lg text-primary-color text-muted-foreground hover:underline w-fit">
//         <ChevronLeft className="h-4 w-4" /> ត្រឡប់ក្រោយ
//       </Link>

//       <div>
//         <h1 className="text-2xl font-bold text-primary-color border-b-2 border-red-500 inline-block pb-1">
//           ព័ត៌មានលម្អិតអំពីមេដាយ
//         </h1>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           <BadgeDetailHero badge={badge} />

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//               <CardTitle className="text-base text-lg text-primary-color">តម្រូវការសម្រាប់ទទួលបាន</CardTitle>
//               {userProgress?.earned && (
//                 <Badge className="p-4 bg-green-50 text-green-600 hover:bg-green-50 text-lg">បានបញ្ចប់ទាំងអស់</Badge>
//               )}
//             </CardHeader>
//             <CardContent>
//               {badge.requirements.map((requirement) => (
//                 <BadgeRequirementItem key={requirement.id} requirement={requirement} />
//               ))}
//             </CardContent>
//           </Card>
//         </div>

//         <div className="space-y-6">
//           <XpRewardCard xpReward={badge.xpReward} progressPercent={badge.xpProgressPercent} />
//           <BadgeStatsCard
//             completionPercent={badge.completionPercent}
//             earnedDate={badge.earnedDate}
//             category={badge.category}
//             totalEarners={badge.totalEarners}
//           />
//           {badge.similarBadges.length > 0 && <SimilarBadgesCard badges={badge.similarBadges} />}
//         </div>
//       </div>
//     </div>
//   );
// }


import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound, redirect } from "next/navigation";

import { BadgeDetailHero } from "@/components/achievement/BadgeDetailHero";
import { BadgeRequirementItem } from "@/components/achievement/BadgeRequirementItem";
import { XpRewardCard } from "@/components/achievement/XpRewardCard";
import { BadgeStatsCard } from "@/components/achievement/BadgeStatsCard";
import { SimilarBadgesCard } from "@/components/achievement/SimilarBadgesCard";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { BadgeDetail } from "@/types/achievement";

import {
  BadgeResponse,
  UserBadgeProgress,
} from "@/redux/service/achievementApi";

import { auth } from "@/auth";

import {
  backendFetch,
  parseBackendResponse,
} from "@/types/server/backend-api";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

function formatEarnedDate(earnedAt?: string) {
  if (!earnedAt) {
    return "Not earned yet";
  }

  const date = new Date(earnedAt);

  return Number.isNaN(date.getTime())
    ? earnedAt
    : date.toLocaleDateString();
}

export default async function BadgeDetailPage({
  params,
}: {
  params: Promise<{ badgeId: string }>;
}) {
  const { badgeId } = await params;

  const session = await auth();

  /**
   * ==========================
   * AUTH
   * ==========================
   */

  if (!session?.user) {
    redirect(
      `/api/auth/login/keycloak?callbackUrl=${encodeURIComponent(
        `/achivement/${badgeId}`
      )}`
    );
  }

  /**
   * ==========================
   * FETCH BADGE + USER PROGRESS
   * ==========================
   */

  const [badgeResponse, progressResponse] =
    await Promise.all([
      backendFetch(
        `/api/v1/badges/${encodeURIComponent(badgeId)}`
      ),

      backendFetch("/api/v1/users/me/badges"),
    ]);

  /**
   * ==========================
   * BADGE RESPONSE CHECK
   * ==========================
   */

  if (badgeResponse.status === 404) {
    notFound();
  }

  if (!badgeResponse.ok) {
    throw new Error(
      "Unable to load badge details."
    );
  }

  /**
   * ==========================
   * PARSE BADGE
   * ==========================
   */

  const badgePayload =
    (await parseBackendResponse(
      badgeResponse
    )) as ApiResponse<BadgeResponse>;

  if (
    !badgePayload.success ||
    !badgePayload.data
  ) {
    notFound();
  }

  /**
   * ==========================
   * PARSE USER PROGRESS
   * ==========================
   */

  const progressPayload =
    progressResponse.ok
      ? ((await parseBackendResponse(
          progressResponse
        )) as ApiResponse<UserBadgeProgress[]>)
      : undefined;

  /**
   * Find this badge inside user's badges
   */
  const userProgress =
    progressPayload?.data?.find(
      ({ badge }) => badge.id === badgeId
    );

  const badgeData = badgePayload.data;

  /**
   * ==========================
   * PROGRESS
   * ==========================
   */

  const progressPercent =
    userProgress?.progressPercentage ?? 0;

  /**
   * ==========================
   * EARNED / LOCKED
   * ==========================
   *
   * THIS IS THE IMPORTANT PART.
   *
   * earned === true
   * -> locked = false
   * -> show green check
   *
   * earned === false
   * -> locked = true
   * -> show lock
   *
   * no userProgress
   * -> locked = true
   */

  const isEarned =
    userProgress?.earned === true;

  const isLocked = !isEarned;

  /**
   * ==========================
   * REQUIREMENT DESCRIPTION
   * ==========================
   */

  const requirementDescription =
    badgeData.requirementDescription ??
    badgeData.requirementRule?.description ??
    "No requirement description available.";

  /**
   * ==========================
   * CREATE UI BADGE DATA
   * ==========================
   */

  const badge: BadgeDetail = {
    id: badgeData.id,

    name: badgeData.name,

    iconUrl: badgeData.iconFileId
      ? `/api/v1/files/${encodeURIComponent(
          badgeData.iconFileId
        )}`
      : "/images/Margin3.png",

    points: badgeData.xpReward,

    description: requirementDescription,

    xpReward: badgeData.xpReward,

    xpProgressPercent: progressPercent,

    completionPercent: progressPercent,

    earnedDate: formatEarnedDate(
      userProgress?.earnedAt
    ),

    category: badgeData.badgeCategory,

    /**
     * IMPORTANT
     */
    locked: isLocked,

    requirements: [
      {
        id: badgeData.id,

        title: badgeData.name,

        description: requirementDescription,

        progress: userProgress
          ? `${userProgress.currentValue}/${userProgress.targetValue}`
          : "0/0",

        completed: isEarned,
      },
    ],

    similarBadges: [],
  };

  /**
   * ==========================
   * PAGE
   * ==========================
   */

  return (
    <div className="space-y-6 p-6">
      {/* Back */}

      <Link
        href="/achivement"
        className="
          flex w-fit
          items-center gap-1
          text-lg
          text-primary-color
          hover:underline
        "
      >
        <ChevronLeft className="h-4 w-4" />

        ត្រឡប់ក្រោយ
      </Link>

      {/* Page Title */}

      <div>
        <h1
          className="
            inline-block
            border-b-2
            border-red-500
            pb-1
            text-2xl
            font-bold
            text-primary-color
          "
        >
          ព័ត៌មានលម្អិតអំពីមេដាយ
        </h1>
      </div>

      {/* Content */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          lg:grid-cols-3
        "
      >
        {/* ========================= */}
        {/* LEFT */}
        {/* ========================= */}

        <div className="space-y-6 lg:col-span-2">
          {/* Badge Hero */}

          <BadgeDetailHero badge={badge} />

          {/* Requirements */}

          <Card>
            <CardHeader
              className="
                flex
                flex-row
                items-center
                justify-between
              "
            >
              <CardTitle
                className="
                  text-lg
                  text-primary-color
                "
              >
                តម្រូវការសម្រាប់ទទួលបាន
              </CardTitle>

              {/* Only show completed badge if earned */}

              {isEarned && (
                <Badge
                  className="
                    bg-green-50
                    p-4
                    text-lg
                    text-green-600
                    hover:bg-green-50
                  "
                >
                  បានបញ្ចប់ទាំងអស់
                </Badge>
              )}
            </CardHeader>

            <CardContent>
              {badge.requirements.map(
                (requirement) => (
                  <BadgeRequirementItem
                    key={requirement.id}
                    requirement={requirement}
                  />
                )
              )}
            </CardContent>
          </Card>
        </div>

        {/* ========================= */}
        {/* RIGHT */}
        {/* ========================= */}

        <div className="space-y-6">
          {/* XP */}

          <XpRewardCard
            xpReward={badge.xpReward}
            progressPercent={
              badge.xpProgressPercent
            }
          />

          {/* Stats */}

          <BadgeStatsCard
            completionPercent={
              badge.completionPercent
            }
            earnedDate={badge.earnedDate}
            category={badge.category}
            totalEarners={badge.totalEarners}
          />

          {/* Similar */}

          {badge.similarBadges.length > 0 && (
            <SimilarBadgesCard
              badges={badge.similarBadges}
            />
          )}
        </div>
      </div>
    </div>
  );
}