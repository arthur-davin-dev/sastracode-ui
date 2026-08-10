import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Lock,
  ChevronRight,
  UserCheck,
  Mail,
  UserPlus,
  Clock,
  FileText,
  ArrowLeft,
} from "lucide-react";

interface AccessRestrictedCardProps {
  courseTitle?: string;
  supportEmail?: string;
  onRequestAccess?: () => void;
}

export function AccessRestrictedCard({
  courseTitle = "ISTAD Web Development Bootcamp",
  supportEmail = "support@istad.edu.kh",
  onRequestAccess,
}: AccessRestrictedCardProps) {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center px-4 py-6 md:py-10 text-slate-900 dark:text-slate-100 font-sans">
      {/* Main Lock Avatar */}
      <div className="mb-6 flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rounded-full bg-blue-100/70 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shadow-sm">
        <Lock className="h-9 w-9 md:h-10 md:w-10 stroke-[2.2]" />
      </div>

      {/* Title & Subtitle */}
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-1 text-primary-color">
        Private Course
      </h1>
      <p className="text-sm md:text-base font-semibold text-slate-600 dark:text-slate-400 mb-2">
        Access Restricted
      </p>
      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 text-center max-w-sm mb-6 leading-relaxed">
       វគ្គសិក្សានេះមានសម្រាប់តែសិស្ស ISTAD ដែលត្រូវបានអនុម័តប៉ុណ្ណោះ
      </p>

      {/* Info Banner Box */}
      <div className="w-full bg-blue-50/80 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-2xl p-4 md:p-5 mb-5 text-left transition-all">
        <h2 className="text-base md:text-sm font-bold text-primary-color dark:text-slate-100 mb-1.5">
         ហេតុអ្វីបានជាខ្ញុំមិនអាចចូលប្រើវគ្គសិក្សានេះបាន?
        </h2>
        <p className="text-sm md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          វគ្គសិក្សានេះត្រូវបានកំណត់ការចូលប្រើ ហើយអាចចូលប្រើបានតែជាមួយអាសយដ្ឋានអ៊ីមែល ISTAD ដែលត្រូវបានអនុម័តប៉ុណ្ណោះ។
        </p>
      </div>

      {/* Requirements Box */}
      <div className="w-full border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 rounded-2xl p-5 md:p-6 mb-6 text-left space-y-4 shadow-xs">
        <h3 className="text-xs md:text-sm font-bold text-primary-color dark:text-slate-100">
          លក្ខណៈពិសេសការចូលប្រើ
        </h3>

        <ul className="space-y-3.5 text-xs md:text-sm text-slate-600 dark:text-slate-300">
          <li className="flex items-start gap-3">
            <UserCheck className="h-4 w-4 md:h-5 md:w-5 text-slate-700 dark:text-slate-300 shrink-0 mt-0.5" />
            <span>ត្រូវតែជាសិស្ស ISTAD ដែលកំពុងសិក្សា</span>
          </li>
          <li className="flex items-start gap-3">
            <Mail className="h-4 w-4 md:h-5 md:w-5 text-slate-700 dark:text-slate-300 shrink-0 mt-0.5" />
            <div>
              <span>ប្រើអាសយដ្ឋានអ៊ីមែល ISTAD របស់អ្នក</span>
              <span className="block text-slate-400 dark:text-slate-500 text-xs mt-0.5">
                @istad.edu.kh
              </span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <UserPlus className="h-4 w-4 md:h-5 md:w-5 text-slate-700 dark:text-slate-300 shrink-0 mt-0.5" />
            <span>ស្នើសុំការចូលប្រើ ហើយរង់ចាំការអនុម័តពីអ្នកគ្រប់គ្រង</span>
          </li>
          <li className="flex items-start gap-3">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-slate-700 dark:text-slate-300 shrink-0 mt-0.5" />
            <span>ជាធម្មតា ការអនុម័តត្រូវចំណាយពេលពី ១ ទៅ ៣ ថ្ងៃធ្វើការ។</span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3 mb-8">
        <Link
          href="/request-access"
          className="w-full h-11 md:h-12 rounded-xl bg-primary-color hover:bg-blue-700 text-white font-semibold text-xs md:text-sm transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <FileText className="h-4 w-4" />
          <span>ពិនិត្យមើលតម្រូវការសម្រាប់ការចូលប្រើ</span>
        </Link>

        <Link
          href="/courses"
          className="w-full h-11 md:h-12 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs md:text-sm transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>ត្រឡប់ទៅកាន់វគ្គសិក្សា</span>
        </Link>
      </div>

      {/* Support Footer */}
      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 text-center">
        Need help?{" "}
        <a
          href={`mailto:${supportEmail}`}
          className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-all"
        >
          Contact {supportEmail}
        </a>
      </p>
    </div>
  );
}