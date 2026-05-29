import { AdminShell } from "@/components/admin/admin-shell";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "New Course | Admin LMS",
  description: "Create a new mock LMS course from the admin frontend.",
  path: "/admin/courses/new",
});

export default function AdminNewCoursePage() {
  return (
    <AdminShell
      title="Create Course"
      subtitle="Use the live Course Manager for Firebase-backed create/edit/delete operations."
    >
      <div className="rounded-2xl border border-white/15 bg-slate-900/60 p-6 text-sm text-slate-200">
        Course creation is now managed from the central course manager.
        <div className="mt-4">
          <Link
            href="/admin/courses"
            className="inline-flex items-center rounded-lg bg-orange-500 px-4 py-2 font-medium text-white transition hover:bg-orange-400"
          >
            Open Course Manager
          </Link>
        </div>
      </div>
    </AdminShell>
  );
}
