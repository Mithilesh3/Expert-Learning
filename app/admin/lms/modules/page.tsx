import { AdminShell } from "@/components/admin/admin-shell";
import { FirebaseModuleManager } from "@/components/admin/firebase-module-manager";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Admin LMS Modules | GenZNext",
  description: "Manage mock LMS module structure.",
  path: "/admin/lms/modules",
});

export default function AdminLmsModulesPage() {
  return (
    <AdminShell title="Modules" subtitle="Create, order, edit, and remove modules by course.">
      <FirebaseModuleManager />
    </AdminShell>
  );
}
