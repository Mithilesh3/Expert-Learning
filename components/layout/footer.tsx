"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Brand } from "@/components/layout/brand";
import { socialLinks } from "@/data/site";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/courses" },
  { label: "LMS Portal", href: "/lms" },
  { label: "Enterprise", href: "/corporate-training" },
  { label: "Contact", href: "/contact" },
];

const trackLinks = [
  { label: "AI", href: "/ai" },
  { label: "Generative AI", href: "/genai" },
  { label: "Agentic AI", href: "/agentic-ai" },
  { label: "DevSecOps", href: "/devsecops" },
  { label: "AWS Certifications", href: "/aws" },
  { label: "Azure Certifications", href: "/azure" },
];

function FacebookIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-2.74-2.74A4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  mail: Mail,
};

export function Footer({ reserveMobileCtaSpace = false }: { reserveMobileCtaSpace?: boolean }) {
  return (
    <footer
      className={cn(
        "border-t border-[#E5E7EB] bg-white text-[#6B7280]",
        reserveMobileCtaSpace && "pb-24 md:pb-0",
      )}
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <Brand mode="footer" />
          <p className="mt-4 max-w-xs text-sm leading-7 text-[#6B7280]">
            Premium online training for AI, Generative AI, Agentic AI, DevSecOps, AWS and Azure certification pathways.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#111827]">Quick Links</p>
          <div className="mt-4 space-y-2">
            {quickLinks.map((item) => (
              <Link key={item.href} href={item.href} className="block text-sm text-[#6B7280] transition hover:text-[#111827]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#111827]">Learning Tracks</p>
          <div className="mt-4 space-y-2">
            {trackLinks.map((item) => (
              <Link key={item.href} href={item.href} className="block text-sm text-[#6B7280] transition hover:text-[#111827]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#111827]">Contact</p>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-[#2563EB]" />
              <div className="text-[#6B7280]">
                {siteConfig.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
            <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827]">
              <Phone className="h-4 w-4 text-[#2563EB]" />
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827]">
              <Mail className="h-4 w-4 text-[#2563EB]" />
              {siteConfig.email}
            </a>
          </div>
          <div className="mt-5 flex items-center gap-2">
            {socialLinks.map((item) => {
              const Icon = socialIcons[item.icon as keyof typeof socialIcons];
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-[#4F46E5] transition hover:-translate-y-0.5",
                    item.hoverClass,
                  )}
                  aria-label={item.label}
                >
                  {Icon ? <Icon className="h-4 w-4" /> : item.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-[#E5E7EB] px-4 py-4 text-center text-xs text-[#6B7280] sm:px-6 lg:px-8">
        (c) 2026 {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
