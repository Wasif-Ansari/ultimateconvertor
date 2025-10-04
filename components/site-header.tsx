import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-indigo-500/10 bg-indigo-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-300 text-lg font-black text-indigo-950 shadow-lg shadow-indigo-900/30">
            UF
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.4em] text-indigo-100/80">
            Ultimate File Converter
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/docs" className="text-indigo-200/80 transition hover:text-white">
            Docs
          </Link>
          <Link href="/pricing" className="text-indigo-200/80 transition hover:text-white">
            Pricing
          </Link>
          <Link
            href="/tool/docx-to-pdf"
            className="rounded-full bg-white px-4 py-2 font-semibold text-indigo-700 shadow-lg shadow-indigo-900/30 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Launch app
          </Link>
        </nav>
      </div>
    </header>
  );
}
