"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  FileText,
  GraduationCap,
  Info,
  Loader2,
  Send,
  Upload,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import type { InstructorApplicationResponse } from "@/types/instructor-application";

import {
  useSubmitInstructorApplicationMutation,
  useUploadInstructorCvMutation,
} from "@/redux/service/instructor-application-api";

import {
  CV_ACCEPT,
  EXPERTISE_MAX_LENGTH,
  getApiErrorMessage,
  getFieldErrors,
} from "@/components/instructor-application/instructor-application-utils";

// Frontend validation mirrors the backend contract for `expertise`:
//   @NotBlank @Size(max = 2000)
// `cvFileId` (@NotNull) is produced by the file upload and checked on submit,
// the same way the existing avatar upload is handled outside RHF.
const applicationSchema = z.object({
  expertise: z
    .string()
    .trim()
    .min(1, "សូមបញ្ចូលជំនាញ និងបទពិសោធន៍របស់លោកអ្នក។")
    .max(
      EXPERTISE_MAX_LENGTH,
      `ជំនាញមិនអាចលើសពី ${EXPERTISE_MAX_LENGTH} តួអក្សរឡើយ។`,
    ),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface InstructorApplicationFormProps {
  mode?: "create" | "resubmit";
  defaultExpertise?: string;
  onSubmitted?: (application: InstructorApplicationResponse) => void;
  onCancel?: () => void;
}

export function InstructorApplicationForm({
  mode = "create",
  defaultExpertise = "",
  onSubmitted,
  onCancel,
}: InstructorApplicationFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [expertiseLength, setExpertiseLength] = useState(defaultExpertise.length);

  const [cvFileId, setCvFileId] = useState<string | null>(null);
  const [cvName, setCvName] = useState<string | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);

  const [uploadCv, { isLoading: isUploading }] = useUploadInstructorCvMutation();
  const [submitApplication, { isLoading: isSubmitting }] =
    useSubmitInstructorApplicationMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { expertise: defaultExpertise },
  });

  const expertiseField = register("expertise");
  const busy = isUploading || isSubmitting;

  const resetCv = () => {
    setCvFileId(null);
    setCvName(null);
    setCvError(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);

    if (!isPdf) {
      setCvError("សូមជ្រើសរើសឯកសារជាទម្រង់ PDF ប៉ុណ្ណោះ។");
      setCvName(null);
      setCvFileId(null);
      event.target.value = "";
      return;
    }

    setCvName(file.name);
    setCvError(null);
    setCvFileId(null);

    try {
      const uploaded = await uploadCv(file).unwrap();

      if (!uploaded?.id) {
        throw new Error("Upload response did not include a file id.");
      }

      setCvFileId(uploaded.id);
    } catch (error) {
      console.error("CV upload failed:", error);

      const message =
        getApiErrorMessage(error) ??
        "មិនអាចផ្ទុកឯកសារ CV បានទេ។ សូមព្យាយាមម្ដងទៀត។";

      setCvError(message);
      setCvName(null);
      setCvFileId(null);
      toast.error(message);
    } finally {
      event.target.value = "";
    }
  };

  const onSubmit = async (values: ApplicationFormValues) => {
    if (isUploading) {
      setCvError("សូមរង់ចាំការផ្ទុក CV ឲ្យរួចរាល់ជាមុនសិន។");
      return;
    }

    if (!cvFileId) {
      setCvError("សូមផ្ទុកឯកសារ CV របស់លោកអ្នកជាមុនសិន។");
      return;
    }

    try {
      const application = await submitApplication({
        expertise: values.expertise.trim(),
        cvFileId,
      }).unwrap();

      toast.success(
        mode === "resubmit"
          ? "ពាក្យសុំរបស់លោកអ្នកត្រូវបានដាក់ស្នើឡើងវិញដោយជោគជ័យ។"
          : "ពាក្យសុំរបស់លោកអ្នកត្រូវបានដាក់ស្នើដោយជោគជ័យ។",
      );

      onSubmitted?.(application);
    } catch (error) {
      console.error("Submit instructor application failed:", error);

      const fieldErrors = getFieldErrors(error);
      let mapped = false;

      if (fieldErrors.expertise) {
        setError("expertise", { message: fieldErrors.expertise });
        mapped = true;
      }

      if (fieldErrors.cvFileId) {
        setCvError(fieldErrors.cvFileId);
        mapped = true;
      }

      toast.error(
        getApiErrorMessage(error) ??
          (mapped
            ? "សូមពិនិត្យ និងកែតម្រូវព័ត៌មានក្នុងទម្រង់ឡើងវិញ។"
            : "មិនអាចដាក់ស្នើពាក្យសុំបានទេ។ សូមព្យាយាមម្ដងទៀត។"),
      );
    }
  };

  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-100 px-6 py-5 dark:border-slate-800 sm:px-8">
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
          <GraduationCap className="h-5 w-5 text-primary-color" />
          {mode === "resubmit"
            ? "ដាក់ស្នើពាក្យសុំធ្វើជាគ្រូបង្រៀនឡើងវិញ"
            : "ដាក់ពាក្យធ្វើជាគ្រូបង្រៀន"}
        </h2>

        <p className="mt-1 text-lg text-slate-500">
          សូមចែករំលែកជំនាញរបស់លោកអ្នក ហើយភ្ជាប់ប្រវត្តិរូបសង្ខេប (CV) ជាទម្រង់ PDF ដើម្បីឲ្យក្រុមការងារធ្វើការត្រួតពិនិត្យ។
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-8 p-6 sm:p-8"
      >
        {/* Expertise ------------------------------------------------------- */}
        <div className="space-y-2">
          <label
            htmlFor="expertise"
            className="flex items-center gap-2 text-lg font-semibold text-slate-700 dark:text-slate-200"
          >
            <GraduationCap className="h-4 w-4 text-slate-400" />
            ជំនាញ និងបទពិសោធន៍{" "}
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          </label>

          <textarea
            id="expertise"
            aria-required="true"
            aria-invalid={errors.expertise ? "true" : "false"}
            maxLength={EXPERTISE_MAX_LENGTH}
            placeholder="ឧ. Java Spring Boot, React, DevOps... ព្រមទាំងបទពិសោធន៍បង្រៀន ឬគម្រោងពាក់ព័ន្ធ"
            className="min-h-40 w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-lg text-slate-800 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white aria-[invalid=true]:border-red-400"
            {...expertiseField}
            onChange={(event) => {
              setExpertiseLength(event.target.value.length);
              void expertiseField.onChange(event);
            }}
          />

          <div className="flex items-center justify-between">
            <p className="text-lg text-red-500">
              {errors.expertise?.message ?? ""}
            </p>

            <p className="text-right text-lg text-slate-400">
              {expertiseLength} / {EXPERTISE_MAX_LENGTH}
            </p>
          </div>
        </div>

        {/* CV upload ----------------------------------------------------- */}
        <div className="space-y-2">
          <span className="flex items-center gap-2 text-lg font-semibold text-slate-700 dark:text-slate-200">
            <FileText className="h-4 w-4 text-slate-400" />
            ឯកសារ CV (PDF){" "}
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          </span>

          <input
            ref={fileInputRef}
            type="file"
            accept={CV_ACCEPT}
            aria-label="ជ្រើសរើសឯកសារ CV ជា PDF"
            onChange={handleFileSelect}
            className="hidden"
          />

          {cvName ? (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
              <div className="flex min-w-0 items-center gap-3">
                {isUploading ? (
                  <Loader2 className="h-5 w-5 shrink-0 animate-spin text-primary-color" />
                ) : cvFileId ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                ) : (
                  <FileText className="h-5 w-5 shrink-0 text-primary-color" />
                )}

                <div className="min-w-0">
                  <p className="truncate text-lg font-medium text-slate-800 dark:text-slate-100">
                    {cvName}
                  </p>

                  <p className="text-sm text-slate-400">
                    {isUploading
                      ? "កំពុងផ្ទុក..."
                      : cvFileId
                        ? "ផ្ទុកបានជោគជ័យ"
                        : "មិនទាន់ផ្ទុក"}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={busy}
                  className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-primary-color transition hover:bg-violet-50 disabled:opacity-50 dark:hover:bg-violet-500/10"
                >
                  ប្ដូរ
                </button>

                <button
                  type="button"
                  onClick={resetCv}
                  disabled={busy}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600 disabled:opacity-50 dark:hover:bg-slate-800"
                  aria-label="ដកឯកសារ CV ចេញ"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={busy}
              className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 px-4 py-8 text-slate-500 transition hover:border-violet-400 hover:bg-violet-50/50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-violet-500"
            >
              <Upload className="h-6 w-6" />
              <span className="text-lg font-medium">
                ចុចដើម្បីផ្ទុកឯកសារ CV (PDF)
              </span>
            </button>
          )}

          <p className="text-lg text-red-500">{cvError ?? ""}</p>
        </div>

        <div
          role="alert"
          className="flex gap-3 rounded-2xl border border-violet-100 bg-violet-50 p-4 text-lg text-slate-600 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-slate-300"
        >
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary-color" />

          <p>
            ក្រុមការងារនឹងធ្វើការត្រួតពិនិត្យពាក្យសុំរបស់លោកអ្នក ហើយស្ថានភាព (កំពុងរង់ចាំ / បានអនុម័ត / បានបដិសេធ) នឹងបង្ហាញនៅទំព័រនេះ។
          </p>
        </div>

        <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-6 sm:flex-row dark:border-slate-800">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              disabled={busy}
              onClick={onCancel}
              className="h-11 rounded-xl px-6"
            >
              <X className="mr-2 h-4 w-4" />
              បោះបង់
            </Button>
          )}

          <Button
            type="submit"
            disabled={busy}
            className="h-11 rounded-xl bg-primary-color px-6 text-white hover:bg-primary-color/90 dark:bg-primary-color/90 dark:hover:bg-primary-color"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            {isUploading
              ? "កំពុងផ្ទុក CV..."
              : isSubmitting
                ? "កំពុងដាក់ស្នើ..."
                : mode === "resubmit"
                  ? "ដាក់ស្នើឡើងវិញ"
                  : "ដាក់ស្នើពាក្យសុំ"}
          </Button>
        </div>
      </form>
    </section>
  );
}
