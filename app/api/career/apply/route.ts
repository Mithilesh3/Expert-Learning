import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { careerOpenings } from "@/data/site";
import { sendCareerApplicationEmail } from "@/lib/services/email";
import { careerApplicationSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = careerApplicationSchema.parse(await request.json());
    const matchedRole = careerOpenings.find((role) => role.slug === body.roleSlug);

    if (!matchedRole) {
      throw new Error("This career opening is no longer available.");
    }

    await sendCareerApplicationEmail({
      ...body,
      roleTitle: matchedRole.title,
    });

    return NextResponse.json({
      success: true,
      message: "Your application has been submitted successfully. Our team will review it shortly.",
    });
  } catch (error) {
    console.error("[Career Application API] submission failed", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields correctly before submitting your application.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to submit your application right now.",
      },
      { status: 502 },
    );
  }
}
