import { Resend } from "resend";
import { env, hasResendEnv } from "@/lib/env";

let resendClient: Resend | null = null;

function getResendClient() {
  if (!hasResendEnv) {
    return null;
  }

  if (!resendClient) {
    resendClient = new Resend(env.resendApiKey);
  }

  return resendClient;
}

export async function sendLeadEmails(payload: {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}) {
  const client = getResendClient();

  if (!client) {
    return { skipped: true };
  }

  await Promise.all([
    client.emails.send({
      from: "GenZNext Admissions <noreply@updates.expertlearning.in>",
      to: payload.email,
      subject: "We received your career consultation request",
      html: `
        <p>Hi ${payload.name},</p>
        <p>Thank you for contacting Expert Learning. Our admissions team has received your request for <strong>${payload.course}</strong>.</p>
        <p>We will reach out shortly at ${payload.phone}.</p>
      `,
    }),
    client.emails.send({
      from: "GenZNext Admissions <noreply@updates.expertlearning.in>",
      to: env.admissionsEmail,
      subject: `New lead: ${payload.course}`,
      html: `
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Phone:</strong> ${payload.phone}</p>
        <p><strong>Course:</strong> ${payload.course}</p>
        <p><strong>Message:</strong> ${payload.message || "-"}</p>
      `,
    }),
  ]);
}

export async function sendEnrollmentEmail(payload: {
  name: string;
  email: string;
  courseTitle: string;
  paymentId: string;
  amountLabel: string;
}) {
  const client = getResendClient();

  if (!client) {
    return { skipped: true };
  }

  await client.emails.send({
    from: "GenZNext Admissions <noreply@updates.expertlearning.in>",
    to: payload.email,
    subject: `Enrollment confirmed for ${payload.courseTitle}`,
    html: `
      <p>Hi ${payload.name},</p>
      <p>Your enrollment for <strong>${payload.courseTitle}</strong> is confirmed.</p>
      <p><strong>Amount:</strong> ${payload.amountLabel}</p>
      <p><strong>Payment ID:</strong> ${payload.paymentId}</p>
      <p>Our team will share your onboarding instructions shortly.</p>
    `,
  });
}
