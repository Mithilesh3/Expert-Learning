import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { FirebaseCourseManager } from "@/components/admin/firebase-course-manager";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Admin Courses | GenZNext",
  description: "Manage LMS courses with frontend-only mock data.",
  path: "/admin/courses",
});

export default function AdminCoursesPage() {
  return (
    <AdminShell title="Courses" subtitle="Create, edit, delete, and list LMS course records.">
      <div className="flex justify-end">
        <Link href="/admin/courses/new" className="rounded-md bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white">
          New Course
        </Link>
      </div>
      <FirebaseCourseManager />
    </AdminShell>
  );
}
