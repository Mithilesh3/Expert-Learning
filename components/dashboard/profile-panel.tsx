"use client";

import { LoaderCircle, Mail, PencilLine, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { getMyEnrollments, getUserProfile, logFirestoreIssue, type AppUserProfile } from "@/lib/firebase";
import { readEnrolledCourses } from "@/lib/my-learning";

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

export function ProfilePanel() {
  const { isAuthReady, openAuthModal, user } = useAuth();
  const [profile, setProfile] = useState<AppUserProfile | null>(null);
  const [courseCount, setCourseCount] = useState(0);
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);
  const [joinedBatch, setJoinedBatch] = useState("Summer 2026");
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
        const [nextProfile, enrollments] = await Promise.all([getUserProfile(user.uid), getMyEnrollments(user.uid)]);

        if (!active) {
          return;
        }

        const deviceCourses = readEnrolledCourses();
        const purchasedCourseLabels = Array.from(
          new Set([
            ...enrollments.map((enrollment) => enrollment.courseName),
            ...deviceCourses.map((course) => course.title),
          ]),
        );

        setProfile(nextProfile);
        setCourseCount(enrollments.length || deviceCourses.length);
        setPurchasedCourses(purchasedCourseLabels);
        setJoinedBatch(deviceCourses[0]?.batch || "Summer 2026");
      } catch (error) {
        if (!active) {
          return;
        }

        logFirestoreIssue("[Profile] Unable to load learner profile", error);
        const deviceCourses = readEnrolledCourses();
        setCourseCount(deviceCourses.length);
        setPurchasedCourses(deviceCourses.map((course) => course.title));
        setJoinedBatch(deviceCourses[0]?.batch || "Summer 2026");
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
      <div className="flex min-h-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_24%),linear-gradient(180deg,#071028_0%,#0B1736_100%)] px-4 py-10">
        <div className="inline-flex items-center gap-3 rounded-[18px] border border-white/10 bg-[rgba(15,23,42,0.82)] px-5 py-4 text-sm text-[#CBD5E1] shadow-[0_20px_48px_rgba(2,6,23,0.32)]">
          <LoaderCircle className="h-4 w-4 animate-spin text-[#F97316]" />
          Loading your profile...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <main className="min-h-full bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_24%),linear-gradient(180deg,#071028_0%,#0B1736_100%)] px-4 py-6 text-white sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(15,23,42,0.74))] p-6 shadow-[0_24px_60px_rgba(2,6,23,0.34)] sm:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FDBA74]">Profile</div>
          <h1 className="mt-3 text-[30px] font-semibold leading-[1.1] text-white">Sign in to manage your profile</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[#B7C3D9]">
            Your enrolled courses are already saved on this device. Sign in to sync your learner identity, contact details, and future course access.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openAuthModal("login", "/dashboard/profile")}
              className="inline-flex items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#F97316,#FB923C)] px-5 py-3 text-sm font-semibold text-white"
            >
              Continue with Login
            </button>
            <Link
              href="/dashboard/courses"
              className="inline-flex items-center justify-center rounded-[14px] border border-[rgba(249,115,22,0.2)] bg-[rgba(249,115,22,0.08)] px-5 py-3 text-sm font-medium text-[#FDBA74]"
            >
              Back to My Courses
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const deviceCourses = readEnrolledCourses();
  const displayName = user.displayName || profile?.name || "GenZNext Learner";
  const displayEmail = user.email || profile?.email || "Not added yet";
  const displayPhone = user.phoneNumber || profile?.phone || "Not added yet";
  const displayInitials = getInitials(displayName || displayEmail || displayPhone);
  const displayCourseCount = courseCount || deviceCourses.length;
  const courseLabels = purchasedCourses.length ? purchasedCourses : deviceCourses.map((course) => course.title);
  const displayJoinedBatch = displayCourseCount ? joinedBatch : "Not assigned yet";

  return (
    <main className="min-h-full bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_24%),linear-gradient(180deg,#071028_0%,#0B1736_100%)] px-4 py-6 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(15,23,42,0.72))] p-6 shadow-[0_24px_60px_rgba(2,6,23,0.34)] sm:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FDBA74]">Profile</div>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] border border-[rgba(249,115,22,0.2)] bg-[rgba(249,115,22,0.12)] text-lg font-semibold tracking-[0.08em] text-[#FDBA74]">
                {displayInitials}
              </div>
              <div>
                <h1 className="text-[28px] font-semibold leading-[1.1] text-white">{displayName}</h1>
                <p className="mt-2 text-sm text-[#B7C3D9]">Manage your learner details and dashboard access.</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-[rgba(249,115,22,0.2)] bg-[rgba(249,115,22,0.08)] px-4 py-2.5 text-sm font-medium text-[#FDBA74] transition hover:border-[rgba(249,115,22,0.3)] hover:bg-[rgba(249,115,22,0.12)]"
              >
                <PencilLine className="h-4 w-4" />
                Edit Profile
              </button>
              <Link
                href="/dashboard/courses"
                className="inline-flex items-center justify-center rounded-[14px] border border-[rgba(249,115,22,0.2)] bg-[rgba(249,115,22,0.08)] px-4 py-2.5 text-sm font-medium text-[#FDBA74] transition hover:border-[rgba(249,115,22,0.3)] hover:bg-[rgba(249,115,22,0.12)]"
              >
                My Courses
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(15,23,42,0.72))] p-5 shadow-[0_18px_42px_rgba(2,6,23,0.3)]">
            <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8FA1BF]">Full Name</div>
            <div className="mt-4 text-sm font-medium text-[#D8E1F0]">{displayName}</div>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(15,23,42,0.72))] p-5 shadow-[0_18px_42px_rgba(2,6,23,0.3)]">
            <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8FA1BF]">Email Address</div>
            <div className="mt-4 flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-[#FDBA74]" />
              <p className="text-sm text-[#D8E1F0]">{displayEmail}</p>
            </div>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(15,23,42,0.72))] p-5 shadow-[0_18px_42px_rgba(2,6,23,0.3)]">
            <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8FA1BF]">Mobile Number</div>
            <div className="mt-4 flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-[#FDBA74]" />
              <p className="text-sm text-[#D8E1F0]">{displayPhone}</p>
            </div>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(15,23,42,0.72))] p-5 shadow-[0_18px_42px_rgba(2,6,23,0.3)]">
            <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8FA1BF]">Joined Batch</div>
            <div className="mt-4 text-sm font-medium text-[#D8E1F0]">{displayJoinedBatch}</div>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(15,23,42,0.72))] p-5 shadow-[0_18px_42px_rgba(2,6,23,0.3)]">
            <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8FA1BF]">Purchased Courses</div>
            <div className="mt-4 text-[28px] font-semibold text-white">{displayCourseCount}</div>
            <p className="mt-2 text-sm text-[#B7C3D9]">Enrolled courses available in your dashboard.</p>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(15,23,42,0.72))] p-5 shadow-[0_18px_42px_rgba(2,6,23,0.3)]">
            <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8FA1BF]">Account Status</div>
            <div className="mt-4 flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-[#34D399]" />
              <div>
                <div className="text-sm font-medium text-white">Active</div>
                <p className="mt-1 text-sm text-[#B7C3D9]">Use Dashboard → My Courses to continue learning.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(15,23,42,0.72))] p-6 shadow-[0_24px_60px_rgba(2,6,23,0.34)] sm:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FDBA74]">Purchased Courses</div>
              <h2 className="mt-3 text-[24px] font-semibold leading-[1.15] text-white">Your enrolled programs</h2>
            </div>
            <div className="rounded-full border border-[rgba(249,115,22,0.16)] bg-[rgba(249,115,22,0.08)] px-3 py-1.5 text-[12px] text-[#FDBA74]">
              {displayCourseCount} active program{displayCourseCount === 1 ? "" : "s"}
            </div>
          </div>

          {courseLabels.length ? (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {courseLabels.map((course) => (
                <div
                  key={course}
                  className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-4 text-sm text-[#D8E1F0] shadow-[0_12px_30px_rgba(2,6,23,0.18)]"
                >
                  <div className="font-medium text-white">{course}</div>
                  <div className="mt-2 text-[#8FA1BF]">Status: Active</div>
                  <div className="mt-1 text-[#8FA1BF]">Batch: {displayJoinedBatch}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-[20px] border border-white/10 bg-white/6 px-5 py-6 text-sm text-[#B7C3D9]">
              You have not purchased any programs yet.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
