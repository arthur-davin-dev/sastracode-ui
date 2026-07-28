"use client";

import { motion } from "framer-motion";
import { ProfileSummaryCard } from "@/components/achievement/ProfileSummaryCard";
import { BadgeCard } from "@/components/achievement/BadgeCard";
import { RecentActivityItem } from "@/components/achievement/RecentActivityItem";
import { LearningPathProgress } from "@/components/achievement/LearningPathProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserSummary, AchievementBadge, Activity, LearningPath } from "@/types/achievement";
import { XpLevelCard } from "./XpLevelCard";

const userData: UserSummary = {
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

const badges: AchievementBadge[] = [
  { id: "1", name: "ដំបូងបំផុត", iconUrl: "/images/Margin3.png", points: 250, progressPercent: 100, remaining: 0, locked: false },
  { id: "2", name: "អ្នកឈ្នះ", iconUrl: "/images/Margin2.png", points: 500, progressPercent: 100, remaining: 0, locked: false },
  { id: "3", name: "ជើងឯក", iconUrl: "/images/Margin3.png", points: 1000, progressPercent: 200, remaining: 0, locked: false },
  { id: "4", name: "Locked Badge", iconUrl: "", points: 0, progressPercent: 20, remaining: 8, locked: true },
];

const activities: Activity[] = [
  { id: "1", icon: "📺", title: "បញ្ចប់មូលដ្ឋានគ្រឹះ JavaScript", subtitle: "រៀនមេរៀនមូលដ្ឋានទាំងអស់នៃ JS", xp: 500 },
  { id: "2", icon: "🔧", title: "បន្ថែមកម្មវិធីដំបូងរបស់អ្នក", subtitle: "បង្កើត និងដាក់ឲ្យប្រើប្រាស់កម្មវិធី", xp: 800 },
  { id: "3", icon: "🎯", title: "ដោះស្រាយបញ្ហាប្រឈម", subtitle: "ដោះស្រាយ ២៥ លំហាត់កូដ", xp: 600 },
];

const paths: LearningPath[] = [
  { id: "1", name: "ចូលរៀនផ្នែក Web", status: "រួចរាល់", progressPercent: 100 },
  { id: "2", name: "JS Foundation", status: "រៀបចំ", progressPercent: 100 },
  { id: "3", name: "React Dev", status: "កំពុងរៀន", progressPercent: 60 },
];

export default function Achievement() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#eaf4ff] via-[#f4f8fe] to-[#eaf4ff] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 space-y-6 p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-indigo-950 dark:text-white transition-colors duration-300">
            ផ្ទាំងគ្រប់គ្រងសមិទ្ធផល
          </h1>
          <p className="text-base text-muted-foreground dark:text-slate-400 mt-1 transition-colors duration-300">
            តាមដានវឌ្ឍនភាព ការសិក្សា និងផ្នែកសមិទ្ធផលដែលអ្នកទទួលបាន
          </p>
        </div>

        <ProfileSummaryCard user={userData} />

        <XpLevelCard
          level={userData.nextLevel}
          currentXp={userData.currentXp}
          nextLevelXp={userData.nextLevelXp}
          progressPercent={userData.levelProgressPercent}
        />

        {/* Badges Section */}
        <Card className="dark:bg-slate-900/80 dark:border-slate-800 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white transition-colors duration-300">
              🏅 មេដាយដែលទទួលបាន
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <BadgeCard badge={b} />
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities Section */}
        <Card className="dark:bg-slate-900/80 dark:border-slate-800 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white transition-colors duration-300">
              ✅ របស់កម្មដែលបានបញ្ចប់
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activities.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <RecentActivityItem activity={a} />
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Learning Paths / Certificates Section */}
        <Card className="dark:bg-slate-900/80 dark:border-slate-800 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-indigo-950 dark:text-indigo-300 transition-colors duration-300">
              🏅 រង្វានភាពវិញ្ញាបនបត្រ
            </CardTitle>
          </CardHeader>
          <CardContent>
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