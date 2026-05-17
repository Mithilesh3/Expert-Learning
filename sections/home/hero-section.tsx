import { ArrowRight, BadgeCheck, BriefcaseBusiness, Building2, Cloud, DatabaseZap, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Reveal } from "@/components/ui/reveal";
import { companyLogos, heroStats } from "@/data/site";

const techPills = ["AWS", "Azure", "AI", "DevOps", "Python", "Cloud"];

export function HeroSection() {
  return (
    <section className="hero-home px-4 pt-16 pb-[72px] sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <div className="pointer-events-none absolute inset-x-0 top-10 z-0 h-56 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.12),transparent_68%)] blur-3xl" />
        <div className="grid gap-10 lg:grid-cols-[1fr_0.96fr] lg:items-center">
          <Reveal>
            <div className="relative z-[1]">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-light/40 bg-brand-blue/20 px-[14px] py-1 text-[11px] font-medium text-brand-blue-light">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-blue-bright" />
                Industrial Summer Training 2025 · Registrations Open
              </div>
              <h1 className="mt-5 max-w-[680px] text-[28px] font-bold leading-[1.2] text-white sm:text-[38px]">
                Master <span className="text-brand-blue-bright">Cloud, AI &amp; DevOps</span> Skills with Industry Experts
              </h1>
              <p className="mt-4 max-w-[560px] text-[15px] leading-[1.75] text-white/78">
                Get hands-on cloud and AI training programs designed for real-world careers and certifications.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {techPills.map((item) => (
                  <span
                    key={item}
                    className="mono-tag rounded-[4px] border border-brand-blue-light/35 bg-brand-blue/20 px-[10px] py-1 text-[11px] text-brand-blue-light"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/courses">
                  Explore Programs
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Book Free Demo
                </ButtonLink>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                {[
                  { value: "10K+", label: "Learners" },
                  { value: "4.8★", label: "Rating" },
                  { value: "96%", label: "Cert Readiness" },
                  { value: "6 Weeks", label: "Program" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="text-2xl font-bold text-white">{item.value}</div>
                    <div className="mt-1 text-[11px] text-white/52">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                {companyLogos.slice(0, 6).map((company) => (
                  <div
                    key={company}
                    className="rounded-[10px] border border-white/12 bg-white/6 px-4 py-3 text-center text-[12px] font-medium text-white/76"
                  >
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative z-[1]">
              <div className="glass-panel-dark float-slow absolute -left-4 top-8 hidden rounded-xl p-4 text-white lg:block">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-9 w-9 rounded-lg bg-white/12 p-2 text-brand-blue-light" />
                  <div>
                    <div className="text-sm font-semibold">Placement Support</div>
                    <div className="text-xs text-white/65">Interview prep &amp; roadmap reviews</div>
                  </div>
                </div>
              </div>
              <div className="glass-panel-dark float-delayed absolute right-0 top-0 hidden rounded-xl p-4 text-white lg:block">
                <div className="flex items-center gap-3">
                  <BadgeCheck className="h-9 w-9 rounded-lg bg-white/12 p-2 text-brand-blue-bright" />
                  <div>
                    <div className="text-sm font-semibold">Cert Focus</div>
                    <div className="text-xs text-white/65">Exam aligned labs and assessments</div>
                  </div>
                </div>
              </div>
              <div className="hero-panel rounded-[20px] p-5 text-white sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="mono-meta text-[11px] uppercase tracking-[0.14em] text-brand-blue-light">
                      Training Dashboard
                    </div>
                    <div className="mt-2 text-2xl font-semibold">Program performance and delivery stack</div>
                  </div>
                  <div className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-[11px] text-white/78">
                    Cohort admissions open
                  </div>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-[1.08fr_0.92fr]">
                  <div className="rounded-[16px] border border-white/12 bg-white/8 p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/78">Certification readiness</span>
                      <span className="mono-meta text-sm font-semibold text-brand-blue-light">96%</span>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[96%] rounded-full bg-[linear-gradient(90deg,#2563EB,#60A5FA)] shadow-[0_0_18px_rgba(96,165,250,0.18)]" />
                    </div>
                    <p className="mt-4 text-sm leading-6 text-white/72">
                      Industry-led training with practical labs across AWS, Azure, DevOps, Python, cloud engineering, and AI implementation.
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/10 bg-white/8 p-4">
                        <div className="flex items-center gap-2 text-[12px] text-white/76">
                          <Cloud className="h-4 w-4 text-brand-blue-light" />
                          AWS Track
                        </div>
                        <div className="mono-meta mt-2 text-xl font-semibold">6 Weeks</div>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/8 p-4">
                        <div className="flex items-center gap-2 text-[12px] text-white/76">
                          <DatabaseZap className="h-4 w-4 text-brand-blue-bright" />
                          AI Labs
                        </div>
                        <div className="mono-meta mt-2 text-xl font-semibold">24 Projects</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-[16px] border border-white/12 bg-white/8 p-5">
                      <div className="flex items-center gap-3">
                        <BriefcaseBusiness className="h-10 w-10 rounded-lg bg-white/12 p-2 text-brand-blue-light" />
                        <div>
                          <div className="text-sm text-white/76">Career Support</div>
                          <div className="text-xl font-semibold">24 mock interviews</div>
                        </div>
                      </div>
                      <div className="mt-5 space-y-3 text-sm text-white/70">
                        <div className="rounded-lg border border-white/10 bg-white/6 px-4 py-3">
                          Resume and LinkedIn positioning
                        </div>
                        <div className="rounded-lg border border-white/10 bg-white/6 px-4 py-3">
                          Certification roadmap review
                        </div>
                        <div className="rounded-lg border border-white/10 bg-white/6 px-4 py-3">
                          Mock interview feedback
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[16px] border border-white/12 bg-white/8 p-5">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-10 w-10 rounded-lg bg-white/12 p-2 text-brand-blue-bright" />
                        <div>
                          <div className="text-sm text-white/76">Hiring Network</div>
                          <div className="text-xl font-semibold">Amazon · Microsoft · IBM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {heroStats.map((item) => (
            <AnimatedCounter key={item.label} value={item.value} suffix={item.suffix} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
