import { AuthActionButton } from "@/components/auth/auth-action-button";
import { ButtonLink, buttonLinkClasses } from "@/components/ui/button-link";
import { DemoModalTrigger } from "@/components/demo/demo-modal-trigger";
import { Reveal } from "@/components/ui/reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta = { label: "Explore Courses", href: "/courses" },
  secondaryCta = { label: "Talk to Admissions", href: "/contact" },
  showCtas = true,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: {
    label: string;
    href?: string;
    modalCourse?: string;
    modalMessage?: string;
    modalSource?: string;
    modalTitle?: string;
    modalDescription?: string;
  };
  showCtas?: boolean;
}) {
  return (
    <section className="hero-home px-4 pt-16 pb-14 sm:px-6 sm:pt-20 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="glass-panel-dark relative rounded-[22px] px-5 py-10 sm:px-10 sm:py-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-[14px] py-1 text-[11px] font-medium text-[#64748B]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-blue-bright" />
              {eyebrow}
            </div>
            <h1 className="mt-5 text-3xl font-bold leading-[1.2] text-[#0F172A] sm:text-[38px]">{title}</h1>
            <p className="mt-4 max-w-[560px] text-[15px] leading-[1.75] text-[#475569]">{description}</p>
            {showCtas ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {primaryCta.label === "Apply Now" ? (
                  <AuthActionButton className={buttonLinkClasses("primary")} href={primaryCta.href}>
                    {primaryCta.label}
                  </AuthActionButton>
                ) : (
                  <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
                )}
                {secondaryCta.modalCourse || secondaryCta.modalMessage ? (
                  <DemoModalTrigger
                    variant="secondary"
                    course={secondaryCta.modalCourse}
                    message={secondaryCta.modalMessage}
                    source={secondaryCta.modalSource || secondaryCta.label}
                    title={secondaryCta.modalTitle}
                    description={secondaryCta.modalDescription}
                  >
                    {secondaryCta.label}
                  </DemoModalTrigger>
                ) : (
                  <ButtonLink href={secondaryCta.href || "/contact"} variant="secondary">
                    {secondaryCta.label}
                  </ButtonLink>
                )}
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
