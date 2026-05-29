"use client";

import {
  BookOpenCheck,
  CalendarDays,
  LoaderCircle,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  getMyEnrollments,
  getUserProfile,
  logFirestoreIssue,
  type AppUserProfile,
} from "@/lib/firebase";
import { readEnrolledCourses } from "@/lib/my-learning";
import { getCanonicalCourseId } from "@/lib/offering-catalog";

function getInitials(source?: string | null) {
  if (!source) {
    return "GZ";
  }

  const words = source
    .trim()
    .replace(/[@._-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  return source.trim().slice(0, 2).toUpperCase() || "GZ";
}

function formatMemberSince(value: string | null) {
  if (!value) {
    return "Recently joined";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

function getPhoneFromEmail(email?: string | null) {
  if (!email || !email.endsWith("@genznext.app")) {
    return "";
  }

  return email.replace("@genznext.app", "");
}

export function ProfilePanel() {
  const { isAuthReady, openAuthModal, user } = useAuth();
  const [profile, setProfile] = useState<AppUserProfile | null>(null);
  const [courseCount, setCourseCount] = useState(0);
  const [memberSince, setMemberSince] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    let active = true;
    const frame = window.requestAnimationFrame(() => {
      if (active) {
        setLoading(true);
      }
    });

    void (async () => {
      try {
        const [nextProfile, enrollments] = await Promise.all([
          getUserProfile(user.uid),
          getMyEnrollments(user.uid),
        ]);

        if (!active) {
          return;
        }

        const deviceCourses = readEnrolledCourses();
        const uniqueCourseIds = new Set([
          ...enrollments.map((enrollment) => getCanonicalCourseId(enrollment.courseId)),
          ...deviceCourses.map((course) => getCanonicalCourseId(course.courseSlug)),
        ]);
        const timeline = [
          nextProfile?.createdAt,
          user.metadata.creationTime ? new Date(user.metadata.creationTime).toISOString() : null,
          ...enrollments.map((enrollment) => enrollment.enrolledAt),
          ...deviceCourses.map((course) => course.enrolledAt),
        ]
          .filter((value): value is string => Boolean(value))
          .sort((left, right) => new Date(left).getTime() - new Date(right).getTime());

        setProfile(nextProfile);
        setCourseCount(uniqueCourseIds.size);
        setMemberSince(timeline[0] || new Date().toISOString());
      } catch (error) {
        if (!active) {
          return;
        }

        logFirestoreIssue("[Profile] Unable to load learner profile", error);
        const deviceCourses = readEnrolledCourses();
        const uniqueCourseIds = new Set(deviceCourses.map((course) => getCanonicalCourseId(course.courseSlug)));
        const fallbackDates = deviceCourses
          .map((course) => course.enrolledAt)
          .filter(Boolean)
          .sort((left, right) => new Date(left).getTime() - new Date(right).getTime());

        setCourseCount(uniqueCourseIds.size);
        setMemberSince(fallbackDates[0] || new Date().toISOString());
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    })();

    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
    };
  }, [user]);

  if (!isAuthReady || (user && loading)) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#F8FAFC] px-4 py-10">
        <div className="inline-flex items-center gap-3 rounded-[18px] border border-[#E5E7EB] bg-white px-5 py-4 text-sm text-[#4B5563] shadow-[0_16px_36px_rgba(15,23,42,0.08)]">
          <LoaderCircle className="h-4 w-4 animate-spin text-[#4F46E5]" />
          Loading your profile...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <main className="min-h-full bg-[#F8FAFC] px-4 py-8 text-[#111827] sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.08)] sm:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7C3AED]">Profile</div>
          <h1 className="mt-3 text-[30px] font-semibold leading-[1.1] text-[#111827]">Sign in to manage your profile</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[#4B5563]">
            Your learner profile, enrolled courses, and dashboard access will stay synced once you sign in.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openAuthModal("login", "/dashboard/profile")}
              className="inline-flex items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#5B5BF6_0%,#2563EB_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(79,70,229,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(79,70,229,0.28)]"
            >
              Continue with Login
            </button>
            <Link
              href="/dashboard/courses"
              className="inline-flex items-center justify-center rounded-[14px] border border-[#E5E7EB] bg-white px-5 py-3 text-sm font-medium text-[#111827] transition hover:bg-[#EEF2FF]"
            >
              Back to My Courses
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const displayName = user.displayName || profile?.name || "GenZNext Learner";
  const displayEmail = user.email && !user.email.endsWith("@genznext.app") ? user.email : profile?.email || "";
  const displayPhone = user.phoneNumber || profile?.phone || getPhoneFromEmail(user.email) || "Not added yet";
  const displayInitials = getInitials(displayName || displayEmail || displayPhone);
  const usesGoogleLogin = (profile?.authMethod as string | undefined) === "google"
    || user.providerData.some((provider) => provider.providerId === "google.com")
    || Boolean(displayEmail);
  const loginMethodLabel = usesGoogleLogin ? "Google login" : "Mobile login";
  const loginMethodValue = usesGoogleLogin ? displayEmail || "Gmail not added yet" : displayPhone;
  const learningStatus = courseCount > 0 ? "Active Learner" : "Learner Profile";

  return (
    <main className="min-h-full bg-[#F5F7FB] px-4 py-8 text-[#111827] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-5">
        <section className="rounded-[26px] border border-[#E5E7EB] bg-white p-4 shadow-[0_16px_36px_rgba(15,23,42,0.08)] sm:p-5">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7C3AED]">Profile</div>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="inline-flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#5B5BF6_0%,#4F46E5_100%)] text-base font-semibold tracking-[0.08em] text-white shadow-[0_10px_22px_rgba(79,70,229,0.18)] sm:h-[60px] sm:w-[60px]">
                {displayInitials}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-[31px] font-semibold leading-[1.05] text-[#111827]">{displayName}</h1>
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {learningStatus}
                  </span>
                </div>
                <div className="mt-2 flex flex-col gap-2 text-sm text-[#4B5563] sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                  <span className="inline-flex items-center gap-2">
                    {usesGoogleLogin ? <Mail className="h-4 w-4 text-[#7C3AED]" /> : <Phone className="h-4 w-4 text-[#7C3AED]" />}
                    <span>
                      <span className="text-[#6B7280]">{loginMethodLabel}:</span> {loginMethodValue}
                    </span>
                  </span>
                </div>
                <div className="mt-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#C7D2FE] bg-[#EEF2FF] px-3 py-1 text-[12px] font-semibold text-[#4338CA] shadow-[0_6px_14px_rgba(79,70,229,0.08)]">
                    <BookOpenCheck className="h-3.5 w-3.5" />
                    {courseCount} Active Course{courseCount === 1 ? "" : "s"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:self-start">
              <Link
                href="/dashboard/courses"
                className="inline-flex items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#5B5BF6_0%,#2563EB_100%)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(79,70,229,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(79,70,229,0.28)]"
              >
                My Courses
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          <div className="rounded-[22px] border border-[#E5E7EB] bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,rgba(91,91,246,0.14),rgba(37,99,235,0.10))] text-[#4F46E5] shadow-[0_6px_14px_rgba(79,70,229,0.08)]">
              <BookOpenCheck className="h-4 w-4" />
            </div>
            <div className="mt-2.5 text-[24px] font-semibold leading-none text-[#111827]">{courseCount}</div>
            <div className="mt-1 text-sm font-medium text-[#4B5563]">Active Courses</div>
          </div>

          <div className="rounded-[22px] border border-[#E5E7EB] bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,rgba(16,185,129,0.14),rgba(52,211,153,0.10))] text-emerald-600 shadow-[0_6px_14px_rgba(16,185,129,0.08)]">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="mt-2.5 inline-flex items-center gap-2 text-sm font-semibold text-[#111827]">
              {learningStatus}
            </div>
            <div className="mt-1 text-sm text-[#4B5563]">Learning Status</div>
          </div>

          <div className="rounded-[22px] border border-[#E5E7EB] bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,rgba(91,91,246,0.14),rgba(37,99,235,0.10))] text-[#4F46E5] shadow-[0_6px_14px_rgba(79,70,229,0.08)]">
              <CalendarDays className="h-4 w-4 text-[#7C3AED]" />
            </div>
            <div className="mt-2.5 text-sm font-semibold text-[#111827]">{formatMemberSince(memberSince)}</div>
            <div className="mt-1 text-sm text-[#4B5563]">Member Since</div>
          </div>
        </section>
      </div>
    </main>
  );
}
