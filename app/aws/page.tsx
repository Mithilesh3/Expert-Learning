import { TrackLandingPage } from "@/components/marketing/track-landing-page";
import { allCourses } from "@/data/courses";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "AWS Certifications | GenZNext Research & Training",
  description: "AWS certification tracks from foundations to architecture and cloud delivery roles.",
  path: "/aws",
});

export default function AwsPage() {
  const courses = allCourses.filter((course) => course.track === "aws-certifications");

  return (
    <TrackLandingPage
      title="AWS Certifications"
      subtitle="Certification-focused AWS tracks with mentor-led labs, practical projects, and role-mapped progression."
      overview="From foundational cloud learning to architecture and DevOps specialization, AWS tracks are built for practical skill-building and certification readiness."
      outcomes={[
        "Develop AWS deployment and architecture confidence.",
        "Prepare for certification-aligned assessments.",
        "Build project experience for cloud job roles.",
      ]}
      certifications={[
        "CLF-C02, SAA-C03, SOA-C02, DOP-C02 aligned preparation.",
        "Hands-on project completion records for portfolio use.",
        "Structured mentor support for exam and interview readiness.",
      ]}
      faqs={[
        { question: "Can beginners start with AWS?", answer: "Yes, the Cloud Practitioner path is beginner-friendly and provides foundational guidance." },
        { question: "Is certification prep included?", answer: "Yes, each track includes exam-aligned guidance and revision support." },
      ]}
      courses={courses}
      lmsPreviewLabel="Use LMS to access recorded walkthroughs, AWS official links, notes, and certification guides."
      ctaLabel="Explore AWS Admissions"
      ctaHref="/contact"
    />
  );
}
