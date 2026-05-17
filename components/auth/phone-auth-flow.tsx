"use client";

import { type ConfirmationResult, updateProfile } from "firebase/auth";
import { LoaderCircle, RefreshCcw, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { getFirebaseAuthErrorMessage } from "@/lib/firebase/auth-errors";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import { sendPhoneOtp } from "@/lib/firebase/phone-auth";
import { buttonLinkClasses } from "@/components/ui/button-link";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const countryCodes = [
  { label: "India", value: "+91", flag: "IN" },
  { label: "United States", value: "+1", flag: "US" },
  { label: "United Kingdom", value: "+44", flag: "UK" },
  { label: "United Arab Emirates", value: "+971", flag: "UAE" },
  { label: "Singapore", value: "+65", flag: "SG" },
  { label: "Canada", value: "+1", flag: "CA" },
  { label: "Australia", value: "+61", flag: "AU" },
] as const;

const otpLength = 6;
const resendWindowSeconds = 30;

type PhoneAuthFlowProps = {
  mode: "login" | "signup";
  variant?: "modal" | "page";
  redirectTo?: string;
  onSuccess?: () => void;
  onClose?: () => void;
};

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function PhoneAuthFlow({
  mode,
  variant = "modal",
  redirectTo = "/dashboard",
  onSuccess,
  onClose,
}: PhoneAuthFlowProps) {
  const router = useRouter();
  const { user } = useAuth();
  const confirmationResultRef = useRef<ConfirmationResult | null>(null);
  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const sendOtpLockRef = useRef(false);

  const [countryCode, setCountryCode] = useState("+91");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(Array.from({ length: otpLength }, () => ""));
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);

  const firebaseReady = isFirebaseConfigured();
  const otpCode = otp.join("");
  const formattedPhone = useMemo(() => `${countryCode}${normalizePhone(phone)}`, [countryCode, phone]);

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setResendTimer((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [resendTimer]);

  useEffect(() => {
    if (rateLimitSeconds <= 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setRateLimitSeconds((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [rateLimitSeconds]);

  function logFirebaseAuthError(stage: string, error: unknown) {
    console.error(`[Firebase Phone Auth] ${stage} failed`, {
      error,
      code: typeof error === "object" && error && "code" in error ? error.code : undefined,
      message: typeof error === "object" && error && "message" in error ? error.message : undefined,
      mode,
      phone: formattedPhone,
      step,
      hostname: typeof window !== "undefined" ? window.location.hostname : undefined,
    });
  }

  function validatePhone() {
    const digits = normalizePhone(phone);

    if (mode === "signup" && !fullName.trim()) {
      return "Enter your full name to continue.";
    }

    if (digits.length < 8 || digits.length > 14) {
      return "Enter a valid mobile number to continue.";
    }

    return null;
  }

  async function sendOtp(isResend = false) {
    if (sendOtpLockRef.current) {
      console.info("[Firebase Phone Auth] duplicate OTP send prevented at UI layer", {
        mode,
        phone: formattedPhone,
        isResend,
      });
      return;
    }

    const validationMessage = validatePhone();

    if (validationMessage) {
      setFeedback(validationMessage);
      return;
    }

    if (!getFirebaseAuth()) {
      setFeedback(
        "Firebase phone authentication is not configured yet. Add the Firebase public keys to enable OTP login.",
      );
      return;
    }

    if (rateLimitSeconds > 0) {
      setFeedback(`Firebase temporarily blocked OTP requests. Try again in ${rateLimitSeconds}s.`);
      return;
    }

    sendOtpLockRef.current = true;
    setPending(true);
    setFeedback(null);
    setSuccessMessage(null);

    try {
      confirmationResultRef.current = await sendPhoneOtp(formattedPhone);
      setStep("otp");
      setOtp(Array.from({ length: otpLength }, () => ""));
      setResendTimer(resendWindowSeconds);
      setSuccessMessage(isResend ? "A fresh OTP has been sent." : "OTP sent successfully.");
      window.setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 40);
    } catch (error) {
      logFirebaseAuthError("sendOtp", error);
      const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";

      if (code === "auth/too-many-requests" || code === "auth/quota-exceeded") {
        setRateLimitSeconds(60);
      }

      setFeedback(getFirebaseAuthErrorMessage(error));
    } finally {
      sendOtpLockRef.current = false;
      setPending(false);
    }
  }

  async function verifyOtp() {
    if (otpCode.length !== otpLength) {
      setFeedback("Enter the complete 6-digit OTP.");
      return;
    }

    const confirmationResult = confirmationResultRef.current;
    if (!confirmationResult) {
      setFeedback("Request a new OTP to continue.");
      return;
    }

    setPending(true);
    setFeedback(null);

    try {
      const result = await confirmationResult.confirm(otpCode);
      console.info("[Firebase Phone Auth] OTP verified successfully", {
        uid: result.user.uid,
        phone: result.user.phoneNumber,
        mode,
      });

      if (mode === "signup" && fullName.trim()) {
        await updateProfile(result.user, {
          displayName: fullName.trim(),
        });
      }

      setSuccessMessage(mode === "signup" ? "Your account has been created." : "Login successful.");
      onSuccess?.();
      onClose?.();
      router.push(redirectTo);
    } catch (error) {
      logFirebaseAuthError("verifyOtp", error);
      setFeedback(getFirebaseAuthErrorMessage(error));
    } finally {
      setPending(false);
    }
  }

  function handleOtpChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);

    if (digit && index < otpLength - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, otpLength)
      .split("");

    if (!pasted.length) {
      return;
    }

    const next = Array.from({ length: otpLength }, (_, index) => pasted[index] || "");
    setOtp(next);
    const focusIndex = Math.min(pasted.length, otpLength - 1);
    otpInputRefs.current[focusIndex]?.focus();
  }

  return (
    <div
      className={cn(
        variant === "page" && "surface-form rounded-[28px] p-6 shadow-[0_24px_56px_rgba(15,23,42,0.08)] sm:p-8",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="section-label text-[#2563EB]">{mode === "login" ? "Login" : "Sign Up"}</div>
          <h2 className="mt-2 text-[26px] font-bold leading-[1.2] text-[#0F172A]">
            {mode === "login" ? "Continue with mobile OTP" : "Create your account with OTP"}
          </h2>
          <p className="mt-3 max-w-[560px] text-sm leading-7 text-[#475569]">
            Secure your learning account with Firebase phone authentication and a one-time verification code.
          </p>
        </div>
      </div>

      {!firebaseReady && (
        <div className="mt-6 rounded-[18px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Firebase phone authentication is wired into the UI, but the Firebase public configuration is missing from the environment.
        </div>
      )}

      {user && (
        <div className="mt-6 rounded-[22px] border border-[#DCE9FF] bg-[#F8FBFF] p-4">
          <div className="flex items-start gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#2563EB]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#0F172A]">You are already signed in</div>
              <div className="mt-1 text-sm text-[#475569]">
                {user.phoneNumber || user.displayName || "Active session detected."}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-5">
        {mode === "signup" && step === "phone" && (
          <div>
            <label className="form-label text-[#64748B]" htmlFor={`auth-name-${variant}`}>
              Full Name
            </label>
            <input
              id={`auth-name-${variant}`}
              className="form-field"
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
                setFeedback(null);
              }}
              placeholder="Your full name"
              autoComplete="name"
            />
          </div>
        )}

        <div>
          <label className="form-label text-[#64748B]" htmlFor={`auth-phone-${variant}`}>
            Mobile Number
          </label>
          <div className="grid gap-3 sm:grid-cols-[140px_1fr]">
            <select
              className="form-field"
              value={countryCode}
              onChange={(event) => {
                setCountryCode(event.target.value);
                setFeedback(null);
              }}
              disabled={step === "otp" || pending}
            >
              {countryCodes.map((option) => (
                <option key={`${option.flag}-${option.value}`} value={option.value}>
                  {option.flag} {option.value}
                </option>
              ))}
            </select>
            <input
              id={`auth-phone-${variant}`}
              className="form-field"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                setFeedback(null);
              }}
              placeholder="Enter your mobile number"
              autoComplete="tel-national"
              inputMode="tel"
              disabled={step === "otp" || pending}
            />
          </div>
        </div>

        {step === "otp" && (
          <div>
            <label className="form-label text-[#64748B]" htmlFor={`otp-0-${variant}`}>
              Enter OTP
            </label>
            <div className="flex gap-2 sm:gap-3">
              {otp.map((value, index) => (
                <input
                  key={`otp-${index}`}
                  id={`otp-${index}-${variant}`}
                  ref={(node) => {
                    otpInputRefs.current[index] = node;
                  }}
                  className="h-12 w-12 rounded-xl border border-[#DCE9FF] bg-white text-center text-lg font-semibold text-[#0F172A] outline-none transition focus:border-[#60A5FA] focus:shadow-[0_0_0_3px_rgba(96,165,250,0.14)]"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  value={value}
                  onChange={(event) => handleOtpChange(index, event.target.value)}
                  onKeyDown={(event) => handleOtpKeyDown(index, event)}
                  onPaste={handleOtpPaste}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-[#64748B]">
              <p>OTP sent to {formattedPhone}</p>
              <button
                type="button"
                onClick={() => void sendOtp(true)}
                disabled={pending || resendTimer > 0}
                className="inline-flex items-center gap-2 font-medium text-[#2563EB] transition hover:text-[#1D4ED8] disabled:cursor-not-allowed disabled:text-[#94A3B8]"
              >
                <RefreshCcw className="h-4 w-4" />
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
              </button>
            </div>
          </div>
        )}

        {feedback && (
          <div className="rounded-[16px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {feedback}
          </div>
        )}

        {successMessage && (
          <div className="rounded-[16px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          {step === "phone" ? (
            <button
              type="button"
              onClick={() => void sendOtp()}
              disabled={pending || !firebaseReady || rateLimitSeconds > 0}
              className={buttonLinkClasses(
                "primary",
                "w-full justify-center disabled:cursor-not-allowed disabled:opacity-70",
              )}
            >
              {pending ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : rateLimitSeconds > 0 ? (
                `Try again in ${rateLimitSeconds}s`
              ) : (
                "Send OTP"
              )}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => void verifyOtp()}
                disabled={pending || otpCode.length !== otpLength}
                className={buttonLinkClasses(
                  "primary",
                  "w-full justify-center disabled:cursor-not-allowed disabled:opacity-70",
                )}
              >
                {pending ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setOtp(Array.from({ length: otpLength }, () => ""));
                  confirmationResultRef.current = null;
                  setFeedback(null);
                  setSuccessMessage(null);
                }}
                disabled={pending}
                className={buttonLinkClasses(
                  "outline",
                  "w-full justify-center disabled:cursor-not-allowed disabled:opacity-70",
                )}
              >
                Change Number
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
