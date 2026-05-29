import { AdminShell } from "@/components/admin/admin-shell";
import { PreviewCards } from "@/components/admin/preview-cards";
import { adminMockCourses, adminMockLessons, adminMockResources } from "@/data/admin-lms-mock";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Admin LMS | GenZNext",
  description: "LMS management dashboard with local mock data state.",
  path: "/admin/lms",
});

export default function AdminLmsPage() {
  return (
    <AdminShell
      title="LMS Manager"
      subtitle="Control module structures, lesson assets, YouTube URLs, official links, and resource metadata."
    >
      <PreviewCards courses={adminMockCourses} lessons={adminMockLessons} resources={adminMockResources} />
    </AdminShell>
  );
}
