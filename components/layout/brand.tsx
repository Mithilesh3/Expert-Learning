"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

function GradientGzMark({
  width,
  height,
  borderRadius,
  fontSize,
}: {
  width: string;
  height: string;
  borderRadius: string;
  fontSize: string;
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: "linear-gradient(135deg, #f97316, #a78bfa)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontSize,
          fontWeight: 900,
          color: "#ffffff",
          letterSpacing: "-1px",
          fontFamily: "sans-serif",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        GZ
      </span>
    </div>
  );
}

export function Brand({
  className,
  mode = "header",
}: {
  className?: string;
  mode?: "header" | "footer";
}) {
  if (mode === "footer") {
    return (
      <Link
        href="/"
        className={cn("flex min-h-11 shrink-0 cursor-pointer items-center gap-[10px] whitespace-nowrap py-1", className)}
        aria-label="GenZNext Research and Training"
      >
        <GradientGzMark width="38px" height="38px" borderRadius="10px" fontSize="16px" />
        <span className="flex flex-col gap-px">
          <span className="whitespace-nowrap text-[15px] leading-none font-extrabold tracking-[-0.03em] text-[#F1F5F9]">
            Gen<span className="text-[#F97316]">Z</span>Next
          </span>
          <span className="whitespace-nowrap text-[9px] leading-none font-normal tracking-[0.04em] text-[#475569]">
            Research &amp; Training
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn("flex min-h-11 shrink-0 cursor-pointer items-center gap-[10px] whitespace-nowrap py-1", className)}
      aria-label="GenZNext Research and Training"
    >
      <GradientGzMark width="38px" height="38px" borderRadius="10px" fontSize="16px" />
      <span className="flex flex-col gap-px">
        <span className="whitespace-nowrap text-[15px] leading-none font-extrabold tracking-[-0.03em] text-[#F1F5F9]">
          Gen<span className="text-[#F97316]">Z</span>Next
        </span>
        <span className="whitespace-nowrap text-[9px] leading-none font-normal tracking-[0.04em] text-[#475569]">
          Research &amp; Training
        </span>
      </span>
    </Link>
  );
}
