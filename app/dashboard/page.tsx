import { redirect } from "next/navigation";

type DashboardPageProps = {
  searchParams: Promise<{
    payment?: string | string[];
  }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const resolvedSearchParams = await searchParams;
  const paymentCompleted = Array.isArray(resolvedSearchParams.payment)
    ? resolvedSearchParams.payment.includes("success")
    : resolvedSearchParams.payment === "success";
  redirect(paymentCompleted ? "/dashboard/courses?payment=success" : "/dashboard/courses");
}
