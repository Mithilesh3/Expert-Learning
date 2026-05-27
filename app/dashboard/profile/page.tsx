import { ProtectedRouteGuard } from "@/components/auth/protected-route-guard";
import { ProfilePanel } from "@/components/dashboard/profile-panel";

export default function DashboardProfilePage() {
  return (
    <ProtectedRouteGuard>
      <ProfilePanel />
    </ProtectedRouteGuard>
  );
}
