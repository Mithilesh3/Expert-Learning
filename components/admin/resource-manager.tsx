"use client";

import { useState } from "react";
import type { AdminResource } from "@/data/admin-lms-mock";

const initialResource: Omit<AdminResource, "id"> = {
  title: "",
  type: "microsoft-learn",
  url: "",
  courseId: "",
  notes: "",
};

export function ResourceManager({ resources }: { resources: AdminResource[] }) {
  const [form, setForm] = useState(initialResource);
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-3 rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.8)] p-5">
        <h2 className="text-lg font-semibold text-white">Resource Library</h2>
        {resources.map((resource) => (
          <article key={resource.id} className="rounded-lg border border-white/10 bg-white/5 p-3">
            <p className="text-sm font-medium text-white">{resource.title}</p>
            <p className="mt-1 text-xs text-[#94A3B8]">type: {resource.type}</p>
            <a href={resource.url} target="_blank" rel="noreferrer" className="mt-1 inline-flex text-xs text-[#4F46E5]">
              {resource.url}
            </a>
          </article>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setMessage("Mock success: Resource saved locally.");
        }}
        className="space-y-3 rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.8)] p-5"
      >
        <h2 className="text-lg font-semibold text-white">Create / Edit Resource</h2>
        <input
          value={form.title}
          onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
          placeholder="Resource title"
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          required
        />
        <select
          value={form.type}
          onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as AdminResource["type"] }))}
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        >
          <option value="microsoft-learn">microsoft-learn</option>
          <option value="aws-skill-builder">aws-skill-builder</option>
          <option value="azure-docs">azure-docs</option>
          <option value="pdf">pdf</option>
          <option value="notes">notes</option>
          <option value="assignment">assignment</option>
          <option value="guide">certification guide</option>
        </select>
        <input
          value={form.url}
          onChange={(event) => setForm((current) => ({ ...current, url: event.target.value }))}
          placeholder="Official link / YouTube / resource URL"
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          required
        />
        <input
          value={form.courseId || ""}
          onChange={(event) => setForm((current) => ({ ...current, courseId: event.target.value }))}
          placeholder="Course ID (optional)"
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        />
        <textarea
          value={form.notes}
          onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
          placeholder="Resource metadata / notes"
          className="min-h-24 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        />
        <button type="submit" className="rounded-md bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white">
          Save Resource
        </button>
        {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
      </form>
    </div>
  );
}
