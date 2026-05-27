"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { DashboardMenu } from "@/components/layout/dashboard-menu";
import { allCourses } from "@/data/courses";
import { cn } from "@/lib/utils";

function getRouteCourseSlug(pathname: string) {
  if (pathname === "/dashboard/courses" || pathname === "/dashboard/profile") {
    return null;
  }

  const dashboardMatch = pathname.match(/^\/dashboard\/([^/]+)$/);

  if (dashboardMatch?.[1]) {
    return decodeURIComponent(dashboardMatch[1]);
  }

  const learnMatch = pathname.match(/^\/learn\/([^/]+)/);

  if (learnMatch?.[1]) {
    return decodeURIComponent(learnMatch[1]);
  }

  const courseLearnMatch = pathname.match(/^\/courses\/[^/]+\/([^/]+)\/learn(?:\/|$)/);

  if (courseLearnMatch?.[1]) {
    return decodeURIComponent(courseLearnMatch[1]);
  }

  const portalMatch = pathname.match(/^\/portal\/([^/]+)/);

  if (portalMatch?.[1]) {
    return decodeURIComponent(portalMatch[1]);
  }

  return null;
}

function LmsBrand() {
  return (
    <Link href="/dashboard/courses" className="flex shrink-0 items-center gap-2.5" aria-label="GenZNext Learning Portal">
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "7px",
          background: "linear-gradient(135deg, #f97316, #a78bfa)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: "12px",
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
      <span className="flex flex-col leading-none">
        <span className="text-[13px] font-bold text-[#f1f5f9]">
          Gen<span className="text-[#f97316]">Z</span>Next
        </span>
        <span className="text-[8px] text-[#64748b]">Research &amp; Training</span>
      </span>
    </Link>
  );
}

export function LmsNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const currentCourseSlug = useMemo(() => getRouteCourseSlug(pathname), [pathname]);
  const currentCourse = useMemo(
    () => allCourses.find((course) => course.slug === currentCourseSlug),
    [currentCourseSlug],
  );
  const currentSectionLabel =
    pathname === "/dashboard/courses" ? "My Courses" : pathname === "/dashboard/profile" ? "Profile" : currentCourse?.title || "Dashboard";

  return (
    <header className="border-b border-[#334155] bg-[#1e293b]">
      <div className="mx-auto flex h-[52px] w-full items-center justify-between gap-3 px-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <LmsBrand />
          <div className="hidden h-[18px] w-px bg-[#334155] sm:block" aria-hidden="true" />
          <div className="hidden min-w-0 items-center text-[12px] sm:flex">
            <span className="truncate text-[#94a3b8]">Learning Portal</span>
            <span className="px-1.5 text-[#475569]">/</span>
            <span className="truncate font-medium text-[#f1f5f9]">{currentSectionLabel}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Notifications"
            className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-[#334155] bg-[rgba(255,255,255,0.05)] text-[#64748b] transition hover:text-[#f1f5f9]"
          >
            <Bell className="h-4 w-4" />
          </button>
          <DashboardMenu buttonClassName={cn("h-[30px] rounded-[9px] px-3 py-1.5 text-[12px]")} />
          <button
            type="button"
            onClick={() => router.push("/")}
            className="inline-flex items-center rounded-[7px] border border-[#334155] bg-[rgba(255,255,255,0.05)] px-3 py-1.5 text-[11px] text-[#94a3b8] transition hover:text-[#f1f5f9]"
          >
            {"← Back to Main Site"}
          </button>
        </div>
      </div>
    </header>
  );
}

