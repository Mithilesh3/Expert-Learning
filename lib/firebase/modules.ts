import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  doc,
  where,
  type DocumentData,
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";

export type FirestoreModule = {
  courseSlug: string;
  title: string;
  description: string;
  order: number;
  status: "draft" | "published";
  createdAt?: string;
  updatedAt?: string;
};

function mapModule(id: string, data: DocumentData) {
  return { id, ...(data as FirestoreModule) };
}

export async function listModulesByCourse(courseSlug: string) {
  const db = getFirebaseDb();
  if (!db) return [];

  const snapshot = await getDocs(query(collection(db, "modules"), where("courseSlug", "==", courseSlug)));
  return snapshot.docs.map((item) => mapModule(item.id, item.data())).sort((a, b) => a.order - b.order);
}

export async function createModule(input: FirestoreModule) {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase Firestore is not configured for modules.");

  const ref = await addDoc(collection(db, "modules"), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateModule(moduleId: string, input: Partial<FirestoreModule>) {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase Firestore is not configured for modules.");

  await updateDoc(doc(db, "modules", moduleId), {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteModule(moduleId: string) {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase Firestore is not configured for modules.");
  await deleteDoc(doc(db, "modules", moduleId));
}
