import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/page-hero";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { IconCard } from "@/components/ui/icon-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { IconKey } from "@/lib/icon-map";

const aboutStats = [
  { value: 1500, suffix: "+", label: "learners trained" },
  { value: 40, suffix: "+", label: "live batches delivered" },
  { value: 4.8, suffix: "/5", label: "average learner rating" },
  { value: 25, suffix: "+", label: "career-focused programs" },
] as const;

const aboutFeatureCards: Array<{
  title: string;
  description: string;
  icon: IconKey;
}> = [
  {
    title: "Industry Mentorship",
    description:
      "Learn directly from cloud architects, DevOps engineers, and AI practitioners working on real production systems.",
    icon: "guidance",
  },
  {
    title: "Real-World Projects",
    description:
      "Build hands-on projects inspired by enterprise workflows across cloud, automation, and AI technologies.",
    icon: "code",
  },
  {
    title: "Career Support",
    description:
      "Get resume guidance, mock interviews, certification preparation, and structured career mentorship.",
    icon: "briefcase",
  },
  {
    title: "Continuous Learning Access",
    description:
      "Access updated learning resources, revision materials, and platform improvements throughout your journey.",
    icon: "support",
  },
];

export const metadata = buildMetadata({
  title: "About Us | GenZNext Research & Training",
  description:
    "Learn how GenZNext Research & Training helps students and professionals build industry-ready careers in Cloud, AI, and DevOps.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About GenZNext Research & Training"
        title="Building industry-ready careers in Cloud, AI & DevOps"
        description="GenZNext Research & Training helps students and professionals gain practical, job-focused skills through real-world projects, live mentorship, certification preparation, and enterprise-aligned learning paths."
        primaryCta={{ label: "Explore Courses", href: "/courses" }}
        secondaryCta={{ label: "Contact Admissions", href: "/contact" }}
      />
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Why GenZNext"
              title="Practical training built around real hiring expectations"
              description="We focus on applied learning that helps students and professionals move beyond theory and build confidence with tools, workflows, and project experience that matter in the job market."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="surface-card p-6 sm:p-8">
              <p className="text-base leading-8 text-brand-text">
                Our programs are designed to connect certification goals with practical execution. Learners work through guided projects, structured mentorship, and industry-aligned learning paths that reflect modern cloud and AI delivery standards.
              </p>
              <p className="mt-5 text-sm leading-7 text-brand-muted">
                From first-time aspirants to working professionals, GenZNext creates focused learning experiences that help people build credible skills, stronger portfolios, and better career direction.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
          {aboutStats.map((item) => (
            <AnimatedCounter key={item.label} value={item.value} suffix={item.suffix} label={item.label} />
          ))}
        </div>
      </section>
      <section className="section-shell px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Our Difference"
              title="A premium learning experience grounded in outcomes"
              description="We combine mentorship, hands-on execution, and career guidance to help learners build skills that feel relevant, credible, and ready for real opportunities."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {aboutFeatureCards.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <IconCard {...item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
