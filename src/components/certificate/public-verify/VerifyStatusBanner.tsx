import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Link2Off,
  ServerCrash,
  Timer,
} from "lucide-react";

export type VerifyBannerKind =
  | "valid"
  | "revoked"
  | "not_found"
  | "invalid_input"
  | "rate_limited"
  | "service_error";

const BANNER: Record<
  VerifyBannerKind,
  {
    icon: typeof CheckCircle2;
    wrapper: string;
    iconWrapper: string;
    titleKm: string;
    bodyKm: string;
  }
> = {
  valid: {
    icon: CheckCircle2,
    wrapper:
      "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/40",
    iconWrapper:
      "bg-green-100 text-green-600 dark:bg-green-900/60 dark:text-green-400",
    titleKm: "វិញ្ញាបនបត្រនេះត្រឹមត្រូវ",
    bodyKm:
      "វិញ្ញាបនបត្រនេះត្រូវបានចេញផ្តល់ដោយ SastraCode ជាផ្លូវការ ហើយនៅមានសុពលភាព។",
  },
  revoked: {
    icon: AlertTriangle,
    wrapper: "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40",
    iconWrapper: "bg-red-100 text-red-600 dark:bg-red-900/60 dark:text-red-400",
    titleKm: "វិញ្ញាបនបត្រនេះត្រូវបានដកហូត",
    bodyKm:
      "វិញ្ញាបនបត្រនេះធ្លាប់ត្រូវបានចេញផ្តល់ ប៉ុន្តែបច្ចុប្បន្នត្រូវបានដកហូតដោយ SastraCode ហើយលែងមានសុពលភាពទៀតទេ។",
  },
  not_found: {
    icon: HelpCircle,
    wrapper:
      "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900",
    iconWrapper:
      "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
    titleKm: "រកមិនឃើញវិញ្ញាបនបត្រត្រូវនឹងលេខកូដនេះទេ",
    bodyKm:
      "លេខកូដនេះមានទម្រង់ត្រឹមត្រូវ ប៉ុន្តែគ្មានវិញ្ញាបនបត្រណាមួយត្រូវនឹងវាទេ។ សូមពិនិត្យលេខកូដម្តងទៀត ឬ scan QR Code នៅលើវិញ្ញាបនបត្រឡើងវិញ។",
  },
  invalid_input: {
    icon: Link2Off,
    wrapper:
      "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900",
    iconWrapper:
      "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
    titleKm: "តំណភ្ជាប់ ឬលេខកូដមិនត្រឹមត្រូវ",
    bodyKm:
      "Verification ID នេះមិនស្ថិតក្នុងទម្រង់ត្រឹមត្រូវទេ។ សូម scan QR Code ម្តងទៀត ឬចម្លងលេខកូដទាំងមូលពីវិញ្ញាបនបត្រ។",
  },
  rate_limited: {
    icon: Timer,
    wrapper:
      "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40",
    iconWrapper:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/60 dark:text-amber-400",
    titleKm: "អ្នកបានស្នើសុំច្រើនដងពេក",
    bodyKm:
      "សូមរង់ចាំមួយនាទី រួចព្យាយាមម្តងទៀត។ ការកំណត់នេះជួយការពារទិន្នន័យវិញ្ញាបនបត្រពីការទាញយកដោយស្វ័យប្រវត្តិ។",
  },
  service_error: {
    icon: ServerCrash,
    wrapper:
      "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40",
    iconWrapper:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/60 dark:text-amber-400",
    titleKm: "មិនអាចផ្ទៀងផ្ទាត់បានឥឡូវនេះទេ",
    bodyKm:
      "នេះជាបញ្ហាបច្ចេកទេសខាងម៉ាស៊ីនមេ មិនមែនជាការវិនិច្ឆ័យលើវិញ្ញាបនបត្រនោះទេ។ សូមព្យាយាមម្តងទៀតក្នុងពេលបន្តិចទៀត។",
  },
};

export function VerifyStatusBanner({ status }: { status: VerifyBannerKind }) {
  const config = BANNER[status];
  const Icon = config.icon;

  return (
    <div
      className={`flex items-start gap-4 rounded-2xl border-2 p-5 ${config.wrapper}`}
      role={
        status === "service_error" || status === "revoked" ? "alert" : "status"
      }
      aria-live="polite"
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${config.iconWrapper}`}
      >
        <Icon className="h-6 w-6" />
      </span>
      <div className="space-y-1">
        <p className="text-lg font-bold text-primary-color dark:text-white">
          {config.titleKm}
        </p>
        <p className="text-base leading-relaxed text-primary-color/80 dark:text-white/80">
          {config.bodyKm}
        </p>
      </div>
    </div>
  );
}
