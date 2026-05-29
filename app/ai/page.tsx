import { TrackLandingPage } from "@/components/marketing/track-landing-page";
import { allCourses } from "@/data/courses";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "AI Programs | GenZNext Research & Training",
  description: "Applied AI track with practical workflows, business use-cases, and engineering foundations.",
  path: "/ai",
});

export default function AiPage() {
  const courses = allCourses.filter((course) => course.track === "ai");

  return (
    <TrackLandingPage
      title="AI"
      subtitle="Build practical AI skills for real-world products, automation workflows, and role-ready outcomes."
      overview="The AI track is designed for students and professionals who want applied, job-focused AI skills with guided mentorship, hands-on assignments, and LMS resources."
      outcomes={[
        "Understand practical AI workflows and applied use-cases.",
        "Use AI tools to improve productivity and decision-making.",
        "Build portfolio-ready projects aligned to hiring expectations.",
      ]}
      certifications={[
        "Program completion credentials aligned to applied AI roles.",
        "Interview-ready project narratives for AI support and analyst tracks.",
        "Mentor-guided roadmap for upgrading into advanced AI tracks.",
      ]}
      faqs={[
        { question: "Is coding required?", answer: "Beginner AI paths can start without heavy coding, while advanced tracks include implementation practice." },
        { question: "Will I get project support?", answer: "Yes, every learner gets guided projects and LMS resources." },
      ]}
      courses={courses}
      lmsPreviewLabel="Access recorded lessons, notes, assignments, and official links from trusted learning providers."
      ctaLabel="Explore AI Admissions"
      ctaHref="/contact"
    />
  );
}
