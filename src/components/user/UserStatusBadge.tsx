import { Badge } from "@/components/ui/badge";
import { UserStatus } from "@/types/users";

const statusConfig: Record<UserStatus, { label: string; className: string }> = {
  active: {
    label: "សកម្ម",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  },
  warning: {
    label: "ប្រយ័ត្ន",
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/60 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
  },
  suspended: {
    label: "ផ្អាក",
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700",
  },
  disciplinary: {
    label: "វិន័យ",
    className:
      "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 border-red-200 dark:border-red-800",
  },
};

export function UserStatusBadge({ status }: { status: UserStatus }) {
  const config = statusConfig[status] || statusConfig.active;

  return (
    <Badge
      className={`text-lg font-bold px-4 py-4 rounded-full border shadow-sm transition-all duration-200 ${config.className}`}
    >
      {config.label}
    </Badge>
  );
}