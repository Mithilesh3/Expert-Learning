"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { logoutToastSessionKey } from "@/hooks/use-secure-logout";

export function LogoutSuccessToast() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const nextMessage = window.sessionStorage.getItem(logoutToastSessionKey);

    if (!nextMessage) {
      return;
    }

    const frame = window.requestAnimationFrame(() => setMessage(nextMessage));
    window.sessionStorage.removeItem(logoutToastSessionKey);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!message) {
      return;
    }

    const timeout = window.setTimeout(() => setMessage(null), 2500);
    return () => window.clearTimeout(timeout);
  }, [message]);

  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="pointer-events-none fixed top-4 right-4 z-[10020] sm:top-6 sm:right-6"
        >
          <div className="pointer-events-auto flex items-center gap-3 rounded-[18px] border border-[rgba(96,165,250,0.2)] bg-[linear-gradient(135deg,rgba(7,20,43,0.96),rgba(11,28,52,0.96))] px-4 py-3 text-sm text-white shadow-[0_18px_36px_rgba(2,8,28,0.32),0_0_24px_rgba(96,165,250,0.12)] backdrop-blur-xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(96,165,250,0.16)] text-[#93C5FD]">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
            <div className="pr-2 text-[13px] font-medium">{message}</div>
            <button
              type="button"
              onClick={() => setMessage(null)}
              className="rounded-full p-1 text-white/60 transition hover:bg-white/8 hover:text-white"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
