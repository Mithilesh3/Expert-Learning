import Link from "next/link";
import { allCourses, courseCategories } from "@/data/courses";
import { CourseCard } from "@/components/ui/course-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";

const featuredCourses = allCourses.slice(0, 8);

export function FeaturedCoursesSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[#F5F9FF]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.18),transparent_68%)]" />
      <div className="pointer-events-none absolute -left-20 top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.12),transparent_72%)] blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-12 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.14),transparent_72%)] blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <div className="relative rounded-[32px] border border-[#DCE9FF] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,249,255,0.98))] px-5 py-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:px-8 sm:py-10 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Featured Programs"
              title="Premium certification tracks built for modern cloud and AI careers"
              description="Structured pathways across AWS, Azure, AI, GenAI, DevOps, and data engineering with mentor-led delivery, guided labs, and career support."
              theme="light"
            />
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {courseCategories.map((category, index) => (
              <Reveal key={category.key} delay={index * 0.05}>
                <Link
                  href={category.href}
                  className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#DCE9FF] bg-white p-5 shadow-[0_12px_30px_rgba(37,99,235,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#93C5FD] hover:bg-[#F8FBFF] hover:shadow-xl"
                >
                  <div className={`h-[3px] w-full rounded-t-[12px] bg-gradient-to-r ${category.gradient}`} />
                  <div className="mt-4 text-[15px] font-semibold text-[#0F172A]">{category.title}</div>
                  <p className="mt-3 text-[13px] leading-[1.75] text-[#475569]">{category.description}</p>
                  <span className="mt-5 inline-flex items-center text-[12px] font-semibold text-[#2563EB] transition-transform duration-300 group-hover:translate-x-1">
                    View track
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredCourses.map((course, index) => (
              <Reveal key={course.slug} delay={0.05 * index}>
                <CourseCard course={course} featured={index === 1} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <ButtonLink href="/courses" variant="outline" className="px-6 py-3">
              View All Courses
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
