import { addDoc, collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";

export type FirestoreLead = {
  name: string;
  email?: string;
  phone: string;
  course: string;
  message?: string;
  source?: string;
  pageUrl?: string;
  courseSlug?: string;
  status: "new" | "contacted" | "closed";
  createdAt?: string;
};

export async function createLeadRecord(input: Omit<FirestoreLead, "status" | "createdAt"> & { status?: FirestoreLead["status"] }) {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase Firestore is not configured for leads.");

  const ref = await addDoc(collection(db, "leads"), {
    ...input,
    status: input.status || "new",
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function listLeadsByPhone(phone: string) {
  const db = getFirebaseDb();
  if (!db) return [];

  const snapshot = await getDocs(query(collection(db, "leads"), where("phone", "==", phone)));
  return snapshot.docs.map((item) => ({ id: item.id, ...(item.data() as FirestoreLead) }));
}

export async function listLeads() {
  const db = getFirebaseDb();
  if (!db) return [];

  const snapshot = await getDocs(collection(db, "leads"));
  return snapshot.docs.map((item) => ({ id: item.id, ...(item.data() as FirestoreLead) }));
}

export async function updateLeadStatus(leadId: string, status: FirestoreLead["status"]) {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase Firestore is not configured for leads.");

  await updateDoc(doc(db, "leads", leadId), {
    status,
  });
}
