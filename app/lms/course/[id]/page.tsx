import { LmsCourseDetailClient } from "@/components/lms/lms-student-experience";
import { buildMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return buildMetadata({
    title: "LMS Course | GenZNext Research & Training",
    description: "LMS course detail with modules, lessons, resources, assignments, and progress.",
    path: `/lms/course/${id}`,
  });
}

export default async function LmsCoursePage({ params }: PageProps) {
  const { id } = await params;
  return <LmsCourseDetailClient courseId={id} />;
}
