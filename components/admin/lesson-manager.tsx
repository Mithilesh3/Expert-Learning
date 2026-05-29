"use client";

import { useState } from "react";
import type { AdminLesson } from "@/data/admin-lms-mock";

const initialLesson: Omit<AdminLesson, "id"> = {
  moduleId: "",
  title: "",
  type: "video",
  youtubeUrl: "",
  externalUrl: "",
  duration: "",
  status: "available",
};

export function LessonManager({ lessons }: { lessons: AdminLesson[] }) {
  const [form, setForm] = useState(initialLesson);
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <div className="rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.8)] p-5">
        <h2 className="text-lg font-semibold text-white">Lesson List</h2>
        <div className="mt-3 space-y-2">
          {lessons.map((lesson) => (
            <article key={lesson.id} className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="text-sm font-medium text-white">{lesson.title}</p>
              <p className="mt-1 text-xs text-[#94A3B8]">
                type: {lesson.type} • status: {lesson.status}
              </p>
            </article>
          ))}
        </div>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setMessage("Mock success: Lesson saved locally.");
        }}
        className="space-y-3 rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.8)] p-5"
      >
        <h2 className="text-lg font-semibold text-white">Create / Edit Lesson</h2>
        <input
          value={form.moduleId}
          onChange={(event) => setForm((current) => ({ ...current, moduleId: event.target.value }))}
          placeholder="Module ID"
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          required
        />
        <input
          value={form.title}
          onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
          placeholder="Lesson title"
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          required
        />
        <select
          value={form.type}
          onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as AdminLesson["type"] }))}
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        >
          <option value="video">video</option>
          <option value="pdf">pdf</option>
          <option value="notes">notes</option>
          <option value="assignment">assignment</option>
          <option value="guide">certification guide</option>
          <option value="external-link">external link</option>
        </select>
        <input
          value={form.youtubeUrl || ""}
          onChange={(event) => setForm((current) => ({ ...current, youtubeUrl: event.target.value }))}
          placeholder="YouTube URL"
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        />
        <input
          value={form.externalUrl || ""}
          onChange={(event) => setForm((current) => ({ ...current, externalUrl: event.target.value }))}
          placeholder="External official link URL"
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        />
        <input
          value={form.duration}
          onChange={(event) => setForm((current) => ({ ...current, duration: event.target.value }))}
          placeholder="Duration"
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          required
        />
        <select
          value={form.status}
          onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as AdminLesson["status"] }))}
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        >
          <option value="available">available</option>
          <option value="locked">locked</option>
        </select>
        <button type="submit" className="rounded-md bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white">
          Save Lesson
        </button>
        {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
      </form>
    </div>
  );
}
