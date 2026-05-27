"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key="page"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
