/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { AppShellEnhancements } from "@/components/app-shell-enhancements";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { buildMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = buildMetadata({
  title: "Expert Learning | AWS, Azure, AI & DevOps Certification Programs",
  description:
    "Expert Learning helps students and professionals master AWS, Azure, AI, cloud, data engineering, GenAI, and DevOps with live mentorship and career-focused certification programs.",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <div
          id="recaptcha-container"
          aria-hidden="true"
          className="pointer-events-none fixed right-0 bottom-0 z-[-1] h-px w-px opacity-0"
        />
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col overflow-x-clip">
            <AppShellEnhancements />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <MobileStickyCta />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
