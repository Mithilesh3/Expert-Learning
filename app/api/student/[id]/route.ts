import { NextResponse } from "next/server";
import { isConfiguredAdminUser, verifyFirebaseBearerToken } from "@/lib/server/firebase-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

function normalizePhoneNumber(value: string | null | undefined) {
  const digits = (value || "").replace(/\D/g, "");
  return digits.length > 10 ? digits.slice(-10) : digits;
}

function isStudentOwner(
  authUser: NonNullable<Awaited<ReturnType<typeof verifyFirebaseBearerToken>>>,
  student: { email?: string | null; phone?: string | null },
) {
  const studentEmail = student.email?.trim().toLowerCase() || "";
  const studentPhone = normalizePhoneNumber(student.phone);
  const authPhone = normalizePhoneNumber(authUser.phoneNumber);

  return Boolean(
    (studentEmail && authUser.email === studentEmail) ||
      (studentPhone && authPhone && studentPhone === authPhone),
  );
}

export async function GET(request: Request, context: RouteContext) {
  const authUser = await verifyFirebaseBearerToken(request);

  if (!authUser) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { success: false, message: "Supabase is not configured for student profiles." },
      { status: 503 },
    );
  }

  const { id } = await context.params;

  const { data: student, error: studentError } = await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (studentError || !student) {
    return NextResponse.json(
      { success: false, message: "Student profile not found." },
      { status: 404 },
    );
  }

  if (!isConfiguredAdminUser(authUser) && !isStudentOwner(authUser, student)) {
    return NextResponse.json(
      { success: false, message: "Forbidden" },
      { status: 403 },
    );
  }

  const { data: enrollments, error: enrollmentError } = await supabase
    .from("enrollments")
    .select("*")
    .eq("student_id", id)
    .order("enrolled_at", { ascending: false });

  if (enrollmentError) {
    return NextResponse.json(
      { success: false, message: "Student profile not found." },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    student,
    enrollments,
  });
}
