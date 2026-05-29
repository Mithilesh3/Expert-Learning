import { AdminShell } from "@/components/admin/admin-shell";
import { FirebaseAdminDashboard } from "@/components/admin/firebase-admin-dashboard";
import { FirebaseLeadManager } from "@/components/admin/firebase-lead-manager";
import { FirebaseUserManager } from "@/components/admin/firebase-user-manager";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Admin LMS | GenZNext Research & Training",
  description: "Admin frontend for managing courses, modules, lessons, and LMS resources using mock state.",
  path: "/admin",
});

export default function AdminPage() {
  return (
    <AdminShell
      title="Admin LMS Content Management"
      subtitle="Manage live LMS content, users, leads, and platform metrics."
    >
      <FirebaseAdminDashboard />
      <div className="grid gap-4 lg:grid-cols-2">
        <FirebaseUserManager />
        <FirebaseLeadManager />
      </div>
    </AdminShell>
  );
}
