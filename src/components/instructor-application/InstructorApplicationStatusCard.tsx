"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  RefreshCw,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type { InstructorApplicationResponse } from "@/types/instructor-application";

import {
  cvFileHref,
  formatDateTime,
  STATUS_META,
} from "@/components/instructor-application/instructor-application-utils";

interface InstructorApplicationStatusCardProps {
  application: InstructorApplicationResponse;
  onResubmit?: () => void;
}

const STATUS_BODY: Record<InstructorApplicationResponse["status"], string> = {
  PENDING:
    "ពាក្យសុំរបស់លោកអ្នកត្រូវបានដាក់ស្នើដោយជោគជ័យ ហើយកំពុងរង់ចាំក្រុមការងារធ្វើការត្រួតពិនិត្យ។ សូមលោកអ្នករង់ចាំការជូនដំណឹងបន្ទាប់។",
  APPROVED:
    "សូមអបអរសាទរ! ពាក្យសុំធ្វើជាគ្រូបង្រៀនរបស់លោកអ្នកត្រូវបានអនុម័តរួចរាល់។",
  REJECTED:
    "ជូនចំណាប់អារម្មណ៍៖ ពាក្យសុំធ្វើជាគ្រូបង្រៀនរបស់លោកអ្នកមិនត្រូវបានអនុម័តនៅពេលនេះទេ។ សូមពិនិត្យមូលហេតុខាងក្រោម រួចធ្វើបច្ចុប្បន្នភាពព័ត៌មាន ហើយដាក់ស្នើឡើងវិញ។",
};

export function InstructorApplicationStatusCard({
  application,
  onResubmit,
}: InstructorApplicationStatusCardProps) {
  const meta = STATUS_META[application.status];
  const body = STATUS_BODY[application.status];

  const StatusIcon =
    application.status === "APPROVED"
      ? CheckCircle2
      : application.status === "REJECTED"
        ? XCircle
        : Clock;

  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
            <GraduationCap className="h-5 w-5 text-primary-color" />
            ពាក្យសុំធ្វើជាគ្រូបង្រៀន
          </h2>

          <p className="mt-1 text-lg text-slate-500">
            ស្ថានភាពនៃពាក្យសុំរបស់លោកអ្នក
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-2 self-start rounded-lg px-4 py-2 text-lg font-bold ${meta.badgeClass}`}
        >
          <StatusIcon className="h-4 w-4" />
          {meta.label}
        </span>
      </div>

      <div className="space-y-6 p-6 sm:p-8">
        <p className="text-lg leading-7 text-slate-700 dark:text-slate-200">
          {body}
        </p>

        {application.status === "REJECTED" && application.rejectionReason && (
          <div
            role="alert"
            className="flex gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-500/10"
          >
            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

            <div>
              <p className="text-lg font-bold text-red-600 dark:text-red-300">
                មូលហេតុនៃការបដិសេធ
              </p>

              <p className="mt-1 whitespace-pre-wrap text-lg leading-7 text-red-600/90 dark:text-red-200/90">
                {application.rejectionReason}
              </p>
            </div>
          </div>
        )}

        {application.status === "APPROVED" && (
          <div
            role="alert"
            className="flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 dark:border-emerald-900/40 dark:bg-emerald-500/10"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />

            <p className="text-lg leading-7 text-emerald-700 dark:text-emerald-200">
              សិទ្ធិជាគ្រូបង្រៀនត្រូវបានផ្ដល់ជូនដោយប្រព័ន្ធ។ ប្រសិនបើមុខងារសម្រាប់គ្រូបង្រៀនមិនទាន់បង្ហាញនៅឡើយទេ សូមចាកចេញពីគណនី រួចចូលម្ដងទៀត ដើម្បីធ្វើឲ្យសម័យប្រើប្រាស់ថ្មី។
            </p>
          </div>
        )}

        <div>
          <p className="text-lg font-semibold text-slate-500">
            ជំនាញ និងបទពិសោធន៍
          </p>

          <p className="mt-1 whitespace-pre-wrap text-lg leading-7 text-slate-800 dark:text-slate-200">
            {application.expertise}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InfoRow
            icon={<FileText />}
            label="ឯកសារ CV"
            value={
              <a
                href={cvFileHref(application.cvFileId)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary-color underline underline-offset-4 hover:opacity-80"
              >
                មើលឯកសារ CV
              </a>
            }
          />

          <InfoRow
            icon={<CalendarDays />}
            label="ដាក់ស្នើនៅថ្ងៃ"
            value={formatDateTime(application.createdAt)}
          />

          {application.reviewedAt && (
            <InfoRow
              icon={<Clock />}
              label="ត្រួតពិនិត្យនៅថ្ងៃ"
              value={formatDateTime(application.reviewedAt)}
            />
          )}
        </div>

        {application.status === "REJECTED" && onResubmit && (
          <div className="border-t border-slate-100 pt-6 dark:border-slate-800">
            <Button
              type="button"
              onClick={onResubmit}
              className="h-11 rounded-xl bg-primary-color px-6 text-white hover:bg-primary-color/90"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              ដាក់ស្នើពាក្យសុំឡើងវិញ
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
      <span className="text-slate-400 [&>svg]:h-4.5 [&>svg]:w-4.5">{icon}</span>

      <div className="min-w-0">
        <p className="text-sm text-slate-400">{label}</p>

        <p className="truncate text-lg font-medium text-slate-800 dark:text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
}
