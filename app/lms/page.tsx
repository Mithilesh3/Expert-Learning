import { LmsFoundation } from "@/components/lms/lms-foundation";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "LMS Portal | GenZNext Research & Training",
  description:
    "Access LMS portal previews with prerecorded lessons, progress tracking, and official learning resources.",
  path: "/lms",
});

export default function LmsPage() {
  return (
    <LmsFoundation
      title="LMS Portal"
      subtitle="Learn through prerecorded YouTube lessons, official references, notes, assignments, and guided module progress."
    />
  );
}
