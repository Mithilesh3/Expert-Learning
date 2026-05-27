import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import {
  courseCategories,
  coursesByCategory,
  getCategoryData,
  getCategoryExperienceContent,
  type CourseCategoryKey,
} from "@/data/courses";
import { Reveal } from "@/components/ui/reveal";
import { CourseGrid } from "@/sections/shared/course-grid";

type PageProps = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return courseCategories.map((category) => ({ category: category.key }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const categoryData = getCategoryData(category);
  const experienceContent = getCategoryExperienceContent(category);

  if (!categoryData) {
    return buildMetadata({
      title: "Courses | GenZNext Research & Training",
      description: "GenZNext Research & Training professional courses.",
      path: "/courses",
    });
  }

  return buildMetadata({
    title: `${categoryData.title} | GenZNext Research & Training`,
    description: experienceContent?.metadataDescription || categoryData.description,
    path: `/courses/${category}`,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryData = getCategoryData(category);
  const experienceContent = getCategoryExperienceContent(category);

  if (!categoryData || !experienceContent) {
    notFound();
  }

  const courses = coursesByCategory[category as CourseCategoryKey];
  const refinedCategories = new Set(["aws", "azure", "ai", "devops"]);
  const featuredSlug = refinedCategories.has(category)
    ? courses.find((course) => course.tagLabel.toLowerCase().includes("popular"))?.slug || courses[0]?.slug
    : courses[0]?.slug;

  return (
    <>
      <section id="course-listing" className="scroll-mt-24 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="glass-panel-dark rounded-[22px] px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-5">
              <div className="max-w-[640px]">
                <div className="section-label">{experienceContent.sectionEyebrow}</div>
                <h2 className="mt-2 text-2xl font-medium leading-[1.04] tracking-[-0.04em] text-white sm:text-3xl lg:text-4xl">
                  {experienceContent.sectionTitle}
                </h2>
                <p className="mt-2.5 max-w-[580px] text-[13px] leading-[1.7] text-[#B6C2D7] sm:text-[14px]">
                  {experienceContent.sectionDescription}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-5 sm:mt-6">
            <CourseGrid
              courses={courses}
              featuredSlug={featuredSlug}
              variant={refinedCategories.has(category) ? "refined" : "default"}
            />
          </div>
        </div>
      </section>
    </>
  );
}
