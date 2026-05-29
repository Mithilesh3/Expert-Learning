import { TrackLandingPage } from "@/components/marketing/track-landing-page";
import { allCourses } from "@/data/courses";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Agentic AI Programs | GenZNext Research & Training",
  description: "Build tool-using AI systems and agentic workflows with practical engineering foundations.",
  path: "/agentic-ai",
});

export default function AgenticAiPage() {
  const courses = allCourses.filter((course) => course.track === "agentic-ai");

  return (
    <TrackLandingPage
      title="Agentic AI"
      subtitle="Learn to design autonomous, tool-using AI systems with practical workflow orchestration and evaluation."
      overview="Agentic AI at GenZNext combines LLM engineering, reasoning workflows, retrieval systems, and production guardrails for modern applied AI roles."
      outcomes={[
        "Architect multi-step agent workflows.",
        "Connect models with tools, APIs, and retrieval layers.",
        "Evaluate reliability, cost, and safety for production use.",
      ]}
      certifications={[
        "Advanced AI engineering pathway completion records.",
        "Project narratives aligned to applied agentic AI roles.",
        "Preparation support for advanced AI interviews.",
      ]}
      faqs={[
        { question: "Do I need AI fundamentals first?", answer: "Yes, we recommend prior basics in AI or GenAI before joining Agentic AI." },
        { question: "Will this include deployment guidance?", answer: "Yes, the track includes deployment-oriented workflows and monitoring practices." },
      ]}
      courses={courses}
      lmsPreviewLabel="Use LMS resources for recorded system-design sessions, notes, and official references."
      ctaLabel="Apply for Agentic AI"
      ctaHref="/contact"
    />
  );
}
