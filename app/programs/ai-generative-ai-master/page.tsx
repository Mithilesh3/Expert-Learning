import Link from "next/link";
import { ArrowRight, Briefcase, Code2, Cpu, FolderKanban, GraduationCap, Sparkles } from "lucide-react";
import { CourseEnrollmentAction } from "@/components/enroll/course-enrollment-action";
import { ProgramEnrollmentCta } from "@/components/enroll/program-enrollment-cta";
import { buildMetadata } from "@/lib/metadata";
import { getCheckoutOfferingBySlug, getDisplayPriceByCourseSlug } from "@/lib/offering-catalog";

const learningTracks = [
  {
    title: "AI Foundations & Python",
    level: "Beginner",
    courseSlug: "applied-ai-foundations",
    href: "/checkout/applied-ai-foundations",
    includes: ["Python for AI", "Data handling", "ML basics", "AI workflow fundamentals"],
  },
  {
    title: "Prompt Engineering & Generative AI",
    level: "Intermediate",
    courseSlug: "prompt-engineering",
    href: "/checkout/prompt-engineering",
    includes: ["Prompt engineering", "OpenAI APIs", "LLM basics", "AI tools workflow"],
  },
  {
    title: "RAG Systems & Vector Databases",
    level: "Advanced",
    courseSlug: "rag-applications-vector-databases",
    href: "/checkout/rag-applications-vector-databases",
    includes: ["LangChain", "Pinecone", "ChromaDB", "Retrieval systems", "Production AI pipelines"],
  },
  {
    title: "AI Agents & LLM Deployment",
    level: "Professional",
    courseSlug: "agentic-ai-engineering",
    href: "/checkout/agentic-ai-engineering",
    includes: ["AI agents", "Autonomous workflows", "Multi-agent systems", "Deployment", "Scaling AI applications"],
  },
] as const;

const curriculumModules = [
  "Module 1 - Python & AI Basics",
  "Module 2 - Machine Learning Foundations",
  "Module 3 - Prompt Engineering",
  "Module 4 - Generative AI & LLMs",
  "Module 5 - RAG Applications",
  "Module 6 - AI Agents",
  "Module 7 - Production Deployment",
  "Module 8 - Real-world AI Projects",
] as const;

const projects = [
  "AI Chatbot",
  "PDF AI Assistant",
  "RAG Search Engine",
  "AI Resume Analyzer",
  "AI Automation Agent",
  "Voice AI Assistant",
  "AI Content Generator",
] as const;

const technologies = [
  "OpenAI",
  "LangChain",
  "Pinecone",
  "ChromaDB",
  "Python",
  "FastAPI",
  "Hugging Face",
  "Docker",
  "Vector Databases",
] as const;

const careerOutcomes = [
  "AI Engineer",
  "Prompt Engineer",
  "Generative AI Developer",
  "LLM Application Developer",
  "AI Automation Engineer",
] as const;

export const metadata = buildMetadata({
  title: "Master AI & Generative AI Program | GenZNext Research & Training",
  description:
    "Premium AI learning track covering foundations, prompt engineering, generative AI, RAG systems, AI agents, and production deployment.",
  path: "/programs/ai-generative-ai-master",
});

export default function AiGenerativeAiMasterProgramPage() {
  const bundle = getCheckoutOfferingBySlug("ai-generative-ai-master-program");
  return (
    <main className="bg-white">
      <section className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] px-4 pb-10 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,1.36fr)_minmax(320px,0.64fr)]">
          <div className="rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C7D2FE] bg-[#EEF2FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#4338CA]">
              <Sparkles className="h-3.5 w-3.5" />
              AI & Generative AI Track
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-[#0F172A] sm:text-5xl">Master AI & Generative AI Program</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#475569]">
              Build industry-ready AI products with modern LLM engineering, RAG architectures, autonomous agents, and production deployment workflows through mentor-led learning and project implementation.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {["Real-world AI Engineering", "Live Mentorship", "AI Project Support", "LMS Access", "Career Guidance"].map((badge) => (
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
              <p className="mt-3 text-sm font-semibold text-[#4338CA]">Industry Ready AI Track</p>
              <div className="mt-5 grid gap-3 text-sm text-[#475569]">
                <p className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-[#4F46E5]" />32 Weeks</p>
                <p className="flex items-center gap-2"><FolderKanban className="h-4 w-4 text-[#4F46E5]" />15+ Real-World Projects</p>
                <p className="flex items-center gap-2"><Cpu className="h-4 w-4 text-[#4F46E5]" />Beginner to Advanced</p>
              </div>
              <div className="mt-6 space-y-3">
                <ProgramEnrollmentCta courseSlug="ai-generative-ai-master-program" />
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
