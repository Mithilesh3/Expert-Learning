"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { CART_STORAGE_KEY } from "@/lib/cart";
import { latestOrderStorageKey } from "@/lib/order-success";

export const logoutToastSessionKey = "genznext-logout-toast";

export function useSecureLogout() {
  const router = useRouter();
  const { signOutUser } = useAuth();
  const { clearCart } = useCart();

  return async function secureLogout() {
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(logoutToastSessionKey, "Logged out successfully");
      }

      await signOutUser();
      clearCart();
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(CART_STORAGE_KEY);
        window.localStorage.removeItem("cart");
        window.localStorage.removeItem(latestOrderStorageKey);
      }
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
}
