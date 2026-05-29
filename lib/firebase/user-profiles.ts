"use client";

import { type User } from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";

export type AppUserProfile = {
  uid: string;
  name?: string;
  email?: string;
  photo?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
  authMethod?: "google" | "otp" | "password";
  role?: "admin" | "student";
};

export async function getUserProfile(uid: string) {
  const db = getFirebaseDb();

  if (!db) {
    return null;
  }

  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? (snapshot.data() as AppUserProfile) : null;
}

export async function upsertGoogleUserProfile(user: User) {
  const db = getFirebaseDb();

  if (!db) {
    return null;
  }

  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);
  const existing = snapshot.exists() ? (snapshot.data() as AppUserProfile) : null;

  const mergedProfile: AppUserProfile = {
    uid: user.uid,
    name: user.displayName || existing?.name || "",
    email: user.email || existing?.email || "",
    photo: user.photoURL || existing?.photo || "",
    phone: existing?.phone || user.phoneNumber || "",
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    authMethod: "google",
  };

  await setDoc(userRef, mergedProfile, { merge: true });
  return mergedProfile;
}

export async function ensurePhoneUserProfile(user: User, enteredName?: string) {
  const db = getFirebaseDb();

  if (!db) {
    return null;
  }

  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    return snapshot.data() as AppUserProfile;
  }

  const profile: AppUserProfile = {
    uid: user.uid,
    name: enteredName?.trim() || user.displayName?.trim() || "",
    phone: user.phoneNumber || "",
    createdAt: new Date().toISOString(),
    authMethod: "otp",
  };

  await setDoc(userRef, profile);
  return profile;
}

export async function saveUserWhatsappNumber(uid: string, phone: string) {
  const db = getFirebaseDb();

  if (!db) {
    return;
  }

  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(
      userRef,
      {
        uid,
        phone,
        updatedAt: new Date().toISOString(),
      } satisfies Partial<AppUserProfile>,
      { merge: true },
    );
    return;
  }

  await updateDoc(userRef, {
    phone,
    updatedAt: new Date().toISOString(),
  } satisfies Partial<AppUserProfile>);
}

export async function listUserProfiles() {
  const db = getFirebaseDb();
  if (!db) {
    return [] as Array<AppUserProfile & { id: string }>;
  }

  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as AppUserProfile),
  }));
}

export async function updateUserRole(uid: string, role: "admin" | "student") {
  const db = getFirebaseDb();
  if (!db) {
    throw new Error("Firebase Firestore is not configured for users.");
  }

  await updateDoc(doc(db, "users", uid), {
    role,
    updatedAt: new Date().toISOString(),
  } satisfies Partial<AppUserProfile>);
}
