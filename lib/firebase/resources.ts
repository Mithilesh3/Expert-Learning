import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type DocumentData,
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";

export type FirestoreResource = {
  courseSlug: string;
  moduleId?: string;
  lessonId?: string;
  title: string;
  description: string;
  resourceType: "youtube" | "official-docs" | "pdf-notes" | "assignments" | "certification-guides";
  source: string;
  url: string;
  locked: boolean;
  status: "draft" | "published";
  createdAt?: string;
  updatedAt?: string;
};

function mapResource(id: string, data: DocumentData) {
  return { id, ...(data as FirestoreResource) };
}

export async function listResourcesByCourse(courseSlug: string) {
  const db = getFirebaseDb();
  if (!db) return [];

  const snapshot = await getDocs(query(collection(db, "resources"), where("courseSlug", "==", courseSlug)));
  return snapshot.docs.map((item) => mapResource(item.id, item.data()));
}

export async function createResource(input: FirestoreResource) {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase Firestore is not configured for resources.");

  const ref = await addDoc(collection(db, "resources"), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateResource(resourceId: string, input: Partial<FirestoreResource>) {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase Firestore is not configured for resources.");

  await updateDoc(doc(db, "resources", resourceId), {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteResource(resourceId: string) {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase Firestore is not configured for resources.");
  await deleteDoc(doc(db, "resources", resourceId));
}
