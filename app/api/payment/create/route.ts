import { NextResponse } from "next/server";
import { getCourseBySlug, parsePriceToPaise } from "@/lib/course-catalog";
import { env } from "@/lib/env";
import { getRazorpayClient } from "@/lib/services/payments";
import { paymentCreateSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = paymentCreateSchema.parse(await request.json());
    const razorpay = getRazorpayClient();
    const course = getCourseBySlug(body.courseSlug);

    if (!course) {
      return NextResponse.json({ success: false, message: "Course not found." }, { status: 404 });
    }

    const amount = parsePriceToPaise(course.price);

    if (!amount || !razorpay) {
      return NextResponse.json(
        { success: false, message: "Razorpay is not configured for this environment." },
        { status: 503 },
      );
    }

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `${body.courseSlug}-${Date.now()}`,
      notes: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        courseSlug: body.courseSlug,
      },
    });

    return NextResponse.json({
      success: true,
      keyId: env.nextPublicRazorpayKeyId,
      order,
      course,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Unable to create payment order." },
      { status: 400 },
    );
  }
}
