import type { Metadata } from "next";
import { QrCode, ShieldCheck } from "lucide-react";
import { VerifyAnotherForm } from "@/components/certificate/public-verify/VerifyAnotherForm";

// Static, indexable landing page for manual certificate lookups. Individual
// result pages under `[verificationId]` stay noindex; this one is safe to crawl.
export const metadata: Metadata = {
  title: "Verify a Certificate · SastraCode",
  description:
    "Verify the authenticity of a SastraCode certificate by scanning its QR code or entering its verification ID.",
  alternates: { canonical: "/student/certificate/verify" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Verify a Certificate · SastraCode",
    description:
      "Verify the authenticity of a SastraCode certificate by scanning its QR code or entering its verification ID.",
  },
};

export default function CertificateVerifyLandingPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-init-color/20 px-3 py-1 text-sm font-bold text-secondary-color">
          <ShieldCheck className="h-4 w-4" />
          SastraCode
        </span>
        <h1 className="text-2xl font-extrabold text-primary-color dark:text-white">
          ផ្ទៀងផ្ទាត់វិញ្ញាបនបត្រ
        </h1>
        <p className="text-base leading-relaxed text-primary-color/70 dark:text-white/70">
          វិញ្ញាបនបត្រនីមួយៗរបស់ SastraCode អាចផ្ទៀងផ្ទាត់បាន។ Scan QR Code
          នៅលើវិញ្ញាបនបត្រ ឬបញ្ចូល Verification ID ខាងក្រោម ដើម្បីពិនិត្យ
          ភាពត្រឹមត្រូវ និងស្ថានភាពបច្ចុប្បន្ន។
        </p>
      </div>

      <section className="space-y-4 rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <VerifyAnotherForm />
      </section>

      <section className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">
        <QrCode className="mt-0.5 h-6 w-6 shrink-0 text-primary-color dark:text-white" />
        <p className="text-base leading-relaxed text-primary-color/80 dark:text-white/80">
          មាន QR Code នៅលើវិញ្ញាបនបត្រ សូម scan វា។ វានឹងនាំអ្នកទៅកាន់
          ទំព័រលទ្ធផលផ្ទៀងផ្ទាត់ដោយស្វ័យប្រវត្តិ។
        </p>
      </section>
    </div>
  );
}
