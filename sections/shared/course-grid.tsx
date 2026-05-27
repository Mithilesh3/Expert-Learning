"use client";

import { useEffect, useMemo, useState } from "react";
import type { Course } from "@/data/courses";
import { useAuth } from "@/hooks/use-auth";
import { getMyEnrollments, logFirestoreIssue } from "@/lib/firebase";
import { readEnrolledCourseSlugs } from "@/lib/my-learning";
import { CourseCard } from "@/components/ui/course-card";
import { Reveal } from "@/components/ui/reveal";

export function CourseGrid({
  courses,
  featuredSlug,
  variant = "default",
  badgeOverrides,
}: {
  courses: Course[];
  featuredSlug?: string;
  variant?: "default" | "refined";
  badgeOverrides?: Record<string, { label: string; tone: "green" | "orange" | "blue" | "purple" }>;
}) {
  const { isAuthReady, user } = useAuth();
  const [enrolledSlugs, setEnrolledSlugs] = useState<string[]>([]);
  const [remoteEnrolledSlugs, setRemoteEnrolledSlugs] = useState<string[]>([]);

  useEffect(() => {
    function syncEnrolledCourses() {
      if (!isAuthReady || !user) {
        setEnrolledSlugs([]);
        return;
      }

      setEnrolledSlugs(readEnrolledCourseSlugs());
    }

    syncEnrolledCourses();
    window.addEventListener("storage", syncEnrolledCourses);

    return () => window.removeEventListener("storage", syncEnrolledCourses);
  }, [isAuthReady, user]);

  useEffect(() => {
    if (!isAuthReady || !user) {
      const frame = window.requestAnimationFrame(() => {
        setRemoteEnrolledSlugs([]);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    let active = true;
    const frame = window.requestAnimationFrame(() => {
      if (!active) {
        return;
      }
    });

    void (async () => {
      try {
        const enrollments = await getMyEnrollments(user.uid);

        if (!active) {
          return;
        }

        setRemoteEnrolledSlugs(enrollments.map((enrollment) => enrollment.courseId));
      } catch (error) {
        if (!active) {
          return;
        }

        logFirestoreIssue("Unable to load purchase state for course cards.", error);
        setRemoteEnrolledSlugs([]);
      }
    })();

    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
    };
  }, [isAuthReady, user]);

  const enrolledCourseSlugSet = useMemo(
    () => new Set([...enrolledSlugs, ...remoteEnrolledSlugs]),
    [enrolledSlugs, remoteEnrolledSlugs],
  );

  return (
    <div className={variant === "refined" ? "grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 xl:grid-cols-4" : "grid gap-5 md:grid-cols-2 xl:grid-cols-4"}>
      {courses.map((course, index) => (
        <Reveal key={course.slug} delay={index * 0.04} className="h-full">
          <CourseCard
            course={course}
            featured={course.slug === featuredSlug}
            variant={variant}
            badgeOverride={badgeOverrides?.[course.slug]}
            isEnrolled={enrolledCourseSlugSet.has(course.slug)}
          />
        </Reveal>
      ))}
    </div>
  );
}
