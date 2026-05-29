"use client";

import { useEffect, useState } from "react";
import { listLeads, updateLeadStatus, type FirestoreLead } from "@/lib/firebase";

export function FirebaseLeadManager() {
  const [leads, setLeads] = useState<Array<FirestoreLead & { id: string }>>([]);

  async function load() {
    const next = await listLeads();
    setLeads(next as Array<FirestoreLead & { id: string }>);
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const next = await listLeads();
      if (!cancelled) {
        setLeads(next as Array<FirestoreLead & { id: string }>);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-2 rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.8)] p-5">
      <h2 className="text-lg font-semibold text-white">Leads</h2>
      {leads.map((lead) => (
        <article key={lead.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
          <div>
            <p className="text-sm font-medium text-white">{lead.name}</p>
            <p className="text-xs text-[#94A3B8]">{lead.phone} • {lead.course}</p>
          </div>
          <select
            value={lead.status || "new"}
            onChange={async (e) => {
              await updateLeadStatus(lead.id, e.target.value as FirestoreLead["status"]);
              await load();
            }}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white"
          >
            <option value="new">new</option>
            <option value="contacted">contacted</option>
            <option value="closed">closed</option>
          </select>
        </article>
      ))}
    </div>
  );
}
