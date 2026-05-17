import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";

export function CtaBand({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Reveal className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[20px] border border-brand-blue/20 bg-brand-navy px-6 py-8 text-white shadow-[0_24px_50px_rgba(0,33,92,0.18)] sm:px-8 sm:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="section-label text-brand-blue-light">Admissions Support</div>
            <h2 className="mt-2 text-[26px] font-bold leading-[1.2]">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-white/65">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/courses" variant="amber">
              Apply Now
            </ButtonLink>
            <ButtonLink href="/courses" variant="secondary">
              Explore Courses
            </ButtonLink>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
