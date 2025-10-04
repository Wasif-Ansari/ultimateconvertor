import Link from "next/link";
import { notFound } from "next/navigation";
import { conversionCategories } from "@/lib/categories";
import { getCategoryByKey, getToolsByCategory } from "@/lib/tools";
import type { ConversionCategoryKey } from "@/lib/types";

interface CategoryPageProps {
  params: {
    slug: ConversionCategoryKey;
  };
}

export function generateStaticParams() {
  return conversionCategories.map((category) => ({ slug: category.key }));
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = getCategoryByKey(params.slug);
  if (!category) {
    return {};
  }

  return {
    title: `${category.title} conversions | Ultimate File Converter`,
    description: category.description
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryByKey(params.slug);
  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(category.key);

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-10 px-6 py-24">
      <Link href="/" className="text-sm text-indigo-200/70 hover:text-white">
        ← All categories
      </Link>
      <header className="flex flex-col gap-4">
        <div
          className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${category.accentColor} px-4 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-950`}
        >
          {category.title}
        </div>
        <h1 className="text-4xl font-semibold text-white">{category.title} conversion tools</h1>
        <p className="max-w-2xl text-indigo-100/80">{category.description}</p>
      </header>
      <section className="grid gap-6">
        {tools.map((tool) => (
          <article
            key={tool.slug}
            className="rounded-3xl border border-indigo-500/20 bg-indigo-900/40 p-6 shadow-inner shadow-indigo-900/20"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">{tool.label}</h2>
                <p className="text-sm text-indigo-200/70">{tool.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-indigo-400/40 px-3 py-1 text-xs uppercase tracking-widest text-indigo-200/70">
                  {tool.sourceExtensions.join(", ")} → {tool.targetExtension}
                </span>
                <Link
                  href={`/tool/${tool.slug}`}
                  className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-indigo-700 shadow-md shadow-indigo-900/30 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Open tool
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
