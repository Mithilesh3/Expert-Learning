import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "gradient" | "navGhost" | "navPrimary" | "amber";
  onClick?: () => void;
};

export function buttonLinkClasses(
  variant: NonNullable<ButtonLinkProps["variant"]> = "primary",
  className?: string,
) {
  return cn(
    "inline-flex touch-manipulation items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-200",
    variant === "primary" &&
      "bg-[linear-gradient(135deg,#2563EB,#3B82F6)] text-white shadow-[0_12px_30px_rgba(37,99,235,0.28),0_0_18px_rgba(96,165,250,0.12)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(37,99,235,0.34),0_0_24px_rgba(96,165,250,0.16)]",
    variant === "secondary" &&
      "border border-white/18 bg-white/6 text-white hover:border-white/28 hover:bg-white/10",
    variant === "outline" &&
      "border border-[#BFDBFE] bg-white text-[#2563EB] shadow-[0_8px_20px_rgba(37,99,235,0.08)] hover:-translate-y-0.5 hover:border-[#60A5FA] hover:bg-[#F0F6FF] hover:shadow-[0_14px_28px_rgba(37,99,235,0.14)]",
    variant === "gradient" &&
      "bg-[linear-gradient(135deg,#2563EB,#3B82F6)] text-white shadow-[0_12px_30px_rgba(37,99,235,0.28),0_0_18px_rgba(96,165,250,0.12)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(37,99,235,0.34),0_0_24px_rgba(96,165,250,0.16)]",
    variant === "navGhost" &&
      "border border-white/16 bg-white/6 px-4 py-2.5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-white/28 hover:bg-white/10",
    variant === "navPrimary" &&
      "bg-[linear-gradient(135deg,#2563EB,#3B82F6)] px-4 py-2.5 text-white shadow-[0_12px_28px_rgba(37,99,235,0.28),0_0_18px_rgba(96,165,250,0.12)] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(37,99,235,0.34),0_0_24px_rgba(96,165,250,0.16)]",
    variant === "amber" &&
      "bg-[linear-gradient(135deg,#2563EB,#3B82F6)] text-white shadow-[0_12px_30px_rgba(37,99,235,0.28),0_0_18px_rgba(96,165,250,0.12)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(37,99,235,0.34),0_0_24px_rgba(96,165,250,0.16)]",
    className,
  );
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  onClick,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={buttonLinkClasses(variant, className)}
    >
      {children}
    </Link>
  );
}
