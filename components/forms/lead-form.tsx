"use client";

import { useState } from "react";

type LeadFormProps = {
  includeMessage?: boolean;
  className?: string;
  submitLabel?: string;
};

const courseOptions = [
  "AWS Certification Programs",
  "Azure Certification Programs",
  "AI & GenAI Programs",
  "DevOps Programs",
  "Corporate Training",
];

const initialState = {
  name: "",
  email: "",
  phone: "",
  course: "",
  message: "",
};

export function LeadForm({
  includeMessage = false,
  className,
  submitLabel = "Get Free Career Consultation",
}: LeadFormProps) {
  const [form, setForm] = useState(initialState);
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Something went wrong while submitting your request.");
      }

      setFeedback("Your request has been received. Our admissions team will contact you shortly.");
      setForm(initialState);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to submit the form right now.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="form-label" htmlFor="lead-name">
            Name
          </label>
          <input
            id="lead-name"
            className="form-field"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            required
          />
        </div>
        <div>
          <label className="form-label" htmlFor="lead-email">
            Email
          </label>
          <input
            id="lead-email"
            className="form-field"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            required
          />
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="form-label" htmlFor="lead-phone">
            Phone
          </label>
          <input
            id="lead-phone"
            className="form-field"
            type="tel"
            placeholder="Phone"
            value={form.phone}
            onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            required
          />
        </div>
        <div>
          <label className="form-label" htmlFor="lead-course">
            Interested Course
          </label>
          <select
            id="lead-course"
            className="form-field"
            value={form.course}
            onChange={(event) => setForm((current) => ({ ...current, course: event.target.value }))}
            required
          >
            <option value="" disabled>
              Interested Course
            </option>
            {courseOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      {includeMessage && (
        <div className="mt-4">
          <label className="form-label" htmlFor="lead-message">
            Message
          </label>
          <textarea
            id="lead-message"
            className="form-field min-h-32 resize-y"
            placeholder="Tell us about your goal"
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          />
        </div>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-[linear-gradient(135deg,#2563EB,#3B82F6)] px-5 py-[13px] text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.28),0_0_18px_rgba(96,165,250,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(37,99,235,0.34),0_0_24px_rgba(96,165,250,0.16)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Submitting..." : submitLabel}
      </button>
      {feedback && (
        <p className="mt-3 text-sm text-brand-muted">{feedback}</p>
      )}
    </form>
  );
}
