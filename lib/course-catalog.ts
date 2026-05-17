import { allCourses } from "@/data/courses";

export function getCourseBySlug(slug: string) {
  return allCourses.find((course) => course.slug === slug);
}

export function listCoursesForApi() {
  return allCourses.map((course) => ({
    slug: course.slug,
    title: course.title,
    subtitle: course.subtitle,
    rating: course.rating,
    duration: course.duration,
    level: course.level,
    price: course.price,
    highlight: course.highlight,
    category: course.category,
    tags: course.tags,
  }));
}

export function parsePriceToPaise(price: string) {
  if (/custom/i.test(price)) {
    return null;
  }

  const normalized = price.replace(/[^\d]/g, "");

  if (!normalized) {
    return null;
  }

  return Number(normalized) * 100;
}
