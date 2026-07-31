import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types/users";

const roleConfig: Record<UserRole, { label: string; className: string }> = {
  STUDENT: {
    label: "STUDENT",
    className:
      "bg-slate-100 dark:bg-slate-800 text-primary-color border-slate-200 dark:border-slate-700",
  },
  INSTRUCTOR: {
    label: "INSTRUCTOR",
    className:
      "bg-slate-100 dark:bg-slate-800 text-primary-color border-slate-200 dark:border-slate-700",
  },
  MODERATOR: {
    label: "MODERATOR",
    className:
      "bg-slate-100 dark:bg-slate-800 text-primary-color border-slate-200 dark:border-slate-700",
  },
  ADMIN: {
    label: "ADMIN",
    className:
      "bg-red-50 dark:bg-red-950/40 text-red-600 border-red-200 dark:border-red-800",
  },
};

export function UserRoleBadge({ role }: { role: UserRole }) {
  const config = roleConfig[role] || roleConfig.STUDENT;

  return (
    <Badge
      className={`text-base font-black px-4 py-4 rounded-full border tracking-wider shadow-sm transition-all duration-200 ${config.className}`}
    >
      {config.label}
    </Badge>
  );
}