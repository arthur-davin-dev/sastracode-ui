import { AtSign, BookOpen, Building2, CalendarDays, Globe2, GraduationCap, Mail, MapPin, Phone, ShieldCheck, User } from "lucide-react";
import type { UserProfile } from "@/types/profile";

function formatBirthday(value?: string) {
  if (!value) return "Not provided";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(date);
}

function ProfileCard({ title, icon, children, className = "" }: { title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}><div className="mb-4 flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 [&>svg]:size-[18px] dark:bg-violet-500/10">{icon}</span><h2 className="font-bold text-[#111936] dark:text-white">{title}</h2></div>{children}</section>;
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="grid grid-cols-[22px_minmax(90px,.7fr)_1fr] items-center gap-3 py-2.5"><span className="text-slate-400 [&>svg]:size-4">{icon}</span><span className="text-sm text-slate-500">{label}</span><span className="truncate text-sm font-semibold text-[#172052] dark:text-slate-100" title={value}>{value}</span></div>;
}

export function ProfileOverviewCards({ profile }: { profile: UserProfile }) {
  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ").trim() || "Not provided";
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <ProfileCard title="About me" icon={<User />}>
        <p className="!text-base leading-7 text-slate-600 dark:text-slate-300">{profile.biography || "Tell the community about your learning interests and goals."}</p>
      </ProfileCard>

      <ProfileCard title="Personal information" icon={<User />}>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <InfoRow icon={<User />} label="Full name" value={fullName} />
          <InfoRow icon={<AtSign />} label="Username" value={profile.username ? `@${profile.username}` : "Not provided"} />
          <InfoRow icon={<Mail />} label="Email" value={profile.email || "Not provided"} />
          <InfoRow icon={<Phone />} label="Phone" value={profile.phoneNumber || "Not provided"} />
          <InfoRow icon={<CalendarDays />} label="Birthday" value={formatBirthday(profile.birthday)} />
        </div>
      </ProfileCard>

      <ProfileCard title="Education & work" icon={<GraduationCap />}>
        <div className="flex items-center gap-5">
          <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-500 dark:bg-violet-500/10">{profile.workStudyType === "EMPLOYEE" ? <Building2 className="size-10" /> : <GraduationCap className="size-10" />}</span>
          <div className="min-w-0"><p className="font-bold text-[#172052] dark:text-white">{profile.institutionName || "Institution not provided"}</p><p className="mt-1 !text-sm text-slate-500">{profile.workStudyType === "EMPLOYEE" ? "Employee" : profile.workStudyType === "STUDENT" ? "Student" : "Learning profile"}</p></div>
        </div>
      </ProfileCard>

      <ProfileCard title="Account information" icon={<ShieldCheck />}>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <InfoRow icon={<ShieldCheck />} label="Status" value={profile.status || "Not provided"} />
          <InfoRow icon={<Globe2 />} label="Language" value={(profile.locale || "Not provided").toUpperCase()} />
          <InfoRow icon={<MapPin />} label="Institution" value={profile.institutionName || "Not provided"} />
          <InfoRow icon={<BookOpen />} label="Profile type" value={profile.workStudyType || "Not provided"} />
        </div>
      </ProfileCard>
    </div>
  );
}
