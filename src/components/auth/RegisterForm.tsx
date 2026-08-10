"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, BookOpen, Bot, CheckCircle2, Code2, Eye, EyeOff, Map } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useRegisterMutation } from "@/redux/api/auth-api";

const registerSchema = z
  .object({
    username: z.string().min(3, "ឈ្មោះអ្នកប្រើត្រូវមានយ៉ាងតិច 3 តួអក្សរ").max(255),
    firstName: z.string().max(255),
    lastName: z.string().max(255),
    email: z.string().email("អ៊ីមែលមិនត្រឹមត្រូវ").max(255),
    password: z.string().min(8, "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច 8 តួអក្សរ").max(255),
    confirmPassword: z.string().min(8, "សូមបញ្ជាក់ពាក្យសម្ងាត់").max(255),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "ពាក្យសម្ងាត់ទាំងពីរមិនដូចគ្នា",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

function errorMessage(error: unknown) {
  if (!error || typeof error !== "object") return "មិនអាចបង្កើតគណនីបាន";
  if ("data" in error) {
    const data = (error as { data?: unknown }).data;
    if (data && typeof data === "object" && "message" in data) {
      const message = (data as { message?: unknown }).message;
      if (typeof message === "string" && message.trim()) return message;
    }
  }
  return "មិនអាចបង្កើតគណនីបាន។ សូមព្យាយាមម្ដងទៀត។";
}

export default function RegisterForm() {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [created, setCreated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const result = await registerUser(values).unwrap();
      if (!result.success) {
        toast.error(result.message || "មិនអាចបង្កើតគណនីបាន");
        return;
      }
      setCreated(true);
      toast.success(result.message || "បង្កើតគណនីបានជោគជ័យ");
    } catch (error) {
      toast.error(errorMessage(error));
    }
  };

  if (created) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
          <h1 className="mt-5 text-2xl font-bold text-[#002455] dark:text-white">បង្កើតគណនីបានជោគជ័យ</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            គណនីរបស់អ្នកត្រូវបានបង្កើត។ ឥឡូវនេះអ្នកអាចចូលតាម Keycloak ដូច flow ចូលប្រើប្រាស់របស់គម្រោង។
          </p>
          <button
            type="button"
            onClick={() => signIn("keycloak", { redirectTo: "/" })}
            className="mt-6 w-full rounded-xl bg-[#002455] px-4 py-3 font-semibold text-white transition hover:bg-[#003a83]"
          >
            ចូលគណនី
          </button>
          <Link href="/" className="mt-4 inline-block text-sm font-medium text-[#002455] hover:underline dark:text-blue-300">
            ត្រឡប់ទៅទំព័រដើម
          </Link>
        </div>
      </div>
    );
  }

  const inputClass =
    "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none transition focus:border-[#002455] focus:ring-3 focus:ring-[#002455]/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white";
  const labelClass = "text-sm font-medium text-slate-700 dark:text-slate-200";

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <section className="mx-auto w-full max-w-xl">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#002455] dark:text-slate-400">
            <ArrowLeft className="h-4 w-4" /> ទំព័រដើម
          </Link>

          <div className="mb-7">
            <h1 className="text-3xl font-extrabold text-[#002455] dark:text-white">បង្កើតគណនី</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              បំពេញព័ត៌មានខាងក្រោមដើម្បីចាប់ផ្តើមរៀនជាមួយ SastraCode។
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                នាមខ្លួន <span className="text-red-500">*</span>
                <input {...register("firstName")} className={inputClass} placeholder="នាមខ្លួន" />
                {errors.firstName && <span className="mt-1 block text-xs text-red-500">{errors.firstName.message}</span>}
              </label>
              <label className={labelClass}>
                នាមត្រកូល <span className="text-red-500">*</span>
                <input {...register("lastName")} className={inputClass} placeholder="នាមត្រកូល" />
                {errors.lastName && <span className="mt-1 block text-xs text-red-500">{errors.lastName.message}</span>}
              </label>
            </div>

            <label className={labelClass}>
              ឈ្មោះអ្នកប្រើ <span className="text-red-500">*</span>
              <input {...register("username")} className={inputClass} placeholder="username" autoComplete="username" />
              {errors.username && <span className="mt-1 block text-xs text-red-500">{errors.username.message}</span>}
            </label>

            <label className={labelClass}>
              អ៊ីមែល <span className="text-red-500">*</span>
              <input {...register("email")} type="email" className={inputClass} placeholder="name@example.com" autoComplete="email" />
              {errors.email && <span className="mt-1 block text-xs text-red-500">{errors.email.message}</span>}
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                ពាក្យសម្ងាត់ <span className="text-red-500">*</span>
                <span className="relative block">
                  <input {...register("password")} type={showPassword ? "text" : "password"} className={`${inputClass} pr-11`} autoComplete="new-password" />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 mt-0.5 -translate-y-1/2 text-slate-400" aria-label="Show password">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </span>
                {errors.password && <span className="mt-1 block text-xs text-red-500">{errors.password.message}</span>}
              </label>
              <label className={labelClass}>
                បញ្ជាក់ពាក្យសម្ងាត់ <span className="text-red-500">*</span>
                <input {...register("confirmPassword")} type={showPassword ? "text" : "password"} className={inputClass} autoComplete="new-password" />
                {errors.confirmPassword && <span className="mt-1 block text-xs text-red-500">{errors.confirmPassword.message}</span>}
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#002455] px-4 text-sm font-semibold text-white transition hover:bg-[#003a83] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "កំពុងបង្កើតគណនី..." : "បង្កើតគណនី"}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            <span>មានគណនីរួចហើយ?</span>
            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          </div>

          <button
            type="button"
            onClick={() => signIn("keycloak", { redirectTo: "/" })}
            className="mt-4 w-full rounded-xl border border-[#002455]/30 px-4 py-3 text-sm font-semibold text-[#002455] transition hover:bg-[#002455]/5 dark:text-blue-300"
          >
            ចូលតាម Keycloak
          </button>
        </section>

        <section className="relative hidden min-h-[520px] items-center justify-center lg:flex" aria-hidden="true">
          <div className="absolute h-[420px] w-[420px] rounded-full border border-dashed border-[#002455]/20" />
          <div className="relative w-[430px] rounded-2xl bg-[#10233f] p-6 shadow-2xl">
            <div className="mb-5 flex gap-2"><span className="h-3 w-3 rounded-full bg-red-400" /><span className="h-3 w-3 rounded-full bg-amber-400" /><span className="h-3 w-3 rounded-full bg-emerald-400" /></div>
            <pre className="overflow-hidden text-sm leading-7 text-blue-100"><code>{`function startLearning() {\n  const learning = true;\n  while (learning) {\n    practice();\n    buildProjects();\n    becomeBetter();\n  }\n}`}</code></pre>
          </div>
          <div className="absolute left-2 top-36 flex items-center gap-2 rounded-xl border bg-white px-4 py-3 shadow-lg"><Code2 className="h-5 w-5 text-blue-500" /><span className="text-xs font-semibold">Playground</span></div>
          <div className="absolute right-1 top-24 flex items-center gap-2 rounded-xl border bg-white px-4 py-3 shadow-lg"><BookOpen className="h-5 w-5 text-emerald-500" /><span className="text-xs font-semibold">Documentation</span></div>
          <div className="absolute right-0 top-[48%] flex items-center gap-2 rounded-xl border bg-white px-4 py-3 shadow-lg"><Bot className="h-5 w-5 text-violet-500" /><span className="text-xs font-semibold">AI Assistant</span></div>
          <div className="absolute right-10 bottom-20 flex items-center gap-2 rounded-xl border bg-white px-4 py-3 shadow-lg"><Map className="h-5 w-5 text-cyan-500" /><span className="text-xs font-semibold">Roadmap</span></div>
        </section>
      </div>
    </main>
  );
}
