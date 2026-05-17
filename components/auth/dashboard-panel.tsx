"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { buttonLinkClasses } from "@/components/ui/button-link";
import { useAuth } from "@/hooks/use-auth";
import { isFirebaseConfigured } from "@/lib/firebase";

export function DashboardPanel() {
  const router = useRouter();
  const { isAuthReady, openAuthModal, signOutUser, user } = useAuth();

  async function handleLogout() {
    await signOutUser();
    router.push("/");
  }

  if (!isFirebaseConfigured()) {
    return (
      <div className="surface-form rounded-[28px] p-6 sm:p-8">
        <div className="section-label text-[#2563EB]">Student Dashboard</div>
        <h2 className="mt-2 text-[26px] font-bold text-[#0F172A]">Firebase auth setup required</h2>
        <p className="mt-4 text-sm leading-7 text-[#475569]">
          The dashboard is ready for OTP authentication, but Firebase public credentials are missing from the environment.
        </p>
      </div>
    );
  }

  if (!isAuthReady) {
    return (
      <div className="surface-form rounded-[28px] p-6 sm:p-8">
        <div className="section-label text-[#2563EB]">Student Dashboard</div>
        <h2 className="mt-2 text-[26px] font-bold text-[#0F172A]">Checking your session</h2>
        <p className="mt-4 text-sm leading-7 text-[#475569]">
          We are confirming your secure Firebase session.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="surface-form rounded-[28px] p-6 sm:p-8">
        <div className="section-label text-[#2563EB]">Student Dashboard</div>
        <h2 className="mt-2 text-[26px] font-bold text-[#0F172A]">Sign in to continue</h2>
        <p className="mt-4 text-sm leading-7 text-[#475569]">
          Use your mobile OTP login to access dashboard features, enrollment status, and future learning records.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => openAuthModal("login", "/dashboard")}
            className={buttonLinkClasses("primary")}
          >
            Login with OTP
          </button>
          <button
            type="button"
            onClick={() => openAuthModal("signup", "/dashboard")}
            className={buttonLinkClasses("outline")}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="surface-form rounded-[28px] p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="section-label text-[#2563EB]">Student Dashboard</div>
          <h2 className="mt-2 text-[26px] font-bold text-[#0F172A]">
            Welcome back{user.displayName ? `, ${user.displayName}` : ""}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#475569]">
            Your Firebase mobile session is active and ready for dashboard experiences, enrollments, and learner updates.
          </p>
        </div>
        <button type="button" onClick={() => void handleLogout()} className={buttonLinkClasses("outline")}>
          Logout
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="surface-card rounded-[22px] p-4">
          <div className="form-label text-[#64748B]">Mobile</div>
          <div className="text-sm font-medium text-[#0F172A]">{user.phoneNumber || "Not available"}</div>
        </div>
        <div className="surface-card rounded-[22px] p-4">
          <div className="form-label text-[#64748B]">Student ID</div>
          <div className="mono-meta text-sm text-[#0F172A]">{user.uid}</div>
        </div>
        <div className="surface-card rounded-[22px] p-4">
          <div className="form-label text-[#64748B]">Profile</div>
          <div className="text-sm font-medium text-[#0F172A]">{user.displayName || "Learner account"}</div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/courses" className={buttonLinkClasses("primary")}>
          Explore Courses
        </Link>
        <Link href="/contact" className={buttonLinkClasses("outline")}>
          Talk to Admissions
        </Link>
      </div>
    </div>
  );
}
