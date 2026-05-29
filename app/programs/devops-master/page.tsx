import Link from "next/link";
import { ArrowRight, Briefcase, Code2, FolderKanban, GraduationCap, ServerCog, Sparkles } from "lucide-react";
import { CourseEnrollmentAction } from "@/components/enroll/course-enrollment-action";
import { ProgramEnrollmentCta } from "@/components/enroll/program-enrollment-cta";
import { buildMetadata } from "@/lib/metadata";
import { getCheckoutOfferingBySlug, getDisplayPriceByCourseSlug } from "@/lib/offering-catalog";

const learningTracks = [
  {
    title: "Linux, Git & Networking Fundamentals",
    level: "Beginner",
    courseSlug: "devsecops-foundation",
    href: "/checkout/devsecops-foundation",
    includes: [
      "Linux commands",
      "Networking basics",
      "SSH",
      "Git & GitHub workflows",
      "DevOps foundations",
    ],
  },
  {
    title: "Docker & Containerization",
    level: "Intermediate",
    courseSlug: "docker-kubernetes",
    href: "/checkout/docker-kubernetes",
    includes: [
      "Docker containers",
      "Docker Compose",
      "Image management",
      "Container deployment",
      "Real-world labs",
    ],
  },
  {
    title: "Kubernetes & CI/CD Automation",
    level: "Advanced",
    courseSlug: "ci-cd-pipeline-engineering",
    href: "/checkout/ci-cd-pipeline-engineering",
    includes: [
      "Kubernetes",
      "Jenkins",
      "CI/CD pipelines",
      "Helm",
      "GitHub Actions",
      "Production deployments",
    ],
  },
  {
    title: "Terraform & Cloud DevOps Engineering",
    level: "Professional",
    courseSlug: "aws-devops-engineer",
    href: "/checkout/aws-devops-engineer",
    includes: [
      "Infrastructure as Code",
      "Terraform",
      "AWS DevOps",
      "Monitoring",
      "Scaling infrastructure",
      "Automation projects",
    ],
  },
] as const;

const curriculumModules = [
  "Module 1 - Linux & Networking",
  "Module 2 - Git & Version Control",
  "Module 3 - Docker & Containers",
  "Module 4 - Kubernetes Orchestration",
  "Module 5 - Jenkins CI/CD",
  "Module 6 - Terraform & IaC",
  "Module 7 - Monitoring & Logging",
  "Module 8 - Production DevOps Projects",
] as const;

const projects = [
  "CI/CD Deployment Pipeline",
  "Kubernetes Cluster Setup",
  "Dockerized Web App",
  "Infrastructure Automation",
  "Monitoring Dashboard",
  "Production Cloud Deployment",
] as const;

const technologies = [
  "Docker",
  "Kubernetes",
  "Jenkins",
  "Terraform",
  "GitHub Actions",
  "Linux",
  "AWS",
  "Nginx",
  "Grafana",
  "Prometheus",
] as const;

const careerOutcomes = [
  "DevOps Engineer",
  "Site Reliability Engineer",
  "Cloud DevOps Engineer",
  "Platform Engineer",
  "Automation Engineer",
] as const;

export const metadata = buildMetadata({
  title: "DevOps Master Program | GenZNext Research & Training",
  description:
    "End-to-end DevOps learning track covering CI/CD, Docker, Kubernetes, Terraform, cloud deployment, and production automation.",
  path: "/programs/devops-master",
});

export default function DevopsMasterProgramPage() {
  const bundle = getCheckoutOfferingBySlug("devops-master-program");
  return (
    <main className="bg-white">
      <section className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] px-4 pb-10 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,1.36fr)_minmax(320px,0.64fr)]">
          <div className="rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C7D2FE] bg-[#EEF2FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#4338CA]">
              <Sparkles className="h-3.5 w-3.5" />
              DevOps & Automation Track
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-[#0F172A] sm:text-5xl">DevOps Master Program</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#475569]">
              Master CI/CD automation, container orchestration, cloud deployment workflows, and infrastructure engineering through mentor-led practice, LMS support, and real production deployment projects.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {[
                "CI/CD Automation",
                "Container Orchestration",
                "Cloud Deployment Workflows",
                "LMS Access",
                "Infrastructure Projects",
                "Career Guidance",
              ].map((badge) => (
                <span key={badge} className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 text-xs font-medium text-[#334155]">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-[22px] border border-[#E2E8F0] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.10)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64748B]">Program Enrollment</p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#111827]">{bundle?.price || "Rs. 29,999"}</h2>
              <p className="mt-1 text-sm text-[#94A3B8] line-through">{bundle?.originalPrice || "Rs. 59,999"}</p>
              <p className="mt-3 text-sm font-semibold text-[#4338CA]">Industry Ready DevOps Track</p>
              <div className="mt-5 grid gap-3 text-sm text-[#475569]">
                <p className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-[#4F46E5]" />28 Weeks</p>
                <p className="flex items-center gap-2"><FolderKanban className="h-4 w-4 text-[#4F46E5]" />15+ Real-World Projects</p>
                <p className="flex items-center gap-2"><ServerCog className="h-4 w-4 text-[#4F46E5]" />Beginner to Advanced</p>
              </div>
              <div className="mt-6 space-y-3">
                <ProgramEnrollmentCta courseSlug="devops-master-program" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#0F172A]">Learning Tracks</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {learningTracks.map((track) => (
              <article key={track.title} className="rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
                <h3 className="text-base font-semibold text-[#0F172A]">{track.title}</h3>
                <p className="mt-1 text-sm text-[#475569]">{track.level}</p>
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
              {projects.map((project) => (
                <article key={project} className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                  <p className="text-sm font-semibold text-[#0F172A]">{project}</p>
                </article>
              ))}
            </div>
            <h3 className="mt-8 text-xl font-bold tracking-[-0.01em] text-[#0F172A]">Tools & Technologies</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {technologies.map((tool) => (
                <span key={tool} className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-medium text-[#334155] shadow-[0_4px_10px_rgba(15,23,42,0.04)]">
                  <Code2 className="h-3.5 w-3.5 text-[#4F46E5]" />
                  {tool}
                </span>
              ))}
            </div>
            <h3 className="mt-8 text-xl font-bold tracking-[-0.01em] text-[#0F172A]">Career Outcomes</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {careerOutcomes.map((role) => (
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
