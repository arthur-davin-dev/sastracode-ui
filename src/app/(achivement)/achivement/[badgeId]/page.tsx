import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { BadgeDetailHero } from "@/components/achievement/BadgeDetailHero";
import { BadgeRequirementItem } from "@/components/achievement/BadgeRequirementItem";
import { XpRewardCard } from "@/components/achievement/XpRewardCard";
import { BadgeStatsCard } from "@/components/achievement/BadgeStatsCard";
import { SimilarBadgesCard } from "@/components/achievement/SimilarBadgesCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeDetail } from "@/types/achievement";

const badgeDetails: Record<string, BadgeDetail> = {
  "1": {
    id: "1",
    name: "ដំបូងបំផុត",
    iconUrl: "/images/Margin3.png",
    points: 250,
    description: "មេដាយនេះផ្តល់ជូនចំពោះអ្នកដែលបានបញ្ចប់មេរៀនមូលដ្ឋានទាំងអស់ជាមួយនឹងលទ្ធផលល្អប្រសើរ",
    xpReward: 300,
    xpProgressPercent: 100,
    completionPercent: 100,
    earnedDate: "០៦ មិថុនា ២០២៤",
    category: "ក្រិតខ្លួន",
    totalEarners: 142,
    requirements: [
      { id: "1", title: "ដោះស្រាយបញ្ហា Algorithms កម្រិតខ្ពស់", description: "ដោះស្រាយចំនួន ១០ បញ្ហា Algorithms ថ្នាក់ខ្ពស់", progress: "10/10", completed: true },
      { id: "2", title: "ដោះស្រាយបញ្ហា Data Structures", description: "បញ្ចប់លំហាត់ក៏ដូចជា Arrays, Linked Lists និង Hash Maps", progress: "10/10", completed: true },
      { id: "3", title: "សាកល្បងកម្រិតពិបាក", description: "ដោះស្រាយបញ្ហាកម្រិត Hard ចំនួន និងជោគជ័យ", progress: "5/5", completed: true },
    ],
    similarBadges: [
      { id: "2", icon: "terminal", name: "កូដករគំរូ", status: "ចាក់សោ" },
      { id: "3", icon: "gauge", name: "ល្បឿនពន្លឺ", status: "ចាក់សោ" },
    ],
  },
  "2": {
    id: "2",
    name: "អ្នកឈ្នះ",
    iconUrl: "/images/Margin2.png",
    points: 500,
    description: "មេដាយនេះផ្តល់ជូនចំពោះអ្នកដែលទទួលបានជោគជ័យក្នុងការប្រកួតប្រជែងកម្មវិធីច្រើនជាងគេ",
    xpReward: 500,
    xpProgressPercent: 100,
    completionPercent: 100,
    earnedDate: "១២ កក្កដា ២០២៤",
    category: "ការប្រកួតប្រជែង",
    totalEarners: 87,
    requirements: [
      { id: "1", title: "ឈ្នះការប្រកួតកូដកម្មវិធី", description: "ឈ្នះការប្រកួតកូដកម្មវិធីចំនួន ៣ ដង", progress: "3/3", completed: true },
      { id: "2", title: "ដោះស្រាយបញ្ហារហ័ស", description: "ដោះស្រាយបញ្ហាក្នុងរយៈពេលកំណត់ដោយជោគជ័យ", progress: "15/15", completed: true },
      { id: "3", title: "ចំណាត់ថ្នាក់ខ្ពស់", description: "ស្ថិតក្នុងចំណាត់ថ្នាក់ ១០ ដំបូងក្នុងវិញ្ញាសា", progress: "1/1", completed: true },
    ],
    similarBadges: [
  { id: "2", icon: "terminal", name: "កូដករគំរូ", status: "ចាក់សោ" },
  { id: "3", icon: "gauge", name: "ល្បឿនពន្លឺ", status: "ចាក់សោ" },
],
  },
  "3": {
    id: "3",
    name: "ជើងឯក",
    iconUrl: "/images/Margin3.png",
    points: 1000,
    description: "មេដាយកម្រិតខ្ពស់បំផុត ផ្តល់ជូនចំពោះអ្នកដែលបានឈានដល់ចំណាត់ថ្នាក់កំពូលនៃវេទិកា",
    xpReward: 1000,
    xpProgressPercent: 100,
    completionPercent: 200,
    earnedDate: "០៣ សីហា ២០២៤",
    category: "កម្រិតខ្ពស់បំផុត",
    totalEarners: 24,
    requirements: [
      { id: "1", title: "បញ្ចប់វគ្គសិក្សាទាំងអស់", description: "បញ្ចប់វគ្គសិក្សាគ្រប់ប្រភេទក្នុងវេទិកា", progress: "12/12", completed: true },
      { id: "2", title: "ទទួលបានវិញ្ញាបនបត្រទាំងអស់", description: "ទទួលបានវិញ្ញាបនបត្រគ្រប់វគ្គសិក្សា", progress: "8/8", completed: true },
      { id: "3", title: "ស្ថិតលេខ ១ ក្នុងតារាងឈ្នះ", description: "ឈរនៅចំណាត់ថ្នាក់លេខ ១ អស់រយៈពេល ១ ខែ", progress: "1/1", completed: true },
    ],
    similarBadges: [
      { id: "2", icon: "terminal", name: "កូដករគំរូ", status: "ចាក់សោ" },
      { id: "3", icon: "gauge", name: "ល្បឿនពន្លឺ", status: "ចាក់សោ" },
    ],
  },
};

export default async function BadgeDetailPage({
  params,
}: {
  params: Promise<{ badgeId: string }>;
}) {
  const { badgeId } = await params;
  const badge = badgeDetails[badgeId];

  if (!badge) {
    return <div className="p-6 text-lg">រកមិនឃើញព័ត៌មានមេដាយនេះទេ</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <Link href="/achivement" className="flex items-center gap-1 text-lg text-primary-color text-muted-foreground hover:underline w-fit">
        <ChevronLeft className="h-4 w-4" /> ត្រឡប់ក្រោយ
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-primary-color border-b-2 border-red-500 inline-block pb-1">
          ព័ត៌មានលម្អិតអំពីមេដាយ
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <BadgeDetailHero badge={badge} />

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base  text-lg text-primary-color">តម្រូវការសម្រាប់ទទួលបាន</CardTitle>
              <Badge className=" p-4 bg-green-50 text-green-600 hover:bg-green-50 text-lg">បានបញ្ចប់ទាំងអស់</Badge>
            </CardHeader>
            <CardContent>
              {badge.requirements.map((req) => (
                <BadgeRequirementItem key={req.id} requirement={req} />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <XpRewardCard xpReward={badge.xpReward} progressPercent={badge.xpProgressPercent} />
          <BadgeStatsCard
            completionPercent={badge.completionPercent}
            earnedDate={badge.earnedDate}
            category={badge.category}
            totalEarners={badge.totalEarners}
          />
          <SimilarBadgesCard badges={badge.similarBadges} />
        </div>
      </div>
    </div>
  );
}