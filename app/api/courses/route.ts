import { NextResponse } from "next/server";
import { listCoursesForApi } from "@/lib/course-catalog";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createSupabaseAdminClient();

  if (supabase) {
    const { data, error } = await supabase.from("courses").select("*");

    if (!error && data) {
      return NextResponse.json({ success: true, source: "supabase", courses: data });
    }
  }

  return NextResponse.json({
    success: true,
    source: "local",
    courses: listCoursesForApi(),
  });
}
