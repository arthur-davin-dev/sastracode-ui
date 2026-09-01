"use client";
import { Database } from "lucide-react";
import { CreditCard } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import {
  ShieldCheck,
  Users,
  ShoppingBag,
  Globe,
  Server,
  Smartphone,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const content = {
  km: {
    sectionTitle: "គម្រោងដែលបានអនុវត្ត",
    heroTitlePrefix: "កសាងឡើងសម្រាប់",
    heroTitleHighlight: "ពិភពពិត",
    heroTitleSuffix: "នៃដំណោះស្រាយ",
    heroDesc:
      "ស្វែងយល់ពីគម្រោងពិតប្រាកដ និងប្រព័ន្ធបច្ចេកវិទ្យាដែលយើងបានកសាងឡើងដើម្បីដោះស្រាយបញ្ហាក្នុងពិភពពិត។",
    viewAll: "មើលទាំងអស់",
    projectLabel: "គម្រោង",
    community:
      "ចូលរួមជាមួយពួកយើង ដែលមានអ្នកអភិវឌ្ឍន៍ខ្មែរជាង {count} នាក់ ដែលកំពុងកសាងអនាគតនៃប្រព័ន្ធបច្ចេកវិទ្យាក្នុងស្រុក។",
    projects: [
      {
        title: "PoliceAI — ប្រព័ន្ធស្វ័យប្រវត្តិចាប់បទល្មើសចរាចរណ៍",
        desc: "ប្រព័ន្ធឆ្លាតវៃ (AI & Computer Vision) វិភាគវីដេអូ CCTV ក្នុងពេលជាក់ស្តែង ដើម្បីចាប់យកបទល្មើសចរាចរណ៍ ស្គាល់ផ្លាកលេខរថយន្ត និងគ្រប់គ្រងភស្តុតាងឌីជីថលសម្រាប់នគរបាល។",
        lang: "NEXT.JS · SPRING BOOT · YOLO · DOCKER · KEYCLOAK",
        icon: ShieldCheck,
      },
      {
        title:
          "Qubase — ឧបករណ៍រចនាម៉ូឌែលទិន្នន័យ (ERD) និង Database ដោយប្រើ AI",
        desc: "ប្រព័ន្ធគ្រប់គ្រង និងរចនាម៉ូឌែលទិន្នន័យ (Database) ដោយប្រើប្រាស់ AI ដើម្បីគូរឌីយ៉ាក្រាម ERD បង្កើតកូដ SQL/DBML ស្វ័យប្រវត្តិ និងធ្វើការសហការរួមគ្នាក្នុងពេលជាក់ស្តែង។",
        lang: "NEXT.JS · SPRING BOOT · REACT FLOW · POSTGRESQL · DOCKER",
        icon: Database,
      },
      {
        title: "iStash — កម្មវិធីគ្រប់គ្រងហិរញ្ញវត្ថុ និងថវិកាឆ្លាតវៃ",
        desc: "ប្រព័ន្ធគ្រប់គ្រងហិរញ្ញវត្ថុឌីជីថលដែលជួយអ្នកប្រើប្រាស់ គ្រប់គ្រងចំណូល ចំណាយ ថវិកា និងការសន្សំប្រាក់ដោយងាយស្រួល ព្រមទាំងការទូទាត់ប្រាក់ប្រកបដោយសុវត្ថិភាព។",
        lang: "NEXT.JS · SPRING BOOT · POSTGRESQL · DOCKER · TAILWIND CSS",
        icon: CreditCard,
      },
      {
        title: "LogiRoute Fleet Tracking",
        desc: "ប្រព័ន្ធតាមដាន GPS និងគ្រប់គ្រងការដឹកជញ្ជូន ប្រើប្រាស់ស្ថាបត្យកម្ម WebSocket និងការរៀបចំផ្លូវប្រកបដោយភាពបត់បែន។",
        lang: "GO · KAFKA · REACT NATIVE",
        icon: Server,
      },
      {
        title: "EduKhmer Learning Portal",
        desc: "ប្រព័ន្ធសិក្សាអន្តរកម្ម ដែលមានការផ្សាយវីដេអូ ការកែប្រឡងស្វ័យប្រវត្តិ និងកន្លែងសាកល្បងសរសេរកូដផ្ទាល់។",
        lang: "TYPESCRIPT · NEXT.JS · TAILWIND",
        icon: Smartphone,
      },
    ],
  },
  en: {
    sectionTitle: "FEATURED PROJECTS",
    heroTitlePrefix: "BUILT FOR",
    heroTitleHighlight: "REAL WORLD",
    heroTitleSuffix: "SOLUTIONS",
    heroDesc:
      "Explore our production-ready applications, open-source tools, and enterprise systems engineered for performance.",
    viewAll: "View All",
    projectLabel: "PROJECT",
    community:
      "Join a community of {count} Khmer developers building the future of the local tech ecosystem.",
    projects: [
      {
        title: "PoliceAI — AI Traffic Violation Detection Platform",
        desc: "AI and Computer Vision platform for real-time CCTV traffic violation detection, automatic license plate recognition, and digital evidence management.",
        lang: "NEXT.JS · SPRING BOOT · YOLO · DOCKER · KEYCLOAK",
        icon: ShieldCheck,
      },
      {
        title: "Qubase — AI-Powered ERD & Database Design Tool",
        desc: "An AI-powered collaborative database engineering platform for designing visual ERDs, generating SQL/DBML, validating schemas, and synchronizing database models in real time.",
        lang: "NEXT.JS · SPRING BOOT · REACT FLOW · POSTGRESQL · DOCKER",
        icon: Database,
      },
      {
        title: "iStash — Smart Financial & Budget Management Platform",
        desc: "A digital financial management platform that helps users easily track income and expenses, manage budgets, set savings goals, and make secure digital payments with instant rewards.",
        lang: "NEXT.JS · SPRING BOOT · POSTGRESQL · DOCKER · TAILWIND CSS",
        icon: CreditCard,
      },
      {
        title: "LogiRoute Fleet Tracking",
        desc: "Real-time GPS tracking and delivery dispatch system utilizing WebSocket architecture and dynamic route planning.",
        lang: "GO · KAFKA · REACT NATIVE",
        icon: Server,
      },
      {
        title: "EduKhmer Learning Portal",
        desc: "Interactive learning platform with video streaming, automated grading pipelines, and interactive code playgrounds.",
        lang: "TYPESCRIPT · NEXT.JS · TAILWIND",
        icon: Smartphone,
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
  return (
    [member.firstName, member.lastName].filter(Boolean).join(" ") ||
    member.username ||
    "Member"
  );
}

function MobileProjectCard({
  project,
  index,
  projectLabel,
}: {
  project: (typeof content.en.projects)[0];
  index: number;
  projectLabel: string;
}) {
  const numIndex = String(index + 1).padStart(2, "0");
  const titleParts = project.title.split(" ");
  const firstWord = titleParts[0];
  const remainingTitle = titleParts.slice(1).join(" ");
  const IconComponent = project.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative w-full bg-white dark:bg-[#030908] border border-slate-200 dark:border-[#0d2a23] hover:border-primary-color/50 dark:hover:border-primary-color/50 p-5 flex flex-col justify-between overflow-hidden shadow-md hover:shadow-xl hover:shadow-primary-color/10 rounded-xl transition-colors duration-200 cursor-pointer"
    >
      <span className="absolute right-3 -bottom-2 text-6xl font-black font-mono text-primary-color/10 group-hover:text-primary-color/20 transition-colors duration-200 select-none pointer-events-none leading-none">
        {numIndex}
      </span>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-primary-color group-hover:w-5 transition-all duration-300"></span>
            <span className="text-[10px] font-mono tracking-[0.15em] text-primary-color uppercase font-semibold">
              {projectLabel} {numIndex}
            </span>
          </div>
          <div className="h-8 w-8 rounded-lg bg-primary-color/10 border border-primary-color/20 group-hover:bg-primary-color group-hover:text-white transition-all duration-300 flex items-center justify-center text-primary-color shrink-0">
            <IconComponent className="h-4 w-4" />
          </div>
        </div>

        <h3 className="text-xl font-extrabold tracking-tight mb-2 text-slate-900 dark:text-white">
          <span className="text-primary-color">{firstWord}</span>{" "}
          <span>{remainingTitle}</span>
        </h3>

        <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-4 font-light">
          {project.desc}
        </p>
      </div>

      <div className="relative z-10">
        <div className="inline-block px-2.5 py-1 rounded-full bg-primary-color/10 border border-primary-color/30 group-hover:border-primary-color/60 text-[9px] font-mono text-primary-color tracking-wider uppercase mb-3 font-medium transition-colors duration-200">
          {project.lang}
        </div>
        <div className="w-20 group-hover:w-28 h-0.5 bg-primary-color transition-all duration-300"></div>
      </div>
    </motion.div>
  );
}

function PentagonCylinderCard({
  project,
  index,
  total,
  scrollYProgress,
  projectLabel,
}: {
  project: (typeof content.en.projects)[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  projectLabel: string;
}) {
  const angleStep = 360 / total;
  const cardAngle = (total - 1 - index) * angleStep;

  const rotation = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const currentAngle = useTransform(rotation, (r) => r + cardAngle);

  const opacity = useTransform(currentAngle, (a) => {
    const normalized = (((a % 360) + 540) % 360) - 180;
    const dist = Math.abs(normalized);
    if (dist > 90) return 0;
    return 1 - dist / 90;
  });

  const numIndex = String(index + 1).padStart(2, "0");
  const titleParts = project.title.split(" ");
  const firstWord = titleParts[0];
  const remainingTitle = titleParts.slice(1).join(" ");
  const IconComponent = project.icon;

  const [radius, setRadius] = useState(210);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 1024) {
        setRadius(160);
      } else {
        setRadius(210);
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    <motion.div
      style={{
        rotateX: currentAngle,
        transformOrigin: `center center -${radius}px`,
        opacity,
        transformStyle: "preserve-3d",
      }}
      className="absolute inset-0 w-full h-full bg-white dark:bg-[#030908] border border-slate-200 dark:border-[#0d2a23] p-4 sm:p-5 lg:p-7 flex flex-col justify-between overflow-hidden shadow-2xl dark:shadow-[#000000]/50 rounded-xl transform-gpu backface-hidden transition-colors duration-200"
    >
      <span className="absolute right-2 sm:right-3 bottom-1 sm:-bottom-2.5 text-5xl sm:text-6xl lg:text-[100px] font-black font-mono text-primary-color/10 dark:text-primary-color/10 select-none pointer-events-none leading-none">
        {numIndex}
      </span>

      <div className="relative z-10 max-w-lg">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 sm:w-4 h-0.5 bg-primary-color"></span>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.15em] sm:tracking-[0.2em] text-primary-color uppercase font-semibold">
              {projectLabel} {numIndex}
            </span>
          </div>
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-primary-color/10 border border-primary-color/20 flex items-center justify-center text-primary-color shrink-0">
            <IconComponent className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </div>
        </div>

        <h3 className="text-lg sm:text-xl lg:text-3xl font-extrabold tracking-tight mb-2 sm:mb-3 text-slate-900 dark:text-white line-clamp-1 sm:line-clamp-none">
          <span className="text-primary-color">{firstWord}</span>{" "}
          <span>{remainingTitle}</span>
        </h3>

        <p className="text-slate-600 dark:text-slate-400 text-xs lg:text-sm leading-relaxed max-w-md mb-2 sm:mb-4 font-light line-clamp-3 sm:line-clamp-none">
          {project.desc}
        </p>
      </div>

      <div className="relative z-10">
        <div className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-primary-color/10 border border-primary-color/30 text-[8px] sm:text-[9px] font-mono text-primary-color tracking-wider uppercase mb-2 sm:mb-3 font-medium">
          {project.lang}
        </div>
        <div className="w-20 sm:w-28 h-0.5 bg-primary-color"></div>
      </div>
    </motion.div>
  );
}

function CommunityWidget({
  communityText,
  community,
  memberCount,
}: {
  communityText: string;
  community: CommunityData;
  memberCount: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-[#0d2a23] bg-white dark:bg-[#05110e] p-3 sm:p-4 flex items-center justify-between gap-3 sm:gap-4 shadow-lg dark:shadow-xl transition-colors duration-200 w-full">
      <div className="flex gap-2.5 sm:gap-3 items-center relative z-10">
        <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-lg bg-primary-color/10 border border-primary-color/20 flex items-center justify-center text-primary-color">
          <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </div>
        <p className="text-[11px] sm:text-xs lg:text-sm text-slate-700 dark:text-slate-300 font-sans leading-snug">
          {communityText}
        </p>
      </div>

      <div className="flex items-center -space-x-2 shrink-0 relative z-10">
        {community.members.length > 0
          ? community.members.slice(0, 4).map((member) => {
              const name = memberName(member);
              return member.avatarFileId ? (
                <img
                  key={member.userId}
                  src={`/api/v1/files/${encodeURIComponent(member.avatarFileId)}`}
                  alt={name}
                  className="inline-block h-6 w-6 sm:h-8 sm:w-8 rounded-full object-cover border-2 border-white dark:border-[#05110e] shadow-md"
                />
              ) : (
                <div
                  key={member.userId}
                  className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary-color/10 border-2 border-white dark:border-[#05110e] text-[9px] sm:text-[10px] font-bold font-mono text-primary-color"
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
                className="inline-block h-6 w-6 sm:h-8 sm:w-8 rounded-full object-cover border-2 border-white dark:border-[#05110e] shadow-md"
              />
            ))}

        <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary-color text-[8px] sm:text-[10px] font-bold font-mono text-white border-2 border-white dark:border-[#05110e]">
          +{memberCount}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { lang } = useLanguage();
  const t = content[lang] || content.en;
  const [community, setCommunity] = useState<CommunityData>(fallbackCommunity);

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    let active = true;

    async function loadCommunity() {
      try {
        const leaderboardResponse = await fetch(
          "/api/backend/v1/leaderboards?period=GLOBAL&page=0&size=4",
          { cache: "no-store" },
        );

        if (!leaderboardResponse.ok) return;

        const leaderboardPayload = await leaderboardResponse.json();
        const entries: { userId: string }[] = Array.isArray(
          leaderboardPayload?.data?.content,
        )
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

        // The per-user profile endpoint needs auth. When logged out it fails,
        // leaving members with only a userId (no name / avatar), which renders
        // as meaningless "M" circles. In that case, fall back to the static
        // team avatars and the generic count instead of showing broken data.
        const namedMembers = members.filter(
          (member) => member.avatarFileId || member.firstName || member.lastName || member.username
        );
        const hasUsableMembers = namedMembers.length > 0;

        if (active) {
          setCommunity({
            totalUsers:
              hasUsableMembers && Number.isFinite(totalUsers) ? totalUsers : null,
            members: hasUsableMembers ? namedMembers : [],
          });
        }
      } catch {
        // Fallback safely
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
    <section className="bg-slate-50 dark:bg-[#030908] text-slate-900 dark:text-white pt-8 sm:pt-12 pb-8 px-4 sm:px-6 lg:px-12 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* MOBILE (< sm) */}
        <div className="block sm:hidden">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-4 h-0.5 bg-primary-color"></span>
              <span className="text-[10px] font-mono tracking-[0.2em] text-primary-color uppercase font-semibold">
                {t.sectionTitle}
              </span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.1]">
              {t.heroTitlePrefix}{" "}
              <span className="inline-block text-primary-color border border-primary-color/30 bg-primary-color/10 px-2.5 py-0.5 rounded-md my-1">
                {t.heroTitleHighlight}
              </span>{" "}
              {t.heroTitleSuffix}
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-light mb-6">
              {t.heroDesc}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {t.projects.map((project, index) => (
              <MobileProjectCard
                key={project.title}
                project={project}
                index={index}
                projectLabel={t.projectLabel}
              />
            ))}
          </div>

          <CommunityWidget
            communityText={communityText}
            community={community}
            memberCount={memberCount}
          />
        </div>

        {/* TABLETS AND DESKTOPS (>= sm) */}
        <div
          ref={containerRef}
          className="hidden sm:grid relative grid-cols-12 gap-5 md:gap-8 lg:gap-10 min-h-full sm:pb-4"
        >
          {/* LEFT SIDE: Title Block */}
          <div className="col-span-5 relative">
            <div className="sticky top-20 sm:top-24 flex flex-col justify-between py-2">
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="w-4 sm:w-5 h-0.5 bg-primary-color"></span>
                  <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-primary-color uppercase font-semibold">
                    {t.sectionTitle}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3 sm:mb-4 leading-[1.1]">
                  {t.heroTitlePrefix} <br />{" "}
                  <span className="inline-block text-primary-color border border-primary-color/30 bg-primary-color/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md my-1">
                    {t.heroTitleHighlight}
                  </span>{" "}
                  <br /> {t.heroTitleSuffix}
                </h2>

                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm lg:text-base leading-relaxed max-w-md font-light">
                  {t.heroDesc}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Card Container + Immediate Community Widget */}
          <div className="col-span-7 relative flex flex-col gap-4 sm:gap-5">
            {/* 3D Cylinder Container */}
            <div className="h-64 sm:h-72 md:h-80 lg:h-84 w-full perspective-normal sm:perspective-[600px] lg:perspective-[900px] transform-gpu">
              {t.projects.map((project, index) => (
                <PentagonCylinderCard
                  key={project.title}
                  project={project}
                  index={index}
                  total={t.projects.length}
                  scrollYProgress={scrollYProgress}
                  projectLabel={t.projectLabel}
                />
              ))}
            </div>

            {/* Community Banner placed directly below cards */}
            <CommunityWidget
              communityText={communityText}
              community={community}
              memberCount={memberCount}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
