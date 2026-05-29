import { AdminShell } from "@/components/admin/admin-shell";
import { FirebaseLessonManager } from "@/components/admin/firebase-lesson-manager";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Admin LMS Lessons | GenZNext",
  description: "Manage LMS lessons, type selector, YouTube URLs, and external links.",
  path: "/admin/lms/lessons",
});

export default function AdminLmsLessonsPage() {
  return (
    <AdminShell
      title="Lessons"
      subtitle="Create, edit, lock/unlock, and remove lessons under modules."
    >
      <FirebaseLessonManager />
    </AdminShell>
  );
}
