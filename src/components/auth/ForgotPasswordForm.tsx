"use client";

import { ArrowLeft, KeyRound, MailCheck } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { getApiErrorMessage } from "@/lib/api/error";
import { useForgotPasswordMutation } from "@/redux/api/auth-api";

function goToKeycloakLogin() {
  void signIn("keycloak", { redirectTo: "/" });
}

const emailSchema = z
  .string()
  .trim()
  .min(1, "សូមបញ្ចូលអ៊ីមែល")
  .email("អ៊ីមែលមិនត្រឹមត្រូវ");

// Shown for any completed request, success or "no such user" alike, so the
// response never reveals whether an address is registered.
const GENERIC_SENT_MESSAGE =
  "ប្រសិនបើអ៊ីមែលនេះមានគណនី យើងបានផ្ញើតំណកំណត់ពាក្យសម្ងាត់ថ្មីទៅកាន់វា។";

const NETWORK_FAIL_MESSAGE =
  "មិនអាចផ្ញើសំណើបានទេ។ សូមពិនិត្យអ៊ីនធឺណិត រួចព្យាយាមម្ដងទៀត។";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? "អ៊ីមែលមិនត្រឹមត្រូវ");
      return;
    }
    setFieldError(null);

    try {
      await forgotPassword({ email: parsed.data }).unwrap();
      setSubmitted(true);
    } catch (error) {
      // A 4xx from the backend still means "request received" — keep the
      // response uniform. Only a transport failure is worth surfacing.
      const status =
        typeof (error as { status?: unknown })?.status === "number"
          ? (error as { status: number }).status
          : null;

      if (status && status >= 400 && status < 500) {
        setSubmitted(true);
        return;
      }

      toast.error(getApiErrorMessage(error, NETWORK_FAIL_MESSAGE));
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9fc] px-5 py-10">
      <div className="w-full max-w-[440px]">
        <button
          type="button"
          onClick={goToKeycloakLogin}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#13235B]"
        >
          <ArrowLeft className="h-4 w-4" />
          ត្រឡប់ទៅការចូលគណនី
        </button>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/40 sm:p-10">
          {submitted ? (
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
                <MailCheck className="h-7 w-7 text-emerald-500" />
              </div>

              <h1 className="mt-6 text-2xl font-extrabold text-[#13235B]">
                ពិនិត្យអ៊ីមែលរបស់អ្នក
              </h1>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                {GENERIC_SENT_MESSAGE}
              </p>

              <p className="mt-2 text-xs leading-6 text-slate-400">
                មិនឃើញអ៊ីមែល? ពិនិត្យ Spam folder ឬសាកល្បងម្ដងទៀតក្នុងពេលបន្តិចទៀត។
              </p>

              <button
                type="button"
                onClick={goToKeycloakLogin}
                className="mt-7 flex h-[52px] w-full items-center justify-center rounded-xl bg-[#13235B] px-5 text-sm font-bold text-white shadow-lg shadow-[#13235B]/20 transition hover:brightness-110"
              >
                ត្រឡប់ទៅការចូលគណនី
              </button>
            </div>
          ) : (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#13235B]/5">
                <KeyRound className="h-7 w-7 text-[#13235B]" />
              </div>

              <h1 className="mt-6 text-center text-2xl font-extrabold text-[#13235B]">
                ភ្លេចពាក្យសម្ងាត់?
              </h1>

              <p className="mt-2 text-center text-sm leading-6 text-slate-400">
                បញ្ចូលអ៊ីមែលរបស់អ្នក យើងនឹងផ្ញើតំណសម្រាប់កំណត់ពាក្យសម្ងាត់ថ្មី។
              </p>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
                <div>
                  <label
                    htmlFor="forgot-email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    អ៊ីមែល
                  </label>

                  <input
                    id="forgot-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={`h-[48px] w-full rounded-xl border px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                      fieldError
                        ? "border-[#F1524A] bg-red-50/40 focus:border-[#F1524A] focus:ring-2 focus:ring-[#F1524A]/10"
                        : "border-slate-200 bg-slate-50 focus:border-[#13235B]/40 focus:bg-white focus:ring-2 focus:ring-[#13235B]/5"
                    }`}
                  />

                  {fieldError && (
                    <p className="mt-1.5 text-xs text-[#F1524A]">{fieldError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex h-[52px] w-full items-center justify-center rounded-xl bg-[#13235B] px-5 text-sm font-bold text-white shadow-lg shadow-[#13235B]/20 transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "កំពុងផ្ញើ..." : "ផ្ញើតំណកំណត់ពាក្យសម្ងាត់"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-400">
                នឹកឃើញពាក្យសម្ងាត់វិញ?{" "}
                <button
                  type="button"
                  onClick={goToKeycloakLogin}
                  className="font-semibold text-[#F1524A] hover:underline"
                >
                  ចូលគណនី
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
