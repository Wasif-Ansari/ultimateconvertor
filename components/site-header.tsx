import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-indigo-500/10 bg-indigo-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4 md:py-5">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity">
          <Image 
            src="/W-logo.jpg" 
            alt="W Software Solutions Logo" 
            width={40} 
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover object-center"
          />
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-indigo-100/80">
              Ultimate File Converter
            </span>
            <span className="text-[8px] sm:text-xs text-indigo-300/60 hidden sm:block">by W Software Solutions</span>
          </div>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
          <Link href="/docs" className="hidden md:block text-indigo-200/80 transition hover:text-white">
            Docs
          </Link>
          <Link href="/pricing" className="hidden md:block text-indigo-200/80 transition hover:text-white">
            Pricing
          </Link>
          <Link
            href="/tool/docx-to-pdf"
            className="rounded-full bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-900/30 transition hover:shadow-xl"
          >
            <span className="hidden sm:inline">Launch app</span>
            <span className="sm:hidden">Start</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
