import { MapPin, BriefcaseBusiness } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { careerOpenings } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata = buildMetadata({
  title: "Career | GenZNext Research & Training",
  description:
    "Explore open roles and join the team building premium cloud and AI education experiences.",
  path: "/career",
});

export default function CareerPage() {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-5xl space-y-5">
        <h1 className="sr-only">Career openings at GenZNext Research &amp; Training</h1>
        {careerOpenings.map((role, index) => (
          <Reveal key={role.slug} delay={index * 0.06}>
            <div className="glass-panel flex flex-col gap-5 rounded-[30px] border border-border p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground sm:text-[22px]">{role.title}</h2>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-brand-blue" />
                    {role.location}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <BriefcaseBusiness className="h-4 w-4 text-brand-blue" />
                    {role.type}
                  </span>
                </div>
              </div>
              <ButtonLink
                href={`/career/apply/${role.slug}`}
                variant="amber"
                className="min-h-11 min-w-[88px] rounded-2xl px-6 py-3.5 text-base"
              >
                Apply
              </ButtonLink>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
