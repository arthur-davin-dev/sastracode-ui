"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tv, Wrench, Target, Zap } from "lucide-react";
import { ProfileSummaryCard } from "@/components/achievement/ProfileSummaryCard";
import { BadgeCard } from "@/components/achievement/BadgeCard";
import { RecentActivityItem } from "@/components/achievement/RecentActivityItem";
import { LearningPathProgress } from "@/components/achievement/LearningPathProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserSummary, AchievementBadge, Activity, LearningPath } from "@/types/achievement";
import { XpLevelCard } from "./XpLevelCard";
import { useSession } from "next-auth/react";
import { useGetMyProfileQuery } from "@/redux/service/profile-api";
import {
  useGetMyXpQuery,
  useGetMyXpTransactionsQuery,
  useGetMyBadgesQuery,
} from "@/redux/service/achievementApi";
import { useGetMyCertificatesQuery } from "@/redux/features/certificate/certificateApi";

const fallbackUserData: UserSummary = {
  name: "ឆាយ​ ដាវីន",
  avatarUrl: "/images/mysql.jpg",
  currentXp: 12450,
  nextLevelXp: 15000,
  levelProgressPercent: 83,
  nextLevel: 13,
  badges: 48,
  score: 14200,
  certificates: 12,
};

const activities: Activity[] = [
  { id: "1", icon: <Tv className="h-5 w-5" />, title: "បញ្ចប់មូលដ្ឋានគ្រឹះ JavaScript", subtitle: "រៀនមេរៀនមូលដ្ឋានទាំងអស់នៃ JS", xp: 500 },
  { id: "2", icon: <Wrench className="h-5 w-5" />, title: "បន្ថែមកម្មវិធីដំបូងរបស់អ្នក", subtitle: "បង្កើត និងដាក់ឲ្យប្រើប្រាស់កម្មវិធី", xp: 800 },
  { id: "3", icon: <Target className="h-5 w-5" />, title: "ដោះស្រាយបញ្ហាប្រឈម", subtitle: "ដោះស្រាយ ២៥ លំហាត់កូដ", xp: 600 },
];

const paths: LearningPath[] = [
  { id: "1", name: "ចូលរៀនផ្នែក Web", status: "រួចរាល់", progressPercent: 100 },
  { id: "2", name: "JS Foundation", status: "រៀបចំ", progressPercent: 100 },
  { id: "3", name: "React Dev", status: "កំពុងរៀន", progressPercent: 60 },
];

