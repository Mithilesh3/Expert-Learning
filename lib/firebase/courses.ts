import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type DocumentData,
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";

export type FirestoreCourse = {
  slug: string;
  title: string;
  track: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  mode: "live" | "self-paced" | "recorded" | "hybrid";
  certification: string;
  duration: string;
  shortDescription: string;
  longDescription: string;
  status: "draft" | "published";
  createdAt?: string;
  updatedAt?: string;
};

function mapCourse(docId: string, data: DocumentData) {
  return { id: docId, ...(data as FirestoreCourse) };
}

export async function listCourses(status?: FirestoreCourse["status"]) {
  const db = getFirebaseDb();
  if (!db) return [];

  const ref = collection(db, "courses");
  const snapshot = status
    ? await getDocs(query(ref, where("status", "==", status)))
    : await getDocs(ref);
  return snapshot.docs.map((item) => mapCourse(item.id, item.data()));
}

export async function getCourseBySlugFromDb(slug: string) {
  const db = getFirebaseDb();
  if (!db) return null;

  const ref = collection(db, "courses");
  const snapshot = await getDocs(query(ref, where("slug", "==", slug)));
  const first = snapshot.docs[0];
  return first ? mapCourse(first.id, first.data()) : null;
}

export async function createCourse(input: FirestoreCourse) {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase Firestore is not configured for courses.");

  const ref = await addDoc(collection(db, "courses"), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateCourse(courseId: string, input: Partial<FirestoreCourse>) {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase Firestore is not configured for courses.");

  await updateDoc(doc(db, "courses", courseId), {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

export async function getCourseById(courseId: string) {
  const db = getFirebaseDb();
  if (!db) return null;

  const snapshot = await getDoc(doc(db, "courses", courseId));
  return snapshot.exists() ? mapCourse(snapshot.id, snapshot.data()) : null;
}

export async function deleteCourse(courseId: string) {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase Firestore is not configured for courses.");
  await deleteDoc(doc(db, "courses", courseId));
}
