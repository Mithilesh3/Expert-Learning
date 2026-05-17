import { notFound } from "next/navigation";
import { EnrollmentForm } from "@/components/forms/enrollment-form";
import { PageHero } from "@/components/ui/page-hero";
import { getCourseBySlug } from "@/lib/course-catalog";

type PageProps = {
  params: Promise<{ courseSlug: string }>;
};

export default async function EnrollPage({ params }: PageProps) {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="Enrollment"
        title={`Complete your enrollment for ${course.title}`}
        description={course.subtitle}
        primaryCta={{ label: "View all courses", href: "/courses" }}
        secondaryCta={{ label: "Talk to admissions", href: "/contact" }}
      />
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="surface-card p-6">
            <div className="section-label">Program Snapshot</div>
            <h2 className="mt-2 text-[26px] font-bold text-brand-text">{course.title}</h2>
            <p className="mt-4 text-sm leading-7 text-brand-muted">{course.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="mono-tag rounded-[4px] border border-brand-blue-light/25 bg-brand-blue/5 px-[10px] py-1 text-[11px] text-brand-blue-light"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="surface-form p-4">
                <div className="form-label">Duration</div>
                <div className="mono-meta text-sm text-brand-text">{course.duration}</div>
              </div>
              <div className="surface-form p-4">
                <div className="form-label">Level</div>
                <div className="mono-meta text-sm text-brand-text">{course.level}</div>
              </div>
              <div className="surface-form p-4">
                <div className="form-label">Rating</div>
                <div className="mono-meta text-sm text-brand-text">{course.rating}</div>
              </div>
            </div>
          </div>
          <EnrollmentForm course={course} />
        </div>
      </section>
    </>
  );
}
