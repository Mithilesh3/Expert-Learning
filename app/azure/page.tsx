import { TrackLandingPage } from "@/components/marketing/track-landing-page";
import { allCourses } from "@/data/courses";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Azure Certifications | GenZNext Research & Training",
  description: "Microsoft Azure certification pathways for admin, AI, architecture, and DevOps tracks.",
  path: "/azure",
});

export default function AzurePage() {
  const courses = allCourses.filter((course) => course.track === "azure-certifications");

  return (
    <TrackLandingPage
      title="Azure Certifications"
      subtitle="Microsoft-aligned Azure tracks with project-first delivery, certification preparation, and career-focused mentorship."
      overview="Azure pathways are designed for learners targeting administration, architecture, AI, and DevOps roles with practical enterprise-style implementation experience."
      outcomes={[
        "Build Azure operations and architecture confidence.",
        "Prepare for AZ-900, AZ-104, AZ-400, AZ-305 aligned goals.",
        "Showcase real implementation skills through guided projects.",
      ]}
      certifications={[
        "AZ-900, AZ-104, AZ-400, AZ-305 and AI-aligned support.",
        "Mentor-led project and assessment preparation workflows.",
        "Role-ready cloud engineering career progression support.",
      ]}
      faqs={[
        { question: "Do I need prior Azure experience?", answer: "No, beginner and intermediate pathways are available with structured progression." },
        { question: "Are classes live or recorded?", answer: "Tracks include explicit mode options including live, recorded, and hybrid delivery." },
      ]}
      courses={courses}
      lmsPreviewLabel="Access Azure official links, module recordings, notes, assignments, and certification resources via LMS."
      ctaLabel="Start Azure Track"
      ctaHref="/contact"
    />
  );
}
