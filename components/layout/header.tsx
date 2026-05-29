"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Brand } from "@/components/layout/brand";
import { DashboardMenu } from "@/components/layout/dashboard-menu";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const currentPath = pathname ?? "";
  const { isAuthReady, openAuthModal, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAuthed = isAuthReady && Boolean(user);
  const navItems: Array<{ label: string; href: string; match: string[] }> = [
    { label: "Home", href: "/", match: ["/"] },
    {
      label: "Courses",
      href: "/courses",
      match: ["/courses", "/aws", "/azure", "/ai", "/genai", "/devops", "/devsecops"],
    },
    { label: "Programs", href: "/programs", match: ["/programs", "/corporate-training"] },
  ];

  const activeNavLabel = (() => {
    if (currentPath === "/") {
      return "Home";
    }

    if (currentPath === "/programs" || currentPath === "/corporate-training") {
      return "Programs";
    }

    if (
      currentPath === "/courses" ||
      currentPath.startsWith("/courses/") ||
      ["/aws", "/azure", "/ai", "/genai", "/devops", "/devsecops"].includes(currentPath)
    ) {
      return "Courses";
    }

    return "";
  })();

  return (
    <header className="nav-shell sticky top-0 z-50 border-b">
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeNavLabel === item.label;
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-250 ease-out",
                  isActive
                    ? "border border-[#C7D2FE] bg-[#EEF2FF] font-semibold text-[#4338CA] shadow-[0_6px_18px_rgba(79,70,229,0.12)]"
                    : "bg-transparent text-[#475569] hover:bg-[rgba(79,70,229,0.06)] hover:text-[#4F46E5]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2.5 md:flex">
          {isAuthed ? (
            <DashboardMenu />
          ) : (
            <>
              <button
                type="button"
                onClick={() => openAuthModal("login", pathname)}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-[#4F46E5] transition hover:text-[#4338CA]"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => openAuthModal("signup", pathname)}
                className="rounded-xl bg-[linear-gradient(135deg,#6366F1,#4F46E5)] px-4 py-2 text-sm font-semibold text-white transition hover:shadow-[0_10px_24px_rgba(99,102,241,0.18)]"
              >
                Get Started
              </button>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E7EB] text-[#6B7280] transition hover:text-[#111827] md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-[#E5E7EB] bg-white px-4 py-3 md:hidden">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeNavLabel === item.label;
              return (
                <Link
                  key={`mobile-${item.href}-${item.label}`}
                  href={item.href}
                  className={cn(
                    "block rounded-xl px-3 py-2 text-sm transition-all duration-200",
                    isActive
                      ? "border border-[#C7D2FE] bg-[#EEF2FF] font-semibold text-[#4338CA] shadow-[0_6px_18px_rgba(79,70,229,0.10)]"
                      : "text-[#475569] hover:bg-[rgba(79,70,229,0.06)] hover:text-[#4F46E5]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            {!isAuthed ? (
              <>
                <button
                  type="button"
                  onClick={() => openAuthModal("login", pathname)}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA]"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal("signup", pathname)}
                  className="w-full rounded-xl bg-[linear-gradient(135deg,#6366F1,#4F46E5)] px-3 py-2 text-left text-sm font-semibold text-white"
                >
                  Get Started
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
