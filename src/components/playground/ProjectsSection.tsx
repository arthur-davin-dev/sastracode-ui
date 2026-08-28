"use client";

import { useEffect, useState, useRef } from "react";
import { ShieldCheck, Users, ShoppingBag, Globe, Server, Smartphone } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const content = {
  km: {
    sectionTitle: "គម្រោងដែលបានអនុវត្ត",
    heroTitlePrefix: "កសាងឡើងសម្រាប់",
    heroTitleHighlight: "ពិភពពិត",
    heroTitleSuffix: "នៃដំណោះស្រាយ",
    heroDesc: "ស្វែងយល់ពីគម្រោងពិតប្រាកដ និងប្រព័ន្ធបច្ចេកវិទ្យាដែលយើងបានកសាងឡើងដើម្បីដោះស្រាយបញ្ហាក្នុងពិភពពិត។",
    viewAll: "មើលទាំងអស់",
    projectLabel: "គម្រោង",
    community:
      "ចូលរួមជាមួយពួកយើង ដែលមានអ្នកអភិវឌ្ឍន៍ខ្មែរជាង {count} នាក់ ដែលកំពុងកសាងអនាគតនៃប្រព័ន្ធបច្ចេកវិទ្យាក្នុងស្រុក។",
    projects: [
      {
        title: "KhmerPay Gateway Platform",
        desc: "API ទូទាត់ប្រាក់ដែលមានប្រសិទ្ធភាពខ្ពស់ រួមបញ្ចូលជាមួយស្តង់ដារ KHQR របស់ធនាគារក្នុងស្រុក និងប្រព័ន្ធ Webhooks ភ្លាមៗ។",
        lang: "NEXT.JS · NODE.JS · POSTGRESQL",
        icon: Globe,
      },
      {
        title: "DevPulse Code Auditor",
        desc: "ឧបករណ៍វិភាគកូដស្វ័យប្រវត្តិ សម្រាប់ការស្វែងរកចំនុចខ្សោយផ្នែកសន្តិសុខ និងកាត់បន្ថយបញ្ហារបស់ Microservice។",
        lang: "PYTHON · DOCKER · SONARQUBE",
        icon: ShieldCheck,
      },
      {
        title: "K-Commerce Core Engine",
        desc: "ប្រព័ន្ធ Headless E-Commerce ដែលមានមុខងារគ្រប់គ្រងហាងច្រើន តាមដានស្តុកទំនិញ និងទូទាត់ប្រាក់យ៉ាងរហ័ស។",
        lang: "REACT · SPRING BOOT · REDIS",
        icon: ShoppingBag,
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
    heroDesc: "Explore our production-ready applications, open-source tools, and enterprise systems engineered for performance.",
    viewAll: "View All",
    projectLabel: "PROJECT",
    community:
      "Join a community of {count} Khmer developers building the future of the local tech ecosystem.",
    projects: [
      {
        title: "KhmerPay Gateway Platform",
        desc: "A high-throughput payment aggregation API integrating local bank KHQR standards with real-time webhooks.",
        lang: "NEXT.JS · NODE.JS · POSTGRESQL",
        icon: Globe,
      },
      {
        title: "DevPulse Code Auditor",
        desc: "Automated static code analysis agent designed for detecting security vulnerabilities and microservice bottlenecks.",
        lang: "PYTHON · DOCKER · SONARQUBE",
        icon: ShieldCheck,
      },
      {
        title: "K-Commerce Core Engine",
        desc: "Headless e-commerce platform featuring multi-tenant store management, inventory tracking, and swift checkout flows.",
        lang: "REACT · SPRING BOOT · REDIS",
        icon: ShoppingBag,
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
  return [member.firstName, member.lastName].filter(Boolean).join(" ") || member.username || "Member";
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
  const cardAngle = index * angleStep;

  const rotation = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const currentAngle = useTransform(rotation, (r) => r + cardAngle);

  const opacity = useTransform(currentAngle, (a) => {
    const normalized = ((a % 360) + 540) % 360 - 180;
    const dist = Math.abs(normalized);
    if (dist > 90) return 0;
    return 1 - dist / 90;
  });

  const numIndex = String(index + 1).padStart(2, "0");
  const titleParts = project.title.split(" ");
  const firstWord = titleParts[0];
  const remainingTitle = titleParts.slice(1).join(" ");
  const IconComponent = project.icon;

  // Responsive radius calculation state
  const [radius, setRadius] = useState(210);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(160); // Smaller depth on mobile screens
      } else if (window.innerWidth < 1024) {
        setRadius(185); // Medium depth on tablet screens
      } else {
        setRadius(210); // Standard depth on desktop
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
      <span className="absolute right-2 sm:right-3 bottom-1.25 sm:-bottom-2.5 text-5xl sm:text-6xl lg:text-[100px] font-black font-mono text-primary-color/10 dark:text-primary-color/10 select-none pointer-events-none leading-none">
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
          { cache: "no-store" }
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
                { cache: "no-store" }
              );
              if (!profileResponse.ok) return { userId: entry.userId };

              const profilePayload = await profileResponse.json();
              return { userId: entry.userId, ...profilePayload?.data };
            } catch {
              return { userId: entry.userId };
            }
          })
        );

        if (active) {
          setCommunity({
            totalUsers: Number.isFinite(totalUsers) ? totalUsers : null,
            members,
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
    <section className="bg-slate-50 dark:bg-[#030908] text-slate-900 dark:text-white min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-12 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div ref={containerRef} className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[220vh] sm:min-h-[280vh] lg:min-h-[350vh]">
          {/* LEFT SIDE: Fixed / Sticky Title Block */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-20 sm:top-24 lg:top-28 flex flex-col justify-between py-2">
              <div>
                <div className="flex items-center gap-3 mb-3 sm:mb-6">
                  <span className="w-4 sm:w-5 h-0.5 bg-primary-color"></span>
                  <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-primary-color uppercase font-semibold">
                    {t.sectionTitle}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 sm:mb-6 leading-[1.1]">
                  {t.heroTitlePrefix} <br className="hidden sm:inline" />{" "}
                  <span className="inline-block text-primary-color border border-primary-color/30 bg-primary-color/10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md my-1">
                    {t.heroTitleHighlight}
                  </span> <br className="hidden sm:inline" />{" "}
                  {t.heroTitleSuffix}
                </h2>

                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm lg:text-base leading-relaxed max-w-md font-light mb-4 sm:mb-8">
                  {t.heroDesc}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: 3D Cylinder Card Stack */}
          <div className="lg:col-span-7 relative">
            <div className="sticky top-28 sm:top-32 h-75 sm:h-85 lg:h-90 max-h-[55dvh] sm:max-h-[60dvh] w-full perspective-[600px] sm:perspective-midrange lg:perspective-[900px] transform-gpu">
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
          </div>
        </div>

        {/* Community Banner */}
        <div className="mt-12 sm:mt-16 relative overflow-hidden rounded-xl border border-slate-200 dark:border-[#0d2a23] bg-white dark:bg-[#05110e] p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 shadow-xl dark:shadow-2xl transition-colors duration-200">
          <div className="flex gap-3 sm:gap-4 items-start relative z-10">
            <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-lg bg-primary-color/10 border border-primary-color/20 flex items-center justify-center text-primary-color">
              <Users className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <p className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 font-sans leading-relaxed max-w-xl">
              {communityText}
            </p>
          </div>

          <div className="flex items-center -space-x-2 shrink-0 self-end sm:self-auto relative z-10">
            {community.members.length > 0
              ? community.members.slice(0, 4).map((member) => {
                  const name = memberName(member);
                  return member.avatarFileId ? (
                    <img
                      key={member.userId}
                      src={`/api/v1/files/${encodeURIComponent(member.avatarFileId)}`}
                      alt={name}
                      className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover border-2 border-white dark:border-[#05110e] shadow-md"
                    />
                  ) : (
                    <div
                      key={member.userId}
                      className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-primary-color/10 border-2 border-white dark:border-[#05110e] text-xs font-bold font-mono text-primary-color"
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
                    className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover border-2 border-white dark:border-[#05110e] shadow-md"
                  />
                ))}

            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-primary-color text-[10px] sm:text-xs font-bold font-mono text-white border-2 border-white dark:border-[#05110e]">
              +{memberCount}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}