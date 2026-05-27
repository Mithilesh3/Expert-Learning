import { Reveal } from "@/components/ui/reveal";
import { getHeroStats } from "@/lib/hero-stats";

function renderStatValue(value: string) {
  if (value.endsWith("+")) {
    return (
      <>
        {value.slice(0, -1)}
        <span className="text-[#F97316]">+</span>
      </>
    );
  }

  if (value.endsWith("%")) {
    return (
      <>
        {value.slice(0, -1)}
        <span className="text-[#F97316]">%</span>
      </>
    );
  }

  if (value.endsWith("*")) {
    return (
      <>
        {value.slice(0, -1)}
        <span className="text-[#ff6a00]">★</span>
      </>
    );
  }

  return value;
}

export async function StatsSection() {
  const stats = await getHeroStats();

  if (!stats) {
    return null;
  }

  return (
    <section className="px-4 pb-12 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div
            className="overflow-hidden shadow-[0_18px_40px_rgba(2,8,28,0.28)]"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((item, index) => (
                <div
                  key={item.label}
                  className={`text-center px-[20px] py-[22px] transition-all duration-200 hover:bg-[rgba(255,106,0,0.08)] ${
                    index % 2 === 1 ? "border-l border-l-[rgba(255,255,255,0.08)]" : ""
                  } ${
                    index < 2 ? "border-b border-b-[rgba(255,255,255,0.08)] md:border-b-0" : ""
                  } ${
                    index > 0 ? "md:border-l md:border-l-[rgba(255,255,255,0.08)]" : ""
                  }`}
                >
                  <div className="text-[30px] font-extrabold leading-none tracking-[-0.04em] text-white">
                    {renderStatValue(item.value)}
                  </div>
                  <div className="mt-1.5 text-[12.5px] leading-[1.4] text-[rgba(255,255,255,0.5)]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
