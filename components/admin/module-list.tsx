import type { AdminModule } from "@/data/admin-lms-mock";

export function ModuleList({ modules }: { modules: AdminModule[] }) {
  return (
    <div className="space-y-2 rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.8)] p-5">
      <h2 className="text-lg font-semibold text-white">Module List</h2>
      {modules.map((module) => (
        <article key={module.id} className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="text-sm font-medium text-white">
            {module.sequence}. {module.title}
          </p>
          <p className="mt-1 text-xs text-[#94A3B8]">{module.summary}</p>
        </article>
      ))}
    </div>
  );
}
