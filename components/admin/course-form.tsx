"use client";

import { useState } from "react";
import type { AdminCourse } from "@/data/admin-lms-mock";

const initialForm: Omit<AdminCourse, "id"> = {
  title: "",
  slug: "",
  category: "ai",
  level: "Beginner",
  mode: "recorded",
  certification: "",
  duration: "",
  status: "draft",
};

export function CourseForm({
  initial,
  mode,
}: {
  initial?: AdminCourse;
  mode: "create" | "edit";
}) {
  const [form, setForm] = useState<Omit<AdminCourse, "id">>(
    initial
      ? {
          title: initial.title,
          slug: initial.slug,
          category: initial.category,
          level: initial.level,
          mode: initial.mode,
          certification: initial.certification,
          duration: initial.duration,
          status: initial.status,
        }
      : initialForm,
  );
  const [message, setMessage] = useState<string | null>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setMessage(mode === "create" ? "Mock success: Course created locally." : "Mock success: Course updated locally.");
      }}
      className="space-y-4 rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.8)] p-5"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={form.title}
          onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
          placeholder="Course title"
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          required
        />
        <input
          value={form.slug}
          onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
          placeholder="course-slug"
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          required
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <select
          value={form.category}
          onChange={(event) => setForm((current) => ({ ...current, category: event.target.value as AdminCourse["category"] }))}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        >
          <option value="ai">AI</option>
          <option value="genai">GenAI</option>
          <option value="agentic-ai">Agentic AI</option>
          <option value="devsecops">DevSecOps</option>
          <option value="aws">AWS</option>
          <option value="azure">Azure</option>
        </select>
        <select
          value={form.mode}
          onChange={(event) => setForm((current) => ({ ...current, mode: event.target.value as AdminCourse["mode"] }))}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        >
          <option value="live">live</option>
          <option value="self-paced">self-paced</option>
          <option value="recorded">recorded</option>
          <option value="hybrid">hybrid</option>
        </select>
        <select
          value={form.level}
          onChange={(event) => setForm((current) => ({ ...current, level: event.target.value as AdminCourse["level"] }))}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={form.certification}
          onChange={(event) => setForm((current) => ({ ...current, certification: event.target.value }))}
          placeholder="Certification code"
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        />
        <input
          value={form.duration}
          onChange={(event) => setForm((current) => ({ ...current, duration: event.target.value }))}
          placeholder="Duration (e.g. 6-8 Weeks)"
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          required
        />
      </div>

      <button type="submit" className="rounded-md bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white">
        {mode === "create" ? "Create Course" : "Save Course"}
      </button>

      {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
    </form>
  );
}
