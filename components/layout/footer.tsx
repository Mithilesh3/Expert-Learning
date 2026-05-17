import Link from "next/link";
import { BriefcaseBusiness, Camera, PlayCircle } from "lucide-react";
import { Brand } from "@/components/layout/brand";
import { courseFooterLinks, quickLinks, socialLinks } from "@/data/site";
import { siteConfig } from "@/lib/site-config";

const socialIcons = {
  LinkedIn: BriefcaseBusiness,
  Instagram: Camera,
  YouTube: PlayCircle,
};

export function Footer() {
  return (
    <footer className="mt-16 border-t border-brand-blue/30 bg-brand-navy px-4 py-7 text-[12px] text-white/50 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr]">
        <div>
          <Brand dark />
          <p className="mt-4 max-w-sm leading-7 text-white/58">
            Premium AWS, Azure, AI, DevOps, and cloud learning experiences designed for career outcomes and enterprise credibility.
          </p>
          <p className="mt-4 text-white/72">{siteConfig.tagline}</p>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/85">Quick Links</div>
          <div className="mt-4 space-y-3">
            {quickLinks.map((item) => (
              <Link key={item.href} href={item.href} className="block transition hover:text-white/85">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/85">Courses</div>
          <div className="mt-4 space-y-3">
            {courseFooterLinks.map((item) => (
              <Link key={item.href} href={item.href} className="block transition hover:text-white/85">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/85">Contact</div>
          <div className="mt-4 space-y-3 leading-6">
            <p>{siteConfig.address}</p>
            <a href={`tel:${siteConfig.phone}`} className="block transition hover:text-white/85">
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="block transition hover:text-white/85">
              {siteConfig.email}
            </a>
          </div>
          <div className="mt-5 flex items-center gap-3">
            {socialLinks.map((item) => {
              const Icon = socialIcons[item.label as keyof typeof socialIcons];

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition hover:text-brand-blue-bright"
                  aria-label={item.label}
                >
                  {Icon ? <Icon className="h-[18px] w-[18px]" /> : item.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-4 border-t border-brand-blue/30 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p>(c) 2026 Expert Learning. All rights reserved.</p>
        <div className="flex gap-5">
          <Link href="/contact" className="transition hover:text-white/85">
            Privacy Policy
          </Link>
          <Link href="/contact" className="transition hover:text-white/85">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
