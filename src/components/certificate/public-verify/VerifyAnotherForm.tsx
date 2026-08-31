"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { VERIFICATION_ID_PATTERN } from "./format";

/**
 * Manual fallback for a visitor holding a printed certificate whose QR code
 * will not scan.
 *
 * This navigates to `/student/certificate/verify/{verificationId}` rather than
 * calling a Server Action. Two reasons: the backend's only public lookup key is
 * `verificationId` (there is no verify-by-certificate-number endpoint), and a
 * navigation produces a shareable, bookmarkable result URL — the same one the
 * QR code points at — instead of a result that exists only in component state.
 */
export function VerifyAnotherForm() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Accept a full pasted URL as well as a bare ID — people copy the whole
    // link out of a chat message far more often than they copy the ID alone.
    const raw = value.trim();
    const id = raw.includes("/") ? (raw.split("/").pop() ?? "").trim() : raw;

    if (!VERIFICATION_ID_PATTERN.test(id)) {
      setError(
        "Verification ID មិនត្រឹមត្រូវទេ។ សូមចម្លងលេខកូដទាំងមូលពីវិញ្ញាបនបត្រ។",
      );
      return;
    }

    setError(null);
    router.push(`/student/certificate/verify/${encodeURIComponent(id)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label
        htmlFor="verification-id"
        className="block text-base font-medium text-primary-color/80 dark:text-white/80"
      >
        មានវិញ្ញាបនបត្របោះពុម្ព តែ scan QR មិនបាន? បញ្ចូល Verification ID
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="verification-id"
          name="verificationId"
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (error) setError(null);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "verification-id-error" : undefined}
          placeholder="8ea627978bce4741a8905ae28a641410"
          className="h-12 flex-1 rounded-2xl border-2 border-slate-200 bg-white px-4 font-mono text-base text-primary-color outline-none transition-colors focus:border-primary-color dark:border-slate-800 dark:bg-slate-900 dark:text-white"
        />
        <button
          type="submit"
          disabled={value.trim().length === 0}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary-color px-6 text-base font-bold text-white shadow-md transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <Search className="h-5 w-5" />
          ផ្ទៀងផ្ទាត់
        </button>
      </div>

      {error ? (
        <p
          id="verification-id-error"
          role="alert"
          className="text-base font-medium text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}
