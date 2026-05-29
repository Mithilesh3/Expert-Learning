import { Reveal } from "@/components/ui/reveal";

const stats = [
  { value: "500+", label: "Learners" },
  { value: "40+", label: "Courses" },
  { value: "98%", label: "Certification-focused curriculum" },
  { value: "4.8", label: "Average rating" },
];

export async function StatsSection() {
  return (
    <section className="px-4 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <article
                key={item.label}
                className="rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,255,255,0.84))] p-5 shadow-[0_16px_36px_rgba(2,6,23,0.16)]"
              >
                <p className="text-3xl font-semibold tracking-[-0.03em] text-slate-900">{item.value}</p>
                <p className="mt-1.5 text-sm text-slate-600">{item.label}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
