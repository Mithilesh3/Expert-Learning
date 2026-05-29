"use client";

import { useEffect, useState } from "react";
import {
  listCourses,
  listLeads,
  listAllEnrollments,
  listPaymentsByUser,
  listUserProfiles,
  type AppUserProfile,
} from "@/lib/firebase";

type Metric = { label: string; value: number };

export function FirebaseAdminDashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: "Users", value: 0 },
    { label: "Courses", value: 0 },
    { label: "Enrollments", value: 0 },
    { label: "Leads", value: 0 },
    { label: "Payments", value: 0 },
  ]);

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const [users, courses, enrollments, leads] = await Promise.all([
          listUserProfiles(),
          listCourses(),
          listAllEnrollments(),
          listLeads(),
        ]);

        let paymentCount = 0;
        for (const user of users as Array<AppUserProfile & { id: string }>) {
          const payments = await listPaymentsByUser(user.uid || user.id);
          paymentCount += payments.length;
        }

        if (!active) return;
        setMetrics([
          { label: "Users", value: users.length },
          { label: "Courses", value: courses.length },
          { label: "Enrollments", value: enrollments.length },
          { label: "Leads", value: leads.length },
          { label: "Payments", value: paymentCount },
        ]);
      } catch {
        if (!active) return;
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="grid gap-3 sm:grid-cols-5">
      {metrics.map((item) => (
        <article key={item.label} className="rounded-xl border border-white/10 bg-[rgba(15,23,42,0.8)] p-4">
          <p className="text-xs text-[#94A3B8]">{item.label}</p>
          <p className="mt-1 text-2xl font-semibold text-white">{item.value}</p>
        </article>
      ))}
    </div>
  );
}

