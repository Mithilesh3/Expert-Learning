import Link from "next/link";
import { AuthForm } from "@/components/forms/auth-form";
import { PageHero } from "@/components/ui/page-hero";

export default function LoginPage() {
  return (
    <>
      <PageHero
        eyebrow="Login"
        title="Access your GenZNext learning dashboard"
        description="Verify your mobile number with OTP to manage enrollments, progress, and upcoming sessions securely."
      />
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <AuthForm mode="login" />
          <p className="mt-4 text-center text-sm text-brand-muted">
            Need an account?{" "}
            <Link href="/signup" className="font-medium text-brand-blue hover:text-brand-blue-dark">
              Create one here
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
