import type { Metadata } from "next";
import Link from "next/link";
import { verifyByVerificationId } from "@/components/certificate/public-verify/verification";
import { PublicVerifyResult } from "@/components/certificate/public-verify/PublicVerifyResult";

// Verification results must never be served stale — especially after a
// certificate is revoked. Force a fresh backend lookup on every request.
export const dynamic = "force-dynamic";

// Individual certificates carry a person's name — keep them out of search
// indexes. No PII in the title/description either.
export const metadata: Metadata = {
  title: "Verify Certificate · SastraCode",
  description:
    "Check whether a SastraCode certificate is authentic and still valid.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Verify Certificate · SastraCode",
    description:
      "Check whether a SastraCode certificate is authentic and still valid.",
  },
};

export default async function PublicCertificateVerifyPage({
  params,
}: {
  params: Promise<{ verificationId: string }>;
}) {
  const { verificationId } = await params;
  const state = await verifyByVerificationId(verificationId);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-primary-color dark:text-white">
          ការផ្ទៀងផ្ទាត់វិញ្ញាបនបត្រ
        </h1>
        <p className="text-base leading-relaxed text-primary-color/70 dark:text-white/70">
          លទ្ធផលខាងក្រោមបានមកពី SastraCode ដោយផ្ទាល់នៅពេលនេះ។
        </p>
      </div>

      <PublicVerifyResult state={state} verificationId={verificationId} />

      <Link
        href="/student/certificate/verify"
        prefetch={false}
        className="inline-block text-base font-medium text-primary-color underline dark:text-white"
      >
        អំពីការផ្ទៀងផ្ទាត់វិញ្ញាបនបត្រ SastraCode
      </Link>
    </div>
  );
}
