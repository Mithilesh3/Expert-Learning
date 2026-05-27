import { ProtectedRouteGuard } from "@/components/auth/protected-route-guard";
import { MyCoursesPanel } from "@/components/dashboard/my-courses-panel";

type DashboardCoursesPageProps = {
  searchParams: Promise<{
    payment?: string | string[];
  }>;
};

export default async function DashboardCoursesPage({ searchParams }: DashboardCoursesPageProps) {
  const resolvedSearchParams = await searchParams;
  const paymentCompleted = Array.isArray(resolvedSearchParams.payment)
    ? resolvedSearchParams.payment.includes("success")
    : resolvedSearchParams.payment === "success";

  return (
    <ProtectedRouteGuard>
      <MyCoursesPanel paymentCompleted={paymentCompleted} />
    </ProtectedRouteGuard>
  );
}
