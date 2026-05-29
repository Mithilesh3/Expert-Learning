import { LmsPlayerClient } from "@/components/lms/lms-student-experience";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "LMS Player | GenZNext Research & Training",
  description: "Lesson player with progress tracking and completion updates.",
  path: "/lms/player",
});

type PageProps = {
  searchParams?: Promise<{ course?: string; lessonId?: string }>;
};

export default async function LmsPlayerPage({ searchParams }: PageProps) {
  const query = (await searchParams) || {};
  const courseSlug = query.course || "";
  const lessonId = query.lessonId;

  return <LmsPlayerClient courseSlug={courseSlug} lessonId={lessonId} />;
}
