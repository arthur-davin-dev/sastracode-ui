"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  BookOpen,
  Bot,
  Code2,
  Eye,
  EyeOff,
  Map,
  Trophy,
} from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

function errorMessage(error: unknown) {
  if (!error || typeof error !== "object") {
    return "មិនអាចបង្កើតគណនីបាន";
  }

  if ("data" in error) {
    const data = (error as { data?: unknown }).data;

    if (data && typeof data === "object" && "message" in data) {
      const message = (data as { message?: unknown }).message;

      if (typeof message === "string" && message.trim()) {
        return message;
      }
    }
  }

  return "មិនអាចបង្កើតគណនីបាន។ សូមព្យាយាមម្ដងទៀត។";
}

export default function RegisterForm() {
  const router = useRouter();

  const [registerUser, { isLoading }] = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

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

      // Store email temporarily for verification screen
      sessionStorage.setItem(
        "pendingVerificationEmail",
        values.email.trim(),
      );

      toast.success(
        result.message ||
          "បង្កើតគណនីបានជោគជ័យ។ សូមផ្ទៀងផ្ទាត់អ៊ីមែល។",
      );

      // IMPORTANT:
      // Do NOT call signIn("keycloak") here.
      //
      // Calling signIn here will open Keycloak login first
      // because there is no Keycloak browser session yet.

      router.replace("/verify-email");
    } catch (error) {
      toast.error(errorMessage(error));
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1400px]">
        {/* LEFT */}
        <section className="relative hidden flex-1 flex-col justify-center overflow-hidden px-14 py-10 lg:flex xl:px-20">
          <div>
            <h1 className="text-[46px] font-extrabold leading-[1.35] xl:text-[52px]">
              <span className="text-[#13235B]">
                ជំនាញកូដ{" "}
              </span>

              <span className="text-[#F1524A]">
                សម្រាប់ថ្ងៃស្អែក
              </span>

              <br />

              <span className="text-[#F1524A]">
                ដ៏ល្អប្រសើរ
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-500">
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

                <span className="ml-3 text-[11px] font-medium text-slate-400">
                  learning.js
                </span>
              </div>

              <pre className="px-6 py-5 text-[13px] leading-7 text-slate-700">
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
              className="-left-6 bottom-14"
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
              className="right-2 bottom-6"
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

        {/* RIGHT */}
        <section className="flex flex-1 items-center justify-center bg-white px-5 py-10 sm:px-8 lg:px-14 xl:px-20">
          <div className="w-full max-w-[480px]">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 lg:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
              ត្រឡប់ក្រោយ
            </Link>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
              <div className="mb-7">
                <h2 className="text-3xl font-extrabold tracking-tight text-[#13235B]">
                  បង្កើតគណនី
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
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
                  className="mt-2 flex h-[52px] w-full items-center justify-center rounded-xl bg-[#13235B] px-5 text-sm font-bold text-white shadow-lg shadow-[#13235B]/20 transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading
                    ? "កំពុងបង្កើតគណនី..."
                    : "បង្កើតគណនី"}
                </button>

                <div className="flex items-center gap-3 pt-2">
                  <div className="h-px flex-1 bg-slate-200" />

                  <span className="text-xs text-slate-400">
                    ឬ
                  </span>

                  <div className="h-px flex-1 bg-slate-200" />
                </div>
{/* 
                <button
                  type="button"
                  onClick={() =>
                    signIn("keycloak", {
                      redirectTo: "/",
                    })
                  }
                  className="flex h-[50px] w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-[#13235B]/30 hover:bg-slate-50"
                >
                  ចូលតាម Keycloak
                </button> */}

                <p className="pt-1 text-center text-sm text-slate-400">
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
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}{" "}
        <span className="text-[#F1524A]">
          *
        </span>
      </label>

      {children}

      {error && (
        <p className="mt-1.5 text-xs text-[#F1524A]">
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
    text-sm
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
        <p className="whitespace-nowrap text-sm font-bold text-slate-800">
          {title}
        </p>

        <p className="whitespace-nowrap text-[11px] text-slate-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
}