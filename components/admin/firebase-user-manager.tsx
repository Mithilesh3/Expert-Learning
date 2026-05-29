"use client";

import { useEffect, useState } from "react";
import { listUserProfiles, updateUserRole, type AppUserProfile } from "@/lib/firebase";

export function FirebaseUserManager() {
  const [users, setUsers] = useState<Array<AppUserProfile & { id: string }>>([]);

  async function load() {
    const next = await listUserProfiles();
    setUsers(next as Array<AppUserProfile & { id: string }>);
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const next = await listUserProfiles();
      if (!cancelled) {
        setUsers(next as Array<AppUserProfile & { id: string }>);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-2 rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.8)] p-5">
      <h2 className="text-lg font-semibold text-white">Users</h2>
      {users.map((user) => (
        <article key={user.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
          <div>
            <p className="text-sm font-medium text-white">{user.name || user.email || user.uid}</p>
            <p className="text-xs text-[#94A3B8]">{user.email || user.phone || user.uid}</p>
          </div>
          <select
            value={user.role || "student"}
            onChange={async (e) => {
              await updateUserRole(user.uid || user.id, e.target.value as "admin" | "student");
              await load();
            }}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white"
          >
            <option value="student">student</option>
            <option value="admin">admin</option>
          </select>
        </article>
      ))}
    </div>
  );
}
