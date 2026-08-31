"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

/**
 * Landing page after the email-verification step.
 *
 * Verification itself is owned by Keycloak (the "Verify Email" required action).
 * Keycloak redirects here afterwards (its action-token `redirect_uri`).
 *
 *   /verify-email/callback            -> success: immediately hand off to
 *                                        Keycloak's hosted login (no UI, no
 *                                        button). This page never renders a
 *                                        login form and never auto-authenticates
 *                                        a session itself.
 *   /verify-email/callback?error=...  -> failure (expired / invalid / used link):
 *                                        show the reason + a way to resend.
 */

const ERROR_MESSAGES: Record<string, string> = {
  expired:
    "តំណផ្ទៀងផ្ទាត់នេះបានផុតកំណត់ហើយ។ សូមស្នើសុំតំណថ្មី។",
  invalid:
    "តំណផ្ទៀងផ្ទាត់នេះមិនត្រឹមត្រូវ ឬត្រូវបានប្រើរួចហើយ។",
};

const GENERIC_ERROR =
  "មិនអាចផ្ទៀងផ្ទាត់អ៊ីមែលបានទេ។ សូមព្យាយាមម្ដងទៀត។";

function goToKeycloakLogin() {
  try {
    sessionStorage.removeItem("pendingVerificationEmail");
  } catch {
    // sessionStorage can be unavailable (private mode / SSR guard) — ignore.
  }

  void signIn("keycloak", { redirectTo: "/" });
}

function CallbackContent() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("error");

  const isError = errorCode !== null;
  const errorMessage = isError
    ? (ERROR_MESSAGES[errorCode] ?? GENERIC_ERROR)
    : null;

  // Success path: no interstitial. As soon as this page mounts, forward the
  // user straight to the Keycloak hosted login form. The ref guards against
  // React's double-invoke in development.
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (isError || hasRedirected.current) {
      return;
    }

    hasRedirected.current = true;
    goToKeycloakLogin();
  }, [isError]);

  if (!isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f9fc] px-5 py-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="h-9 w-9 animate-spin text-[#13235B]" />

          <p className="text-sm font-medium text-slate-500">
            អ៊ីមែលបានផ្ទៀងផ្ទាត់រួចរាល់។ កំពុងបញ្ជូនទៅទំព័រចូលគណនី...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9fc] px-5 py-10">
      <div className="w-full max-w-[440px]">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-xl shadow-slate-200/40 sm:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F1524A]/10">
            <AlertCircle className="h-9 w-9 text-[#F1524A]" />
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-[#13235B]">
            ការផ្ទៀងផ្ទាត់មិនបានសម្រេច
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            {errorMessage}
          </p>

          <Link
            href="/verify-email"
            className="mt-7 flex h-[52px] w-full items-center justify-center rounded-xl bg-[#13235B] px-5 text-sm font-bold text-white shadow-lg shadow-[#13235B]/20 transition hover:brightness-110"
          >
            ផ្ញើអ៊ីមែលផ្ទៀងផ្ទាត់ម្ដងទៀត
          </Link>

          <button
            type="button"
            onClick={goToKeycloakLogin}
            className="mt-3 inline-block text-sm font-medium text-slate-500 hover:text-[#13235B] hover:underline"
          >
            ត្រឡប់ទៅការចូលគណនី
          </button>
        </div>
      </div>
    </main>
  );
}

export default function VerifyEmailCallbackPage() {
  return (
    <Suspense fallback={null}>
      <CallbackContent />
    </Suspense>
  );
}
