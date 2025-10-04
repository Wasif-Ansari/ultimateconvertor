import Link from "next/link";
import { conversionCategories } from "@/lib/categories";
import { CategoryCard } from "@/components/category-card";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-800/50 via-indigo-950 to-indigo-950 blur-3xl" />
      <header className="flex flex-col items-start gap-6">
        <span className="rounded-full border border-indigo-500/40 bg-indigo-900/40 px-4 py-1 text-xs uppercase tracking-[0.3em] text-indigo-200/70">
          Ultimate File Converter
        </span>
        <h1 className="text-5xl font-semibold leading-tight text-white md:text-6xl">
          Convert every file type with a single SaaS dashboard.
        </h1>
        <p className="max-w-2xl text-lg text-indigo-100/80">
          Transform documents, media, and archives in just a few clicks. Queue conversion jobs, track
          progress in real time, and deliver ready-to-share files faster than ever.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/tool/docx-to-pdf"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-900/50 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Try DOCX → PDF now
          </Link>
          <Link
            href="#categories"
            className="rounded-full border border-indigo-300/40 px-6 py-3 text-sm font-semibold text-indigo-200 transition hover:border-indigo-200 hover:text-white"
          >
            Browse categories
          </Link>
        </div>
      </header>
      <section id="categories" className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">Conversion categories</h2>
            <p className="text-sm text-indigo-200/70">
              Build automated flows across 50+ conversion tools with enterprise-grade reliability.
            </p>
          </div>
          <Link href="/docs" className="text-sm text-indigo-200/80 hover:text-white">
            View API docs ↗
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {conversionCategories.map((category) => (
            <CategoryCard key={category.key} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}
