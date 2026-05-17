"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Brand({
  className,
  compact = false,
  dark = false,
}: {
  className?: string;
  compact?: boolean;
  dark?: boolean;
}) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <Link
      href="/"
      className={cn(
        "flex min-w-0 items-center gap-3",
        compact ? "w-auto" : "w-full max-w-[232px]",
        className,
      )}
    >
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-brand-blue to-brand-blue-bright text-sm font-bold text-white">
        {!logoFailed && (
          <Image
            src="/logo.png"
            alt="GenZNext logo"
            fill
            sizes="40px"
            className="object-contain"
            priority
            onError={() => setLogoFailed(true)}
          />
        )}
        <span className={cn("relative z-[1] tracking-[0.06em]", logoFailed ? "opacity-100" : "opacity-0")}>GZ</span>
      </div>
      {!compact && (
        <div className="min-w-0 self-center">
          <div
            className={cn(
              "text-[13px] font-semibold uppercase leading-none tracking-[0.04em]",
              dark ? "text-white" : "text-brand-text",
            )}
          >
            GENZNE<span className={dark ? "text-brand-blue-light" : "text-brand-blue"}>XT</span>
          </div>
          <div
            className={cn(
              "mt-1 text-[10px] font-medium leading-none",
              dark ? "text-white/45" : "text-brand-muted",
            )}
          >
            Research &amp; Training
          </div>
        </div>
      )}
    </Link>
  );
}
