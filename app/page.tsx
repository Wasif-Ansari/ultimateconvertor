import Link from "next/link";
import Image from "next/image";
import { conversionCategories } from "@/lib/categories";
import { CategoryCard } from "@/components/category-card";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 py-12 sm:py-16 md:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-800/50 via-indigo-950 to-indigo-950 blur-3xl" />
      <header className="flex flex-col items-start gap-4 sm:gap-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Image 
            src="/logo.png" 
            alt="W Software Solutions" 
            width={64} 
            height={64}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg object-cover object-center transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-2xl hover:shadow-indigo-500/50"
          />
          <span className="rounded-full border border-indigo-500/40 bg-indigo-900/40 px-3 sm:px-4 py-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-indigo-200/70">
            Ultimate File Converter
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white">
          Convert every file type with a single SaaS dashboard.
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-indigo-100/80">
          Transform documents, media, and archives in just a few clicks. Queue conversion jobs, track
          progress in real time, and deliver ready-to-share files faster than ever.
        </p>
        <div className="inline-flex items-center flex-wrap gap-2 bg-indigo-900/40 border border-indigo-500/30 text-indigo-200 px-3 sm:px-4 py-2 rounded-full mb-2">
          <Image 
            src="/W-logo.jpg" 
            alt="W Software Solutions" 
            width={20} 
            height={20}
            className="w-4 h-4 sm:w-5 sm:h-5 rounded object-cover object-center"
          />
          <span className="text-xs sm:text-sm font-semibold">Powered by W Software Solutions</span>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Link
            href="/tool/docx-to-pdf"
            className="rounded-full bg-white hover:bg-indigo-700 px-6 py-3 text-sm font-semibold text-indigo-700 hover:text-white shadow-lg shadow-indigo-900/50 transition hover:-translate-y-0.5 hover:shadow-xl text-center"
          >
            Try DOCX → PDF now
          </Link>
          <Link
            href="#categories"
            className="rounded-full border border-indigo-300/40 px-6 py-3 text-sm font-semibold text-indigo-200 transition hover:border-indigo-200 hover:text-white text-center"
          >
            Browse categories
          </Link>
        </div>
      </header>
      
      {/* Popular Tools Section */}
      <section className="flex flex-col gap-4 sm:gap-6">
        <div className="text-center px-2 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2">🔥 Popular Conversion Tools</h2>
          <p className="text-xs sm:text-sm text-indigo-200/70">
            Quick access to our most-used converters - Start converting in one click!
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          <Link
            href="/tool/docx-to-pdf"
            className="group bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-2 border-indigo-500/30 hover:border-indigo-400 hover:from-indigo-800/50 hover:to-indigo-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 text-center transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/30"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 transform group-hover:scale-125 transition-transform duration-300">📄</div>
            <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors">DOCX → PDF</div>
            <div className="text-[10px] sm:text-xs text-indigo-300/60 group-hover:text-indigo-300/80 mt-0.5 sm:mt-1 transition-colors">Documents</div>
          </Link>
          <Link
            href="/tool/pdf-to-docx"
            className="group bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-2 border-indigo-500/30 hover:border-indigo-400 hover:from-indigo-800/50 hover:to-indigo-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 text-center transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/30"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 transform group-hover:scale-125 transition-transform duration-300">📋</div>
            <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors">PDF → DOCX</div>
            <div className="text-[10px] sm:text-xs text-indigo-300/60 group-hover:text-indigo-300/80 mt-0.5 sm:mt-1 transition-colors">Documents</div>
          </Link>
          <Link
            href="/tool/jpg-to-png"
            className="group bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-2 border-indigo-500/30 hover:border-indigo-400 hover:from-indigo-800/50 hover:to-indigo-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 text-center transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/30"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 transform group-hover:scale-125 transition-transform duration-300">🖼️</div>
            <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors">JPG → PNG</div>
            <div className="text-[10px] sm:text-xs text-indigo-300/60 group-hover:text-indigo-300/80 mt-0.5 sm:mt-1 transition-colors">Images</div>
          </Link>
          <Link
            href="/tool/png-to-jpg"
            className="group bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-2 border-indigo-500/30 hover:border-indigo-400 hover:from-indigo-800/50 hover:to-indigo-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 text-center transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/30"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 transform group-hover:scale-125 transition-transform duration-300">📸</div>
            <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors">PNG → JPG</div>
            <div className="text-[10px] sm:text-xs text-indigo-300/60 group-hover:text-indigo-300/80 mt-0.5 sm:mt-1 transition-colors">Images</div>
          </Link>
          <Link
            href="/tool/xlsx-to-csv"
            className="group bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-2 border-indigo-500/30 hover:border-indigo-400 hover:from-indigo-800/50 hover:to-indigo-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 text-center transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/30"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 transform group-hover:scale-125 transition-transform duration-300">📊</div>
            <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors">XLSX → CSV</div>
            <div className="text-[10px] sm:text-xs text-indigo-300/60 group-hover:text-indigo-300/80 mt-0.5 sm:mt-1 transition-colors">Spreadsheets</div>
          </Link>
          <Link
            href="/tool/csv-to-json"
            className="group bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-2 border-indigo-500/30 hover:border-indigo-400 hover:from-indigo-800/50 hover:to-indigo-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 text-center transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/30"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 transform group-hover:scale-125 transition-transform duration-300">💾</div>
            <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors">CSV → JSON</div>
            <div className="text-[10px] sm:text-xs text-indigo-300/60 group-hover:text-indigo-300/80 mt-0.5 sm:mt-1 transition-colors">Spreadsheets</div>
          </Link>
          <Link
            href="/tool/mp4-to-avi"
            className="group bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-2 border-indigo-500/30 hover:border-indigo-400 hover:from-indigo-800/50 hover:to-indigo-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 text-center transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/30"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 transform group-hover:scale-125 transition-transform duration-300">🎬</div>
            <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors">MP4 → AVI</div>
            <div className="text-[10px] sm:text-xs text-indigo-300/60 group-hover:text-indigo-300/80 mt-0.5 sm:mt-1 transition-colors">Videos</div>
          </Link>
          <Link
            href="/tool/mp3-to-wav"
            className="group bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-2 border-indigo-500/30 hover:border-indigo-400 hover:from-indigo-800/50 hover:to-indigo-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 text-center transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/30"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 transform group-hover:scale-125 transition-transform duration-300">🎵</div>
            <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors">MP3 → WAV</div>
            <div className="text-[10px] sm:text-xs text-indigo-300/60 group-hover:text-indigo-300/80 mt-0.5 sm:mt-1 transition-colors">Audio</div>
          </Link>
        </div>
        <div className="text-center px-2 sm:px-4">
          <Link
            href="#categories"
            className="inline-block w-full sm:w-auto rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/50 hover:scale-105 transform"
          >
            <span className="inline-flex items-center justify-center gap-2">
              View All 120+ Tools 
              <span className="text-lg sm:text-xl">→</span>
            </span>
          </Link>
        </div>
      </section>

      <section id="categories" className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">Conversion categories</h2>
            <p className="text-xs sm:text-sm text-indigo-200/70">
              Build automated flows across 120+ conversion tools with enterprise-grade reliability.
            </p>
          </div>
          <Link href="/docs" className="text-xs sm:text-sm text-indigo-200/80 hover:text-white whitespace-nowrap">
            View API docs ↗
          </Link>
        </div>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {conversionCategories.map((category) => (
            <CategoryCard key={category.key} category={category} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
        <div className="text-center mb-8 sm:mb-12 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">Why Choose W Software Solutions?</h2>
          <p className="text-base sm:text-lg md:text-xl text-indigo-200/80">Industry-leading file conversion technology</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🚀</div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Lightning Fast</h3>
            <p className="text-sm sm:text-base text-indigo-200/70">Optimized conversion algorithms for maximum speed</p>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🔒</div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Secure & Private</h3>
            <p className="text-sm sm:text-base text-indigo-200/70">Your files are processed securely and deleted after conversion</p>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">💎</div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Premium Quality</h3>
            <p className="text-sm sm:text-base text-indigo-200/70">Professional-grade conversions with no quality loss</p>
          </div>
        </div>
      </section>
    </main>
  );
}
