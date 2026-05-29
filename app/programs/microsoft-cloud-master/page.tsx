import Link from "next/link";
import { ArrowRight, Briefcase, Clock3, FolderKanban, GraduationCap, Sparkles } from "lucide-react";
import { CourseEnrollmentAction } from "@/components/enroll/course-enrollment-action";
import { ProgramEnrollmentCta } from "@/components/enroll/program-enrollment-cta";
import { buildMetadata } from "@/lib/metadata";
import { getCheckoutOfferingBySlug, getDisplayPriceByCourseSlug } from "@/lib/offering-catalog";

const certificationTracks = [
  {
    code: "AZ-900",
    title: "Azure Fundamentals",
    level: "Beginner",
    courseSlug: "azure-fundamentals",
    duration: "4 Weeks",
    projects: "2 Guided Labs",
    href: "/checkout/azure-fundamentals",
  },
  {
    code: "AZ-104",
    title: "Azure Administrator",
    level: "Intermediate",
    courseSlug: "azure-administrator",
    duration: "8 Weeks",
    projects: "4 Real-World Labs",
    href: "/enroll/azure-administrator-industrial-training",
  },
  {
    code: "AZ-204",
    title: "Azure Developer Associate",
    level: "Developer",
    courseSlug: "azure-developer-az-204",
    duration: "6 Weeks",
    projects: "2 Build Projects",
    href: "/checkout/azure-developer-az-204",
  },
  {
    code: "AZ-305",
    title: "Azure Solutions Architect",
    level: "Advanced",
    courseSlug: "azure-solutions-architect",
    duration: "6 Weeks",
    projects: "2 Architecture Case Studies",
    href: "/checkout/azure-solutions-architect",
  },
] as const;

const curriculumModules = [
  {
    title: "Module 1 - Azure Fundamentals",
    details: "Cloud concepts, subscriptions, identity basics, security fundamentals, and Azure services overview.",
  },
  {
    title: "Module 2 - Azure Administration",
    details: "Virtual networking, compute, storage, monitoring, governance, and production administration workflows.",
  },
  {
    title: "Module 3 - Azure Development",
    details: "App services, serverless architecture, data integration, API workflows, and deployment pipelines.",
  },
  {
    title: "Module 4 - Cloud Architecture",
    details: "High availability design, cost optimization, reliability patterns, and enterprise landing zone decisions.",
  },
  {
    title: "Module 5 - Real Projects",
    details: "Hands-on capstone projects with reviews, mentorship checkpoints, and interview-aligned implementation.",
  },
] as const;

const careerRoles = ["Cloud Engineer", "Azure Administrator", "Solutions Architect", "DevOps Engineer"] as const;

export const metadata = buildMetadata({
  title: "Microsoft Cloud Master Program | GenZNext Research & Training",
  description:
    "Premium Microsoft Cloud learning path with AZ-900, AZ-104, AZ-204, and AZ-305, including mentorship, projects, LMS access, and certification preparation.",
  path: "/programs/microsoft-cloud-master",
});

export default function MicrosoftCloudMasterProgramPage() {
  const bundle = getCheckoutOfferingBySlug("microsoft-cloud-master-program");
  return (
    <main className="bg-white">
      <section className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] px-4 pb-10 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,1.36fr)_minmax(320px,0.64fr)]">
          <div className="rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C7D2FE] bg-[#EEF2FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#4338CA]">
              <Sparkles className="h-3.5 w-3.5" />
              Microsoft Cloud Track
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-[#0F172A] sm:text-5xl">
              Microsoft Cloud Master Program
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#475569]">
              From Azure Fundamentals to Solutions Architect, this complete Microsoft Cloud path covers AZ-900, AZ-104, AZ-204, and AZ-305 with live labs, real projects, mentorship, LMS access, and certification preparation.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {["Mentorship", "Certification Support", "Internship Projects", "LMS Access"].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 text-xs font-medium text-[#334155]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-[22px] border border-[#E2E8F0] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.10)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64748B]">Bundle Pricing</p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#111827]">{bundle?.price || "Rs. 24,999"}</h2>
              <p className="mt-1 text-sm text-[#94A3B8] line-through">{bundle?.originalPrice || "Rs. 49,999"}</p>
              <p className="mt-3 text-sm font-semibold text-[#4338CA]">Most Popular - Best Value</p>
              <div className="mt-5 grid gap-3 text-sm text-[#475569]">
                <p className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#4F46E5]" />24 Weeks</p>
                <p className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-[#4F46E5]" />Beginner to Advanced</p>
                <p className="flex items-center gap-2"><FolderKanban className="h-4 w-4 text-[#4F46E5]" />10+ Real-World Projects</p>
              </div>
              <div className="mt-6 space-y-3">
                <ProgramEnrollmentCta courseSlug="microsoft-cloud-master-program" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#0F172A]">Individual Certifications</h2>
          <p className="mt-2 text-sm text-[#475569]">Choose individual Microsoft certification tracks or upgrade to the complete bundle.</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {certificationTracks.map((track) => (
              <article key={track.code} className="rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
                <span className="inline-flex rounded-full border border-[#DBEAFE] bg-[#EEF2FF] px-2.5 py-1 text-[11px] font-semibold text-[#4338CA]">
                  {track.code}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-[#0F172A]">{track.title}</h3>
                <p className="mt-2 text-sm text-[#475569]">{track.level}</p>
                <div className="mt-4 space-y-2 text-sm text-[#475569]">
                  <p className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#4F46E5]" />{track.duration}</p>
                  <p className="flex items-center gap-2"><FolderKanban className="h-4 w-4 text-[#4F46E5]" />{track.projects}</p>
                </div>
                <p className="mt-5 text-xl font-bold text-[#111827]">
                  {getDisplayPriceByCourseSlug(track.courseSlug)?.price || "Rs. 0"}
                </p>
                <div className="mt-4">
                  <CourseEnrollmentAction
                    courseSlug={track.courseSlug}
                    checkoutHref={track.href}
                    checkoutLabel="Enroll"
                    checkoutHelperText=""
                    enrolledHelperText=""
                    checkoutButtonClassName="rounded-xl px-4 py-2.5 text-sm"
                    enrolledButtonClassName="rounded-xl px-4 py-2.5 text-sm"
                    helperClassName="hidden"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#0F172A]">Curriculum</h2>
            <div className="mt-5 space-y-3">
              {curriculumModules.map((module) => (
                <details key={module.title} className="group rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-[#0F172A]">
                    {module.title}
                  </summary>
                  <p className="mt-2 text-sm leading-7 text-[#475569]">{module.details}</p>
                </details>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#0F172A]">Career Outcomes</h2>
            <p className="mt-2 text-sm text-[#475569]">Role outcomes aligned with enterprise cloud operations and architecture tracks.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {careerRoles.map((role) => (
                <article key={role} className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
                    <Briefcase className="h-4 w-4 text-[#4F46E5]" />
                    {role}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
