"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { getUserProfile, type AppUserProfile } from "@/lib/firebase";
import { env } from "@/lib/env";

function isAdminProfile(profile: AppUserProfile | null, email: string | null | undefined) {
  if (profile?.role === "admin") {
    return true;
  }

  const normalized = (email || "").trim().toLowerCase();
  if (!normalized) {
    return false;
  }

  return env.adminEmails.includes(normalized);
}

export function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthReady } = useAuth();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    if (!isAuthReady) {
      return () => undefined;
    }

    if (!user) {
      router.replace("/");
      return () => undefined;
    }

    void (async () => {
      try {
        const profile = await getUserProfile(user.uid);
        if (!active) {
          return;
        }

        const permitted = isAdminProfile(profile, user.email);
        setAllowed(permitted);
        if (!permitted) {
          router.replace("/");
        }
      } catch {
        if (!active) {
          return;
        }

        setAllowed(false);
        router.replace("/");
      }
    })();

    return () => {
      active = false;
    };
  }, [isAuthReady, router, user]);

  if (!isAuthReady || allowed === null) {
    return null;
  }

  if (!user || !allowed) {
    return null;
  }

  return <>{children}</>;
}

