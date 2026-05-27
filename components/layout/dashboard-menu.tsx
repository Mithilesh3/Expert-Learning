"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, UserRound, BookOpenCheck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useSecureLogout } from "@/hooks/use-secure-logout";
import { cn } from "@/lib/utils";

type DashboardMenuProps = {
  className?: string;
  buttonClassName?: string;
  panelClassName?: string;
  align?: "left" | "right";
  fullWidth?: boolean;
  onNavigate?: () => void;
};

const dashboardItems = [
  {
    href: "/dashboard/courses",
    label: "My Courses",
    icon: BookOpenCheck,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: UserRound,
  },
] as const;

export function DashboardMenu({
  className,
  buttonClassName,
  panelClassName,
  align = "right",
  fullWidth = false,
  onNavigate,
}: DashboardMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const secureLogout = useSecureLogout();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;

      if (!containerRef.current?.contains(target)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  async function handleLogout() {
    setOpen(false);
    onNavigate?.();
    await secureLogout();
  }

  function handleNavigate(href: string) {
    setOpen(false);
    onNavigate?.();
    router.push(href);
  }

  return (
    <div ref={containerRef} className={cn("relative z-[80] isolate overflow-visible", fullWidth && "w-full", className)}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          "inline-flex items-center gap-2 rounded-[12px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.03)] px-3.5 py-2 text-sm font-medium text-white shadow-[0_0_0_rgba(249,115,22,0)] backdrop-blur-xl transition-all duration-200 hover:border-[rgba(249,115,22,0.28)] hover:bg-[rgba(255,255,255,0.06)] hover:shadow-[0_0_24px_rgba(249,115,22,0.14)]",
          fullWidth && "w-full justify-between",
          buttonClassName,
        )}
      >
        <span>Dashboard</span>
        <ChevronDown className={cn("h-4 w-4 text-[#FDBA74] transition-transform duration-200", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.16, ease: "easeOut" }}
            className={cn(
              "absolute top-[110%] z-[9999] pointer-events-auto",
              fullWidth ? "left-0 right-0" : "min-w-[200px]",
              align === "right" ? "right-0" : "left-0",
            )}
          >
            <div
              role="menu"
              className={cn(
                "overflow-hidden rounded-[18px] border border-[rgba(255,255,255,0.12)] bg-[linear-gradient(180deg,rgba(12,19,35,0.92),rgba(12,19,35,0.82))] p-2 shadow-[0_24px_60px_rgba(2,6,23,0.42)] backdrop-blur-2xl",
                panelClassName,
              )}
            >
              {dashboardItems.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;

                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => handleNavigate(item.href)}
                    role="menuitem"
                    className={cn(
                      "relative z-10 flex w-full cursor-pointer items-center justify-between gap-3 rounded-[12px] px-3.5 py-3 text-left text-sm text-[#D8E1F0] transition-all duration-150 pointer-events-auto",
                      active
                        ? "bg-[rgba(249,115,22,0.12)] text-[#FDBA74]"
                        : "hover:bg-[rgba(249,115,22,0.1)] hover:text-[#FDBA74]",
                    )}
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-55" />
                  </button>
                );
              })}

              <div className="my-2 h-px bg-[rgba(255,255,255,0.08)]" />

              <button
                type="button"
                onClick={() => void handleLogout()}
                role="menuitem"
                className="relative z-10 flex w-full cursor-pointer items-center gap-2.5 rounded-[12px] px-3.5 py-3 text-sm text-[#D8E1F0] transition-all duration-150 pointer-events-auto hover:bg-[rgba(249,115,22,0.1)] hover:text-[#FDBA74]"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
