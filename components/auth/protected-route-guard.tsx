"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { getMyEnrollments, logFirestoreIssue } from "@/lib/firebase";

function requiresActiveEnrollment(pathname: string) {
  return pathname.startsWith("/dashboard");
}

export function ProtectedRouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthReady, user } = useAuth();
  const redirectedRef = useRef(false);
  const [enrollmentCheck, setEnrollmentCheck] = useState<{
    userId: string;
    hasActiveEnrollment: boolean | null;
  } | null>(null);
  const enrollmentRequired = requiresActiveEnrollment(pathname);
  const hasActiveEnrollment =
    user
      ? !enrollmentRequired
        ? true
        : enrollmentCheck?.userId === user.uid
          ? enrollmentCheck.hasActiveEnrollment
          : null
      : false;

  useEffect(() => {
    let active = true;
    let frame = 0;

    if (!isAuthReady) {
      return () => undefined;
    }

    if (!user || !enrollmentRequired) {
      return () => undefined;
    }

    frame = window.requestAnimationFrame(() => {
      if (!active) {
        return;
      }

      setEnrollmentCheck({
        userId: user.uid,
        hasActiveEnrollment: null,
      });
    });

    void (async () => {
      try {
        const enrollments = await getMyEnrollments(user.uid);

        if (!active) {
          return;
        }

        setEnrollmentCheck({
          userId: user.uid,
          hasActiveEnrollment: enrollments.length > 0,
        });
      } catch (error) {
        if (!active) {
          return;
        }

        logFirestoreIssue("[Protected Route Guard] Unable to verify active enrollments", error);
        setEnrollmentCheck({
          userId: user.uid,
          hasActiveEnrollment: false,
        });
      }
    })();

    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
    };
  }, [enrollmentRequired, isAuthReady, user]);

  useEffect(() => {
    if (!isAuthReady || hasActiveEnrollment === null || redirectedRef.current) {
      return;
    }

    if (!user || !hasActiveEnrollment) {
      redirectedRef.current = true;
      router.replace("/");
    }
  }, [hasActiveEnrollment, isAuthReady, router, user]);

  if (!isAuthReady || hasActiveEnrollment === null) {
    return null;
  }

  if (!user || !hasActiveEnrollment) {
    return null;
  }

  return <>{children}</>;
}
