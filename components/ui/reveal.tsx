"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";
import { useMounted } from "@/hooks/use-mounted";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.18 });
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const shouldAnimate = mounted && isInView && !reducedMotion;

  return (
    <div
      ref={ref}
      className={cn(
        "motion-reduce:transform-none motion-reduce:transition-none",
        shouldAnimate && "reveal-enter will-change-transform",
        className,
      )}
      style={shouldAnimate ? { animationDelay: `${delay * 1000}ms` } : undefined}
    >
      {children}
    </div>
  );
}
