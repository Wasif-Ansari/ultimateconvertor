import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ultimate File Converter | W Software Solutions",
  description:
    "Professional file conversion service supporting 120+ conversion tools across images, documents, videos, audio, and more. Powered by W Software Solutions.",
  keywords: "file converter, document converter, image converter, video converter, audio converter, W Software Solutions, DOCX to PDF, file conversion",
  authors: [{ name: "W Software Solutions" }],
  creator: "W Software Solutions",
  publisher: "W Software Solutions",
  icons: {
    icon: [
      { url: "/W-logo.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/W-logo.jpg", sizes: "16x16", type: "image/jpeg" }
    ],
    shortcut: "/W-logo.jpg",
    apple: "/W-logo.jpg",
  },
  openGraph: {
    title: "Ultimate File Converter | W Software Solutions",
    description:
      "Professional file conversion service supporting 120+ conversion tools. Convert images, videos, documents, spreadsheets, and more.",
    url: "https://ultimateconvertor.com",
    siteName: "Ultimate File Converter by W Software Solutions",
    type: "website",
    images: [{ url: "/W-logo.jpg", width: 1200, height: 630, alt: "W Software Solutions" }]
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
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
              {/* Company Info */}
              <div className="col-span-1 sm:col-span-2">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <Image 
                    src="/W-logo.jpg" 
                    alt="W Software Solutions" 
                    width={50} 
                    height={50}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover object-center"
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">W Software Solutions</h3>
                    <p className="text-xs sm:text-sm text-indigo-300/70">Innovative Software Development</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-indigo-300/70 mb-3 sm:mb-4 max-w-md">
                  Professional file conversion services supporting 120+ tools. 
                  Convert images, documents, videos, audio, spreadsheets, and more with ease.
                </p>
                <p className="text-xs sm:text-sm text-indigo-300/50">
                  © {new Date().getFullYear()} W Software Solutions. All rights reserved.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg text-white">Quick Links</h4>
                <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-indigo-300/70">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                  <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg text-white">Categories</h4>
                <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-indigo-300/70">
                  <li><Link href="/category/images" className="hover:text-white transition-colors">Images</Link></li>
                  <li><Link href="/category/documents" className="hover:text-white transition-colors">Documents</Link></li>
                  <li><Link href="/category/videos" className="hover:text-white transition-colors">Videos</Link></li>
                  <li><Link href="/category/audio" className="hover:text-white transition-colors">Audio</Link></li>
                  <li><Link href="/category/spreadsheets" className="hover:text-white transition-colors">Spreadsheets</Link></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-indigo-500/10 pt-6 sm:pt-8 text-center text-indigo-300/50 text-xs sm:text-sm px-4">
              <p>
                Developed by <span className="text-indigo-400 font-semibold">W Software Solutions</span>
                <span className="hidden sm:inline">{" "}- Your trusted partner in digital transformation</span>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
