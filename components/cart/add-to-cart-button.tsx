"use client";

import { IconShoppingCart } from "@tabler/icons-react";
import { Check } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  courseSlug,
  className,
  label = "Purchase Course",
  isEnrolled = false,
}: {
  courseSlug: string;
  className?: string;
  label?: string;
  isEnrolled?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthReady, openAuthModal, user } = useAuth();
  const { addCourse, hasCourse } = useCart();
  const inCart = hasCourse(courseSlug);

  function completePurchase() {
    addCourse(courseSlug);
    router.push("/cart");
  }

  function openPurchasedCourse() {
    router.push(`/dashboard/courses?course=${encodeURIComponent(courseSlug)}`);
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (isEnrolled) {
          openPurchasedCourse();
          return;
        }

        if (!isAuthReady) {
          return;
        }

        if (!user) {
          openAuthModal("signup", pathname, async () => {
            completePurchase();
          });
          return;
        }

        completePurchase();
      }}
      className={cn(className)}
    >
      {isEnrolled ? <Check size={14} /> : <IconShoppingCart size={14} />}
      {isEnrolled ? "View Course" : inCart ? "Purchase" : label}
    </button>
  );
}
