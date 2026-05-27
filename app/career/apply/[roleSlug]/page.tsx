import { notFound } from "next/navigation";
import { MapPin, BriefcaseBusiness } from "lucide-react";
import { CareerApplicationForm } from "@/components/forms/career-application-form";
import { Reveal } from "@/components/ui/reveal";
import { careerOpenings } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Career Application | GenZNext Research & Training",
  description:
    "Apply for open roles at GenZNext Research & Training and share your details directly with our support team.",
  path: "/career/apply",
});

type CareerApplyPageProps = {
  params: Promise<{
    roleSlug: string;
  }>;
};

export default async function CareerApplyPage({ params }: CareerApplyPageProps) {
  const { roleSlug } = await params;
  const role = careerOpenings.find((item) => item.slug === roleSlug);

  if (!role) {
    notFound();
  }

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
        <Reveal>
          <div className="surface-card rounded-[28px] p-6 sm:p-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-light/35 bg-brand-blue/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-blue-light">
              Open Position
            </div>
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-white">{role.title}</h2>
            <div className="mt-5 space-y-3 text-sm text-[#D8E1F0]">
              <div className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-blue" />
                {role.location}
              </div>
              <div className="inline-flex items-center gap-2">
                <BriefcaseBusiness className="h-4 w-4 text-brand-blue" />
                {role.type}
              </div>
            </div>
            <p className="mt-6 text-sm leading-7 text-[#D8E1F0]">
              Share your profile, contact details, and a short note about why you&apos;re a fit for
              this role. Your application will be delivered directly to our support team for review.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <CareerApplicationForm roleSlug={role.slug} roleTitle={role.title} />
        </Reveal>
      </div>
    </section>
  );
}
