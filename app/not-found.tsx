import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <span className="rounded-full border border-indigo-400/40 px-4 py-1 text-xs uppercase tracking-[0.4em] text-indigo-200/70">
        404
      </span>
      <h1 className="text-4xl font-semibold text-white">We can't find that page</h1>
      <p className="max-w-md text-indigo-100/80">
        The URL you're looking for might be in preview or hasn't launched yet. Head back home to find a
        conversion tool that fits your workflow.
      </p>
      <Link
        href="/"
        className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-900/50 transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        Back to dashboard
      </Link>
    </main>
  );
}
