import { ArrowUpRight, Clock3, Star } from "lucide-react";
import { iconMap } from "@/lib/icon-map";
import { cn } from "@/lib/utils";
import type { Course } from "@/data/courses";
import { ButtonLink } from "@/components/ui/button-link";

const categoryStyles = {
  aws: {
    bar: "from-[#0A2C80] via-[#2563EB] to-[#60A5FA]",
    icon: "bg-[#EAF2FF] text-[#2563EB]",
  },
  azure: {
    bar: "from-[#0A2C80] via-[#2563EB] to-[#60A5FA]",
    icon: "bg-[#EAF2FF] text-[#2563EB]",
  },
  ai: {
    bar: "from-[#102F85] via-[#2563EB] to-[#60A5FA]",
    icon: "bg-[#EAF2FF] text-[#2563EB]",
  },
  devops: {
    bar: "from-[#0A2C80] via-[#2563EB] to-[#60A5FA]",
    icon: "bg-[#EAF2FF] text-[#2563EB]",
  },
} as const;

export function CourseCard({
  course,
  featured = false,
}: {
  course: Course;
  featured?: boolean;
}) {
  const Icon = iconMap[course.icon];
  const style = categoryStyles[course.category];
  const popular = course.highlight.toLowerCase().includes("popular");

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#DCE9FF] bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#93C5FD] hover:bg-[#F0F6FF] hover:shadow-xl",
        featured && "pulse-border",
      )}
    >
      <div className={cn("absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r", style.bar)} />
      <div className="flex items-start justify-between gap-4 pt-2">
        <div className={cn("inline-flex h-9 w-9 items-center justify-center rounded-lg", style.icon)}>
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={cn(
            "rounded-full border px-2.5 py-1 text-[10px] font-semibold",
            popular
              ? "border-[#BFDBFE] bg-[#EAF2FF] text-[#2563EB]"
              : "border-[#DBEAFE] bg-[#F4F8FF] text-[#2563EB]",
          )}
        >
          {course.highlight}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-[#64748B]">
        <span className="mono-meta inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-[#2563EB] text-[#2563EB]" />
          {course.rating}
        </span>
        <span className="mono-meta inline-flex items-center gap-1">
          <Clock3 className="h-3.5 w-3.5 text-[#2563EB]" />
          {course.duration}
        </span>
        <span className="mono-meta">{course.level}</span>
      </div>
      <h3 className="mt-4 text-[15px] font-semibold leading-6 text-[#0F172A]">{course.title}</h3>
      <p className="mt-3 min-h-[68px] text-[13px] leading-[1.75] text-[#475569]">{course.subtitle}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {course.tags.map((tag) => (
          <span
            key={tag}
            className="mono-tag rounded-full border border-[#BFDBFE] bg-[#EAF2FF] px-2.5 py-1 text-[11px] text-[#2563EB]"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-end justify-between gap-4 border-t border-[#E2E8F0] pt-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.05em] text-[#64748B]">Program Fee</div>
          <div className="mono-meta mt-1 text-[14px] font-bold text-[#2563EB]">{course.price}</div>
        </div>
        <div className="mono-meta text-[11px] text-[#64748B]">{course.duration}</div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <ButtonLink
          href={`/enroll/${course.slug}`}
          variant="primary"
          className="px-4 py-2.5 text-[12px] shadow-[0_10px_24px_rgba(37,99,235,0.18)]"
        >
          Enroll Now
        </ButtonLink>
        <ArrowUpRight className="h-[18px] w-[18px] text-[#2563EB] transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </article>
  );
}