function activityTitle(sourceType?: string) {
  if (!sourceType) return "XP activity";

  return sourceType
    .toLowerCase()
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Achievement() {
  const { status } = useSession();
  const authenticated = status === "authenticated";
  const profileQuery = useGetMyProfileQuery(undefined, { skip: !authenticated });
  const xpQuery = useGetMyXpQuery(undefined, { skip: !authenticated });
  const transactionsQuery = useGetMyXpTransactionsQuery(undefined, {
    skip: !authenticated,
  });
  const badgesQuery = useGetMyBadgesQuery(undefined, { skip: !authenticated });
  // Only the running total is needed here — ask for a single row.
  const certificatesQuery = useGetMyCertificatesQuery(
    { page: 0, size: 1 },
    { skip: !authenticated },
  );
  const certificateCount =
    certificatesQuery.data?.data?.totalElements ??
    certificatesQuery.data?.data?.content?.length ??
    0;
  const badges: AchievementBadge[] =
    badgesQuery.data?.map(({ badge, earned, currentValue, targetValue, progressPercentage }) => ({
      id: badge.id,
      name: badge.name,
      iconUrl: badge.iconFileId
        ? `/api/v1/files/${encodeURIComponent(badge.iconFileId)}`
        : "",
      points: badge.xpReward,
      progressPercent: Math.min(100, Math.max(0, Math.round(progressPercentage))),
      remaining: Math.max(0, targetValue - currentValue),
      locked: !earned,
    })) ?? [];

  const totalXp = xpQuery.data?.totalXp ?? 0;
  const currentLevel = Math.floor(totalXp / 1000) + 1;
  const currentLevelStart = (currentLevel - 1) * 1000;
  const nextLevelXp = currentLevel * 1000;
  const levelProgressPercent = Math.min(
    100,
    Math.round(((totalXp - currentLevelStart) / 1000) * 100),
  );
  const profileName = [profileQuery.data?.firstName, profileQuery.data?.lastName]
    .filter(Boolean)
    .join(" ");

  const userData: UserSummary = {
        name: profileName || profileQuery.data?.username || "Learner",
        avatarUrl:
          profileQuery.data?.avatarUrl || "/images/sastra_code_logo.png",
        currentXp: totalXp,
        nextLevelXp,
        levelProgressPercent,
        nextLevel: currentLevel + 1,
        badges: badges.filter((badge) => !badge.locked).length,
        score: xpQuery.data?.totalScore ?? 0,
        certificates: certificateCount,
        username: profileQuery.data?.username,
        institution: profileQuery.data?.institutionName,
      };

  const summaryLoading =
    authenticated &&
    (profileQuery.isLoading ||
      xpQuery.isLoading ||
      badgesQuery.isLoading ||
      certificatesQuery.isLoading);

  const apiActivities: Activity[] =
    transactionsQuery.data?.content.map((transaction) => ({
      id: String(transaction.id),
      icon: <Zap className="h-5 w-5" />,
      // Descriptions can include source UUIDs. Keep internal IDs out of the learner UI.
      title: activityTitle(transaction.sourceType),
      subtitle: transaction.createdAt
        ? new Intl.DateTimeFormat(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(transaction.createdAt))
        : "XP activity",
      xp: transaction.xpAmount,
    })) ?? [];
  const displayedActivities = [...apiActivities].sort((a, b) => b.xp - a.xp);

  const [showAllBadges, setShowAllBadges] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const visibleBadges = showAllBadges ? badges : badges.slice(0, 4);
  const visibleActivities = showAllActivities
    ? displayedActivities
    : displayedActivities.slice(0, 4);

  return (
    <div className="min-h-screen bg-linear-to-b from-[#eaf4ff] via-[#f4f8fe] to-[#eaf4ff] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 space-y-8 p-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-primary-color dark:text-white transition-colors duration-300">
            ផ្ទាំងគ្រប់គ្រងសមិទ្ធផល
          </h1>
          <p className="text-lg text-primary-color opacity-80 dark:text-slate-300 transition-colors duration-300">
            តាមដានវឌ្ឍនភាព ការសិក្សា និងផ្នែកសមិទ្ធផលដែលអ្នកទទួលបាន
          </p>
        </div>

        {/* User Summary Section */}
        <ProfileSummaryCard user={userData} loading={summaryLoading} />

        {/* XP Progress Card */}
        <XpLevelCard
          level={currentLevel}
          currentXp={userData.currentXp}
          nextLevelXp={userData.nextLevelXp}
          progressPercent={userData.levelProgressPercent}
        />

        {/* Badges Section */}
        <Card className="dark:bg-slate-900/80 dark:border-slate-800 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-bold text-primary-color dark:text-white transition-colors duration-300">
              មេដាយដែលទទួលបាន
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {!badgesQuery.isLoading && badges.length === 0 && (
                <p className="col-span-full rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  No badges earned yet. Complete lessons and quizzes to earn badges.
                </p>
              )}
              {visibleBadges.map((b, i) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <BadgeCard badge={b} />
                </motion.div>
              ))}
            </div>
            {badges.length > 4 && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllBadges((value) => !value)}
                  className="rounded-xl bg-primary-color px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  {showAllBadges ? "មើលតិចជាងនេះ" : "មើលទាំងអស់"}
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activities Section */}
        <Card className="dark:bg-slate-900/80 dark:border-slate-800 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-bold text-primary-color dark:text-white transition-colors duration-300">
               របស់កម្មដែលបានបញ្ចប់
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!transactionsQuery.isLoading && displayedActivities.length === 0 && (
                <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  No XP activity yet. Complete a lesson or quiz to earn XP.
                </p>
              )}
              {visibleActivities.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <RecentActivityItem activity={a} />
                </motion.div>
              ))}
            </div>
            {displayedActivities.length > 4 && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllActivities((value) => !value)}
                  className="rounded-xl bg-primary-color px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  {showAllActivities ? "មើលតិចជាងនេះ" : "មើលទាំងអស់"}
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Learning Paths / Certificates Progress Section */}
        <Card className="dark:bg-slate-900/80 dark:border-slate-800 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-bold text-primary-color dark:text-white transition-colors duration-300">
              រង្វាន់ភាពវិញ្ញាបនបត្រ
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-primary-color">
            <LearningPathProgress
              paths={paths}
              completedCount={paths.filter((p) => p.progressPercent === 100).length}
              totalCount={paths.length}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
