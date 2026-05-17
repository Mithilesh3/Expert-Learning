import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  course: z.string().min(2),
  message: z.string().optional().default(""),
});

export const paymentCreateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  courseSlug: z.string().min(2),
});

export const paymentVerifySchema = z.object({
  razorpay_order_id: z.string().min(2),
  razorpay_payment_id: z.string().min(2),
  razorpay_signature: z.string().min(2),
  courseSlug: z.string().min(2),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
});

export const enrollmentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  courseSlug: z.string().min(2),
  amount: z.number().int().positive().optional(),
  paymentId: z.string().optional(),
  status: z.string().default("active"),
});
