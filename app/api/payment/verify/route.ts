import { NextResponse } from "next/server";
import { getCourseBySlug, parsePriceToPaise } from "@/lib/course-catalog";
import { captureServerEvent } from "@/lib/services/analytics";
import { sendEnrollmentEmail } from "@/lib/services/email";
import { verifyRazorpaySignature } from "@/lib/services/payments";
import { upsertStudent } from "@/lib/services/students";
import { sendWhatsAppNotification } from "@/lib/services/whatsapp";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { paymentVerifySchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = paymentVerifySchema.parse(await request.json());
    const supabase = createSupabaseAdminClient();
    const course = getCourseBySlug(body.courseSlug);

    if (!supabase) {
      return NextResponse.json(
        { success: false, message: "Supabase is not configured for enrollments." },
        { status: 503 },
      );
    }

    if (!course) {
      return NextResponse.json({ success: false, message: "Course not found." }, { status: 404 });
    }

    const signatureValid = verifyRazorpaySignature({
      orderId: body.razorpay_order_id,
      paymentId: body.razorpay_payment_id,
      signature: body.razorpay_signature,
    });

    if (!signatureValid) {
      return NextResponse.json({ success: false, message: "Invalid payment signature." }, { status: 400 });
    }

    const studentId = await upsertStudent({
      name: body.name,
      email: body.email,
      phone: body.phone,
    });

    const amount = parsePriceToPaise(course.price);
    const amountValue = amount ? Math.round(amount / 100) : null;

    const { data, error } = await supabase
      .from("enrollments")
      .insert({
        student_id: studentId,
        course_slug: body.courseSlug,
        amount: amountValue,
        payment_id: body.razorpay_payment_id,
        status: "active",
      })
      .select("*")
      .single();

    if (error) {
      throw new Error("Unable to create enrollment after payment verification.");
    }

    await Promise.allSettled([
      sendEnrollmentEmail({
        name: body.name,
        email: body.email,
        courseTitle: course.title,
        paymentId: body.razorpay_payment_id,
        amountLabel: course.price,
      }),
      sendWhatsAppNotification({
        phone: body.phone,
        body: `Hi ${body.name}, your enrollment for ${course.title} is confirmed. Payment ID: ${body.razorpay_payment_id}`,
      }),
      captureServerEvent(body.email, "payment_verified", {
        courseSlug: body.courseSlug,
        paymentId: body.razorpay_payment_id,
      }),
    ]);

    return NextResponse.json({ success: true, enrollment: data });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unable to verify payment.",
      },
      { status: 400 },
    );
  }
}
