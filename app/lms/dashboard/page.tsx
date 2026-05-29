import { LmsFoundation } from "@/components/lms/lms-foundation";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "LMS Dashboard | GenZNext Research & Training",
  description: "Learner dashboard preview for enrolled programs and progress.",
  path: "/lms/dashboard",
});

export default function LmsDashboardPage() {
  return (
    <LmsFoundation
      title="Learner Dashboard"
      subtitle="Track enrolled programs, continue recorded lessons, and access structured course resources."
    />
  );
}
