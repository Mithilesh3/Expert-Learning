import { collection, getDocs, query, serverTimestamp, setDoc, doc, where } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";

export type FirestoreProgress = {
  userId: string;
  courseSlug: string;
  lessonId: string;
  moduleId: string;
  completed: boolean;
  progressPercent: number;
  updatedAt?: string;
};

export async function listUserProgress(userId: string, courseSlug?: string) {
  const db = getFirebaseDb();
  if (!db) return [];

  const ref = collection(db, "lms-activity", userId, "progress");
  const snapshot = courseSlug
    ? await getDocs(query(ref, where("courseSlug", "==", courseSlug)))
    : await getDocs(ref);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<FirestoreProgress, "userId">),
    userId,
  }));
}

export async function upsertLessonProgress(
  userId: string,
  lessonId: string,
  input: Omit<FirestoreProgress, "userId" | "lessonId" | "updatedAt">,
) {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase Firestore is not configured for progress.");

  await setDoc(
    doc(db, "lms-activity", userId, "progress", lessonId),
    {
      ...input,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

