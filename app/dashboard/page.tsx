import { DashboardPanel } from "@/components/auth/dashboard-panel";
import { PageHero } from "@/components/ui/page-hero";

export default function DashboardPage() {
  return (
    <>
      <PageHero
        eyebrow="Dashboard"
        title="Track your account and enrollment journey"
        description="Your student dashboard is ready for authentication, enrollments, profile details, and future certificate access."
      />
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <DashboardPanel />
        </div>
      </section>
    </>
  );
}
