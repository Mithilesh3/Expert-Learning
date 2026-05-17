import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { captureServerEvent } from "@/lib/services/analytics";
import { pushLeadToAirtable } from "@/lib/services/airtable";
import { sendLeadEmails } from "@/lib/services/email";
import { leadSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = leadSchema.parse(await request.json());
    const supabase = createSupabaseAdminClient();

    if (supabase) {
      const { error } = await supabase.from("leads").insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        course: body.course,
        message: body.message || "",
      });

      if (error) {
        throw new Error("Unable to save lead in Supabase.");
      }
    }

    await Promise.allSettled([
      sendLeadEmails(body),
      pushLeadToAirtable({
        name: body.name,
        email: body.email,
        phone: body.phone,
        course: body.course,
        message: body.message || "",
      }),
      captureServerEvent(body.email, "lead_submitted", {
        course: body.course,
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Lead submitted successfully.",
      mode: supabase ? "live" : "mock",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unable to submit lead.",
      },
      { status: 400 },
    );
  }
}
