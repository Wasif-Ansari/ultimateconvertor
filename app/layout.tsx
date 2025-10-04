import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ultimate File Converter",
  description:
    "Convert images, videos, documents, spreadsheets, and more with a unified SaaS experience.",
  openGraph: {
    title: "Ultimate File Converter",
    description:
      "Convert images, videos, documents, spreadsheets, and more with a unified SaaS experience.",
    url: "https://ultimate-file-converter.example.com",
    siteName: "Ultimate File Converter",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="bg-indigo-950">
      <body className={`${inter.className} bg-indigo-950 text-white`}>
        <SiteHeader />
        {children}
        <footer className="border-t border-indigo-500/10 bg-indigo-950/70">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-10 text-sm text-indigo-300/70">
            <p>© {new Date().getFullYear()} Ultimate File Converter. All rights reserved.</p>
            <div className="flex gap-3">
              <a href="/privacy" className="hover:text-white">
                Privacy
              </a>
              <a href="/terms" className="hover:text-white">
                Terms
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
