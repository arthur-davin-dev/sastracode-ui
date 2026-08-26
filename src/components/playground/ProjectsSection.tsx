"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Code2, LayoutTemplate, Sigma, Database, ArrowRight, Clock, Users } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import TiltedCard from "../ui/TiltedCard";

const content = {
  km: {
    sectionTitle: "គម្រោងថ្មីៗ",
    viewAll: "មើលទាំងអស់",
    community:
      "ចូលរួមជាមួយពួកយើង ដែលមានអ្នកអភិវឌ្ឍន៍ខ្មែរជាង {count} នាក់ ដែលកំពុងកសាងអនាគតនៃប្រព័ន្ធបច្ចេកវិទ្យាក្នុងស្រុក។",
    projects: [
      {
        title: "Sorting Algorithm Demo",
        desc: "កែសម្រួលកាលពី ២ ម៉ោងមុន",
        lang: "Python",
        icon: Code2,
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/20",
      },
      {
        title: "Landing Page Prototype",
        desc: "កែសម្រួលកាលពី ៥ ម៉ោងមុន",
        lang: "HTML/CSS",
        icon: LayoutTemplate,
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-500/10 border-blue-500/20",
      },
      {
        title: "Calc Logic API",
        desc: "កែសម្រួលកាលពី ១ ថ្ងៃមុន",
        lang: "JavaScript",
        icon: Sigma,
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-500/10 border-amber-500/20",
      },
      {
        title: "Database Connector",
        desc: "កែសម្រួលកាលពី ២ ថ្ងៃមុន",
        lang: "Java",
        icon: Database,
        color: "text-rose-600 dark:text-rose-400",
        bg: "bg-rose-500/10 border-rose-500/20",
      },
    ],
  },
  en: {
    sectionTitle: "Recent Projects",
    viewAll: "View All",
    community:
      "Join a community of {count} Khmer developers building the future of the local tech ecosystem.",
    projects: [
      {
        title: "Sorting Algorithm Demo",
        desc: "Edited 2 hours ago",
        lang: "Python",
        icon: Code2,
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/20",
      },
      {
        title: "Landing Page Prototype",
        desc: "Edited 5 hours ago",
        lang: "HTML/CSS",
        icon: LayoutTemplate,
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-500/10 border-blue-500/20",
      },
      {
        title: "Calc Logic API",
        desc: "Edited 1 day ago",
        lang: "JavaScript",
        icon: Sigma,
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-500/10 border-amber-500/20",
      },
      {
        title: "Database Connector",
        desc: "Edited 2 days ago",
        lang: "Java",
        icon: Database,
        color: "text-rose-600 dark:text-rose-400",
        bg: "bg-rose-500/10 border-rose-500/20",
      },
    ],
  },
};

type CommunityMember = {
  userId: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  avatarFileId?: string;
};

type CommunityData = {
  totalUsers: number | null;
  members: CommunityMember[];
};

const fallbackCommunity: CommunityData = {
  totalUsers: null,
  members: [],
};

// Only shown if /v1/community/overview is unreachable and no real verified
// members can be loaded, so the banner still has something to render.
const fallbackAvatars = [
  { src: "/images/ben_thona.jpg", alt: "Ben Thona" },
  { src: "/images/chhay_davin.jpg", alt: "Chhay Davin" },
  { src: "/images/mon_narea.jpg", alt: "Mon Narea" },
  { src: "/images/meng_kimleap.jpg", alt: "Meng Kimleap" },
];

