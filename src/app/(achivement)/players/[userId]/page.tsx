"use client";

import { use } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2, MapPin, RefreshCw, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Login from "@/components/auth/Login";
import { useGetPlayerProfileQuery } from "@/redux/service/profile-api";
import { useGetUserBadgesQuery } from "@/redux/service/achievementApi";

function formatEarnedDate(earnedAt?: string) {
  if (!earnedAt) return undefined;
  const date = new Date(earnedAt);
  if (Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

export default function PlayerProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const searchParams = useSearchParams();

  // Carried over from the leaderboard row that was clicked, since the
  // backend has no "another user's rank" endpoint outside /v1/leaderboards/me.
  const fallbackName = searchParams.get("name") || undefined;
  const fallbackAvatarUrl = searchParams.get("avatarUrl") || undefined;
  const rankParam = searchParams.get("rank");
  const xpParam = searchParams.get("xp");

  const { status } = useSession();

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    refetch: refetchProfile,
  } = useGetPlayerProfileQuery(userId, { skip: status !== "authenticated" });

  const { data: badges, isLoading: isBadgesLoading } = useGetUserBadgesQuery(
    userId,
    { skip: status !== "authenticated" },
  );

  if (status === "loading" || (status === "authenticated" && isProfileLoading)) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-9 w-9 animate-spin text-primary-color" />
          <p className="text-sm font-medium text-slate-500">កំពុងទាញយកព័ត៌មាន...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-[600px] items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-xl font-bold text-primary-color">សូមចូលគណនីជាមុនសិន</h2>
          <p className="mt-2 text-sm text-slate-500">
            អ្នកត្រូវចូលគណនីដើម្បីមើលព័ត៌មានប្រវត្តិរូប។
          </p>
          <div className="mt-5 flex justify-center">
            <Login />
          </div>
        </div>
      </div>
    );
  }

  if (isProfileError && !fallbackName) {
    return (
      <div className="flex min-h-[600px] items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm dark:border-red-900 dark:bg-slate-950">
          <h2 className="text-xl font-bold text-red-500">មិនអាចទាញយកព័ត៌មានបាន</h2>
          <p className="mt-2 text-sm text-slate-500">សូមព្យាយាមម្ដងទៀត។</p>
          <button
            type="button"
            onClick={() => void refetchProfile()}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            <RefreshCw className="h-4 w-4" />
            ព្យាយាមម្ដងទៀត
          </button>
        </div>
      </div>
    );
  }

  const fullName =
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ").trim() ||
    profile?.username ||
    fallbackName ||
    "អ្នកសិក្សា";
  const initials = fullName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const avatarUrl = profile?.avatarUrl || fallbackAvatarUrl;
  const rank = rankParam ? Number(rankParam) : undefined;
  const xp = xpParam ? Number(xpParam) : undefined;

  return (
    <div className="min-h-screen bg-linear-to-b from-[#eaf4ff] via-[#f4f8fe] to-[#eaf4ff] p-4 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-5xl space-y-6">
        <Link
          href="/leaderboard"
          className="flex w-fit items-center gap-1 text-lg text-primary-color hover:underline dark:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          ត្រឡប់ទៅតារាងចំណាត់ថ្នាក់
        </Link>

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#693fe7] via-[#4338ca] to-[#18217f] px-6 py-7 text-white shadow-lg sm:px-10 sm:py-8">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -right-28 -top-40 size-[430px] rounded-full border border-white/20" />
            <div className="absolute -right-12 -top-24 size-[340px] rounded-full border border-white/15" />
          </div>

          <div className="relative flex flex-col items-center gap-7 md:flex-row">
            <Avatar className="size-32 shrink-0 border-4 border-white bg-violet-100 shadow-xl sm:size-36">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={fullName} />}
              <AvatarFallback className="bg-violet-100 text-3xl font-bold text-violet-700">
                {initials || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{fullName}</h1>
              {profile?.username && (
                <p className="mt-1 !text-lg font-medium text-violet-100">@{profile.username}</p>
              )}
              <p className="mt-2 !text-base font-medium text-white/90">
                {profile?.workStudyType === "EMPLOYEE" ? "Professional learner" : "Student learner"}
              </p>
              {profile?.institutionName && (
                <p className="mt-1 flex items-center justify-center gap-1.5 !text-sm text-violet-100 md:justify-start">
                  <MapPin className="size-4" />
                  {profile.institutionName}
                </p>
              )}
              {profile?.biography && (
                <p className="mt-3 max-w-2xl !text-sm italic leading-6 text-white/80">
                  &ldquo;{profile.biography}&rdquo;
                </p>
              )}
            </div>

            {(rank !== undefined || xp !== undefined) && (
              <div className="flex shrink-0 gap-3">
                {rank !== undefined && !Number.isNaN(rank) && (
                  <div className="rounded-2xl bg-white/15 px-5 py-3 text-center ring-1 ring-white/25">
                    <p className="text-2xl font-extrabold">#{rank}</p>
                    <p className="text-xs font-medium text-violet-100">លំដាប់</p>
                  </div>
                )}
                {xp !== undefined && !Number.isNaN(xp) && (
                  <div className="rounded-2xl bg-white/15 px-5 py-3 text-center ring-1 ring-white/25">
                    <p className="text-2xl font-extrabold">{xp.toLocaleString()}</p>
                    <p className="text-xs font-medium text-violet-100">XP</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <Card className="dark:border-slate-800 dark:bg-slate-900/80">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary-color dark:text-white">
              មេដាយដែលទទួលបាន
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isBadgesLoading ? (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="h-32 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />
                ))}
              </div>
            ) : badges && badges.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {badges.map(({ badge, earnedAt }) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-700">
                      <img
                        src={badge.iconFileId ? `/api/v1/files/${encodeURIComponent(badge.iconFileId)}` : "/images/Margin3.png"}
                        alt={badge.name}
                        onError={(event) => {
                          const img = event.currentTarget;
                          if (img.src.endsWith("/images/Margin3.png")) return;
                          img.src = "/images/Margin3.png";
                        }}
                        className="h-10 w-10 object-contain"
                      />
                    </div>
                    <p className="mt-3 line-clamp-1 text-base font-bold text-primary-color dark:text-white">
                      {badge.name}
                    </p>
                    <p className="mt-1 flex items-center justify-center gap-1 text-sm font-semibold text-red-500 dark:text-red-400">
                      <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
                      +{badge.xpReward} XP
                    </p>
                    {formatEarnedDate(earnedAt) && (
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {formatEarnedDate(earnedAt)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
                មិនទាន់ទទួលបានមេដាយនៅឡើយទេ។
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
