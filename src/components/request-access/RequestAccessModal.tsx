"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Lock,
  Clock,
  CheckCircle2,
  Mail,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
  onSuccess?: () => void;
}

export function RequestAccessModal({
  isOpen,
  onClose,
  courseTitle = "ISTAD Web Development Bootcamp",
  onSuccess,
}: RequestAccessModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate ISTAD Email Domain
    if (!email.toLowerCase().endsWith("@istad.edu.kh")) {
      setError("Please enter a valid ISTAD email ending with @istad.edu.kh");
      return;
    }

    setError("");
    setLoading(true);

    // Simulate API Request
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleReset}>
      <DialogContent className="sm:max-w-md border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl">
        {!isSubmitted ? (
          /* STEP 1: Email Verification Form */
          <div className="space-y-5">
            <DialogHeader className="text-left space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <Lock className="h-5 w-5" />
                </div>
                <DialogTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Request Course Access
                </DialogTitle>
              </div>
              <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
                Submit your active ISTAD student email to request permission for{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {courseTitle}
                </span>.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  ISTAD Student Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@istad.edu.kh"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    required
                    className="pl-9 h-11 text-xs rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus-visible:ring-indigo-600"
                  />
                </div>
                {error && (
                  <p className="text-[11px] text-red-500 flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="h-3 w-3" /> {error}
                  </p>
                )}
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-950/50 p-3 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  Approval Timeline:
                </p>
                <p>Requests are reviewed by administrators within 1–3 business days.</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleReset}
                  className="h-10 text-xs rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-10 px-5 text-xs rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all shadow-sm flex items-center gap-2"
                >
                  {loading ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Request <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          /* STEP 2: Pending Approval Confirmation */
          <div className="py-4 text-center space-y-4">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Clock className="h-8 w-8 stroke-[2.2]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Request Submitted!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Your access request for <span className="font-medium text-slate-700 dark:text-slate-300">{email}</span> is currently under review.
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 p-4 text-left text-xs text-amber-800 dark:text-amber-300 space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Next Steps:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] pl-1 text-amber-700/90 dark:text-amber-300/90">
                <li>Check your inbox for approval notifications.</li>
                <li>Once approved, you can return to unlock this course.</li>
              </ul>
            </div>

            <Button
              onClick={handleReset}
              className="w-full h-10 rounded-xl bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white font-semibold text-xs transition-all shadow-sm"
            >
              Done & Return
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}