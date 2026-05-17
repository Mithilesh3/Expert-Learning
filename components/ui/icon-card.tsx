import { iconMap } from "@/lib/icon-map";
import type { IconKey } from "@/lib/icon-map";

export function IconCard({
  icon,
  title,
  description,
}: {
  icon: IconKey;
  title: string;
  description: string;
}) {
  const Icon = iconMap[icon];

  return (
    <div className="surface-card rounded-[24px] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#93C5FD] hover:bg-[#F8FBFF] hover:shadow-xl">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAF2FF] text-[#2563EB]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-[15px] font-semibold text-[#0F172A]">{title}</h3>
      <p className="mt-3 text-[13px] leading-[1.75] text-[#475569]">{description}</p>
    </div>
  );
}
