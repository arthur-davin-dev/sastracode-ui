"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  BookOpen,
  Bot,
  Code2,
  Eye,
  EyeOff,
  Mail,
  MailCheck,
  Map,
  Trophy,
} from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { getApiErrorMessage } from "@/lib/api/error";
import { useRegisterMutation } from "@/redux/api/auth-api";

const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "សូមបញ្ចូលនាមខ្លួន")
      .max(50, "នាមខ្លួនមិនអាចលើសពី ៥០ តួអក្សរ"),

    lastName: z
      .string()
      .trim()
      .min(1, "សូមបញ្ចូលនាមត្រកូល")
      .max(50, "នាមត្រកូលមិនអាចលើសពី ៥០ តួអក្សរ"),

    email: z
      .string()
      .trim()
      .min(1, "សូមបញ្ចូលអ៊ីមែល")
      .email("អ៊ីមែលមិនត្រឹមត្រូវ"),

    username: z
      .string()
      .trim()
      .min(1, "សូមបញ្ចូលឈ្មោះគណនី")
      .min(5, "ឈ្មោះគណនីត្រូវមានយ៉ាងតិច ៥ តួអក្សរ")
      .max(30, "ឈ្មោះគណនីមិនអាចលើសពី ៣០ តួអក្សរ")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "ឈ្មោះគណនីអាចមានតែអក្សរ លេខ និងសញ្ញា _ ប៉ុណ្ណោះ",
      ),

    password: z
      .string()
      .min(1, "សូមបញ្ចូលពាក្យសម្ងាត់")
      .min(8, "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៨ តួអក្សរ")
      .regex(/[A-Z]/, "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិចអក្សរធំ ១")
      .regex(
        /[^A-Za-z0-9]/,
        "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិចសញ្ញាពិសេស ១",
      ),

    confirmPassword: z
      .string()
      .min(1, "សូមបញ្ជាក់ពាក្យសម្ងាត់"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "ពាក្យសម្ងាត់មិនត្រូវគ្នា",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const REGISTER_FAILED_MESSAGE = "មិនអាចបង្កើតគណនីបាន។ សូមព្យាយាមម្ដងទៀត។";

export default function RegisterForm() {
  const [registerUser, { isLoading }] = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // Set once the backend has accepted the registration and Keycloak has been
  // asked to send its VERIFY_EMAIL email. From here the frontend does nothing
  // else — Keycloak owns the verification link, page and the login that follows.
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const result = await registerUser({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        username: values.username.trim(),
        password: values.password,
        confirmPassword: values.confirmPassword,
      }).unwrap();

      if (!result.success) {
        toast.error(
          result.message || "មិនអាចបង្កើតគណនីបាន",
        );

        return;
      }

      toast.success(
        result.message ||
          "បង្កើតគណនីបានជោគជ័យ។ សូមផ្ទៀងផ្ទាត់អ៊ីមែល។",
      );

      // Show the informational message inline. No redirect, no custom
      // verification page — the next step is the "Verify Email" link in the
      // Keycloak email, which opens Keycloak's own verification page.
      setRegisteredEmail(values.email.trim());
    } catch (error) {
      toast.error(getApiErrorMessage(error, REGISTER_FAILED_MESSAGE));
    }
  };

  // Social sign-in routes through Keycloak's own login flow so it stays the
  // single source of truth for identity linking — same providers as your
  // login.ftl theme (google / github), hinted via kc_idp_hint.
  const handleSocialSignIn = (idpHint: "google" | "github") => {
    // `authorizationParams` is signIn's 3rd positional arg in Auth.js v5, not
    // a field on the options object — nesting it there silently drops
    // kc_idp_hint and Keycloak falls back to its own login form.
    signIn(
      "keycloak",
      { redirectTo: "/" },
      { kc_idp_hint: idpHint },
    );
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1400px]">
        {/* LEFT */}
        <section className="relative hidden flex-1 flex-col justify-center overflow-hidden px-14 py-10 lg:flex xl:px-20">
          <div>
            <h1 className="text-[46px] font-extrabold leading-[1.35] xl:text-[52px]">
              <span className="text-[#13235B]">
                កសាងជំនាញកូដ{" "}
              </span>

              <span className="text-[#F1524A]">
                សម្រាប់អនាគតរបស់អ្នក
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-lg leading-7 text-slate-500">
              រៀន សាកល្បង និងអភិវឌ្ឍជំនាញ Programming
              របស់អ្នក តាមរយៈការអនុវត្តជាក់ស្តែង។
            </p>
          </div>

          <div className="relative mx-auto mt-10 h-[380px] w-full max-w-[570px]">
            <div className="absolute right-1 top-0 h-[230px] w-[230px] rounded-full border-2 border-dashed border-slate-200" />

            <div className="absolute bottom-0 left-14 h-[160px] w-[160px] rounded-full bg-[#F1524A]/5" />

            <div className="absolute left-1/2 top-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/40">
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3.5">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />

                <span className="ml-3 text-lg font-medium text-slate-400">
                  learning.js
                </span>
              </div>

              <pre className="px-6 py-5 text-lg leading-7 text-slate-700">
                <code>
                  <span className="text-slate-400">
                    01{" "}
                  </span>

                  <span className="text-violet-500">
                    function
                  </span>{" "}

                  <span className="text-blue-600">
                    startLearning
                  </span>
                  () {"{"}
                  {"\n"}

                  <span className="text-slate-400">
                    02{" "}
                  </span>
                  {"  "}

                  <span className="text-violet-500">
                    const
                  </span>{" "}
                  learning ={" "}

                  <span className="text-orange-500">
                    true
                  </span>
                  ;
                  {"\n"}

                  <span className="text-slate-400">
                    03{" "}
                  </span>
                  {"\n"}

                  <span className="text-slate-400">
                    04{" "}
                  </span>
                  {"  "}

                  <span className="text-violet-500">
                    while
                  </span>{" "}
                  (learning) {"{"}
                  {"\n"}

                  <span className="text-slate-400">
                    05{" "}
                  </span>
                  {"    "}
                  practice();
                  {"\n"}

                  <span className="text-slate-400">
                    06{" "}
                  </span>
                  {"    "}
                  buildProjects();
                  {"\n"}

                  <span className="text-slate-400">
                    07{" "}
                  </span>
                  {"    "}
                  becomeBetter();
                  {"\n"}

                  <span className="text-slate-400">
                    08{" "}
                  </span>
                  {"  "}
                  {"}"}
                  {"\n"}

                  <span className="text-slate-400">
                    09{" "}
                  </span>
                  {"}"}
                </code>
              </pre>
            </div>

            <FeatureCard
              className="left-3 top-3"
              icon={
                <BookOpen className="h-5 w-5 text-emerald-500" />
              }
              iconBg="bg-emerald-50"
              title="Documentation"
              subtitle="Learn Everything"
            />

            <FeatureCard
              className="-left-6 -bottom-5"
              icon={
                <Code2 className="h-5 w-5 text-blue-500" />
              }
              iconBg="bg-blue-50"
              title="Playground"
              subtitle="Code & Practice"
            />

            <FeatureCard
              className="-right-4 top-20"
              icon={
                <Bot className="h-5 w-5 text-violet-500" />
              }
              iconBg="bg-violet-50"
              title="AI Assistant"
              subtitle="Get Smart Help"
            />

            <FeatureCard
              className="-right-4 -top-5"
              icon={
                <Map className="h-5 w-5 text-amber-500" />
              }
              iconBg="bg-amber-50"
              title="Roadmap"
              subtitle="Learn Step by Step"
            />

            <FeatureCard
              className="left-[170px] -bottom-5"
              icon={
                <Trophy className="h-5 w-5 text-orange-500" />
              }
              iconBg="bg-orange-50"
              title="Quiz & Test"
              subtitle="Track Progress"
            />
          </div>
        </section>

      
        <section className="flex flex-1 items-center justify-center bg-white px-5 py-10 sm:px-8 lg:px-14 xl:px-20">
          <div className="w-full max-w-[480px]">
            <Link
            
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-lg font-medium text-slate-500 lg:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
              ត្រឡប់ក្រោយ
            </Link>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
              {registeredEmail ? (
                <div className="py-2 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
                    <MailCheck className="h-7 w-7 text-emerald-500" />
                  </div>

                  <h2 className="mt-6 text-2xl font-extrabold text-[#13235B]">
                    ចុះឈ្មោះបានជោគជ័យ
                  </h2>

                  <p className="mt-3 text-lg leading-7 text-slate-500">
                    សូមពិនិត្យអ៊ីមែលរបស់អ្នក{" "}
                    <span className="break-all font-semibold text-[#13235B]">
                      {registeredEmail}
                    </span>{" "}
                    ហើយចុចប៊ូតុង &laquo;Verify Email&raquo;
                    ដើម្បីធ្វើឱ្យគណនីរបស់អ្នកសកម្ម។
                  </p>

                  <p className="mt-3 text-lg leading-6 text-slate-400">
                    តំណផ្ទៀងផ្ទាត់ ទំព័រផ្ទៀងផ្ទាត់ និងទំព័រចូលគណនី
                    ត្រូវបានគ្រប់គ្រងទាំងស្រុងដោយ Keycloak។
                  </p>

                  <a
                    href="https://mail.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#13235B] px-5 text-lg font-bold text-white shadow-lg shadow-[#13235B]/20 transition hover:brightness-110"
                  >
                    <Mail className="h-4 w-4" />
                    បើក Gmail
                  </a>

                  <button
                    type="button"
                    onClick={() =>
                      signIn("keycloak", { redirectTo: "/" })
                    }
                    className="mt-3 inline-block text-lg font-medium text-slate-500 transition hover:text-[#13235B] hover:underline"
                  >
                    បានផ្ទៀងផ្ទាត់រួចហើយ? បន្តទៅការចូលគណនី
                  </button>
                </div>
              ) : (
              <>
              <div className="mb-7">
                <h2 className="text-3xl font-extrabold tracking-tight text-[#13235B]">
                  បង្កើតគណនី
                </h2>

                <p className="mt-2 text-lg leading-6 text-slate-400">
                  ដោះសោមុខងារពិសេសៗ
                  និងចាប់ផ្តើមរៀននៅថ្ងៃនេះ
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    label="នាមខ្លួន"
                    error={errors.firstName?.message}
                  >
                    <input
                      {...register("firstName")}
                      type="text"
                      placeholder="John"
                      autoComplete="given-name"
                      className={inputClass(
                        !!errors.firstName,
                      )}
                    />
                  </FormField>

                  <FormField
                    label="នាមត្រកូល"
                    error={errors.lastName?.message}
                  >
                    <input
                      {...register("lastName")}
                      type="text"
                      placeholder="Doe"
                      autoComplete="family-name"
                      className={inputClass(
                        !!errors.lastName,
                      )}
                    />
                  </FormField>
                </div>

                <FormField
                  label="អ៊ីមែល"
                  error={errors.email?.message}
                >
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    className={inputClass(
                      !!errors.email,
                    )}
                  />
                </FormField>

                <FormField
                  label="ឈ្មោះគណនី"
                  error={errors.username?.message}
                >
                  <input
                    {...register("username")}
                    type="text"
                    placeholder="johndoe123"
                    autoComplete="username"
                    className={inputClass(
                      !!errors.username,
                    )}
                  />
                </FormField>

                <FormField
                  label="ពាក្យសម្ងាត់"
                  error={errors.password?.message}
                >
                  <div className="relative">
                    <input
                      {...register("password")}
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className={`${inputClass(
                        !!errors.password,
                      )} pr-12`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (value) => !value,
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#13235B]"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormField>

                <FormField
                  label="បញ្ជាក់ពាក្យសម្ងាត់"
                  error={
                    errors.confirmPassword?.message
                  }
                >
                  <div className="relative">
                    <input
                      {...register("confirmPassword")}
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className={`${inputClass(
                        !!errors.confirmPassword,
                      )} pr-12`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (value) => !value,
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#13235B]"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormField>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 flex h-[52px] w-full items-center justify-center rounded-xl bg-[#13235B] px-5 text-lg font-bold text-white shadow-lg shadow-[#13235B]/20 transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading
                    ? "កំពុងបង្កើតគណនី..."
                    : "បង្កើតគណនី"}
                </button>

                <div className="flex items-center gap-3 pt-2">
                  <div className="h-px flex-1 bg-slate-200" />

                  <span className="text-lg text-slate-400">
                    ឬ
                  </span>

                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialSignIn("google")}
                    className="flex h-[50px] w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-lg font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.8z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1C3.25 21.3 7.31 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29v-3.1H1.27A11.95 11.95 0 000 12c0 1.93.47 3.76 1.27 5.39l4-3.1z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.6 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.61l4 3.1C6.22 6.86 8.87 4.75 12 4.75z"
                      />
                    </svg>
                    Google
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialSignIn("github")}
                    className="flex h-[50px] w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-lg font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#181717">
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 015.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.7 5.38-5.27 5.67.42.36.78 1.08.78 2.18 0 1.58-.02 2.85-.02 3.24 0 .31.21.67.8.56A10.52 10.52 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                    </svg>
                    GitHub
                  </button>
                </div>

                <p className="pt-1 text-center text-lg text-slate-400">
                  មានគណនីរួចហើយមែនទេ?{" "}

                  <button
                    type="button"
                    onClick={() =>
                      signIn("keycloak", {
                        redirectTo: "/",
                      })
                    }
                    className="font-semibold text-[#F1524A] hover:underline"
                  >
                    ចូលគណនី
                  </button>
                </p>
              </form>
              </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-lg font-medium text-slate-700">
        {label}{" "}
        <span className="text-[#F1524A]">
          *
        </span>
      </label>

      {children}

      {error && (
        <p className="mt-1.5 text-lg text-[#F1524A]">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `
    h-[48px]
    w-full
    rounded-xl
    border
    px-4
    text-lg
    text-slate-900
    outline-none
    transition
    placeholder:text-slate-400
    ${
      hasError
        ? "border-[#F1524A] bg-red-50/40 focus:border-[#F1524A] focus:ring-2 focus:ring-[#F1524A]/10"
        : "border-slate-200 bg-slate-50 focus:border-[#13235B]/40 focus:bg-white focus:ring-2 focus:ring-[#13235B]/5"
    }
  `;
}

function FeatureCard({
  className,
  icon,
  iconBg,
  title,
  subtitle,
}: {
  className: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className={`absolute z-10 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl shadow-slate-200/50 ${className}`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
      >
        {icon}
      </div>

      <div>
        <p className="whitespace-nowrap text-lg font-bold text-slate-800">
          {title}
        </p>

        <p className="whitespace-nowrap text-lg text-slate-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
}