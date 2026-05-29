import { TrackLandingPage } from "@/components/marketing/track-landing-page";
import { allCourses } from "@/data/courses";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Generative AI Programs | GenZNext Research & Training",
  description: "Master LLM workflows, RAG systems, and production-oriented Generative AI engineering.",
  path: "/genai",
});

export default function GenAiPage() {
  const courses = allCourses.filter((course) => course.track === "generative-ai");

  return (
    <TrackLandingPage
      title="Generative AI"
      subtitle="Master prompt systems, LLM orchestration, RAG pipelines, and modern GenAI delivery patterns."
      overview="This track focuses on building production-minded Generative AI applications with practical labs, structured mentor guidance, and certification-aligned preparation."
      outcomes={[
        "Design robust prompt and retrieval workflows.",
        "Build and evaluate LLM-powered solutions.",
        "Develop portfolio projects for GenAI roles.",
      ]}
      certifications={[
        "Generative AI project completion credentials.",
        "Role-aligned interview and portfolio preparation.",
        "Guided progression toward advanced AI and agentic pathways.",
      ]}
      faqs={[
        { question: "Is this track beginner friendly?", answer: "Yes, foundation lessons are included before advanced implementation modules." },
        { question: "Do you cover official references?", answer: "Yes, the LMS includes Microsoft Learn, Azure docs, and additional trusted references." },
      ]}
      courses={courses}
      lmsPreviewLabel="Preview recorded lessons, module checkpoints, prompt labs, and certification guides in the LMS portal."
      ctaLabel="Join GenAI Track"
      ctaHref="/contact"
    />
  );
}
