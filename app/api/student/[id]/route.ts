import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { success: false, message: "Supabase is not configured for student profiles." },
      { status: 503 },
    );
  }

  const { id } = await context.params;

  const [{ data: student, error: studentError }, { data: enrollments, error: enrollmentError }] =
    await Promise.all([
      supabase.from("students").select("*").eq("id", id).maybeSingle(),
      supabase.from("enrollments").select("*").eq("student_id", id).order("enrolled_at", { ascending: false }),
    ]);

  if (studentError || enrollmentError || !student) {
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
