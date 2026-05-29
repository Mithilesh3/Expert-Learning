"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const popupDelayMs = 2400;

export function SummerTrainingPopup() {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const router = useRouter();
  const { isAuthReady } = useAuth();

  function handleClose() {
    setOpen(false);
  }

  function handleEnrollClick() {
    if (!isAuthReady) {
      return;
    }
    handleClose();
    router.push("/enroll/azure-administrator-industrial-training");
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOpen(true);
    }, popupDelayMs);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.12 : 0.22 }}
          className="fixed inset-0 z-[180] flex items-end justify-center bg-[rgba(15,23,42,0.45)] px-4 py-5 backdrop-blur-sm sm:items-center sm:px-6"
          onClick={handleClose}
        >
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: reducedMotion ? 0.12 : 0.26, ease: "easeOut" }}
            className="relative w-full max-w-[980px] overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:p-7"
            onClick={(event) => event.stopPropagation()}
            onPointerDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="summer-training-popup-title"
          >
            <button
              type="button"
              onClick={handleClose}
              onPointerDown={(event) => event.stopPropagation()}
              className="absolute top-4 right-4 z-20 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-slate-500 shadow-sm transition hover:bg-[#F8FAFC] hover:text-slate-700"
              aria-label="Close Summer Training popup"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            <div className="relative z-10 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="rounded-[22px] border border-[#E5E7EB] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.06)] sm:p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#C7D2FE] bg-[#EEF2FF] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4338CA]">
                  <Sparkles className="h-3.5 w-3.5" />
                  AZ-104 Summer Batch 2026
                </div>

                <h2
                  id="summer-training-popup-title"
                  className="mt-4 text-[30px] font-bold leading-[1.12] tracking-[-0.03em] text-[#111827] sm:text-[36px]"
                >
                  Azure Administrator Industrial Training
                </h2>

                <p className="mt-3 max-w-[62ch] text-[14px] leading-7 text-[#374151] sm:text-[15px]">
                  6 weeks of guided Azure training with live labs, project-based practice, internship support, and certification-focused mentorship.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["Live Labs", "Internship Support", "Project Based", "Certification Ready"].map((tag) => (
                    <div
                      key={tag}
                      className="rounded-full border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-1.5 text-[12px] font-medium text-[#374151]"
                    >
                      {tag}
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {[
                    ["Duration", "8 Weeks"],
                    ["Level", "Intermediate"],
                    ["Mode", "Live + Labs"],
                    ["Support", "Career + Cert"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 shadow-[0_6px_16px_rgba(15,23,42,0.04)]">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">{label}</p>
                      <p className="mt-1 text-xs font-semibold text-[#111827]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="rounded-[22px] border border-[#E5E7EB] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)] sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4F46E5]">Summer Training Offer</p>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-3xl font-bold tracking-[-0.02em] text-[#111827]">₹8,999</span>
                  <span className="text-sm text-[#6B7280] line-through">₹13,999</span>
                </div>
                <p className="mt-1 text-xs font-medium text-emerald-600">Save ₹5,000</p>

                <div className="mt-4 space-y-2 text-sm text-[#374151]">
                  <p><span className="text-[#6B7280]">Duration:</span> 8 Weeks</p>
                  <p><span className="text-[#6B7280]">Level:</span> Intermediate</p>
                  <p><span className="text-[#6B7280]">Track:</span> Azure Administrator (AZ-104)</p>
                </div>

                <button
                  type="button"
                  onClick={handleEnrollClick}
                  className="mt-5 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#6366F1,#4F46E5)] px-5 py-3 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(79,70,229,0.3)]"
                >
                  Enroll Now
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>

              </aside>
            </div>

          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
