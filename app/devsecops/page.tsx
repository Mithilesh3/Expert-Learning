import { TrackLandingPage } from "@/components/marketing/track-landing-page";
import { allCourses } from "@/data/courses";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "DevSecOps Programs | GenZNext Research & Training",
  description: "Secure CI/CD, cloud automation, compliance-ready delivery, and modern DevSecOps learning paths.",
  path: "/devsecops",
});

export default function DevSecOpsPage() {
  const courses = allCourses.filter((course) => course.track === "devsecops");

  return (
    <TrackLandingPage
      title="DevSecOps"
      subtitle="Build secure automation workflows across CI/CD, cloud infrastructure, containers, and policy-driven delivery."
      overview="The DevSecOps track blends modern DevOps automation with practical security-first engineering patterns for enterprise-ready deployment workflows."
      outcomes={[
        "Build secure CI/CD pipelines with governance controls.",
        "Automate infrastructure with repeatable, auditable workflows.",
        "Operate cloud-native delivery with observability and reliability practices.",
      ]}
      certifications={[
        "DevSecOps-focused project and completion credentials.",
        "Career readiness for cloud automation and platform roles.",
        "Mentor-guided interview and practical assessment support.",
      ]}
      faqs={[
        { question: "Is this only for experienced engineers?", answer: "No, the track includes beginner-friendly pathways and advanced modules." },
        { question: "Do you cover security practices?", answer: "Yes, secure pipeline and cloud hardening practices are included." },
      ]}
      courses={courses}
      lmsPreviewLabel="Access pipeline templates, secure deployment notes, recorded labs, and assignments in LMS."
      ctaLabel="Start DevSecOps Track"
      ctaHref="/contact"
    />
  );
}
