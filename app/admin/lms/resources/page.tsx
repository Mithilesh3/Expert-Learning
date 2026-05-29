import { AdminShell } from "@/components/admin/admin-shell";
import { FirebaseResourceManager } from "@/components/admin/firebase-resource-manager";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Admin LMS Resources | GenZNext",
  description: "Manage LMS resources including Microsoft Learn, AWS Skill Builder, Azure docs, PDFs, notes, assignments, and guides.",
  path: "/admin/lms/resources",
});

export default function AdminLmsResourcesPage() {
  return (
    <AdminShell
      title="Resources"
      subtitle="Create, edit, and remove course resources and official links."
    >
      <FirebaseResourceManager />
    </AdminShell>
  );
}
