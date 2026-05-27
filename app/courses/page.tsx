import Link from "next/link";
import {
  IconArrowRight,
  IconBrain,
  IconBrandAzure,
  IconCloud,
  IconSettingsAutomation,
} from "@tabler/icons-react";
import { buildMetadata } from "@/lib/metadata";
import { coursesByCategory, type CourseCategoryKey } from "@/data/courses";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type CategoryCard = {
  key: CourseCategoryKey;
  title: string;
  description: string;
  href: string;
  badge: string;
  accent: {
    hover: string;
    icon: string;
    badge: string;
  };
  Icon: typeof IconCloud;
};

type ShortcutCard = {
  title: string;
  description: string;
  href: string;
  iconLabel: string;
};

const categoryCards: CategoryCard[] = [
  {
    key: "aws",
    title: "AWS Courses",
    description: "Certification pathways for cloud foundations, architecture, operations, and DevOps delivery.",
    href: "/courses/aws",
    badge: "5 Programs",
    accent: {
      hover: "hover:border-[rgba(249,115,22,0.3)] hover:bg-[rgba(249,115,22,0.04)]",
      icon: "border-[rgba(249,115,22,0.2)] bg-[rgba(249,115,22,0.12)] text-[#F97316]",
      badge: "bg-[rgba(249,115,22,0.1)] text-[#FB923C]",
    },
    Icon: IconCloud,
  },
  {
    key: "azure",
    title: "Azure Courses",
    description: "Microsoft-aligned certification tracks across administration, security, DevOps, and architecture.",
    href: "/courses/azure",
    badge: "5 Programs",
    accent: {
      hover: "hover:border-[rgba(59,130,246,0.3)] hover:bg-[rgba(59,130,246,0.04)]",
      icon: "border-[rgba(59,130,246,0.2)] bg-[rgba(59,130,246,0.12)] text-[#60A5FA]",
      badge: "bg-[rgba(59,130,246,0.1)] text-[#60A5FA]",
    },
    Icon: IconBrandAzure,
  },
  {
    key: "ai",
    title: "AI Courses",
    description: "Modern AI programs covering machine learning, Generative AI, MLOps, and analytics applications.",
    href: "/courses/ai",
    badge: "4 Programs",
    accent: {
      hover: "hover:border-[rgba(139,92,246,0.3)] hover:bg-[rgba(139,92,246,0.04)]",
      icon: "border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.12)] text-[#A78BFA]",
      badge: "bg-[rgba(139,92,246,0.1)] text-[#A78BFA]",
    },
    Icon: IconBrain,
  },
  {
    key: "devops",
    title: "DevOps Courses",
    description: "Hands-on DevOps pathways for containers, CI/CD, monitoring, automation, and platform workflows.",
    href: "/courses/devops",
    badge: "4 Programs",
    accent: {
      hover: "hover:border-[rgba(16,185,129,0.3)] hover:bg-[rgba(16,185,129,0.04)]",
      icon: "border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.12)] text-[#34D399]",
      badge: "bg-[rgba(16,185,129,0.1)] text-[#34D399]",
    },
    Icon: IconSettingsAutomation,
  },
];

const shortcutCards: ShortcutCard[] = [
  {
    title: "Summer Training 2026",
    description: "Live classes and July batch access",
    href: "/enroll/azure-administrator",
    iconLabel: "ST",
  },
  {
    title: "Corporate Training",
    description: "Team upskilling and enterprise plans",
    href: "/corporate-training",
    iconLabel: "CT",
  },
  {
    title: "All Certifications",
    description: "Browse every cloud and AI pathway",
    href: "/courses",
    iconLabel: "AC",
  },
];

export const metadata = buildMetadata({
  title: "Courses | GenZNext Research & Training",
  description:
    "Explore compact category dashboards for AWS, Azure, AI, DevOps, and Summer Training programs.",
  path: "/courses",
});

export default function CoursesPage() {
  return (
    <section className="relative overflow-hidden bg-[#0D1117] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:44px_44px]" />
        <div className="absolute top-[-180px] right-[-120px] h-[480px] w-[480px] bg-[radial-gradient(circle,rgba(249,115,22,0.12)_0%,transparent_68%)]" />
        <div className="absolute bottom-[-120px] left-[-90px] h-[360px] w-[360px] bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_72%)]" />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
            <div className="grid gap-3 md:grid-cols-2">
              {categoryCards.map((item) => {
                const courses = coursesByCategory[item.key];

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex min-h-[236px] flex-col gap-[10px] rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-[16px] text-left shadow-[0_24px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-1",
                      item.accent.hover,
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn("flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] border", item.accent.icon)}>
                        <item.Icon size={19} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[15px] font-semibold text-[#F8FAFC]">{item.title}</div>
                        <p className="mt-1.5 text-[12px] leading-[1.55] text-[#94A3B8]">{item.description}</p>
                      </div>
                    </div>

                    <div className="mt-1 grid gap-1.5">
                      {courses.map((course, index) => (
                        <div key={course.slug} className="flex items-center gap-2">
                          <span className={cn("h-1.5 w-1.5 rounded-full", index === 0 ? "bg-[#F97316]" : "bg-[#334155]")} />
                          <span className={cn("line-clamp-1 text-[11px]", index === 0 ? "text-[#CBD5E1]" : "text-[#64748B]")}>
                            {course.title}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <span className={cn("rounded-full px-2.5 py-[4px] text-[10px] font-medium", item.accent.badge)}>{item.badge}</span>
                      <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#E2E8F0] transition group-hover:text-white">
                        Open Track
                        <IconArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <Link
              href="/enroll/azure-administrator"
              className="group flex min-h-[236px] flex-col rounded-[18px] border border-[rgba(249,115,22,0.18)] bg-[linear-gradient(135deg,rgba(249,115,22,0.08),rgba(59,130,246,0.06))] p-[18px] shadow-[0_24px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(249,115,22,0.3)] hover:bg-[linear-gradient(135deg,rgba(249,115,22,0.1),rgba(59,130,246,0.08))]"
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F97316]">Summer Special</div>
              <div className="mt-3 text-[18px] font-semibold text-[#F8FAFC]">Summer Training 2026</div>
              <p className="mt-3 text-[12px] leading-[1.65] text-[#CBD5E1]">
                Live mentor-led training with practical cloud labs, internship support, and project-driven learning.
              </p>

              <div className="mt-5 space-y-2 text-[11px]">
                <div className="text-[#34D399]">+ Azure Administrator (AZ-104)</div>
                <div className="text-[#34D399]">+ Internship and certification support</div>
                <div className="text-[#94A3B8]">+ Compact premium learner journey</div>
              </div>

              <div className="mt-auto inline-flex items-center gap-1 pt-6 text-[12px] font-semibold text-[#F8FAFC] transition group-hover:text-white">
                Register for Summer Batch
                <IconArrowRight size={14} />
              </div>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {shortcutCards.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-[10px] rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-[14px] py-3 text-left shadow-[0_16px_36px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.14)] hover:bg-[rgba(255,255,255,0.05)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[rgba(255,255,255,0.05)] text-[11px] font-semibold tracking-[0.12em] text-[#CBD5E1]">
                  {item.iconLabel}
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-medium text-[#E2E8F0]">{item.title}</span>
                  <span className="mt-1 block text-[11px] text-[#64748B]">{item.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
