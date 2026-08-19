"use client";

import { ArrowLeft, CheckCircle2, Mail, RefreshCw } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useResendVerificationEmailMutation } from "@/redux/api/auth-api";

function getErrorMessage(error: unknown) {
  if (!error || typeof error !== "object") {
    return "មិនអាចផ្ញើអ៊ីមែលម្ដងទៀតបាន";
  }

  if ("data" in error) {
    const data = (
      error as {
        data?: unknown;
      }
    ).data;

    if (data && typeof data === "object" && "message" in data) {
      const message = (
        data as {
          message?: unknown;
        }
      ).message;

      if (typeof message === "string" && message.trim()) {
        return message;
      }
    }
  }

  return "មិនអាចផ្ញើអ៊ីមែលម្ដងទៀតបាន។ សូមព្យាយាមម្ដងទៀត។";
}

export default function VerifyEmailPage() {
  const [email, setEmail] = useState("");

  const [resendVerificationEmail, { isLoading: isResending }] =
    useResendVerificationEmailMutation();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("pendingVerificationEmail");

    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleResend = async () => {
    if (!email) {
      toast.error("រកមិនឃើញអ៊ីមែល។ សូមចុះឈ្មោះម្ដងទៀត។");

      return;
    }

    try {
      const result = await resendVerificationEmail({
        email,
      }).unwrap();

      if (!result.success) {
        toast.error(result.message || "មិនអាចផ្ញើអ៊ីមែលម្ដងទៀតបាន");

        return;
      }

      toast.success(result.message || "អ៊ីមែលផ្ទៀងផ្ទាត់ត្រូវបានផ្ញើម្ដងទៀត");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleLogin = async () => {
    try {
      sessionStorage.removeItem("pendingVerificationEmail");

      await signIn("keycloak", {
        redirectTo: "/",
      });
    } catch (error) {
      console.error("Failed to start Keycloak login:", error);

      toast.error("មិនអាចបើកទំព័រចូលគណនីបាន");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9fc] px-5 py-10">
      <div className="w-full max-w-[460px]">
        <Link
          href="/register"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#13235B]"
        >
          <ArrowLeft className="h-4 w-4" />
          ត្រឡប់ក្រោយ
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-xl shadow-slate-200/40 sm:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#13235B]/5">
            <Mail className="h-9 w-9 text-[#13235B]" />
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-[#13235B]">
            ផ្ទៀងផ្ទាត់អ៊ីមែលរបស់អ្នក
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            យើងបានផ្ញើតំណផ្ទៀងផ្ទាត់ទៅកាន់
          </p>

          {email ? (
            <p className="mt-1 break-all text-sm font-bold text-[#13235B]">
              {email}
            </p>
          ) : (
            <p className="mt-1 text-sm font-medium text-slate-400">
              អ៊ីមែលរបស់អ្នក
            </p>
          )}

          <p className="mt-4 text-sm leading-7 text-slate-500">
            សូមចូលទៅកាន់អ៊ីមែលរបស់អ្នក ហើយចុចលើតំណដែលបានផ្ញើដោយ SastraCode
            ដើម្បីផ្ទៀងផ្ទាត់គណនី។
          </p>

          <div className="mt-7 space-y-4 rounded-2xl bg-slate-50 p-5 text-left">
            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  1. ពិនិត្យអ៊ីមែល
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  ពិនិត្យ Inbox និង Spam folder ប្រសិនបើអ្នករកមិនឃើញអ៊ីមែល។
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  2. ចុចតំណផ្ទៀងផ្ទាត់
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  តំណនោះនឹងបើកទំព័រ Keycloak verification។
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  3. ចូលគណនី
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  បន្ទាប់ពីអ៊ីមែលបានផ្ទៀងផ្ទាត់ អ្នកអាចចូលគណនីបាន។
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="mt-7 flex h-[52px] w-full items-center justify-center rounded-xl bg-[#13235B] px-5 text-sm font-bold text-white shadow-lg shadow-[#13235B]/20 transition hover:brightness-110"
          >
            ខ្ញុំបានផ្ទៀងផ្ទាត់រួច ចូលគណនី
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={isResending || !email}
            className="mt-3 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-[#13235B]/30 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${isResending ? "animate-spin" : ""}`}
            />

            {isResending ? "កំពុងផ្ញើ..." : "ផ្ញើអ៊ីមែលម្ដងទៀត"}
          </button>

          <p className="mt-5 text-xs leading-5 text-slate-400">
            មិនទាន់ទទួលបានអ៊ីមែល? សូមរង់ចាំបន្តិច ឬចុចផ្ញើម្ដងទៀត។
          </p>
        </div>
      </div>
    </main>
  );
}
