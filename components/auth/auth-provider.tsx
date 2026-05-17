"use client";

import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signOut,
  type User,
} from "firebase/auth";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext, type AuthContextValue, type AuthModalMode } from "@/components/auth/auth-context";
import { AuthModal } from "@/components/auth/auth-modal";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(() => !isFirebaseConfigured());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<AuthModalMode>("login");
  const [redirectAfterAuth, setRedirectAfterAuth] = useState("/dashboard");

  useEffect(() => {
    const auth = getFirebaseAuth();

    if (!auth) {
      return;
    }

    let active = true;
    let unsubscribe: () => void = () => undefined;

    async function connect(currentAuth: NonNullable<typeof auth>) {
      try {
        await setPersistence(currentAuth, browserLocalPersistence);
      } catch {
        // Firebase falls back gracefully when persistence cannot be set.
      }

      unsubscribe = onAuthStateChanged(currentAuth, (nextUser) => {
        if (!active) {
          return;
        }

        setUser(nextUser);
        setIsAuthReady(true);
      });
    }

    void connect(auth);

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const openAuthModal = useCallback((mode: AuthModalMode, redirectTo = "/dashboard") => {
    setModalMode(mode);
    setRedirectAfterAuth(redirectTo);
    setIsModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const signOutUser = useCallback(async () => {
    const auth = getFirebaseAuth();

    if (!auth) {
      setUser(null);
      return;
    }

    await signOut(auth);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthReady,
      isModalOpen,
      modalMode,
      redirectAfterAuth,
      openAuthModal,
      closeAuthModal,
      signOutUser,
    }),
    [closeAuthModal, isAuthReady, isModalOpen, modalMode, openAuthModal, redirectAfterAuth, signOutUser, user],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal />
    </AuthContext.Provider>
  );
}
