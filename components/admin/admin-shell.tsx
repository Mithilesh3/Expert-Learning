"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const adminLinks = [
  { label: "Overview", href: "/admin" },
  { label: "Courses", href: "/admin/courses" },
  { label: "LMS", href: "/admin/lms" },
  { label: "Modules", href: "/admin/lms/modules" },
  { label: "Lessons", href: "/admin/lms/lessons" },
  { label: "Resources", href: "/admin/lms/resources" },
];

export function AdminShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <section className="bg-[#0D1117] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <header className="rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.84)] p-5">
          <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-[#B7C3D9]">{subtitle}</p>
          <nav className="mt-4 flex flex-wrap gap-2">
            {adminLinks.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md border px-3 py-1.5 text-xs font-medium transition",
                    active
                      ? "border-[#4F46E5]/40 bg-[#4F46E5]/15 text-[#7C3AED]"
                      : "border-white/10 bg-white/5 text-[#D8E1F0] hover:border-[#4F46E5]/30",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>
        {children}
      </div>
    </section>
  );
}
