import Link from "next/link";
import { ArrowRight, Briefcase, Clock3, FolderKanban, GraduationCap, Sparkles } from "lucide-react";
import { CourseEnrollmentAction } from "@/components/enroll/course-enrollment-action";
import { ProgramEnrollmentCta } from "@/components/enroll/program-enrollment-cta";
import { buildMetadata } from "@/lib/metadata";
import { getCheckoutOfferingBySlug, getDisplayPriceByCourseSlug } from "@/lib/offering-catalog";

const certificationTracks = [
  {
    code: "CLF-C02",
    title: "AWS Cloud Practitioner",
    level: "Beginner",
    courseSlug: "aws-cloud-practitioner",
    duration: "4 Weeks",
    includes: ["Cloud basics", "AWS core services", "Billing & pricing", "Beginner projects"],
    href: "/checkout/aws-cloud-practitioner",
  },
  {
    code: "SAA-C03",
    title: "AWS Solutions Architect Associate",
    level: "Intermediate",
    courseSlug: "aws-solutions-architect",
    duration: "8 Weeks",
    includes: ["EC2", "VPC", "IAM", "Storage", "Architecture labs"],
    href: "/checkout/aws-solutions-architect",
  },
  {
    code: "DVA-C02",
    title: "AWS Developer Associate",
    level: "Developer",
    courseSlug: "aws-developer-associate",
    duration: "6 Weeks",
    includes: ["Lambda", "API Gateway", "DynamoDB", "CI/CD", "Serverless projects"],
    href: "/checkout/aws-developer-associate",
  },
  {
    code: "SOA-C02",
    title: "AWS SysOps Administrator",
    level: "Advanced",
    courseSlug: "aws-devops-engineer",
    duration: "6 Weeks",
    includes: ["Monitoring", "Automation", "Scaling", "Infrastructure operations"],
    href: "/checkout/aws-devops-engineer",
  },
] as const;

const curriculumModules = [
  "Module 1 - AWS Fundamentals",
  "Module 2 - AWS Architecture",
  "Module 3 - Serverless Development",
  "Module 4 - SysOps & Monitoring",
  "Module 5 - Real-world AWS Projects",
] as const;

const projectHighlights = [
  "AWS Web Hosting",
  "Serverless API",
  "Cloud Monitoring Dashboard",
  "CI/CD Deployment Pipeline",
  "Secure VPC Architecture",
] as const;

const careerRoles = ["AWS Cloud Engineer", "Solutions Architect", "DevOps Engineer", "Cloud Administrator"] as const;

export const metadata = buildMetadata({
  title: "AWS Cloud Master Program | GenZNext Research & Training",
  description:
    "Complete AWS cloud learning path with CLF-C02, SAA-C03, DVA-C02, and SOA-C02, including mentorship, projects, LMS access, and certification preparation.",
  path: "/programs/aws-cloud-master",
});

export default function AwsCloudMasterProgramPage() {
  const bundle = getCheckoutOfferingBySlug("aws-cloud-master-program");
  return (
    <main className="bg-white">
      <section className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] px-4 pb-10 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,1.36fr)_minmax(320px,0.64fr)]">
          <div className="rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C7D2FE] bg-[#EEF2FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#4338CA]">
              <Sparkles className="h-3.5 w-3.5" />
              AWS Cloud Track
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-[#0F172A] sm:text-5xl">AWS Cloud Master Program</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#475569]">
              Cloud Practitioner to Solutions Architect, built for real-world AWS engineering with live mentorship, certification preparation, internship-ready project work, LMS access, and guided cloud implementation.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {["Live Mentorship", "Certification Preparation", "Internship/Project Support", "LMS Access", "Cloud Engineering Practice"].map((badge) => (
                <span key={badge} className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 text-xs font-medium text-[#334155]">
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
              <p className="mt-3 text-sm font-semibold text-[#4338CA]">Most Popular</p>
              <div className="mt-5 grid gap-3 text-sm text-[#475569]">
                <p className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#4F46E5]" />24 Weeks</p>
                <p className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-[#4F46E5]" />Beginner to Advanced</p>
                <p className="flex items-center gap-2"><FolderKanban className="h-4 w-4 text-[#4F46E5]" />12+ Real-World Projects</p>
              </div>
              <div className="mt-6 space-y-3">
                <ProgramEnrollmentCta courseSlug="aws-cloud-master-program" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#0F172A]">Individual AWS Certifications</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {certificationTracks.map((track) => (
              <article key={track.code} className="rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
                <span className="inline-flex rounded-full border border-[#DBEAFE] bg-[#EEF2FF] px-2.5 py-1 text-[11px] font-semibold text-[#4338CA]">{track.code}</span>
                <h3 className="mt-3 text-base font-semibold text-[#0F172A]">{track.title}</h3>
                <p className="mt-1 text-sm text-[#475569]">{track.level}</p>
                <p className="mt-1 text-xs text-[#64748B]">{track.duration}</p>
                <ul className="mt-3 space-y-1.5 text-xs text-[#475569]">
                  {track.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#4F46E5]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xl font-bold text-[#111827]">{getDisplayPriceByCourseSlug(track.courseSlug)?.price || "Rs. 0"}</p>
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
                <details key={module} className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-[#0F172A]">{module}</summary>
                </details>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#0F172A]">Projects</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {projectHighlights.map((project) => (
                <article key={project} className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                  <p className="text-sm font-semibold text-[#0F172A]">{project}</p>
                </article>
              ))}
            </div>
            <h3 className="mt-8 text-xl font-bold tracking-[-0.01em] text-[#0F172A]">Career Outcomes</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
