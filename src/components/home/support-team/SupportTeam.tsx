import { Star, Mail } from "lucide-react";

const team = [
  { name: "Soeurt Bomnorng", email: "soeurtbomnorng3@gmail.com", offset: "up", img: "/home/support-team/seourtBomnorng.jpg" },
  { name: "Chhay Kongkea", email: "chhaykongkea9@gmail.com", offset: "down", img: "/home/support-team/chhayKongkea.jpg" },
  { name: "Lot Los", email: "loslot100604@gmail.com", offset: "up", img: "/home/support-team/lotLos.jpg" },
  { name: "Vel SoThoun", email: "velsothoun@gmail.com", offset: "down", img:"/home/support-team/velSoThun.jpg" },
  { name: "Ben Thona", email: "thonaben08@gmail.com", offset: "up", img: "/home/support-team/benThona.jpg"  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function SupportTeam() {
  return (
    <section className="px-6 py-20 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy dark:text-white">
          Experienced Support Team
        </h2>
        <div className="mt-2 flex justify-center gap-1 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400" />
          ))}
        </div>

        <div className="mt-16 relative">
          <svg
            viewBox="0 0 800 60"
            preserveAspectRatio="none"
            className="hidden md:block absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-16 text-slate-200 dark:text-slate-700"
          >
            <path
              d="M0,10 C 100,60 150,60 250,10 C 350,-40 450,-40 550,10 C 650,60 700,60 800,10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>

          <div className="relative grid grid-cols-2 gap-y-10 md:grid-cols-5 md:gap-y-0">
            {team.map((member) => (
              <div
                key={member.name}
                className={`flex flex-col items-center gap-6 ${member.offset === "up" ? "md:-translate-y-6" : "md:translate-y-6"
                  }`}
              >
                {member.offset === "up" && (
                  <div className="text-center order-1">
                    <p className="text-sm font-semibold text-navy dark:text-white">{member.name}</p>
                    <p className="mt-0.5 flex items-center justify-center gap-1 text-xs text-slate-400 dark:text-gray-400">
                      <Mail className="h-3 w-3" /> {member.email}
                    </p>
                  </div>
                )}
                <div
                  className={`h-16 w-16 md:h-40 md:w-40 rounded-full 
                          ring-4 ring-white dark:ring-gray-800 
                          shadow-lg flex items-center justify-center 
                          text-white font-semibold order-2`}
                >
                  <img
                    src={member.img}
                    alt="member"
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                {member.offset === "down" && (
                  <div className="text-center order-3">
                    <p className="text-sm font-semibold text-navy dark:text-white">{member.name}</p>
                    <p className="mt-0.5 flex items-center justify-center gap-1 text-xs text-slate-400 dark:text-gray-400">
                      <Mail className="h-3 w-3" /> {member.email}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

  );
}
