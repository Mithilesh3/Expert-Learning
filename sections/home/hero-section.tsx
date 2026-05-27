import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";

const techPills = [
  { label: "AWS" },
  { label: "Azure" },
  { label: "AI / ML" },
  { label: "DevOps" },
  { label: "Python" },
  { label: "Kubernetes" },
  { label: "Docker" },
];

export function HeroSection() {
  return (
    <section className="hero-home relative overflow-hidden bg-[#0d1117] px-4 py-16 sm:px-12 sm:py-20 lg:px-12 lg:pt-[80px] lg:pb-[72px]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:44px_44px]" />
        <div className="absolute top-[-150px] right-[-100px] h-[500px] w-[500px] bg-[radial-gradient(circle,rgba(249,115,22,0.07)_0%,transparent_65%)]" />
        <div className="absolute bottom-[-100px] left-[-80px] h-[400px] w-[400px] bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_65%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[680px] text-center">
        <Reveal>
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[rgba(255,100,0,0.4)] bg-[rgba(255,255,255,0.03)] px-3.5 py-1.5 text-[10px] uppercase tracking-[0.12em] text-[#ff9a5c]">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              Summer 2026 Batch - Admissions Open
            </div>

            <h1 className="mb-5 text-[38px] font-extrabold leading-[1.12] tracking-[-0.04em] text-white sm:text-[42px] lg:text-[48px]">
              Choose the right Cloud, AI &amp;
              <br />
              DevOps path for your next
              <br />
              <span className="text-[#F97316]">certification.</span>
            </h1>

            <p className="mb-8 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Explore industry-ready training programs, compare paths quickly, and move from interest to enrollment with a cleaner, faster learning experience.
            </p>

            <div className="mb-9 flex flex-wrap items-center justify-center gap-2.5">
              {techPills.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center rounded-[24px] border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.07)] px-[18px] py-[7px] text-[13.5px] text-[#D7E0EF] backdrop-blur-xl"
                >
                  {item.label}
                </span>
              ))}
            </div>

            <div className="mb-11 flex justify-center">
              <ButtonLink
                href="/courses"
                className="min-h-[56px] min-w-[228px] rounded-[14px] border-0 bg-[linear-gradient(135deg,#F97316,#EA580C)] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_20px_44px_rgba(249,115,22,0.28),0_0_28px_rgba(249,115,22,0.16)] hover:bg-[#ea580c] hover:shadow-[0_24px_54px_rgba(249,115,22,0.34),0_0_34px_rgba(249,115,22,0.2)] sm:min-w-[240px] sm:text-[16px]"
              >
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[11px] text-[#A5B4CF] sm:text-[13px]">
              <div className="flex -space-x-[10px]">
                {["RK", "AS", "RN", "NK", "VT"].map((initials, index) => (
                  <span
                    key={initials}
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#0f172a] text-[9px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[10px] ${
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
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span>
                  <span className="font-semibold text-[#F8FAFC]">500+</span> students enrolled
                </span>
                <span className="text-[#64748b]">·</span>
                <span className="flex items-center gap-1">
                  <span className="text-[#ff6a00]">★★★★★</span>
                  <span>
                    <span className="font-semibold text-[#F8FAFC]">4.8</span> average rating
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
