import Link from "next/link";
import type { AdminCourse } from "@/data/admin-lms-mock";

export function CourseTable({ courses }: { courses: AdminCourse[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.8)]">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-white/10 text-[#94A3B8]">
          <tr>
            <th className="px-4 py-3 font-medium">Course</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Mode</th>
            <th className="px-4 py-3 font-medium">Level</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b border-white/5 text-[#D8E1F0]">
              <td className="px-4 py-3">
                <p className="font-medium">{course.title}</p>
                <p className="text-xs text-[#94A3B8]">{course.slug}</p>
              </td>
              <td className="px-4 py-3">{course.category}</td>
              <td className="px-4 py-3">{course.mode}</td>
              <td className="px-4 py-3">{course.level}</td>
              <td className="px-4 py-3">{course.status}</td>
              <td className="px-4 py-3">
                <Link href={`/admin/courses/${course.id}/edit`} className="text-[#4F46E5] hover:text-[#2563EB]">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