function formatMemberCount(count: number | null) {
  if (count === null) return "10K";
  return new Intl.NumberFormat("en-US", {
    notation: count >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(count);
}

function memberName(member: CommunityMember) {
  return [member.firstName, member.lastName].filter(Boolean).join(" ") || member.username || "Member";
}

export default function ProjectsSection() {
  const { lang } = useLanguage();
  const t = content[lang] || content.en;
  const [community, setCommunity] = useState<CommunityData>(fallbackCommunity);

  useEffect(() => {
    let active = true;

    async function loadCommunity() {
      try {
        // /v1/community/overview never existed on the backend (confirmed:
        // no such controller), so this always 404'd silently and the banner
        // fell back to 4 hardcoded stock photos every time. Build the same
        // picture from real, already-working endpoints instead:
        // /v1/leaderboards is public and gives real ranked (XP-earning,
        // logged-in) users; their name/avatar comes from
        // /v1/users/{userId}/profile, which requires the viewer to be
        // signed in — for anonymous visitors that call 401s and the member
        // just renders with initials instead of a name/photo.
        const leaderboardResponse = await fetch(
          "/api/backend/v1/leaderboards?period=GLOBAL&page=0&size=4",
          { cache: "no-store" },
        );

        if (!leaderboardResponse.ok) return;

        const leaderboardPayload = await leaderboardResponse.json();
        const entries: { userId: string }[] = Array.isArray(leaderboardPayload?.data?.content)
          ? leaderboardPayload.data.content
          : [];
        const totalUsers = Number(leaderboardPayload?.data?.totalElements);

        const members = await Promise.all(
          entries.map(async (entry): Promise<CommunityMember> => {
            try {
              const profileResponse = await fetch(
                `/api/backend/v1/users/${encodeURIComponent(entry.userId)}/profile`,
                { cache: "no-store" },
              );
              if (!profileResponse.ok) return { userId: entry.userId };

              const profilePayload = await profileResponse.json();
              return { userId: entry.userId, ...profilePayload?.data };
            } catch {
              return { userId: entry.userId };
            }
          }),
        );

        if (active) {
          setCommunity({
            totalUsers: Number.isFinite(totalUsers) ? totalUsers : null,
            members,
          });
        }
      } catch {
        // The public Playground remains usable when the community data is unavailable.
      }
    }

    void loadCommunity();
    return () => {
      active = false;
    };
  }, []);

  const memberCount = formatMemberCount(community.totalUsers);
  const communityText = t.community.replace("{count}", memberCount);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 transition-colors duration-300">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
          {t.sectionTitle}
        </h2>
        <a
          href="#"
          className="group text-sm text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1.5 transition-colors duration-300"
        >
          <span>{t.viewAll}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* Project cards grid */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {t.projects.map((project) => {
          const Icon = project.icon;
          return (
            <Card
              key={project.title}
              className="group relative flex flex-row items-center justify-between p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5 hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Card Left Details */}
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`h-12 w-12 shrink-0 rounded-xl border flex items-center justify-center ${project.bg} transition-transform duration-300 group-hover:scale-105`}
                >
                  <Icon className={`h-6 w-6 ${project.color}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 truncate transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {project.desc}
                    </span>
                  </div>
                </div>
              </div>

              {/* Language Tag */}
              <div className="shrink-0 ml-3">
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 transition-colors duration-300">
                  {project.lang}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Community Banner */}
      <TiltedCard rotateAmplitude={2} scaleOnHover={1.03}>
        <div className="relative overflow-hidden rounded-3xl border border-indigo-200/80 dark:border-indigo-900/50 bg-gradient-to-r from-indigo-50/80 via-white to-indigo-50/50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-indigo-950/20 backdrop-blur-md p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm transition-colors duration-300"
        >
          <div className="flex gap-4 items-start">
            <div className="h-10 w-10 shrink-0 rounded-2xl bg-indigo-600/10 dark:bg-indigo-400/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Users className="h-5 w-5" />
            </div>
            <p className="text-[18px] text-slate-700 dark:text-slate-200 font-medium max-w-xl leading-relaxed transition-colors duration-300">
              {communityText}
            </p>
          </div>


          {/* Avatar Stack — real verified members from /v1/community/overview,
              with the static local photos as a fallback only if that request
              returned nothing (API down, or no verified members yet). */}
          <div className="flex items-center -space-x-2.5 shrink-0 self-end md:self-center">
            {community.members.length > 0
              ? community.members.slice(0, 4).map((member) => {
                  const name = memberName(member);
                  return member.avatarFileId ? (
                    <img
                      key={member.userId}
                      src={`/api/v1/files/${encodeURIComponent(member.avatarFileId)}`}
                      alt={name}
                      className="inline-block h-10 w-10 rounded-full object-cover border-2 border-white dark:border-slate-900 shadow-sm"
                    />
                  ) : (
                    <div
                      key={member.userId}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-sm font-bold text-indigo-700 dark:text-indigo-200 border-2 border-white dark:border-slate-900 shadow-sm"
                    >
                      {name[0]?.toUpperCase() || "U"}
                    </div>
                  );
                })
              : fallbackAvatars.map(({ src, alt }) => (
                  <img
                    key={alt}
                    src={src}
                    alt={alt}
                    className="inline-block h-10 w-10 rounded-full object-cover border-2 border-white dark:border-slate-900 shadow-sm"
                  />
                ))}

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 dark:bg-indigo-500 text-xs font-bold text-white border-2 border-white dark:border-slate-900 shadow-sm">
              +{memberCount}
            </div>
          </div>
        </div>
      </TiltedCard>
    </section>
  );
}
