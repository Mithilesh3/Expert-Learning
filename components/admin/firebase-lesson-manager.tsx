"use client";

import { useEffect, useState } from "react";
import { createLesson, deleteLesson, listLessonsByCourse, listModulesByCourse, updateLesson, type FirestoreLesson } from "@/lib/firebase";

export function FirebaseLessonManager() {
  const [courseSlug, setCourseSlug] = useState("azure-administrator");
  const [moduleId, setModuleId] = useState("");
  const [modules, setModules] = useState<Array<{ id: string; title: string }>>([]);
  const [lessons, setLessons] = useState<Array<FirestoreLesson & { id: string }>>([]);
  const [form, setForm] = useState<FirestoreLesson>({
    courseSlug: "",
    moduleId: "",
    title: "",
    description: "",
    order: 1,
    lessonType: "youtube",
    url: "",
    duration: "",
    locked: false,
    status: "draft",
  });

  async function load() {
    const mod = await listModulesByCourse(courseSlug);
    const modList = (mod as Array<{ id: string; title: string }>).map((m) => ({ id: m.id, title: m.title }));
    setModules(modList);
    const firstModule = modList[0]?.id || "";
    if (!moduleId && firstModule) {
      setModuleId(firstModule);
    }
    const next = await listLessonsByCourse(courseSlug);
    setLessons(next as Array<FirestoreLesson & { id: string }>);
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mod = await listModulesByCourse(courseSlug);
      const modList = (mod as Array<{ id: string; title: string }>).map((m) => ({ id: m.id, title: m.title }));
      if (cancelled) return;
      setModules(modList);
      const firstModule = modList[0]?.id || "";
      if (!moduleId && firstModule) {
        setModuleId(firstModule);
      }
      const next = await listLessonsByCourse(courseSlug);
      if (!cancelled) {
        setLessons(next as Array<FirestoreLesson & { id: string }>);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [courseSlug, moduleId]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.8)] p-5 sm:grid-cols-2">
        <input value={courseSlug} onChange={(e) => setCourseSlug(e.target.value)} placeholder="Course slug" className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
        <select value={moduleId} onChange={(e) => setModuleId(e.target.value)} className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
          {modules.map((module) => <option key={module.id} value={module.id}>{module.title}</option>)}
        </select>
      </div>
      <form onSubmit={async (e) => {
        e.preventDefault();
        await createLesson({ ...form, courseSlug, moduleId });
        setForm({ courseSlug: "", moduleId: "", title: "", description: "", order: 1, lessonType: "youtube", url: "", duration: "", locked: false, status: "draft" });
        await load();
      }} className="grid gap-3 rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.8)] p-5 sm:grid-cols-3">
        <input value={form.title} onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))} placeholder="Lesson title" className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" required />
        <input value={form.duration || ""} onChange={(e) => setForm((c) => ({ ...c, duration: e.target.value }))} placeholder="Duration" className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
        <input type="number" value={form.order} onChange={(e) => setForm((c) => ({ ...c, order: Number(e.target.value) }))} placeholder="Order index" className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
        <input value={form.lessonType} onChange={(e) => setForm((c) => ({ ...c, lessonType: e.target.value as FirestoreLesson["lessonType"] }))} placeholder="Type" className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
        <input value={form.url || ""} onChange={(e) => setForm((c) => ({ ...c, url: e.target.value }))} placeholder="Video/resource URL" className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
        <button type="submit" className="rounded-md bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white">Add Lesson</button>
      </form>
      <div className="space-y-2 rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.8)] p-5">
        {lessons.map((lesson) => (
          <article key={lesson.id} className="rounded-lg border border-white/10 bg-white/5 p-3">
            <p className="text-sm font-medium text-white">{lesson.order}. {lesson.title}</p>
            <p className="mt-1 text-xs text-[#94A3B8]">{lesson.lessonType} • {lesson.duration || "n/a"}</p>
            <div className="mt-2 flex gap-3 text-xs">
              <button type="button" onClick={async () => { await updateLesson(lesson.id, { locked: !lesson.locked }); await load(); }} className="text-[#4F46E5]">{lesson.locked ? "Unlock" : "Lock"}</button>
              <button type="button" onClick={async () => { await deleteLesson(lesson.id); await load(); }} className="text-rose-400">Delete</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
