"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Testimonial = {
  name: string;
  initials: string;
  role: string;
  company: string;
  salaryHike: string;
  review: string;
};

export function TestimonialsCarousel({
  items,
}: {
  items: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [items.length]);

  const active = items[index];

  return (
    <div className="surface-card overflow-hidden rounded-[28px] p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAF2FF] text-[#2563EB]">
          <Quote className="h-6 w-6" />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIndex((current) => (current - 1 + items.length) % items.length)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#DCE9FF] bg-white text-[#0F172A] transition hover:border-[#60A5FA] hover:bg-[#F0F6FF] hover:text-[#2563EB]"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((current) => (current + 1) % items.length)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#DCE9FF] bg-white text-[#0F172A] transition hover:border-[#60A5FA] hover:bg-[#F0F6FF] hover:text-[#2563EB]"
            aria-label="Next testimonial"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active.name}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
          transition={{ duration: reducedMotion ? 0.18 : 0.35, ease: "easeOut" }}
          className="mt-8"
        >
          <p className="text-lg leading-8 text-[#0F172A] sm:text-xl">{active.review}</p>
          <div className="mt-8 flex flex-col gap-5 border-t border-[#E2E8F0] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#2563EB,#3B82F6)] text-sm font-semibold text-white">
                {active.initials}
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0F172A]">{active.name}</div>
                <div className="text-[12px] text-[#64748B]">
                  {active.role} at {active.company}
                </div>
              </div>
            </div>
            <div className="rounded-full border border-[#BFDBFE] bg-[#EAF2FF] px-4 py-2 text-[12px] font-semibold text-[#2563EB]">
              {active.salaryHike}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
