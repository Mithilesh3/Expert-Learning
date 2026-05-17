import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta = { label: "Explore Courses", href: "/courses" },
  secondaryCta = { label: "Talk to Admissions", href: "/contact" },
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section className="hero-home px-4 pt-16 pb-14 sm:px-6 sm:pt-20 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="relative rounded-[22px] border border-white/14 px-5 py-10 sm:px-10 sm:py-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-light/40 bg-brand-blue/20 px-[14px] py-1 text-[11px] font-medium text-brand-blue-light">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-blue-bright" />
              {eyebrow}
            </div>
            <h1 className="mt-5 text-3xl font-bold leading-[1.2] text-white sm:text-[38px]">{title}</h1>
            <p className="mt-4 max-w-[560px] text-[15px] leading-[1.75] text-white/65">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
              <ButtonLink href={secondaryCta.href} variant="secondary">
                {secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
