"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { hasMyLearningCourses } from "@/lib/my-learning";

export function ProtectedRouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthReady, openAuthModal, user } = useAuth();
  const redirectedRef = useRef(false);
  const hasGuestAccess = isAuthReady && !user ? hasMyLearningCourses() : false;

  useEffect(() => {
    if (!isAuthReady || user || hasGuestAccess || redirectedRef.current) {
      return;
    }

    redirectedRef.current = true;
    openAuthModal("login", pathname);
    router.replace("/");
  }, [hasGuestAccess, isAuthReady, openAuthModal, pathname, router, user]);

  if (!isAuthReady) {
    return null;
  }

  if (!user && !hasGuestAccess) {
    return null;
  }

  return <>{children}</>;
}
