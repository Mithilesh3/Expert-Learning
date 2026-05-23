import { ArrowRight } from "lucide-react";
import { DemoModalTrigger } from "@/components/demo/demo-modal-trigger";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { getHeroStats } from "@/lib/hero-stats";

const techPills = ["AWS", "Azure", "AI / ML", "DevOps", "Python", "Kubernetes", "Docker"];

export async function HeroSection() {
  const stats = await getHeroStats();

  return (
    <section className="relative overflow-hidden bg-[#111827] px-4 pt-[54px] pb-[0px] sm:px-6 lg:px-9 lg:pt-[64px]">
      <div
        className="pointer-events-none absolute top-[-60px] right-[-60px] h-[280px] w-[280px] rounded-full bg-[rgba(249,115,22,0.06)]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto max-w-[860px] text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(249,115,22,0.18)] bg-[rgba(249,115,22,0.08)] px-4 py-1.5 text-[12px] uppercase tracking-[0.08em] text-[#FB923C]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
              Summer 2026 Batch - Admissions Open
            </div>

            <h1 className="mx-auto mt-7 max-w-[740px] text-[27px] font-semibold leading-[1.24] tracking-[-0.03em] text-[#F8FAFC] sm:text-[36px] lg:text-[44px]">
              Choose the right Cloud, AI &amp; DevOps path for your next{" "}
              <span className="text-[#F97316]">certification.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-[620px] text-[13px] leading-[1.85] text-[#7C8AA5] sm:text-[14px]">
              Explore industry-ready training programs, compare paths quickly, and move from interest to enrollment with a cleaner, faster learning experience.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {techPills.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-[rgba(255,255,255,0.11)] bg-[rgba(255,255,255,0.03)] px-5 py-2 text-[13px] text-[#D7E0EF] transition-colors duration-150 hover:border-[rgba(249,115,22,0.34)] hover:text-white"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink
                href="/courses"
                className="rounded-[14px] border-0 bg-[#F97316] px-8 py-4 text-[17px] font-medium text-white shadow-[0_18px_40px_rgba(249,115,22,0.22)] hover:bg-[#EA580C]"
              >
                Explore Courses
                <ArrowRight className="h-4.5 w-4.5" />
              </ButtonLink>

              <DemoModalTrigger
                variant="secondary"
                className="rounded-[14px] border border-[rgba(255,255,255,0.12)] bg-transparent px-8 py-4 text-[17px] text-[#F8FAFC] hover:border-[rgba(255,255,255,0.24)] hover:text-white"
                source="Homepage Hero Admissions"
                title="Talk to admissions"
                description="Share your preferred course and we will help you pick the right learning and certification path."
              >
                Talk to Admissions
              </DemoModalTrigger>
            </div>

            <div className="mt-11 flex flex-wrap items-center justify-center gap-4 text-[13px] text-[#A5B4CF]">
              <div className="flex -space-x-2">
                {["RK", "AS", "RN", "NK", "VT"].map((initials, index) => (
                  <span
                    key={initials}
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#111827] text-[11px] font-semibold text-white ${
                      index === 0
                        ? "bg-[#6366F1]"
                        : index === 1
                          ? "bg-[#059669]"
                          : index === 2
                            ? "bg-[#EF4444]"
                            : index === 3
                              ? "bg-[#F97316]"
                              : "bg-[#0EA5E9]"
                    }`}
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <div>
                <span className="font-semibold text-[#F8FAFC]">6000+</span> students enrolled
              </div>
              <div className="flex items-center gap-1 text-[#F59E0B]">
                <span>★★★★★</span>
                <span className="text-[#F8FAFC]">4.8</span>
                <span className="text-[#A5B4CF]">average rating</span>
              </div>
            </div>
          </div>
        </Reveal>

        {stats ? (
          <Reveal>
            <div className="mt-16 overflow-hidden rounded-t-[24px] border border-b-0 border-[rgba(255,255,255,0.08)] bg-[rgba(7,12,24,0.34)]">
              <div className="grid grid-cols-2 sm:grid-cols-4">
                {stats.map((item, index) => (
                  <div
                    key={item.label}
                    className={`px-5 py-8 text-center border-[rgba(255,255,255,0.08)] ${
                      index % 2 === 0 ? "border-r" : ""
                    } ${index < 2 ? "border-b sm:border-b-0" : ""} ${index < stats.length - 1 ? "sm:border-r" : ""}`}
                  >
                    <div className="text-[42px] font-semibold leading-none tracking-[-0.04em] text-[#F8FAFC] sm:text-[44px]">
                      {item.value.endsWith("+") ? (
                        <>
                          {item.value.replace("+", "")}
                          <span className="text-[#F97316]">+</span>
                        </>
                      ) : item.value.includes("%") ? (
                        <>
                          {item.value.replace("%", "")}
                          <span className="text-[#F97316]">%</span>
                        </>
                      ) : item.value.includes("*") ? (
                        <>
                          {item.value.replace("*", "")}
                          <span className="text-[#F97316]">*</span>
                        </>
                      ) : (
                        item.value
                      )}
                    </div>
                    <div className="mt-3 text-[14px] text-[#8EA0BE]">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 border-t border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-6 py-4 text-[12px] text-[#8EA0BE] sm:flex-row sm:items-center sm:justify-between">
                <span>Trusted by learners across cloud, AI, and DevOps programs worldwide</span>
                <span className="text-[#F97316]">Mentor-led · Job-focused · Industry certified</span>
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
