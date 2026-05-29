import { allCourses, type CourseLesson, type CourseResource } from "@/data/courses";

export type LmsResourceType = "youtube" | "official-docs" | "pdf-notes" | "assignments" | "certification-guides";

export type LmsMockModule = {
  id: string;
  title:
    | "Overview"
    | "Recorded YouTube Lessons"
    | "Official Learning Resources"
    | "Practice Assignments"
    | "Certification Preparation"
    | "Final Project";
  description: string;
  resources: CourseResource[];
};

export type LmsMockCourse = {
  id: string;
  title: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  level: string;
  status: "active" | "locked";
  slug: string;
  youtubeLessons: CourseLesson[];
  officialResources: CourseResource[];
  lmsResources: CourseResource[];
  modules: LmsMockModule[];
};

function moduleTemplate(slug: string): LmsMockModule[] {
  const course = allCourses.find((item) => item.slug === slug);
  if (!course) return [];

  const officialDocs = course.officialResources.filter((item) => item.type === "official-doc").slice(0, 4);
  const notesAndPdfs = course.lmsResources.filter((item) => item.type === "pdf" || item.type === "notes");
  const assignments = course.lmsResources.filter((item) => item.type === "assignment");
  const guides = course.lmsResources.filter((item) => item.type === "certification-guide");

  return [
    { id: `${slug}-overview`, title: "Overview", description: "Start with goals, roadmap, and mentor guidance.", resources: notesAndPdfs.slice(0, 1) },
    {
      id: `${slug}-youtube`,
      title: "Recorded YouTube Lessons",
      description: "Watch structured prerecorded lessons module-by-module.",
      resources: course.youtubeLessons.map((lesson) => ({
        title: lesson.title,
        description: lesson.description,
        type: "official-doc",
        url: lesson.url,
      })),
    },
    {
      id: `${slug}-official`,
      title: "Official Learning Resources",
      description: "Use official cloud and engineering documentation for deep learning.",
      resources: officialDocs,
    },
    {
      id: `${slug}-assignments`,
      title: "Practice Assignments",
      description: "Complete practical exercises for each key topic.",
      resources: assignments,
    },
    {
      id: `${slug}-cert`,
      title: "Certification Preparation",
      description: "Exam blueprint, revision checklists, and test strategy.",
      resources: guides,
    },
    {
      id: `${slug}-project`,
      title: "Final Project",
      description: "Build a capstone project to demonstrate practical readiness.",
      resources: [
        {
          title: `${course.title} Capstone Brief`,
          description: "Project scope, checklist, and submission rubric.",
          type: "assignment",
          url: "/contact",
        },
      ],
    },
  ];
}

function buildLmsCourse(slug: string, status: "active" | "locked", progress: number, completedLessons: number): LmsMockCourse | null {
  const course = allCourses.find((item) => item.slug === slug);
  if (!course) return null;

  return {
    id: slug,
    slug,
    title: course.title,
    progress,
    completedLessons,
    totalLessons: course.youtubeLessons.length,
    level: course.level,
    status,
    youtubeLessons: course.youtubeLessons,
    officialResources: course.officialResources,
    lmsResources: course.lmsResources,
    modules: moduleTemplate(slug),
  };
}

export const lmsMockCourses: LmsMockCourse[] = allCourses
  .map((course, index) => {
    const active = index < 6;
    const progress = active ? Math.min(60, 15 + index * 7) : 0;
    const completed = active ? Math.min(2, Math.floor(progress / 20)) : 0;
    return buildLmsCourse(course.slug, active ? "active" : "locked", progress, completed);
  })
  .filter((item): item is LmsMockCourse => Boolean(item));

export type LmsMockResource = {
  id: string;
  title: string;
  type: LmsResourceType;
  source: string;
  href: string;
  description: string;
};

function fromLessons(course: LmsMockCourse): LmsMockResource[] {
  return course.youtubeLessons.map((lesson, index) => ({
    id: `${course.slug}-yt-${index + 1}`,
    title: lesson.title,
    type: "youtube",
    source: "YouTube",
    href: lesson.url,
    description: lesson.description,
  }));
}

function fromOfficial(course: LmsMockCourse): LmsMockResource[] {
  return course.officialResources
    .filter((item) => item.type === "official-doc")
    .map((item, index) => ({
      id: `${course.slug}-doc-${index + 1}`,
      title: item.title,
      type: "official-docs",
      source: "Official Docs",
      href: item.url,
      description: item.description,
    }));
}

function fromMaterials(course: LmsMockCourse, type: "pdf-notes" | "assignments" | "certification-guides"): LmsMockResource[] {
  return course.lmsResources
    .filter((item) => {
      if (type === "pdf-notes") return item.type === "pdf" || item.type === "notes";
      if (type === "assignments") return item.type === "assignment";
      return item.type === "certification-guide";
    })
    .map((item, index) => ({
      id: `${course.slug}-${type}-${index + 1}`,
      title: item.title,
      type,
      source: "GenZNext LMS",
      href: item.url,
      description: item.description,
    }));
}

const allLmsResources = lmsMockCourses.flatMap((course) => [
  ...fromLessons(course),
  ...fromOfficial(course),
  ...fromMaterials(course, "pdf-notes"),
  ...fromMaterials(course, "assignments"),
  ...fromMaterials(course, "certification-guides"),
]);

export const lmsOfficialResources: LmsMockResource[] = allLmsResources.filter((item) => item.type === "official-docs");
export const lmsCourseMaterials: LmsMockResource[] = allLmsResources.filter((item) => item.type !== "official-docs" && item.type !== "youtube");
export const lmsResourceLibrary: Record<LmsResourceType, LmsMockResource[]> = {
  youtube: allLmsResources.filter((item) => item.type === "youtube"),
  "official-docs": allLmsResources.filter((item) => item.type === "official-docs"),
  "pdf-notes": allLmsResources.filter((item) => item.type === "pdf-notes"),
  assignments: allLmsResources.filter((item) => item.type === "assignments"),
  "certification-guides": allLmsResources.filter((item) => item.type === "certification-guides"),
};
