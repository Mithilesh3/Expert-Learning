import { LmsRouteGuard } from "@/components/auth/lms-route-guard";

export default function LmsLayout({ children }: { children: React.ReactNode }) {
  return <LmsRouteGuard>{children}</LmsRouteGuard>;
}

