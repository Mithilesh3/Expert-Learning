import { AdminShell } from "@/components/admin/admin-shell";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return buildMetadata({
    title: `Edit Course ${id} | Admin LMS`,
    description: "Edit course details from the live Firebase-backed course manager.",
    path: `/admin/courses/${id}/edit`,
  });
}

export default async function AdminCourseEditPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <AdminShell
      title="Edit Course"
      subtitle="Course editing is centralized in the live Course Manager."
    >
      <div className="rounded-2xl border border-white/15 bg-slate-900/60 p-6 text-sm text-slate-200">
        Open Course Manager and use the inline edit action for course ID:
        <span className="ml-2 rounded bg-slate-800 px-2 py-1 font-mono text-xs text-orange-200">{id}</span>
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
