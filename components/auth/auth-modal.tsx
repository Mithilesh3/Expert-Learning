"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { PhoneAuthFlow } from "@/components/auth/phone-auth-flow";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useAuth } from "@/hooks/use-auth";

export function AuthModal() {
  const { closeAuthModal, isModalOpen, modalMode, redirectAfterAuth } = useAuth();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isModalOpen]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.12 : 0.2 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(7,26,82,0.52)] px-4 py-6 backdrop-blur-md"
          onClick={closeAuthModal}
        >
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: reducedMotion ? 0.12 : 0.24, ease: "easeOut" }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[30px] border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,249,255,0.98))] p-6 shadow-[0_28px_80px_rgba(7,26,82,0.24)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeAuthModal}
              className="absolute top-5 right-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE9FF] bg-white text-[#64748B] transition hover:border-[#BFDBFE] hover:bg-[#F8FBFF] hover:text-[#2563EB]"
              aria-label="Close authentication modal"
            >
              <X className="h-[18px] w-[18px]" />
            </button>
            <PhoneAuthFlow
              key={modalMode}
              mode={modalMode}
              variant="modal"
              redirectTo={redirectAfterAuth}
              onClose={closeAuthModal}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
