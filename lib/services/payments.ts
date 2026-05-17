import crypto from "node:crypto";
import Razorpay from "razorpay";
import { env, hasRazorpayEnv } from "@/lib/env";

let razorpayClient: Razorpay | null = null;

export function getRazorpayClient() {
  if (!hasRazorpayEnv) {
    return null;
  }

  if (!razorpayClient) {
    razorpayClient = new Razorpay({
      key_id: env.nextPublicRazorpayKeyId,
      key_secret: env.razorpayKeySecret,
    });
  }

  return razorpayClient;
}

export function verifyRazorpaySignature(payload: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  if (!env.razorpayKeySecret) {
    return false;
  }

  const generated = crypto
    .createHmac("sha256", env.razorpayKeySecret)
    .update(`${payload.orderId}|${payload.paymentId}`)
    .digest("hex");

  return generated === payload.signature;
}
