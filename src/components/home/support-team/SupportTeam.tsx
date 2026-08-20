"use client";

import { Mail, Star } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslations";

// Map each member to the corresponding translation key in supportTeam.members
const team = [
  {
    id: "soeurtBomnorng" as const,
    email: "soeurtbomnorng3@gmail.com",
    offset: "up",
    img: "/home/support-team/seourtBomnorng.jpg",
  },
  {
    id: "chhayKongkea" as const,
    email: "chhaykongkea9@gmail.com",
    offset: "down",
    img: "/home/support-team/chhayKongkea.jpg",
  },
  {
    id: "lotLos" as const,
    email: "loslot100604@gmail.com",
    offset: "up",
    img: "/home/support-team/lotLos.jpg",
  },
  {
    id: "velSoThoun" as const,
    email: "velsothoun@gmail.com",
    offset: "down",
    img: "/home/support-team/velSoThun.jpg",
  },
  {
    id: "benThona" as const,
    email: "thonaben08@gmail.com",
    offset: "up",
    img: "/home/support-team/benThona.jpg",
  },
];

export default function SupportTeam() {
  const currentT = useTranslation();

  return (
    <section className="px-6 py-20 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary-color">
          {currentT.supportTeam.title}
        </h2>
        <div className="mt-2 flex justify-center gap-1 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400" />
          ))}
        </div>

        <div className="mt-16 relative">
          <div className="hidden md:block absolute left-0 right-0 -translate-y-10 w-full h-16 text-slate-200 dark:text-slate-700">
            <img src="/home/wavyLine.svg" alt="Wavy line" />
          </div>

          <div className="relative grid grid-cols-2 gap-y-10 md:grid-cols-5 md:gap-y-0">
            {team.map((member) => {
              // Dynamically pull the localized name using the member key
              const name =
                currentT.supportTeam.members?.[member.id] || member.id;

              return (
                <div
                  key={member.id}
                  className={`flex flex-col items-center gap-15 ${
                    member.offset === "up"
                      ? "md:-translate-y-5"
                      : "md:translate-y-12"
                  }`}
                >
                  {/* Name & email for members positioned up */}
                  {member.offset === "up" && (
                    <div className="text-center order-1">
                      <p className="text-[18px] font-semibold text-primary-color">
                        {name}
                      </p>
                      <p className="mt-0.5 flex items-center justify-center gap-1 text-[15px] text-slate-400 dark:text-gray-400">
                        <Mail className="h-3 w-3" /> {member.email}
                      </p>
                    </div>
                  )}

                  {/* Profile image */}
                  <div
                    className="h-16 w-16 md:h-30 md:w-30 rounded-full ring-4 ring-white dark:ring-gray-800 shadow-lg flex items-center justify-center text-white font-semibold order-2"
                    title={name}
                  >
                    <img
                      src={member.img}
                      alt={name}
                      className="h-full w-full object-cover rounded-full"
                    />
                  </div>

                  {/* Name & email for members positioned down */}
                  {member.offset === "down" && (
                    <div className="text-center order-3">
                      <p className="text-[18px] font-semibold text-primary-color">
                        {name}
                      </p>
                      <p className="mt-0.5 flex items-center justify-center gap-1 text-[15px] text-slate-400 dark:text-gray-400">
                        <Mail className="h-3 w-3" /> {member.email}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}