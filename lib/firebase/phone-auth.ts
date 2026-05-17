"use client";

import {
  type ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

const recaptchaContainerId = "recaptcha-container";
const recaptchaSlotPrefix = "recaptcha-slot";

declare global {
  interface Window {
    phoneOtpRequest?: Promise<ConfirmationResult> | null;
    phoneOtpRequestKey?: string | null;
    phoneOtpSlotCounter?: number;
  }
}

function getRecaptchaHost() {
  if (typeof window === "undefined") {
    throw new Error("reCAPTCHA can only be initialized in the browser.");
  }

  const host = document.getElementById(recaptchaContainerId);
  if (!host) {
    throw new Error("Global reCAPTCHA container was not found in the root layout.");
  }

  return host;
}

function createRecaptchaSlot() {
  const host = getRecaptchaHost();
  window.phoneOtpSlotCounter = (window.phoneOtpSlotCounter ?? 0) + 1;

  const slot = document.createElement("div");
  slot.id = `${recaptchaSlotPrefix}-${window.phoneOtpSlotCounter}`;
  host.replaceChildren(slot);

  return slot;
}

function disposeRecaptchaSlot(verifier: RecaptchaVerifier, slot: HTMLDivElement, reason: string) {
  try {
    verifier.clear();
  } catch (error) {
    console.warn("[Firebase Phone Auth] verifier clear failed", { reason, error });
  }

  if (slot.parentElement) {
    slot.remove();
  }

  console.info("[Firebase Phone Auth] verifier disposed", { reason });
}

async function requestOtp(phoneNumber: string) {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error("Firebase auth is not available.");
  }

  const slot = createRecaptchaSlot();
  const verifier = new RecaptchaVerifier(auth, slot, {
    size: "invisible",
    callback: () => {
      console.info("[Firebase Phone Auth] invisible reCAPTCHA solved");
    },
    "expired-callback": () => {
      console.warn("[Firebase Phone Auth] invisible reCAPTCHA expired");
    },
  });

  console.info("[Firebase Phone Auth] verifier created", { slotId: slot.id });

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
    console.info("[Firebase Phone Auth] OTP send success", { phoneNumber });
    return confirmationResult;
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";

    console.error("[Firebase Phone Auth] OTP send failed", {
      phoneNumber,
      code,
      error,
    });

    throw error;
  } finally {
    disposeRecaptchaSlot(verifier, slot, "request-finished");
  }
}

export async function sendPhoneOtp(phoneNumber: string) {
  if (typeof window === "undefined") {
    throw new Error("Phone OTP can only be requested in the browser.");
  }

  if (window.phoneOtpRequest && window.phoneOtpRequestKey === phoneNumber) {
    console.info("[Firebase Phone Auth] OTP send reused existing in-flight request", { phoneNumber });
    return window.phoneOtpRequest;
  }

  console.info("[Firebase Phone Auth] OTP send started", { phoneNumber });

  window.phoneOtpRequestKey = phoneNumber;
  window.phoneOtpRequest = requestOtp(phoneNumber);

  try {
    return await window.phoneOtpRequest;
  } finally {
    window.phoneOtpRequest = null;
    window.phoneOtpRequestKey = null;
  }
}
