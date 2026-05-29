import { LmsMyLearningClient } from "@/components/lms/lms-student-experience";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "My Learning | LMS Portal",
  description: "Continue your active programs and review locked lessons in the LMS experience.",
  path: "/lms/my-learning",
});

export default function LmsMyLearningPage() {
  return <LmsMyLearningClient />;
}
