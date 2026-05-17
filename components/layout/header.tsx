"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { courseCategories } from "@/data/courses";
import { navCourseLinks } from "@/data/site";
import { Brand } from "@/components/layout/brand";
import { ButtonLink, buttonLinkClasses } from "@/components/ui/button-link";
import { useAuth } from "@/hooks/use-auth";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const primaryLinks: Array<{ label: string; href: string; hasMenu?: boolean }> = [
  { label: "Courses", href: "/courses", hasMenu: true },
  ...navCourseLinks,
  { label: "Corporate Training", href: "/corporate-training" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const { isAuthReady, openAuthModal, signOutUser, user } = useAuth();

  const rightSideAuthed = isAuthReady && Boolean(user);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="nav-shell flex min-h-[68px] items-center justify-between rounded-[18px] px-4 py-2.5 sm:px-6">
          <div className="min-w-0 shrink-0 xl:basis-[232px]">
            <Brand dark />
          </div>
          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1.5 px-6 xl:flex">
            <div className="group relative">
              <Link
                href="/courses"
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-[13px] leading-none transition-all duration-200 hover:bg-white/6",
                  pathname.startsWith("/courses")
                    ? "bg-white/7 font-medium text-brand-blue-bright"
                    : "text-white/75 hover:text-white",
                )}
              >
                Courses
                <ChevronDown className="h-4 w-4" />
              </Link>
              <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-[760px] -translate-x-1/2 translate-y-2 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                <div className="glass-panel-dark rounded-2xl p-5 shadow-[0_26px_60px_rgba(2,8,28,0.34)]">
                  <div className="mb-4 flex items-end justify-between gap-6">
                    <div>
                      <div className="section-label">Programs</div>
                      <div className="mt-1 text-lg font-semibold text-white">
                        Cloud, AI, and DevOps pathways
                      </div>
                    </div>
                    <Link href="/courses" className="text-sm font-medium text-brand-blue-light hover:text-white">
                      View all courses
                    </Link>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {courseCategories.map((category) => (
                      <Link
                        key={category.key}
                        href={category.href}
                        className="surface-card group rounded-[12px] p-4 transition hover:-translate-y-0.5 hover:border-brand-blue"
                      >
                        <div className={cn("h-[3px] w-full rounded-t-[12px] bg-gradient-to-r", category.gradient)} />
                        <div className="mt-4 text-sm font-semibold text-brand-text">{category.title}</div>
                        <p className="mt-2 text-xs leading-6 text-brand-muted">{category.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {primaryLinks
              .filter((item) => !item.hasMenu)
              .map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                      className={cn(
                      "rounded-md px-3.5 py-2 text-[13px] leading-none transition-all duration-200 hover:bg-white/6",
                      active ? "bg-white/7 font-medium text-brand-blue-bright" : "text-white/75 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
          </nav>
          <div className="hidden shrink-0 items-center justify-end gap-2.5 xl:flex xl:basis-[214px]">
            {rightSideAuthed ? (
              <>
                <ButtonLink href="/dashboard" variant="navGhost" className="min-w-[94px]">
                  Dashboard
                </ButtonLink>
                <button
                  type="button"
                  onClick={() => void signOutUser()}
                  className={buttonLinkClasses("navPrimary", "min-w-[98px]")}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuthModal("login", "/dashboard")}
                  className={buttonLinkClasses("navGhost", "min-w-[88px]")}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal("signup", "/dashboard")}
                  className={buttonLinkClasses("navPrimary", "min-w-[102px]")}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-white/8 text-white xl:hidden"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: reducedMotion ? 0.12 : 0.2, ease: "easeOut" }}
            className="mt-3 rounded-[18px] border border-brand-blue/30 bg-brand-navy px-4 py-4 shadow-[0_22px_48px_rgba(0,33,92,0.22)] xl:hidden"
          >
              <div className="mb-3 flex items-center justify-between border-b border-white/12 pb-3">
                <div className="section-label text-brand-blue-light">Navigation</div>
                <div className="text-[11px] uppercase tracking-[0.08em] text-white/45">Programs</div>
              </div>
              <div className="space-y-1.5">
                {primaryLinks.map((item) => {
                  const active =
                    item.href === "/courses" ? pathname.startsWith("/courses") : pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-lg px-3 py-2.5 text-sm transition-colors",
                        active ? "bg-white/10 font-medium text-brand-blue-light" : "text-white/78 hover:bg-white/6 hover:text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {rightSideAuthed ? (
                  <>
                    <ButtonLink href="/dashboard" variant="navGhost" className="w-full" onClick={() => setMobileOpen(false)}>
                      Dashboard
                    </ButtonLink>
                    <button
                      type="button"
                      onClick={() => {
                        void signOutUser();
                        setMobileOpen(false);
                      }}
                      className={buttonLinkClasses("navPrimary", "w-full")}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        openAuthModal("login", "/dashboard");
                        setMobileOpen(false);
                      }}
                      className={buttonLinkClasses("navGhost", "w-full")}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        openAuthModal("signup", "/dashboard");
                        setMobileOpen(false);
                      }}
                      className={buttonLinkClasses("navPrimary", "w-full")}
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
