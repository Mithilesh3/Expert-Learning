import Link from "next/link";
import { ArrowRight, Award, Briefcase, FolderKanban, GraduationCap, Timer } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";

const programs = [
  {
    title: "Master AI & Generative AI Program",
    href: "/programs/ai-generative-ai-master",
    description: "Build production-ready AI, GenAI, RAG & AI Agent systems with real-world projects.",
    duration: "32 Weeks",
    level: "Beginner to Advanced",
    projects: "15+ Real-World Projects",
    certification: "AI Engineer Career Track",
    modules: [
      "AI Foundations",
      "Prompt Engineering",
      "Generative AI",
      "RAG Systems",
      "AI Agents",
      "LLM Deployment",
    ],
    highlights: [
      "Includes Complete AI Engineering Track",
      "Real-World Generative AI Projects",
      "Live Mentorship + Production-Level Learning",
    ],
    trackBadge: "AI & GenAI Track",
    featured: true,
  },
  {
    title: "AWS Cloud Master Program",
    href: "/programs/aws-cloud-master",
    description: "Master AWS cloud engineering from Cloud Practitioner to Solutions Architect.",
    duration: "24 Weeks",
    level: "Beginner to Advanced",
    projects: "12+ Real-World Projects",
    certification: "AWS Career Track",
    modules: [
      "CLF-C02 - AWS Cloud Practitioner",
      "SAA-C03 - AWS Solutions Architect Associate",
      "DVA-C02 - AWS Developer Associate",
      "SOA-C02 - AWS SysOps Administrator",
    ],
    highlights: [
      "Includes 4 AWS Certifications",
      "Industry-Focused Cloud Engineering Path",
      "Live Mentorship + Real Projects",
    ],
    trackBadge: "AWS Cloud Track",
    featured: true,
  },
  {
    title: "Microsoft Cloud Master Program",
    href: "/programs/microsoft-cloud-master",
    description: "Complete Microsoft Azure learning path from AZ-900 to AZ-305 with live projects.",
    duration: "24 Weeks",
    level: "Beginner to Advanced",
    projects: "10+ Real-World Projects",
    certification: "Microsoft Azure Career Track",
    modules: [
      "AZ-900 - Azure Fundamentals",
      "AZ-104 - Azure Administrator",
      "AZ-204 - Azure Developer",
      "AZ-305 - Azure Solutions Architect",
    ],
    highlights: [
      "Includes 4 Microsoft Certifications",
      "Career-Focused Cloud Learning Path",
      "Live Mentorship + Real Projects",
    ],
    trackBadge: "Microsoft Azure Track",
    featured: true,
  },
  {
    title: "DevOps Master Program",
    href: "/programs/devops-master",
    description: "Master Docker, Kubernetes, CI/CD and cloud automation with real-world DevOps projects.",
    duration: "28 Weeks",
    level: "Beginner to Advanced",
    projects: "15+ Real-World Projects",
    certification: "DevOps Engineer Career Track",
    modules: [
      "Linux & Networking",
      "Git & GitHub",
      "Docker",
      "Kubernetes",
      "Jenkins CI/CD",
      "Terraform",
      "AWS DevOps",
      "Monitoring & Automation",
    ],
    highlights: [
      "Complete DevOps Engineering Track",
      "Production-Level Automation Projects",
      "Live Mentorship + Deployment Labs",
    ],
    trackBadge: "DevOps & Automation Track",
    featured: true,
  },
] as const;

export const metadata = buildMetadata({
  title: "Career Programs | GenZNext Research & Training",
  description: "Industry-ready AI, Cloud, DevOps & GenAI learning paths with projects and certification-aligned training.",
  path: "/programs",
});

export default function ProgramsPage() {
  return (
    <main className="bg-white">
      <section className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] px-4 pb-5 pt-7 sm:px-6 sm:pb-6 sm:pt-8 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <p className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.11em] text-[#64748B]">
            GenZNext Career Tracks
          </p>
          <h1 className="mt-3 text-[34px] font-bold leading-[1.08] tracking-[-0.02em] text-[#0F172A] sm:text-[42px] lg:text-[48px]">Career Programs</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64748B] sm:text-[15px]">
            Industry-ready AI, Cloud, DevOps &amp; GenAI learning paths.
          </p>
        </div>
      </section>

      <section className="border-t border-[#E2E8F0] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {programs.map((program) => (
              (() => {
                const isFeatured = "featured" in program && Boolean(program.featured);
                return (
              <Link
                key={program.title}
                href={program.href}
                className={`group flex h-full cursor-pointer flex-col rounded-[18px] border bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-1 hover:border-[#C7D2FE] hover:shadow-[0_18px_40px_rgba(79,70,229,0.14)] ${
                  isFeatured ? "border-[#C7D2FE] ring-1 ring-[#E0E7FF]" : "border-[#E2E8F0]"
                }`}
              >
                {isFeatured && "trackBadge" in program ? (
                  <span className="inline-flex w-fit items-center rounded-full border border-[#DCE3F1] bg-[#F8FAFC] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#4F46E5]">
                    {program.trackBadge}
                  </span>
                ) : null}
                <h2 className="text-lg font-semibold leading-7 text-[#0F172A]">{program.title}</h2>
                {"description" in program ? (
                  <p className="mt-1.5 line-clamp-2 min-h-[2.75rem] text-sm leading-5.5 text-[#475569]">{program.description}</p>
                ) : null}
                <div className="mt-3.5 space-y-2 text-sm text-[#475569]">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-[#4F46E5]" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-[#4F46E5]" />
                    <span>{program.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FolderKanban className="h-4 w-4 text-[#4F46E5]" />
                    <span>{program.projects}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#4F46E5]" />
                    <span>{program.certification}</span>
                  </div>
                </div>

                {"modules" in program ? (
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {program.modules.map((module) => (
                      <span
                        key={module}
                        className="rounded-full border border-[#DBEAFE] bg-[#F8FAFF] px-2.5 py-1 text-[11px] font-medium text-[#1E3A8A]"
                      >
                        {module}
                      </span>
                    ))}
                  </div>
                ) : null}

                {"highlights" in program ? (
                  <div className="mt-3.5 rounded-2xl border border-[#E2E8F0] bg-[#FAFBFF] p-3">
                    <ul className="space-y-2 text-[12px] font-medium text-[#334155]">
                      {program.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#4F46E5]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-4 h-px bg-[#E2E8F0]" />

                <div className="mt-4 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1 text-[12px] font-medium text-[#64748B]">
                    <Briefcase className="h-3.5 w-3.5" />
                    Career-focused
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-[12px] bg-[linear-gradient(135deg,#4F46E5,#2563EB)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.25)] transition duration-200 group-hover:scale-[1.02] group-hover:shadow-[0_18px_38px_rgba(79,70,229,0.32)]">
                    {isFeatured ? "View Program" : "Explore"}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
                );
              })()
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
