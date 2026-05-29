import type { AdminCourse, AdminLesson, AdminResource } from "@/data/admin-lms-mock";

export function PreviewCards({
  courses,
  lessons,
  resources,
}: {
  courses: AdminCourse[];
  lessons: AdminLesson[];
  resources: AdminResource[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <article className="rounded-xl border border-white/10 bg-[rgba(15,23,42,0.8)] p-4">
        <p className="text-xs text-[#94A3B8]">Courses</p>
        <p className="mt-1 text-2xl font-semibold text-white">{courses.length}</p>
      </article>
      <article className="rounded-xl border border-white/10 bg-[rgba(15,23,42,0.8)] p-4">
        <p className="text-xs text-[#94A3B8]">Lessons</p>
        <p className="mt-1 text-2xl font-semibold text-white">{lessons.length}</p>
      </article>
      <article className="rounded-xl border border-white/10 bg-[rgba(15,23,42,0.8)] p-4">
        <p className="text-xs text-[#94A3B8]">Resources</p>
        <p className="mt-1 text-2xl font-semibold text-white">{resources.length}</p>
      </article>
    </div>
  );
}
